# Pull request sizing and split plan

## What happened with PR #2

PR #2 (`Arena/01a04c53 lumina studio`) was merged as commit
`ccc206bb19ad28d57e2e16ecaa018c6a86cf5e3c`. Its review base was
`0d27b2984b6d718bd8197159269ec96683ee6329`, and the final feature head was
`5d850783d9e7655c760f4193ff4d14d3345b9ffd`.

The measured change was:

- **263 files** in GitHub's changed-file view.
- **261 files** selected by CodeRabbit because it ignores the two lockfiles.
- **150 files** is the CodeRabbit review limit, so the selected set was **111
  files over the limit**.

Because the PR is already merged, it cannot be made smaller by amending,
rebasing, or reopening it. Rewriting that published history would also break
the Lovable-connected history. The safe fix is to keep the merge intact, split
future cross-cutting work before opening the PR, and fail early when a new PR
gets too large.

## The clean two-PR split

The old change already has a natural boundary at the backend/frontend seam.
Using the original base and head above produces two reviewable slices:

| Slice                                    | File selection                  | GitHub files | CodeRabbit files* | Review order |
| ---------------------------------------- | ------------------------------- | -----------: | ----------------: | -----------: |
| API and data workflows                   | `backend/**`                    |          128 |               127 |            1 |
| Web application and integration coverage | everything outside `backend/**` |          135 |               134 |            2 |
| **Total**                                |                                 |      **263** |           **261** |              |

\*The CodeRabbit count excludes the relevant lockfile. The repository config
also excludes generated route, sitemap, Wrangler type, and generated domain
seed output, while keeping their source generators and migrations reviewable.
Those filters reduce review noise but are not a workaround for the 150-file
limit; the historical change still needs the two-PR split.

### Slice 1: API and data workflows

Suggested title: **`feat(api): complete platform workflows and durable actions`**

Include all of `backend/**`, including:

- migrations and schema changes;
- route handlers, authentication, authorization, and shared backend helpers;
- seed changes and seed tooling;
- backend tests; and
- backend package and Wrangler configuration.

This is 128 files, so it remains below the hard limit while keeping each
backend behavior change with its migration and test coverage.

### Slice 2: Web application and integration coverage

Suggested title: **`feat(web): wire portal workflows and integration coverage`**

Include the non-backend files:

- `src/**` UI, API clients, query hooks, and route definitions;
- `e2e/**` browser coverage;
- sitemap/content audit tooling and public runtime assets; and
- root build, lint, and package configuration.

This is 135 files, also below the hard limit. Build this slice against Slice 1
(or make it a stacked PR targeting Slice 1), then retarget it to `main` after
Slice 1 merges. That keeps frontend flows and E2E tests aligned with the API
contract without hiding tests to meet the file limit.

## Reproducing the counts

These commands inspect the historical PR without changing any branch:

```sh
BASE=0d27b2984b6d718bd8197159269ec96683ee6329
HEAD=5d850783d9e7655c760f4193ff4d14d3345b9ffd

git diff --name-only "$BASE...$HEAD" -- backend/ | wc -l
# 128

git diff --name-only "$BASE...$HEAD" -- . ':(exclude)backend/**' | wc -l
# 135
```

To preview the hard gate locally for any branch, pass its base and head:

```sh
npm run check:pr-size -- "$BASE" "$HEAD"
```

The historical command is expected to fail at 263 files; that confirms the
check is enforcing the CodeRabbit/GitHub limit rather than silently ignoring
part of the change.

## Guardrails now in the repository

- `scripts/check-pr-size.mjs` counts the same three-dot PR diff and fails over
  150 files. It warns above 140 to leave room for follow-up fixes.
- `.coderabbit.yaml` removes lockfiles and generated output from review noise
  and adds focused guidance for migrations, routes, and authentication.
- The check is ready to wire into CI once the repository connection has
  `workflows` write permission; this PR deliberately does not modify the
  workflow file because the current GitHub App token cannot push workflow
  changes.

For future initiatives, use the backend/frontend split above as the default
starting point, then split a slice further by product area if it approaches
140 files. Do not split by deleting tests or migration files from the review;
keep each behavior, its data change, and its verification together.
