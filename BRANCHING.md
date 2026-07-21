# Branching workflow

## Versioning procedure

When starting a new period of work (a few days to a few weeks):

1. Create **one** new branch off `main`, named `suedeN` — a plain incrementing number, no other suffix (`suede11`, `suede12`, `suede13`, ...). Continue the count from the last number used; don't restart at 1.
2. Do **all** work for that period on this same branch. Don't create a new branch per task or per fix within the period.
3. Open PRs from that branch **against `deploy`** — always `deploy`, never `main`.
4. Once the period's work is finished and merged into `deploy`, **delete the `suedeN` branch** (local and remote).

## Merge responsibilities

- PRs get merged into `deploy` by whoever is doing the work.
- Promoting `deploy` → `main` is Sam's job. Not the assistant's, not the branch author's — don't open a PR targeting `main`.

## Notes

- If a PR's branch has already been merged, pushing more commits to it does nothing useful — GitHub won't reopen a merged PR, and the push can silently recreate a disconnected branch (watch for `git push` reporting `[new branch]` for a name that should already exist). Branch fresh off current `deploy`, reapply the change, push, open a new PR.
