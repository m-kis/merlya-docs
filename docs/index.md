# Merlya

**AI-powered infrastructure assistant for DevOps and SRE teams.**

Merlya is a command-line tool that combines the power of large language models with practical infrastructure management capabilities. It helps you manage SSH connections, execute commands across multiple servers, and automate routine tasks using natural language.

## Key Features

<div class="grid cards" markdown>

-   :material-chat-processing:{ .lg .middle } **Natural Language Interface**

    ---

    Interact with your infrastructure using plain English. No need to memorize complex command syntax.

-   :material-server-network:{ .lg .middle } **SSH Management**

    ---

    Connect to servers, execute commands, and manage connections with built-in pooling and retry logic.

-   :material-robot:{ .lg .middle } **Multiple LLM Providers**

    ---

    Support for OpenAI, Anthropic, Ollama, and more. Use cloud or local models.

-   :material-security:{ .lg .middle } **Secure by Design**

    ---

    Credentials stored in system keyring. No secrets in config files.

</div>

## Quick Example

```bash
# Install Merlya
pip install merlya

# Configure your LLM provider
merlya config set llm.provider openai
merlya config set llm.api_key sk-...

# Start chatting with your infrastructure
merlya chat
```

```
You: Connect to my web server and check disk usage
Merlya: I'll connect to web-server-01 and check the disk usage.

> ssh web-server-01 "df -h"

Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       100G   45G   55G  45% /

The disk usage is at 45%. You have 55GB available.
```

## Why Merlya?

- **Speed**: Execute complex operations with simple commands
- **Safety**: Review commands before execution, secure credential storage
- **Flexibility**: Works with any LLM provider, local or cloud
- **Extensibility**: Plugin system for custom tools and integrations

## Getting Started

Ready to get started? Check out the [Installation Guide](getting-started/installation.md) to set up Merlya in minutes.

[Get Started :material-arrow-right:](getting-started/installation.md){ .md-button .md-button--primary }
[View on GitHub :material-github:](https://github.com/m-kis/merlya){ .md-button }
