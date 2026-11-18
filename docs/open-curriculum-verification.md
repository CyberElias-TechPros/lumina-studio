# Open-Source Curriculum Verification — GitHub Licence Snapshot

**Verified:** 2026-11-16 via `gh api repos/<owner>/<repo>` (licence, stars, archived, default branch) and the `/license` endpoint for NOASSERTION cases (licence file contents confirmed).
**Reviewed by:** Cyber Elias Academy (CEA) — catalogue at `/open-curriculum`, data at `src/data/open-curriculum.ts`.
**Why this file exists:** CEA adapts, links or teaches-around open material depending on its licence. This is the evidence for every decision in the catalogue. If a repo's licence changes, the catalogue must change with it.

## Decision key

| Licence found | CEA treatment |
|---|---|
| MIT, BSD-3, Apache-2.0, CC0 | **Adapt in-app with attribution** (e.g. /ai-engineering); or link and teach |
| CC-BY | Link + teach; adapt with attribution. CC-BY-SA treated as link-only in practice |
| CC-BY-NC-SA | **Link only** — never copied or re-hosted |
| GPL-3.0 | **Link only** — copyleft; no CEA redistribution |
| BUSL / proprietary / all-rights-reserved | **Link only** — not open source |
| No licence file | **Link only** — all rights reserved by default |
| NOASSERTION | Read the licence file (notes below); default link-only unless clearly permissive |

## Repository snapshot (40 repos, sorted by stars)

| Repository | Licence | Stars | Archived | Branch |
|---|---|---:|---|---|
| `freeCodeCamp/freeCodeCamp` | BSD-3-Clause | 459,215 | false | main |
| `EbookFoundation/free-programming-books` | CC-BY-4.0 | 401,696 | false | main |
| `donnemartin/system-design-primer` | NOASSERTION | 378,091 | false | master |
| `nilbuild/developer-roadmap` | NOASSERTION | 372,167 | false | master |
| `vinta/awesome-python` | NOASSERTION | 335,211 | false | master |
| `practical-tutorials/project-based-learning` | MIT | 289,853 | false | master |
| `TheAlgorithms/Python` | MIT | 226,172 | false | master |
| `ossu/computer-science` | MIT | 211,172 | false | master |
| `kubernetes/kubernetes` | Apache-2.0 | 129,110 | false | master |
| `react/react-native` | MIT | 126,937 | false | main |
| `microsoft/Web-Dev-For-Beginners` | MIT | 97,119 | false | main |
| `microsoft/ML-For-Beginners` | MIT | 92,251 | false | main |
| `dair-ai/Prompt-Engineering-Guide` | MIT | 80,126 | false | main |
| `Asabeneh/30-Days-Of-Python` | NO-LICENSE-FILE | 78,933 | false | master |
| `openai/openai-cookbook` | MIT | 77,193 | false | main |
| `moby/moby` | Apache-2.0 | 72,270 | false | master |
| `microsoft/AI-For-Beginners` | MIT | 70,921 | false | main |
| `anthropics/claude-cookbooks` | MIT | 54,764 | false | main |
| `hashicorp/terraform` | NOASSERTION | 50,254 | false | main |
| `karan/Projects` | MIT | 48,100 | false | master |
| `Asabeneh/30-Days-Of-JavaScript` | NO-LICENSE-FILE | 47,004 | false | master |
| `DataTalksClub/data-engineering-zoomcamp` | NO-LICENSE-FILE | 46,928 | false | main |
| `microsoft/Data-Science-For-Beginners` | MIT | 38,078 | false | main |
| `TheAlgorithms/JavaScript` | GPL-3.0 | 34,273 | false | master |
| `fastai/fastbook` | NOASSERTION | 25,488 | false | master |
| `ossu/data-science` | NOASSERTION | 22,423 | false | master |
| `flutter/samples` | NOASSERTION | 19,294 | false | main |
| `DataTalksClub/mlops-zoomcamp` | NO-LICENSE-FILE | 15,567 | false | main |
| `DataTalksClub/machine-learning-zoomcamp` | NO-LICENSE-FILE | 14,978 | false | main |
| `ageron/handson-ml3` | Apache-2.0 | 14,496 | false | main |
| `TheOdinProject/curriculum` | NOASSERTION | 13,247 | false | main |
| `skills/introduction-to-github` | MIT | 10,872 | false | main |
| `DataTalksClub/llm-zoomcamp` | NO-LICENSE-FILE | 7,683 | false | main |
| `agmmnn/awesome-blender` | CC0-1.0 | 7,663 | false | master |
| `microsoft/Security-101` | CC0-1.0 | 7,055 | false | main |
| `fullstack-hy2020/fullstack-hy2020.github.io` | NOASSERTION | 2,251 | false | source |
| `microsoft/powerbi-desktop-samples` | MIT | 2,243 | false | main |
| `labex-labs/linuxjourney` | NO-LICENSE-FILE | 1,544 | false | master |
| `igalhub/devops-study-hub` | MIT | 1 | false | master |
| `inaki/product-design` | MIT | 0 | false | main |

## NOASSERTION and special cases (licence files read directly)

- `TheOdinProject/curriculum` → CC BY-NC-SA 4.0 (licence file confirmed). NonCommercial — link-only.
- `fullstack-hy2020/fullstack-hy2020.github.io` → CC BY-NC-SA 3.0 (licence file). NonCommercial — link-only.
- `ossu/data-science` → CC BY-SA 4.0 (licence file). Share-alike — link-only in practice.
- `fastai/fastbook` → Split licence: code GPL-3.0, prose all-rights-reserved. Link-only.
- `flutter/samples` → BSD-3-Chromium per licence file. Permissive code samples — link-only anyway (samples are not a course).
- `vinta/awesome-python` → CC BY 4.0 (licence file). The list is CC-BY; indexed projects keep their own licences. Link-only directory.
- `donnemartin/system-design-primer` → Custom licence on a personal project; reuse rights not clearly granted. Link-only.
- `hashicorp/terraform` → BUSL-1.1 (not open source). Link-only; IaC taught via OpenTofu concepts.
- `nilbuild/developer-roadmap` → All rights reserved; content and images may not be republished. Link-only as an admissions-desk guide.
- `facebook/react-native` → redirects (301) to `react/react-native` → MIT; React Native used as a code reference only.
- `skills/introduction-to-github`, `skills/communicate-using-markdown` → MIT (GitHub Skills). Link-only by design — the courses run on github.com.

## Repositories that returned 404 (excluded from the catalogue)

- `awesome-design/awesome-design`
- `oscaarflores/awesome-javascript-frameworks`
- `nicagonzalez/prompt-engineering-guide` — superseded by `dair-ai/Prompt-Engineering-Guide` (MIT), which the catalogue uses instead
- `swallowsedge/react-dev-handbook`

## Non-GitHub free sources in the catalogue (link-only)

- HubSpot Academy — free certifications, content © HubSpot; `academy.hubspot.com`.
- Google Digital Garage — free certifications, content © Google; `learndigital.withgoogle.com`.
- Full Stack Open — hosted by the University of Helsinki (`fullstackopen.com`); course text CC BY-NC-SA 3.0.
- Linux Journey — hosted by LabEx (`linuxjourney.com`); no licence granted.

## Re-verification cadence

Badges in `/open-curriculum` are re-checked before any course built on an open source ships; `CURRICULUM_REVIEWED` in `src/data/open-curriculum.ts` and this file move together.
