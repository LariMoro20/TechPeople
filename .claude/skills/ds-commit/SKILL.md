---
name: ds-commit
description: Creates a commit following the project convention
disable-model-invocation: true
allowed-tools: Bash(git *)
---

# Project Commit

Creates a commit following the project convention.

## Format

```
[branch-name] type: short description of the change in a single line
```

## Rules

1. Detect the current branch with `git branch --show-current`
2. Use the branch name as scope between square brackets
3. Include a conventional commit type after the branch (e.g. `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `perf`), followed by `:`
4. Short description in a single line, in Portuguese
5. NEVER add "Co-Authored-By" or any mention of Claude/AI
6. NEVER add body or footer to the commit, only the single line
7. **One topic per commit**: if the working tree contains changes that belong to more than one logical task, split into multiple commits — one per task — instead of bundling everything together

## Splitting changes into multiple commits

Before staging anything, group the modified/untracked files by **logical task**. A task is a single, self-contained intent (e.g. "fix sticky footer", "swap logo", "add admin page").

Signals that the diff covers more than one task:

- Changes touch unrelated parts of the codebase (e.g. a layout fix + a new feature + a dependency bump)
- More than one conventional type fits the change set (e.g. some files are `fix`, others are `feat`)
- The single-line description would need an "and" / "e" / comma to cover everything (e.g. "atualiza logo e corrige footer")
- A reviewer would naturally want to revert one part without the other

When splitting, for each task:

1. `git add` only the files that belong to that task (use specific paths — never `git add .` or `git add -A`)
2. Run `git diff --staged` to confirm the staged set is exactly that task and nothing else
3. Create the commit using the standard format
4. Repeat for the next task

Stage and commit tasks in an order that keeps the tree compilable at each step (e.g. dependency bumps before code that uses them).

## Steps

1. Run `git branch --show-current` to get the branch name
2. Run `git status` and `git diff` to see all changes
3. Group the changes by logical task (see section above). If there is only one task, proceed; if there are multiple, plan one commit per task
4. For each task:
   - `git add` only the files belonging to that task (never sensitive files like .env, never `.claude/settings.local.json`)
   - `git diff --staged` to verify the staged set
   - Create the commit:

   ```bash
   git commit -m "[current-branch] type: objective description of the change"
   ```

## Examples

If the branch is `feature/login`:
```
[feature/login] fix: Corrige validação de token no interceptor
```

If the branch is `main`:
```
[main] feat: Adiciona modal de confirmação ao wizard de regras
```

### Splitting example

Working tree has: `app/components/SiteNav.vue` (logo swap) + `app/layouts/default.vue` (sticky footer fix) + `package.json` (new dependency for an unrelated feature).

Wrong (bundled):
```
[main] feat: Atualiza logo, corrige footer e adiciona dependencia
```

Right (one commit per task):
```
[main] feat: Troca logo da aplicacao para a nova identidade Datahub
[main] fix: Corrige footer fixo no rodape do layout
[main] chore: Adiciona dependencia X para a feature Y
```
