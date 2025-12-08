# Quick Start

Get Merlya up and running in 5 minutes.

## 1. Configure LLM Provider

Merlya needs an LLM provider to work. Choose one:

=== "OpenAI"

    ```bash
    merlya config set llm.provider openai
    merlya config set llm.api_key sk-your-api-key
    merlya config set llm.model gpt-4o-mini
    ```

=== "Anthropic"

    ```bash
    merlya config set llm.provider anthropic
    merlya config set llm.api_key sk-ant-your-api-key
    merlya config set llm.model claude-3-5-sonnet-20241022
    ```

=== "Ollama (Local)"

    ```bash
    # First, install Ollama: https://ollama.ai
    ollama pull qwen2.5:7b

    merlya config set llm.provider ollama
    merlya config set llm.model qwen2.5:7b
    ```

## 2. Start Chatting

Launch the interactive chat:

```bash
merlya chat
```

You'll see a prompt where you can type natural language commands:

```
Merlya > What can you help me with?

I can help you with:
- Managing SSH connections to servers
- Executing commands on remote machines
- Checking system status and metrics
- Automating routine DevOps tasks

Just describe what you need in plain English!
```

## 3. Connect to a Server

```
Merlya > Connect to my-server.example.com and show me the uptime

I'll connect to my-server.example.com and check the uptime.

> ssh my-server.example.com "uptime"

 14:32:01 up 45 days,  3:21,  2 users,  load average: 0.15, 0.10, 0.05

The server has been running for 45 days with low load averages.
```

## 4. Execute Commands

```
Merlya > Check disk space on all web servers

I'll check disk space on your web servers.

> ssh web-01 "df -h /"
> ssh web-02 "df -h /"
> ssh web-03 "df -h /"

Summary:
- web-01: 45% used (55GB free)
- web-02: 62% used (38GB free)
- web-03: 78% used (22GB free) ⚠️

web-03 is getting low on disk space. Consider cleaning up or expanding.
```

## Common Commands

| Command | Description |
|---------|-------------|
| `merlya chat` | Start interactive chat |
| `merlya config list` | Show current configuration |
| `merlya config set KEY VALUE` | Set a configuration value |
| `merlya hosts list` | List configured hosts |
| `merlya hosts add NAME HOST` | Add a new host |

## Next Steps

- [Configuration Guide](configuration.md) - Advanced configuration options
- [SSH Management](../guides/ssh-management.md) - Deep dive into SSH features
- [LLM Providers](../guides/llm-providers.md) - Configure different LLM providers
