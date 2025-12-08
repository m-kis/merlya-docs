# CLI Reference

Complete reference for all Merlya commands.

## Starting Merlya

```bash
merlya [OPTIONS]

Options:
  --version       Show version and exit
  --help          Show help message and exit
  -v, --verbose   Enable verbose output
  -q, --quiet     Suppress non-essential output
  --config FILE   Use specific config file
```

## REPL Slash Commands

Once inside the Merlya REPL, use slash commands to interact with the system.

### Quick Reference

| Category | Commands |
|----------|----------|
| **Core** | `/help`, `/exit`, `/new`, `/language` |
| **Hosts** | `/hosts list`, `/hosts add`, `/hosts show`, `/hosts delete`, `/hosts tag`, `/hosts import`, `/hosts export` |
| **SSH** | `/ssh connect`, `/ssh exec`, `/ssh disconnect`, `/ssh config`, `/ssh test` |
| **Scan** | `/scan` |
| **Conversations** | `/conv list`, `/conv show`, `/conv load`, `/conv delete`, `/conv rename`, `/conv search`, `/conv export` |
| **Model** | `/model show`, `/model provider`, `/model model`, `/model test`, `/model router` |
| **Variables** | `/variable list`, `/variable set`, `/variable get`, `/variable delete` |
| **Secrets** | `/secret list`, `/secret set`, `/secret delete` |
| **System** | `/health`, `/log` |

---

## Core Commands

### /help

Show help for commands.

```
/help [command]
```

**Aliases:** `h`, `?`

**Examples:**
```
/help              # Show all commands
/help hosts        # Help for /hosts command
/help ssh          # Help for /ssh command
```

---

### /exit

Exit Merlya.

```
/exit
```

**Aliases:** `quit`, `q`

---

### /new

Start a new conversation.

```
/new
```

---

### /language

Change interface language.

```
/language <fr|en>
```

**Aliases:** `lang`

**Available Languages:**

- `fr` - French
- `en` - English

**Example:**
```
/language en
```

---

## Host Management

### /hosts list

List all hosts in inventory.

```
/hosts list [--tag=<tag>]
```

**Options:**

- `--tag=<tag>` - Filter hosts by tag

**Examples:**
```
/hosts list
/hosts list --tag=production
/hosts list --tag=web
```

---

### /hosts add

Add a new host interactively.

```
/hosts add <name>
```

You will be prompted for:

- Hostname or IP address
- SSH port (default: 22)
- Username

**Example:**
```
/hosts add web-prod-01
```

---

### /hosts show

Show detailed host information.

```
/hosts show <name>
```

**Displays:**

- Hostname and port
- Username
- Connection status
- Tags
- OS information
- Last seen timestamp

**Example:**
```
/hosts show web-prod-01
```

---

### /hosts delete

Delete a host from inventory.

```
/hosts delete <name>
```

Requires confirmation before deletion.

**Example:**
```
/hosts delete old-server
```

---

### /hosts tag

Add a tag to a host.

```
/hosts tag <name> <tag>
```

**Example:**
```
/hosts tag web-prod-01 production
/hosts tag web-prod-01 nginx
```

---

### /hosts untag

Remove a tag from a host.

```
/hosts untag <name> <tag>
```

**Example:**
```
/hosts untag web-prod-01 deprecated
```

---

### /hosts edit

Edit host configuration interactively.

```
/hosts edit <name>
```

You can modify:

- Hostname
- Port
- Username
- Tags

**Example:**
```
/hosts edit web-prod-01
```

---

### /hosts import

Import hosts from a file.

```
/hosts import <file> [--format=<format>]
```

**Supported Formats:**

| Format | Description |
|--------|-------------|
| `json` | JSON array of host objects |
| `yaml` | YAML host configuration |
| `csv` | CSV with columns: name, hostname, port, username, tags |
| `ssh` | SSH config file format (`~/.ssh/config`) |
| `etc_hosts` | Linux `/etc/hosts` format |

**Examples:**
```
/hosts import ~/hosts.json --format=json
/hosts import ~/.ssh/config --format=ssh
/hosts import /etc/hosts --format=etc_hosts
```

---

### /hosts export

Export hosts to a file.

```
/hosts export <file> [--format=<format>]
```

