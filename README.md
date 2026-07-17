# devmind

AI persistent memory layer for your codebase. Gives AI assistants long-term context about your project — what's built, what's planned, and how things connect.

## Installation

```bash
npm install -g devmind
```

## Quick Start

```bash
# Initialize memory for your project
cd your-project
devmind init

# Scan your codebase (embeds files for context)
devmind scan

# Ask AI questions with full project context
devmind ask "How does authentication work?"

# Check if something already exists before building
devmind check "user login endpoint"

# Find duplicate code
devmind duplicates

# View project intelligence
devmind status

# See past queries
devmind history
```

## Configuration

Create a `.env` file in your project root:

### Option 1: NVIDIA (free, no install needed)

```env
AI_PROVIDER=nvidia
AI_API_KEY=nvapi-...
AI_MODEL=meta/llama-3.3-70b-instruct
```

Get a free API key at [build.nvidia.com](https://build.nvidia.com/).

### Option 2: OpenAI

```env
AI_PROVIDER=openai
AI_API_KEY=sk-...
AI_MODEL=gpt-4o
```

### Option 3: Anthropic

```env
AI_PROVIDER=anthropic
AI_API_KEY=sk-ant-...
AI_MODEL=claude-sonnet-4-20250514
```

### Option 4: Local Ollama (default)

```env
AI_PROVIDER=ollama
AI_MODEL=llama3.2
OLLAMA_URL=http://localhost:11434
```

Requires [Ollama](https://ollama.com) installed locally.

## Commands

| Command | Description |
|---------|-------------|
| `devmind init` | Initialize devmind memory in current project |
| `devmind scan` | Scan and embed project files into memory |
| `devmind ask <prompt>` | Ask AI with full project context injected |
| `devmind check <prompt>` | Check if a feature already exists in codebase |
| `devmind duplicates` | Find duplicate files |
| `devmind status` | Show files, tasks, duplicates, and token savings |
| `devmind history` | Show past prompts and AI responses |

## How it works

1. **Scan** reads your project files and generates embeddings (via local ONNX model)
2. **Memory** stores file summaries, embeddings, tasks, and decisions in SQLite
3. **Ask** builds context from memory, finds related files, and sends it to your AI provider
4. **Context injection** tells the AI what already exists so it avoids rebuilding or duplicating work

## License

MIT
