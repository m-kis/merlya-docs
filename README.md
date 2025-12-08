# Merlya Documentation

Documentation site for [Merlya](https://github.com/m-kis/merlya) - AI-powered infrastructure assistant.

## Live Site

Visit the documentation at: **https://m-kis.github.io/merlya-docs**

## Local Development

### Prerequisites

- Python 3.11+
- pip

### Setup

```bash
# Clone the repository
git clone https://github.com/m-kis/merlya-docs.git
cd merlya-docs

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

### Run Locally

```bash
mkdocs serve
```

Open http://localhost:8000 in your browser.

### Build

```bash
mkdocs build
```

The static site will be generated in the `site/` directory.

## Project Structure

```
merlya-docs/
├── docs/                    # Documentation source
│   ├── index.md            # Home page
│   ├── getting-started/    # Getting started guides
│   ├── guides/             # How-to guides
│   ├── reference/          # Reference documentation
│   └── architecture/       # Architecture decisions
├── .github/workflows/      # GitHub Actions
│   └── docs.yml           # Build & deploy workflow
├── mkdocs.yml             # MkDocs configuration
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## Contributing

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Writing Guidelines

- Use clear, concise language
- Include code examples where helpful
- Follow the existing structure
- Test locally before submitting

## Deployment

Documentation is automatically deployed to GitHub Pages when changes are pushed to `main`.

## License

This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

The Merlya software is licensed under MIT + Commons Clause.