**Supported Formats:** `json`, `yaml`, `csv`

**Example:**
```
/hosts export ~/backup.json --format=json
```

---

## SSH Management

### /ssh connect

Connect to a host.

```
/ssh connect <host>
```

Supports passphrase prompts and MFA/2FA authentication.

**Examples:**
```
/ssh connect web-prod-01
/ssh connect @web-prod-01
```

---

### /ssh exec

Execute a command on a remote host.

```
/ssh exec <host> <command>
```

Returns exit code, stdout, and stderr.

**Examples:**
```
/ssh exec @web-prod-01 "uptime"
/ssh exec @db-01 "df -h"
/ssh exec @web-prod-01 "systemctl status nginx"
```

---

### /ssh disconnect

Disconnect from a host or all hosts.

```
/ssh disconnect [host]
```

Without arguments, disconnects from all hosts.

**Examples:**
```
/ssh disconnect web-prod-01    # Disconnect from specific host
/ssh disconnect                # Disconnect from all hosts
```

---

### /ssh config

Configure SSH settings for a host.

```
/ssh config <host>
```

You will be prompted for:

- Username
- Port
- Private key path
- Jump host (optional)

**Example:**
```
/ssh config web-prod-01
```

---

### /ssh test

Test SSH connection with diagnostics.

```
/ssh test <host>
```

**Shows:**

- SSH configuration used
- Connection time
- OS information
- Troubleshooting hints for common errors

**Example:**
```
/ssh test web-prod-01
```

---

## Scanning & Diagnostics

### /scan

Scan hosts for system information and security issues.

```
/scan <host> [<host2> ...] [options]
```

**Scan Types:**

| Option | Description |
|--------|-------------|
| `--full` | Complete scan (default) |
| `--quick` | Fast check: CPU, memory, disk, ports |
| `--security` | Security checks only |
| `--system` | System checks only |

**Output Options:**

| Option | Description |
|--------|-------------|
| `--json` | Output as JSON |

**Additional Options:**

| Option | Description |
|--------|-------------|
| `--all-disks` | Check all mounted filesystems |
| `--show-all` | Show all ports and users (no truncation) |
| `--no-docker` | Skip Docker checks |
| `--no-updates` | Skip pending updates check |

**What It Checks:**

**System:**

- CPU usage and load
- Memory usage
- Disk usage
- Docker containers
- System information (OS, kernel, uptime)

**Security:**

- Open ports
- SSH configuration
- Users and groups
- SSH keys
- Sudo configuration
- Running services
- Failed login attempts
- Pending security updates

**Severity Scoring:** 0-100 scale based on issues found.

**Examples:**
```
/scan @web-prod-01
/scan @web-prod-01 --quick
/scan @web-prod-01 @db-01 --security
/scan @web-prod-01 --full --json
```

---

### /health

Show system health status.

```
/health
```

Displays health check results and capabilities.

---

### /log

Configure and view logging.

```
/log [subcommand]
```

**Subcommands:**

| Subcommand | Description |
|------------|-------------|
| (none) | Show logging configuration |
| `level <level>` | Change log level |
| `show` | Show recent log entries |

**Log Levels:** `debug`, `info`, `warning`, `error`

**Examples:**
```
/log
/log level debug
/log show
```

---

## Conversation Management

### /conv list

List recent conversations.

```
/conv list [--limit=N]
```

**Options:**

- `--limit=N` - Number of conversations to show (default: 10)

**Displays:**

- Conversation ID
- Title
- Message count
- Last updated

**Example:**
```
/conv list --limit=20
```

**Aliases:** `conversation`

---

### /conv show

Show conversation details.

```
/conv show <id>
```

**Displays:**

- Title
- Created date
- Message count
- Summary
- Recent messages

**Example:**
```
/conv show abc12345
```

---

### /conv load

Load and resume a conversation.

```
/conv load <id>
```

Supports partial ID matching (prefix).

**Example:**
```
/conv load abc12345
/conv load abc        # Matches by prefix
```

---

### /conv delete

Delete a conversation.

```
/conv delete <id>
```

Requires confirmation.

**Example:**
```
/conv delete abc12345
```

---

### /conv rename

Rename a conversation.

```
/conv rename <id> <title>
```

