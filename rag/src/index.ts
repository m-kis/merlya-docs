/**
 * Merlya Docs RAG Worker
 *
 * Handles documentation questions using OpenAI GPT-4o-mini.
 * The docs context is embedded in the system prompt for simplicity.
 */

interface Env {
  OPENAI_API_KEY: string;
  CORS_ORIGIN: string;
}

interface AskRequest {
  question: string;
}

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Documentation context (key information about Merlya)
const DOCS_CONTEXT = `
# Merlya Documentation Summary

## What is Merlya?
Merlya is an AI-powered infrastructure assistant CLI tool for DevOps and SRE teams. It combines LLM capabilities with practical infrastructure management.

## Key Features
- Natural language interface for infrastructure tasks
- SSH connection management with pooling
- Multiple LLM provider support (OpenRouter, OpenAI, Anthropic, Ollama)
- Setup wizard for first-run configuration
- REPL mode with autocompletion and @ mentions
- Host discovery from SSH config, known_hosts, /etc/hosts, Ansible

## Installation
\`\`\`bash
pip install merlya
\`\`\`

## Quick Start
1. Run \`merlya chat\` - setup wizard runs on first launch
2. Select LLM provider (OpenRouter recommended - free tier)
3. Enter API key
4. Import hosts from SSH config/known_hosts
5. Start chatting!

## LLM Providers
- **OpenRouter** (default): Free models available, 100+ models
- **OpenAI**: GPT-4o, GPT-4o-mini
- **Anthropic**: Claude 3.5 Sonnet/Haiku
- **Ollama**: Local (free) or Cloud deployment

## REPL Features
- Slash commands: /help, /hosts, /new, /exit, /conversations
- @ mentions: @hostname to reference servers
- Autocompletion with Tab
- Command history with Up/Down arrows

## Configuration
- Config file: ~/.merlya/config.yaml
- API keys stored in system keyring (secure)
- Hosts stored in SQLite database

## Commands
- \`merlya chat\` - Start REPL
- \`merlya config set KEY VALUE\` - Set config
- \`/hosts\` - List hosts (in REPL)
- \`/help\` - Show commands (in REPL)

## Warning
Merlya is experimental software. Always review commands before executing on production.

## Links
- GitHub: https://github.com/m-kis/merlya
- PyPI: https://pypi.org/project/merlya/
- Docs: https://m-kis.github.io/merlya-docs/
`;

const SYSTEM_PROMPT = `You are a helpful documentation assistant for Merlya, an AI-powered infrastructure CLI tool.

Use the following documentation to answer questions. Be concise and helpful.
If you don't know the answer based on the documentation, say so.
Always be friendly and provide code examples when relevant.

${DOCS_CONTEXT}

Answer in the same language as the question (French or English).`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": env.CORS_ORIGIN || "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Only allow POST to /ask
    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/ask") {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const body = await request.json() as AskRequest;
      const question = body.question?.trim();

      if (!question) {
        return jsonResponse({ error: "Question is required" }, 400, env.CORS_ORIGIN);
      }

      if (question.length > 500) {
        return jsonResponse({ error: "Question too long (max 500 chars)" }, 400, env.CORS_ORIGIN);
      }

      // Call OpenAI
      const messages: OpenAIMessage[] = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question },
      ];

      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!openaiResponse.ok) {
        const errorText = await openaiResponse.text();
        console.error("OpenAI error:", openaiResponse.status, errorText);
        return jsonResponse({
          error: "AI service error",
          status: openaiResponse.status,
          details: errorText.substring(0, 200)
        }, 500, env.CORS_ORIGIN);
      }

      const data = await openaiResponse.json() as OpenAIResponse;
      const answer = data.choices[0]?.message?.content || "Sorry, I couldn't generate an answer.";

      return jsonResponse({ answer }, 200, env.CORS_ORIGIN);

    } catch (error) {
      console.error("Error:", error);
      return jsonResponse({ error: "Internal error" }, 500, env.CORS_ORIGIN);
    }
  },
};

function jsonResponse(data: object, status: number, corsOrigin: string): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": corsOrigin || "*",
    },
  });
}
