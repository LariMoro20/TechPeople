---
name: review-branch
description: Reviews the current branch checking quality and security before merge
---

# Review Branch

Reviews the current branch before merge, checking quality and security following the project rules.

## Review Checklist

### 1. Security

- [ ] No `console.log` in code
- [ ] No PII exposed in error messages
- [ ] Cookies with `secure` flag when required
- [ ] No hardcoded credentials or tokens
- [ ] No `.env` files committed
- [ ] Generic error messages for the user
- [ ] Timeout configured on API calls

### 2. Code Quality

- [ ] No commented/dead code
- [ ] No unused imports
- [ ] No unused variables
- [ ] Naming following standards (snake_case state, camelCase functions, PascalCase components)
- [ ] UI texts in Portuguese

### 3. Project Standards

- [ ] Composables returning `{ data, success, status, message }`
- [ ] Stores using LocalStorage correctly
- [ ] Components with `<template>` → `<script setup>` → `<style scoped>`
- [ ] Routes with lazy loading
- [ ] Aliases used correctly (@Rules, @Assets, @Utils)

### 4. SOLID / Clean Code

- [ ] **Components** with single responsibility (~200 lines max; split if larger)
- [ ] No **business rule in `<script setup>`** — delegated to composable
- [ ] No **logic in the template** — ternaries/filters in `computed`
- [ ] **Thin pages**: only orchestrate, do not call API directly
- [ ] **Stores do not call API** — they use composables
- [ ] **Composables per cohesive domain** (one composable ≠ multiple domains)
- [ ] Functions with **single responsibility** (no `saveAndNotifyAndRedirect`)
- [ ] **Specific props** (not generic `config: Object`); emits declared

### 5. Vue 3 Performance

- [ ] Stable `:key` in `v-for` (id, not index when list is mutable)
- [ ] `v-show` vs `v-if` appropriate to the case (frequent toggle → `v-show`)
- [ ] `defineModel` in components with v-model (Vue 3.4+)
- [ ] `defineAsyncComponent` in heavy/rare components
- [ ] No `watch` with `deep: true` on large objects
- [ ] `storeToRefs` when consuming Pinia state in the component

## Steps

1. Run `git diff main...HEAD` to see all branch changes
2. Run `pnpm lint` to check lint
3. Search for `console.log` in changed files
4. Search for hardcoded tokens, passwords or PII
5. Check if imports and variables are being used
6. Check naming standards
7. Check SOLID/Clean Code:
   - Components with reasonable size (~200 lines)
   - Thin pages, no direct API logic
   - Stores consuming composables (not axios directly)
8. Check Vue 3 Performance:
   - `:key` in `v-for`
   - `watch` with `deep: true` on large objects
9. Generate report with:
   - Issues found (by severity: high, medium, low)
   - Improvement suggestions
   - Overall status: approved / rejected
