# Configuration Reference

Complete reference for all configuration options.

## Configuration Files

| File | Purpose |
|------|---------|
| `~/.config/merlya/config.toml` | Main configuration |
| `~/.config/merlya/hosts.toml` | SSH hosts definitions |
| `~/.config/merlya/history.json` | Chat history |

## LLM Settings

### llm.provider

LLM provider to use.

| Type | Default | Values |
|------|---------|--------|
| string | `openai` | `openai`, `anthropic`, `ollama`, `groq` |

```toml
[llm]
provider = "openai"
```

---

### llm.model

Model name/identifier.

| Type | Default |
|------|---------|
| string | `gpt-4o-mini` |

```toml
[llm]
model = "gpt-4o-mini"
```

**Provider-specific defaults:**

| Provider | Default Model |
|----------|---------------|
| OpenAI | `gpt-4o-mini` |
| Anthropic | `claude-3-5-sonnet-20241022` |
| Ollama | `qwen2.5:7b` |
| Groq | `llama-3.3-70b-versatile` |

---

### llm.api_key

API key for the provider. Stored securely in system keyring.

| Type | Default |
|------|---------|
| string | _(none)_ |

```bash
# Set via CLI (recommended)
merlya config set llm.api_key sk-your-key
```

!!! warning "Security"
    API keys are stored in your system's secure keyring, not in config files.

---

### llm.base_url

Custom API endpoint URL.

| Type | Default |
|------|---------|
| string | Provider default |

```toml
[llm]
base_url = "https://api.your-provider.com/v1"
```

---

### llm.temperature

Response randomness (0 = deterministic, 1 = creative).

| Type | Default | Range |
|------|---------|-------|
| float | `0.7` | 0.0 - 1.0 |

```toml
[llm]
temperature = 0.7
```

---

### llm.max_tokens

Maximum response length in tokens.

| Type | Default | Range |
|------|---------|-------|
| integer | `4096` | 1 - model max |

```toml
[llm]
max_tokens = 4096
```

---

## SSH Settings

### ssh.timeout

Connection timeout in seconds.

| Type | Default |
|------|---------|
| integer | `30` |

```toml
[ssh]
timeout = 30
```

---

### ssh.max_connections

Maximum concurrent SSH connections.

| Type | Default | Range |
|------|---------|-------|
| integer | `10` | 1 - 100 |

```toml
[ssh]
max_connections = 10
```

---

### ssh.retry_attempts

Number of retry attempts for failed connections.

| Type | Default |
|------|---------|
| integer | `3` |

```toml
[ssh]
retry_attempts = 3
```

---

### ssh.retry_delay

Delay between retry attempts in seconds.

| Type | Default |
|------|---------|
| integer | `5` |

```toml
[ssh]
retry_delay = 5
```

---

### ssh.known_hosts

Path to known_hosts file.

| Type | Default |
|------|---------|
| string | `~/.ssh/known_hosts` |

```toml
[ssh]
known_hosts = "~/.ssh/known_hosts"
```

---

### ssh.default_key

Default SSH private key.

| Type | Default |
|------|---------|
| string | `~/.ssh/id_ed25519` |

```toml
[ssh]
default_key = "~/.ssh/id_ed25519"
```

---

## Logging Settings

### logging.level

Logging verbosity level.

| Type | Default | Values |
|------|---------|--------|
| string | `INFO` | `DEBUG`, `INFO`, `WARNING`, `ERROR` |

```toml
[logging]
level = "INFO"
```

---

### logging.file

Log file path.

| Type | Default |
|------|---------|
| string | `~/.config/merlya/merlya.log` |

```toml
[logging]
file = "~/.config/merlya/merlya.log"
```

---

### logging.max_size

Maximum log file size in MB before rotation.

| Type | Default |
|------|---------|
| integer | `10` |

```toml
[logging]
max_size = 10
```

---

## Hosts Configuration

Define hosts in `~/.config/merlya/hosts.toml`:

```toml
# Individual host
[hosts.web-01]
hostname = "web-01.example.com"
user = "deploy"
port = 22
key = "~/.ssh/deploy_key"

# Host with jump host
[hosts.internal-db]
hostname = "10.0.1.50"
user = "dbadmin"
jump_host = "bastion.example.com"

# Host group
[groups.web-tier]
hosts = ["web-01", "web-02", "web-03"]
description = "Web server tier"

[groups.databases]
hosts = ["db-master", "db-replica-01"]
description = "Database tier"
```

### Host Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `hostname` | string | Yes | Server hostname or IP |
| `user` | string | No | SSH username |
| `port` | integer | No | SSH port (default: 22) |
| `key` | string | No | SSH private key path |
| `jump_host` | string | No | Jump/bastion host name |
| `tags` | array | No | Tags for filtering |

---

## Complete Example

```toml
# ~/.config/merlya/config.toml

[llm]
provider = "openai"
model = "gpt-4o-mini"
temperature = 0.7
max_tokens = 4096

[ssh]
timeout = 30
max_connections = 10
retry_attempts = 3
retry_delay = 5
default_key = "~/.ssh/id_ed25519"

[logging]
level = "INFO"
file = "~/.config/merlya/merlya.log"
max_size = 10
```
