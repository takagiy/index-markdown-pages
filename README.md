# Index markdown pages

An action to collect the markdown files in the repository and create an index

# Usage

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
      - use: takagiy/index-markdown-pages@v0
        with:
          # Glob patterns (separated by newlines) matching the root documents.
          # The indexes will be written to that documents.
          root-patterns: README.md
          # Header to be added to the index
          header: '## Index'
      - name: Create commit
        run: |
          git add -N .
          if ! git diff --exit-code --quiet
          then
            git config user.email "action@github.com"
            git config user.name "GitHub Action"
            git add .
            git commit -m "Update"
            git push
          fi
```
