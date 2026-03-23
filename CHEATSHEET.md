# Claude Code Cheat Sheet

## Starting Up

### Step 1 — Open Terminal
- **Mac:** `Cmd + Space` → type "Terminal" → Enter

### Step 2 — Start the dev server (Tab 1)
```bash
cd /Users/ssutanto/AI-prototype
npm run dev
```
Starts React frontend at **http://localhost:5173** and Express API at **http://localhost:3001**.

### Step 3 — Open a second tab (`Cmd + T`)

### Step 4 — Launch Claude Code (Tab 2)
```bash
cd /Users/ssutanto/AI-prototype
claude
```

### Step 5 — Open the app
```
http://localhost:5173
```

---

## Quick Reference

| What | Command |
|---|---|
| Start everything | `npm run dev` |
| Launch Claude Code | `claude` |
| Check git status | `git status` |
| Push current branch | `git push` |
| List open PRs | `gh pr list` |
| Merge PR (squash) | `gh pr merge --squash --delete-branch` |

---

## Tips

- **Figma MCP** — open the Figma desktop app *before* starting Claude Code so the MCP server at `http://127.0.0.1:3845/mcp` is available
- **Two terminals** — keep Tab 1 running `npm run dev` at all times; use Tab 2 for Claude Code
- **gh CLI not found in Claude's shell** — if Claude can't run `gh`, run the command yourself in your terminal with `! gh ...`
- **Git push** — Claude can commit but may not have GitHub credentials; run `git push` yourself if it fails
