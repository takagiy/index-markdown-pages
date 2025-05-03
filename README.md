# Index markdown pages

An action to collect the markdown files in the repository and create an index

# Usage

```yaml
- use: takagiy/index-markdown-pages@v0
  with:
    # Glob patterns (separated by newlines) matching the root documents.
    # The indexes will be written to that documents.
    root-patterns: README.md
    # Header to be added to the index
    header: '## Index'
```
