# CLI Reference

Complete reference for all Merlya CLI commands.

## Global Options

```bash
merlya [OPTIONS] COMMAND [ARGS]

Options:
  --version       Show version and exit
  --help          Show help message and exit
  -v, --verbose   Enable verbose output
  -q, --quiet     Suppress non-essential output
  --config FILE   Use specific config file
```

## Commands

### chat

Start an interactive chat session.

```bash
merlya chat [OPTIONS]

Options:
  --model MODEL       Override configured model
  --provider PROVIDER Override configured provider
  --system PROMPT     Custom system prompt
  --history FILE      Load chat history from file
```

**Examples:**

```bash
# Basic chat
merlya chat

# Use specific model
merlya chat --model gpt-4o

# With custom system prompt
merlya chat --system "You are a Kubernetes expert"
```

---

### run

Execute a single command or task.

```bash
merlya run [OPTIONS] PROMPT

Options:
  -y, --yes           Skip confirmation prompts
  -f, --file FILE     Load prompts from file
  --format FORMAT     Output format (text, json, yaml)
  --timeout SECONDS   Command timeout
```

**Examples:**

```bash
# Single command
merlya run "Check disk space on web servers"

# With auto-confirm
merlya run --yes "Restart nginx on web-01"

# JSON output
merlya run --format json "List all servers"
```

---

### config

Manage configuration settings.

```bash
merlya config COMMAND [ARGS]

Commands:
  get KEY           Get a configuration value
  set KEY VALUE     Set a configuration value
  list              List all configuration
  reset             Reset to defaults
  path              Show config file path
```

**Examples:**

```bash
# Set LLM provider
merlya config set llm.provider openai

# Get current model
merlya config get llm.model

# List all settings
merlya config list

# Show config file location
merlya config path
```

---

### hosts

Manage SSH hosts.

```bash
merlya hosts COMMAND [ARGS]

Commands:
  list              List all configured hosts
  add NAME HOST     Add a new host
  remove NAME       Remove a host
  show NAME         Show host details
  test NAME         Test connection to host
  groups            List host groups
```

**Examples:**

```bash
# List hosts
merlya hosts list

# Add a host
merlya hosts add web-01 web-01.example.com --user deploy

# Test connection
merlya hosts test web-01

# Show host details
merlya hosts show web-01
```

---

### connect

Connect to a specific host.

```bash
merlya connect [OPTIONS] HOST

Options:
  -u, --user USER     SSH username
  -p, --port PORT     SSH port (default: 22)
  -k, --key FILE      SSH private key
  -j, --jump HOST     Jump host for connection
```

**Examples:**

```bash
# Basic connection
merlya connect web-01

# With specific user
merlya connect web-01 --user admin

# Through jump host
merlya connect internal-db --jump bastion
```

---

### exec

Execute a command on remote hosts.

```bash
merlya exec [OPTIONS] HOST COMMAND

Options:
  --sudo              Run with sudo
  --timeout SECONDS   Command timeout
  --parallel          Run on multiple hosts in parallel
```

**Examples:**

```bash
# Run command
merlya exec web-01 "uptime"

# With sudo
merlya exec web-01 --sudo "systemctl restart nginx"

# On multiple hosts
merlya exec "web-*" --parallel "df -h"
```

---

### upload / download

Transfer files to/from remote hosts.

```bash
merlya upload [OPTIONS] LOCAL_FILE HOST:REMOTE_PATH
merlya download [OPTIONS] HOST:REMOTE_PATH LOCAL_FILE

Options:
  --recursive         Transfer directories
  --preserve          Preserve permissions
```

**Examples:**

```bash
# Upload file
merlya upload config.yml web-01:/etc/app/

# Download file
merlya download web-01:/var/log/app.log ./

# Upload directory
merlya upload --recursive ./configs/ web-01:/etc/app/
```

---

### logs

View and manage logs.

```bash
merlya logs [OPTIONS]

Options:
  --lines N           Show last N lines (default: 50)
  --follow            Follow log output
  --level LEVEL       Filter by log level
  --clear             Clear log file
```

**Examples:**

```bash
# View recent logs
merlya logs

# Follow logs
merlya logs --follow

# Filter errors
merlya logs --level ERROR
```

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

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MERLYA_CONFIG` | Config file path |
| `MERLYA_LLM_PROVIDER` | LLM provider |
| `MERLYA_LLM_API_KEY` | LLM API key |
| `MERLYA_LLM_MODEL` | LLM model name |
| `MERLYA_LOG_LEVEL` | Logging level |
| `MERLYA_SSH_TIMEOUT` | SSH timeout |
