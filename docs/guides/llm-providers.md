# LLM Providers

Merlya supports multiple LLM providers, from cloud APIs to local models.

## Supported Providers

| Provider | Models | Pros | Cons |
|----------|--------|------|------|
| **OpenAI** | GPT-4o, GPT-4o-mini | Best quality, fast | Paid API |
| **Anthropic** | Claude 3.5 Sonnet | Great reasoning | Paid API |
| **Ollama** | Qwen, Llama, Mistral | Free, private | Requires GPU/CPU |
| **Groq** | Llama 3.3, Mixtral | Ultra fast, free tier | Rate limited |

## OpenAI

### Setup

```bash
merlya config set llm.provider openai
merlya config set llm.api_key sk-your-api-key
merlya config set llm.model gpt-4o-mini
```

### Recommended Models

| Model | Speed | Quality | Cost |
|-------|-------|---------|------|
| `gpt-4o` | Fast | Excellent | $$ |
| `gpt-4o-mini` | Very fast | Great | $ |
| `gpt-4-turbo` | Medium | Excellent | $$$ |

### Custom Base URL

For Azure OpenAI or proxies:

```bash
merlya config set llm.base_url https://your-endpoint.openai.azure.com
```

## Anthropic

### Setup

```bash
merlya config set llm.provider anthropic
merlya config set llm.api_key sk-ant-your-api-key
merlya config set llm.model claude-3-5-sonnet-20241022
```

### Recommended Models

| Model | Speed | Quality | Cost |
|-------|-------|---------|------|
| `claude-3-5-sonnet-20241022` | Fast | Excellent | $$ |
| `claude-3-5-haiku-20241022` | Very fast | Great | $ |
| `claude-3-opus-20240229` | Slow | Best | $$$ |

## Ollama (Local)

Run models locally with Ollama.

### Setup

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull qwen2.5:7b

# Configure Merlya
merlya config set llm.provider ollama
merlya config set llm.model qwen2.5:7b
merlya config set llm.base_url http://localhost:11434
```

### Recommended Models

| Model | RAM | Quality | Speed |
|-------|-----|---------|-------|
| `qwen2.5:7b` | 8GB | Great | Fast |
| `llama3.2:3b` | 4GB | Good | Very fast |
| `mistral-nemo:12b` | 16GB | Excellent | Medium |
| `codellama:13b` | 16GB | Great for code | Medium |

### GPU Acceleration

Ollama automatically uses GPU if available:

```bash
# Check GPU usage
ollama ps

# Force CPU only
OLLAMA_GPU_LAYERS=0 ollama serve
```

## Groq

Ultra-fast inference with free tier.

### Setup

```bash
merlya config set llm.provider groq
merlya config set llm.api_key gsk_your-api-key
merlya config set llm.model llama-3.3-70b-versatile
```

### Available Models

| Model | Tokens/sec | Quality |
|-------|------------|---------|
| `llama-3.3-70b-versatile` | ~300 | Excellent |
| `llama-3.1-8b-instant` | ~750 | Good |
| `mixtral-8x7b-32768` | ~500 | Great |

### Rate Limits (Free Tier)

- 30 requests/minute
- 14,400 requests/day

## Switching Providers

Easily switch between providers:

```bash
# Use OpenAI for complex tasks
merlya config set llm.provider openai
merlya chat

# Switch to Ollama for privacy
merlya config set llm.provider ollama
merlya chat
```

## Environment Variables

Override settings with environment variables:

```bash
export MERLYA_LLM_PROVIDER=anthropic
export MERLYA_LLM_API_KEY=sk-ant-xxx
export MERLYA_LLM_MODEL=claude-3-5-sonnet-20241022

merlya chat  # Uses Anthropic
```

## Custom Providers

Add custom OpenAI-compatible providers:

```bash
merlya config set llm.provider openai
merlya config set llm.base_url https://api.your-provider.com/v1
merlya config set llm.api_key your-api-key
merlya config set llm.model your-model-name
```

Compatible providers:

- Together AI
- Anyscale
- Fireworks AI
- Perplexity
- Local vLLM/llama.cpp servers

## Troubleshooting

### API Key Issues

```bash
# Verify API key is set
merlya config get llm.api_key

# Re-set API key
merlya config set llm.api_key sk-new-key
```

### Rate Limiting

```
Error: Rate limit exceeded

# Solutions:
# 1. Wait and retry
# 2. Switch to a different provider
# 3. Upgrade your API plan
```

### Ollama Not Responding

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama
systemctl restart ollama
# or
ollama serve
```
