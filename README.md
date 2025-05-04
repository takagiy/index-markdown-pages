# Index markdown pages

An action to collect the markdown files in the repository and create an index

# Example

See example output on [example/](https://github.com/takagiy/index-markdown-pages/tree/main/example).

```yaml
jobs:
  test:
    name: "Create markdown index"
    runs-on: ubuntu-latest
    permissions:
      # This is required to push the changes to GitHub.
      contents: write
    steps:
      - uses: actions/checkout@v4
      - use: takagiy/index-markdown-pages@v2
        with:
          root-patterns: README.md
          header: '## Index'
```

# API

```yaml
- use: takagiy/index-markdown-pages@v2
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
    # Whether to automatically commit the changes.
    # (default: true)
    commit: true
    # Branch to commit the changes to.
    # (default: ${{ github.event.pull_request.ref || github.event.push.ref || github.ref }})
    commit-on: ${{ github.event.pull_request.ref || github.event.push.ref || github.ref }}
    # Commit message.
    # (default: 'docs: Update index')
    commit-message: 'docs: Update index'
    # Whether to automatically push the changes to the remote repository.
    # (default: true)
    push: true
```
