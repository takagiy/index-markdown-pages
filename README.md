# Index markdown pages

An action to collect the markdown files in the repository and create an index

# Usage

```yaml
- use: takagiy/index-markdown-pages@v1
  with:
    # Glob patterns (separated by newlines) matching the root documents.
    # The indexes will be written to that documents.
    # (default: README.md)
    root-patterns: README.md
    # Glob patterns (separated by newlines) matching the documents to be excluded from the index.
    # (default: '')
    exclude-patterns: |
        dist/**/*
        public/**/*
    # Header to be added to the index.
    # (default: '## Index')
    header: '## Index'
```

# Example

```yaml
jobs:
  test:
    name: "Create markdown index"
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.ref }}
      - use: takagiy/index-markdown-pages@v1
        with:
          root-patterns: README.md
          header: '## Index'
      - name: Create commit
        run: |
          git add -N .
          if ! git diff --exit-code --quiet
          then
            git config user.email "action@github.com"
            git config user.name "GitHub Action"
            git add .
            git commit -m "docs: Update index"
            git push
          fi
```