**Example:**
```
/conv rename abc12345 "Server Migration Analysis"
```

---

### /conv search

Search in conversation history.

```
/conv search <query>
```

**Example:**
```
/conv search "security issues"
/conv search "nginx configuration"
```

---

### /conv export

Export conversation to file.

```
/conv export <id> <file>
```

**Supported Formats:**

- `.json` - JSON format
- `.md` - Markdown format

**Example:**
```
/conv export abc12345 ~/my_conversation.md
/conv export abc12345 ~/backup.json
```

---

## Model & LLM Management

### /model show

Show current model configuration.

```
/model show
```

**Displays:**

- Provider name
- Model name
- API key status
- Router type
- Tier
- Fallback model

---

### /model provider

Change LLM provider.

```
/model provider <name>
```

**Available Providers:**

| Provider | Description |
|----------|-------------|
| `openrouter` | OpenRouter (100+ models, free tier available) |
| `anthropic` | Anthropic Claude models |
| `openai` | OpenAI GPT models |
| `ollama` | Ollama (local or cloud) |
| `litellm` | LiteLLM proxy |

Prompts for API key if not configured.

**Example:**
```
/model provider openai
/model provider openrouter
```

---

### /model model

Change the LLM model.

```
/model model <name>
```

For Ollama, automatically detects cloud vs local endpoints.

**Examples:**
```
/model model gpt-4o
/model model claude-3-5-sonnet-20241022
/model model llama3.2
```

---

### /model test

Test LLM connection.

```
/model test
```

Tests multiple model candidates and shows latency.

---

### /model router

Configure intent router.

```
/model router <show|local|llm>
```

**Options:**

| Option | Description |
|--------|-------------|
| `show` | Show router configuration |
| `local` | Use local ONNX model for routing |
| `llm <model>` | Use LLM for intent routing |

**Examples:**
```
/model router show
/model router local
/model router llm gpt-3.5-turbo
```

---

## Variable Management

### /variable list

List all variables.

```
/variable list
```

**Aliases:** `var`

**Displays:**

- Variable name
- Value (truncated)
- Type (regular or environment)

---

### /variable set

Set a variable.

```
/variable set <name> <value> [--env]
```

**Options:**

- `--env` - Mark as environment variable

**Examples:**
```
/variable set region eu-west-1
/variable set api_url "https://api.example.com" --env
```

---

### /variable get

Get a variable value.

```
/variable get <name>
```

**Example:**
```
/variable get region
```

---

### /variable delete

Delete a variable.

```
/variable delete <name>
```

**Example:**
```
/variable delete old_var
```

---

## Secret Management

Secrets are stored securely in the system keyring.

### /secret list

List all secret names.

```
/secret list
```

Values are never displayed.

---

### /secret set

Set a secret securely.

```
/secret set <name>
```

Uses secure input prompt (no echo).

**Example:**
```
/secret set my_api_key
```

---

### /secret delete

Delete a secret.

```
/secret delete <name>
```

**Example:**
```
/secret delete old_api_key
```

---

## Mentions

You can mention entities in your chat messages:

| Syntax | Description |
|--------|-------------|
| `@hostname` | Reference a host from inventory |
| `@variable_name` | Reference a variable value |
| `@secret_name` | Reference a secret (not logged) |

**Examples:**
```
Check disk usage on @web-prod-01
Deploy to @staging using @deploy_key
What's the status of @nodeapp on @server1
```

---

## Autocompletion

The REPL supports Tab autocompletion for:

- **Slash commands** - Type `/` and press Tab
- **Host mentions** - Type `@` and press Tab
- **Variable mentions** - Type `@` and press Tab
- **Command history** - Use Up/Down arrows

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Configuration error |
| 3 | Connection error |
| 4 | Authentication error |
| 5 | Command execution error |
| 130 | Interrupted (Ctrl+C) |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `OPENAI_API_KEY` | OpenAI API key |
| `OPENROUTER_API_KEY` | OpenRouter API key |
| `MERLYA_ROUTER_FALLBACK` | LLM fallback model |
| `MERLYA_LOG_LEVEL` | Log level (debug, info, warning, error) |
| `MERLYA_CONFIG` | Config file path |
| `MERLYA_SSH_TIMEOUT` | SSH connection timeout |
