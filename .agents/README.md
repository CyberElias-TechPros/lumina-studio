# Project-local engineering skills

This directory vendors the 25 skills and shared checklists from [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) at commit `301b02b12bff98e4688e6984af6556802322bbde`. The upstream MIT license and copyright notice are preserved in `LICENSE.agent-skills`.

`skills/<name>/SKILL.md` and `references/` retain the upstream layout, so relative links and each skill's accompanying files resolve locally. Agents that discover `.agents/skills` may load them natively; other agents should follow the instructions in the repository's `AGENTS.md` and read the relevant files directly. No plugin, hooks or slash commands are installed by this copy, and discovery behavior depends on the agent host.

## Working in this project

Start with `skills/using-agent-skills/SKILL.md` to select appropriate workflows. For implementation, consult `skills/incremental-implementation/SKILL.md` and add topic-specific skills as appropriate. Apply the guidance proportionately: higher-priority instructions, the user's current request, safety rules and this project's existing conventions take precedence. In particular, don't automatically commit, push, merge, deploy, alter production data, install dependencies or run scripts merely because an upstream workflow suggests it. Inspect scripts and commands first and follow the permissions and review gates for the task.

## Maintenance

The snapshot is intentionally pinned: it does not update itself or require network access. To update, review a newer upstream commit and its license and changes, replace only `skills/`, `references/` and `LICENSE.agent-skills` with the reviewed versions, update the commit above, and run `npm run test:agent-skills`. Check that the project's instruction precedence and existing protections still hold. Do not blindly install upstream hooks or overwrite this project's `AGENTS.md`.
