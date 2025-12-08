# Merlya Documentation + RAG - Planning

## 1. Analyse de l'Architecture

### Architecture Cible

```
┌─────────────────────────────────────────────────────────────────┐
│                        UTILISATEUR                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SITE DOCUMENTATION                            │
│                    (MkDocs + Material)                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Pages Docs  │  │ Search Bar  │  │ Chat Widget (JS)        │  │
│  │ (Markdown)  │  │ (lunr.js)   │  │ → POST /api/ask         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API BACKEND                                 │
│                    (FastAPI + Uvicorn)                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ POST /api/ask                                                ││
│  │ - Reçoit la question                                         ││
│  │ - Cherche dans l'index vectoriel                             ││
│  │ - Génère une réponse avec contexte                           ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RAG ENGINE                                  │
│  ┌──────────────────┐    ┌──────────────────────────────────┐   │
│  │ Vector Store     │    │ LLM (Ollama / llama.cpp)         │   │
│  │ (ChromaDB/FAISS) │    │ - qwen2.5 / mistral-nemo         │   │
│  │                  │    │ - llama-3.2                       │   │
│  └──────────────────┘    └──────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Embeddings Model                                          │   │
│  │ - bge-small-en-v1.5 (384 dims, fast)                      │   │
│  │ - nomic-embed-text (768 dims, better quality)             │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Composants

| Composant | Technologie | Rôle |
|-----------|-------------|------|
| Site docs | MkDocs + Material | Documentation statique, hébergée sur GitHub Pages |
| Chat widget | JavaScript vanilla | Interface utilisateur pour poser des questions |
| API Backend | FastAPI | Endpoint `/api/ask` pour les requêtes RAG |
| Vector Store | ChromaDB | Stockage des embeddings, recherche sémantique |
| Embeddings | sentence-transformers | Conversion texte → vecteurs |
| LLM | Ollama (qwen2.5) | Génération des réponses |

## 2. Stack Technique Recommandée

### Option A: Full Local (Self-hosted)
```
- MkDocs + Material → GitHub Pages
- FastAPI + ChromaDB + sentence-transformers → VPS/Docker
- Ollama avec qwen2.5-7b → VPS avec GPU ou CPU (lent)
```
**Avantages**: 100% gratuit, données privées
**Inconvénients**: Nécessite un serveur, latence si CPU only

### Option B: Hybride (Recommandé pour démarrer)
```
- MkDocs + Material → GitHub Pages
- FastAPI + ChromaDB → Fly.io / Railway (gratuit tier)
- Embeddings: sentence-transformers local dans le workflow
- LLM: OpenAI/Anthropic API (fallback) ou Ollama local
```
**Avantages**: Déploiement simple, performance garantie
**Inconvénients**: Coût API si beaucoup de requêtes

### Option C: Serverless
```
- MkDocs → GitHub Pages
- API: Cloudflare Workers + Vectorize
- LLM: Workers AI (gratuit 10k req/jour)
```
**Avantages**: Scalable, gratuit pour usage modéré
**Inconvénients**: Vendor lock-in Cloudflare

## 3. Structure du Projet

```
merlya-docs/
├── .github/
│   └── workflows/
│       ├── docs.yml           # Build & deploy MkDocs
│       └── embeddings.yml     # Update vector index
├── docs/                      # Documentation source (Markdown)
│   ├── index.md
│   ├── getting-started/
│   │   ├── installation.md
│   │   ├── quickstart.md
│   │   └── configuration.md
│   ├── guides/
│   │   ├── ssh-management.md
│   │   ├── llm-providers.md
│   │   └── automation.md
│   ├── reference/
│   │   ├── cli.md
│   │   ├── api.md
│   │   └── configuration.md
│   ├── architecture/
│   │   └── decisions.md
│   └── assets/
│       ├── stylesheets/
│       └── javascripts/
│           └── chat-widget.js  # Widget RAG
├── rag/                       # RAG Backend
│   ├── api/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI app
│   │   └── routes.py          # /api/ask endpoint
│   ├── core/
│   │   ├── __init__.py
│   │   ├── embeddings.py      # Embedding generation
│   │   ├── retriever.py       # Vector search
│   │   └── generator.py       # LLM response
│   ├── scripts/
│   │   └── index_docs.py      # Script to index docs
│   └── data/
│       └── chroma/            # Vector DB storage
├── mkdocs.yml                 # MkDocs configuration
├── pyproject.toml             # Python dependencies
├── Dockerfile                 # RAG server container
├── docker-compose.yml         # Local development
└── README.md
```

## 4. Planning de Développement

### Phase 1: Documentation MkDocs (Jour 1)
- [ ] Initialiser le projet MkDocs
- [ ] Configurer le thème Material
- [ ] Migrer/créer la documentation depuis merlya
- [ ] Configurer GitHub Actions pour déploiement
- [ ] Tester le déploiement sur GitHub Pages

### Phase 2: RAG Backend (Jour 2-3)
- [ ] Créer l'API FastAPI
- [ ] Intégrer ChromaDB pour le vector store
- [ ] Implémenter le pipeline d'embedding
- [ ] Créer le script d'indexation des docs
- [ ] Ajouter le support Ollama/OpenAI

### Phase 3: Intégration (Jour 4)
- [ ] Créer le widget JavaScript pour MkDocs
- [ ] Configurer CORS et sécurité
- [ ] Workflow GitHub Actions pour embeddings
- [ ] Tests end-to-end

### Phase 4: Déploiement (Jour 5)
- [ ] Dockeriser le RAG server
- [ ] Déployer sur Fly.io/Railway
- [ ] Configurer le domaine
- [ ] Monitoring et logs

## 5. GitHub Actions Workflows

### Workflow 1: Build & Deploy Docs
```yaml
# Triggers: push to main (docs changes)
# Actions:
#   1. Build MkDocs site
#   2. Deploy to GitHub Pages
```

### Workflow 2: Update Embeddings
```yaml
# Triggers: push to main (docs changes) OR manual
# Actions:
#   1. Checkout docs
#   2. Parse all markdown files
#   3. Generate embeddings (sentence-transformers)
#   4. Update ChromaDB index
#   5. Upload index artifact OR push to RAG server
```

## 6. Dépendances

### Documentation
```
mkdocs>=1.6
mkdocs-material>=9.5
mkdocs-minify-plugin>=0.8
```

### RAG Backend
```
fastapi>=0.115
uvicorn>=0.32
chromadb>=0.5
sentence-transformers>=3.3
langchain>=0.3  # Optional, for LLM abstraction
ollama>=0.4     # For local LLM
httpx>=0.28     # Async HTTP client
```

## 7. Estimation des Coûts

| Service | Gratuit | Payant |
|---------|---------|--------|
| GitHub Pages | Illimité | - |
| Fly.io | 3 VMs shared, 3GB storage | $0.01/h après |
| Railway | 500h/mois, 1GB RAM | $5/mois+ |
| OpenAI API | - | ~$0.002/1K tokens |
| Cloudflare Workers | 100k req/jour | $5/mois illimité |

## 8. Décisions Techniques

### Pourquoi ChromaDB ?
- Simple, embarqué (pas de serveur séparé)
- Persistance fichier facile
- API Python native
- Gratuit et open source

### Pourquoi sentence-transformers ?
- Modèles optimisés pour le français/anglais
- Fonctionne offline
- Léger (< 500MB)
- Qualité comparable aux APIs payantes

### Pourquoi Ollama ?
- Installation simple
- API compatible OpenAI
- Modèles quantifiés (peu de RAM)
- Gratuit

## 9. Prochaines Actions

1. **Créer la structure du projet** dans `/Users/cedric/merlya-docs`
2. **Configurer MkDocs** avec le thème Material
3. **Créer le workflow docs.yml** pour GitHub Pages
4. **Développer le RAG backend** en FastAPI
5. **Créer le workflow embeddings.yml**
6. **Intégrer le chat widget** dans MkDocs

---

Prêt à démarrer ? On commence par la Phase 1 !
