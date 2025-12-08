# Configuration

Merlya uses a layered configuration system with sensible defaults.

## Configuration File

Configuration is stored in `~/.config/merlya/config.toml`:

```toml
[llm]
provider = "openai"
model = "gpt-4o-mini"
temperature = 0.7
max_tokens = 4096

[ssh]
timeout = 30
max_connections = 10
retry_attempts = 3

[logging]
level = "INFO"
file = "~/.config/merlya/merlya.log"
```

## Setting Values

Use the `config` command to manage settings:

```bash
# Set a value
merlya config set llm.provider anthropic

# Get a value
merlya config get llm.provider

# List all settings
merlya config list

# Reset to defaults
merlya config reset
```

## Environment Variables

All settings can be overridden with environment variables:

```bash
export MERLYA_LLM_PROVIDER=openai
export MERLYA_LLM_API_KEY=sk-...
export MERLYA_LLM_MODEL=gpt-4o
```

## LLM Configuration

### Provider Settings

| Setting | Description | Default |
|---------|-------------|---------|
| `llm.provider` | LLM provider (openai, anthropic, ollama) | `openai` |
| `llm.model` | Model name | `gpt-4o-mini` |
| `llm.api_key` | API key (stored in keyring) | - |
| `llm.temperature` | Response randomness (0-1) | `0.7` |
| `llm.max_tokens` | Max response length | `4096` |

### API Keys

API keys are stored securely in your system keyring:

- **macOS**: Keychain
- **Linux**: Secret Service (GNOME Keyring, KWallet)
- **Windows**: Credential Manager

```bash
# Set API key (stored securely)
merlya config set llm.api_key sk-your-key

# Keys are never written to config files
cat ~/.config/merlya/config.toml | grep api_key
# (no output)
```

## SSH Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| `ssh.timeout` | Connection timeout (seconds) | `30` |
| `ssh.max_connections` | Max concurrent connections | `10` |
| `ssh.retry_attempts` | Retry failed connections | `3` |
| `ssh.known_hosts` | Known hosts file | `~/.ssh/known_hosts` |

## Hosts Configuration

Define frequently used hosts in `~/.config/merlya/hosts.toml`:

```toml
[hosts.web-01]
hostname = "web-01.example.com"
user = "deploy"
port = 22
key = "~/.ssh/deploy_key"

[hosts.db-master]
hostname = "db-master.internal"
user = "admin"
jump_host = "bastion.example.com"

[groups.web-servers]
hosts = ["web-01", "web-02", "web-03"]

[groups.databases]
hosts = ["db-master", "db-replica-01", "db-replica-02"]
```

## Logging

| Setting | Description | Default |
|---------|-------------|---------|
| `logging.level` | Log level (DEBUG, INFO, WARNING, ERROR) | `INFO` |
| `logging.file` | Log file path | `~/.config/merlya/merlya.log` |
| `logging.format` | Log format string | `%(asctime)s - %(levelname)s - %(message)s` |

## Next Steps

- [SSH Management Guide](../guides/ssh-management.md)
- [LLM Providers Guide](../guides/llm-providers.md)
