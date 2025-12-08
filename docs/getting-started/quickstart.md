# Quick Start

Get Merlya up and running in 5 minutes.

## 1. First Run - Setup Wizard

On first launch, Merlya's setup wizard guides you through configuration:

```bash
merlya chat
```

### Language Selection

```
╭─────────────────────────────────────────────────────────────────╮
│                        Merlya Setup                              │
├─────────────────────────────────────────────────────────────────┤
│  Welcome to Merlya! / Bienvenue dans Merlya!                    │
│                                                                  │
│  Select your language / Choisissez votre langue:                │
│    1. English                                                    │
│    2. Français                                                   │
╰─────────────────────────────────────────────────────────────────╯
```

### LLM Provider Selection

```
╭─────────────────────────────────────────────────────────────────╮
│                      LLM Configuration                           │
├─────────────────────────────────────────────────────────────────┤
│  1. OpenRouter (recommended) - Free models available             │
│  2. Anthropic - Claude models                                    │
│  3. OpenAI - GPT models                                          │
│  4. Ollama - Local models (no API key needed)                    │
╰─────────────────────────────────────────────────────────────────╯

Select provider [1]:
```

!!! tip "OpenRouter Recommended"
    OpenRouter offers free models and access to 100+ LLMs. Get your API key at [openrouter.ai/keys](https://openrouter.ai/keys)

### Host Discovery

The wizard automatically detects hosts from:

- `~/.ssh/config` - SSH configuration
- `~/.ssh/known_hosts` - Previously connected hosts
- `/etc/hosts` - Local host definitions
- Ansible inventory files

```
Detected inventory sources:
  • SSH Config: 12 hosts
  • Known Hosts: 45 hosts

Import all hosts? [Y/n]:
```

---

## 2. Manual Configuration (Alternative)

If you skip the wizard or want to change settings later:

=== "OpenRouter (Free)"

    ```bash
    merlya config set llm.provider openrouter
    merlya config set llm.api_key or-your-api-key
    merlya config set llm.model amazon/nova-2-lite-v1:free
    ```

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
    merlya config set llm.model claude-3-5-sonnet-latest
    ```

=== "Ollama (Local)"

    ```bash
    # First, install Ollama: https://ollama.ai
    ollama pull llama3.2

    merlya config set llm.provider ollama
    merlya config set llm.model llama3.2
    ```

---

## 3. Start the REPL

```bash
merlya chat
```

You'll see the welcome screen with status indicators:

```
╭──────────────────────────────────────────────────────────────────╮
│                              Welcome                              │
├──────────────────────────────────────────────────────────────────┤
│  🚀 Merlya v0.5.6 - Interactive Mode                             │
│                                                                   │
│  Provider: ✅ openrouter (amazon/nova-2-lite-v1:free)            │
│  Router: ✅ local (intent-classifier-v1)                          │
│  Keyring: ✅ Keyring                                              │
│                                                                   │
│  Ask naturally or use slash commands:                             │
│    • /help - Show commands                                        │
│    • /exit - Quit                                                 │
╰──────────────────────────────────────────────────────────────────╯

╭──────────────────────────────────────────────────────────────────╮
│                           ⚠️  Warning                             │
├──────────────────────────────────────────────────────────────────┤
│  ⚠️  EXPERIMENTAL SOFTWARE                                        │
│                                                                   │
│  This tool is in early development. Use for debugging/testing    │
│  only, NOT production.                                           │
╰──────────────────────────────────────────────────────────────────╯
```

!!! warning "Experimental Software"
    Always review commands before executing them on production systems.

---

## 4. Try Some Commands

### Natural Language

```
Merlya > What can you help me with?

I can help you with:
- Managing SSH connections to servers
- Executing commands on remote machines
- Checking system status and metrics
- Automating routine DevOps tasks

Just describe what you need in plain English!
```

### Connect to a Server

```
Merlya > Connect to my-server.example.com and show me the uptime

Connecting to my-server.example.com...

> ssh my-server.example.com "uptime"

 14:32:01 up 45 days,  3:21,  2 users,  load average: 0.15, 0.10, 0.05

The server has been running for 45 days with low load averages.
```

### Use @ Mentions

```
Merlya > Check disk space on @web-01 and @web-02

> ssh web-01 "df -h /"
> ssh web-02 "df -h /"

Summary:
- web-01: 45% used (55GB free)
- web-02: 62% used (38GB free)
```

### Slash Commands

```
Merlya > /hosts

Name     | Hostname              | User   | Tags
---------|----------------------|--------|------------------
web-01   | web-01.example.com   | deploy | ssh-config
web-02   | web-02.example.com   | deploy | ssh-config
db-01    | 10.0.1.50            | admin  | known-hosts
```

---

## Common Commands

| Command | Description |
|---------|-------------|
| `merlya chat` | Start interactive REPL |
| `merlya config list` | Show current configuration |
| `merlya config set KEY VALUE` | Set a configuration value |
| `/help` | Show available slash commands |
| `/hosts` | List configured hosts |
| `/new` | Start a new conversation |
| `/exit` | Exit the REPL |

---

## Next Steps

- [REPL Mode](../guides/repl-mode.md) - Deep dive into the interactive interface
- [Configuration Guide](configuration.md) - Advanced configuration options
- [SSH Management](../guides/ssh-management.md) - SSH features and connection pooling
- [LLM Providers](../guides/llm-providers.md) - Configure different LLM providers
