# Human-Teaching Voice Audit — Pass 1 (site-wide)

Date: 2026-09-23 · Scope: every educational collection on the site · Method: the two-pass operation (this document is the audit; reconstruction follows in `blog.ts` and tracked in the queue below)

The question this audit answers: **does each page sound like a patient human teacher sitting beside a beginner, or like polished machine prose?** Everything was measured and read against the master standard: quiet conversational teaching voice, immersive narrative scenarios, simple English with full depth, "see it → understand it → do it → remember it", explanations of *why*, beginner misconceptions taught before they happen, and AdSense high-value usefulness (the page must still be worth reading with every ad removed).

---

## 1. What was scanned

| Collection | Size | Where |
|---|---|---|
| **Computer skills from scratch** notes | 210 lessons / ~182,000 words | `src/data/blog.ts` |
| Academy class lectures | 51 files / ~376,000 words | `src/data/academy/lessons/*.ts` |
| Career guides | 12 guides / ~3,000 words | `src/data/career-guides.ts` |
| Glossary | ~60 terms / ~4,200 words | `src/data/glossary.ts` |
| Learning resources | ~40 items / ~3,700 words | `src/data/resources.ts` |
| Module details | 246 fields / ~7,600 words | `src/data/module-details.ts` |

Quantitative scan (scenario moments, reader questions, misconception contrasts, aphorism patterns, metaphor-lexicon density, triad lists, sentence-length variance) + close reading of the highest-scoring machine-like pages.

---

## 2. The core findings (notes)

The corpus is warm and concrete — but its **teaching method is missing in most lessons**. The prose performs *commentary about* the topic in a continuous literary voice instead of *teaching* it to a person in the room.

| Signal | Result | What a human teacher does |
|---|---|---|
| Lessons with **zero scenario moments** | **167 / 210** | Sits the reader in a recognizable moment ("Blessing finished her assignment at 11pm...") |
| Lessons with **zero misconception contrasts** | **167 / 210** | Says "It looks like X. Actually Y." before the beginner falls in |
| Lessons with **zero reader questions** | **151 / 210** | Asks "So where would you look first?" and lets the reader think |
| Reader questions overall | **0.52 per 1,000 words** | Real teaching runs 2–4 questions a lesson |
| Scenario moments overall | **0.25 per lesson** | A practical lesson wants 2–4 |

### Named machine-patterns (the "AI print speech" fingerprint)

1. **The aphorism factory.** Nearly every idea is dressed as a miniature proverb: *"Delete is a cupboard, not a fire." "The clipboard is a small tray." "A shortcut is a signpost."* One such line is charming. Line after line, every lesson, is a mannerism — and it reads as literature-performing, not teaching. The register never simply says: *"When you press Delete, Windows moves the file to the Recycle Bin. It is still on the disk. Let us look at it."*
2. **The house-metaphor lexicon on repeat.** *the plate, the cupboard, the compound, the gate, the shelf, the bench, the counter, the drawer, the notebook, the lantern, the quiet hour*… these carry 20–28 hits per thousand words in the worst pages. The imagery is good material — it is simply rationed at none. It becomes wallpaper, and wallpaper is what makes the whole series feel written by one very polished machine.
3. **Triad lists everywhere.** *"copper, silicon, glass, and steel" / "letters, forms, and certificates" / "fear, pity, greed, pride."* Two to four-item noun piles in most paragraphs (up to 21 per lesson). Human speech uses them occasionally; this corpus is built from them.
4. **Uniform lesson skeleton.** Almost every lesson runs: intro paragraphs → figure → aphoristic heading → paragraphs → figure → heading → checklist → one-line close. The master standard warns exactly against this: *"the page should feel like someone is talking the reader through the subject, not like an SEO template filled in."*
5. **No "do it with me now".** Steps are described in pastel prose rather than given as calm live instructions ("Press the Windows key. Type the word print. …"), and there are almost no retrieval moments ("So if the file vanished, where would you look first? … In the Bin. Let us walk there.").
6. **Even rhythm = machine rhythm.** Sentence-length variance (σ) sits at 6–7 in the worst pages — every sentence lands within a narrow band. The best pages in the series (171, 177, 192) break this with questions and plain short steps, and they score *twice* as human.

### What is already good (KEEP — do not destroy)

- Nigerian everyday grounding (naira, NEPA, harmattan, JAMB, POS, market culture) — genuinely excellent and rare.
- Technical honesty (caveats, "when this advice is wrong", refusal to overpromise).
- Slugs, titles, excerpts, dates, figure placement — the SEO/structural layer is sound.
- The quiet, respectful tone toward the beginner's dignity ("Most people who say they cannot use a computer are not stupid") — the heart of the series is right; the *delivery* is what fails.

---

## 3. Tiering (the reconstruction plan for the notes)

Lessons ranked by composite machine-score (aphorism density ×3, metaphor-lexicon ×2, triads, question/scenario/misconception absence, sentence uniformity):

- **Tier A — full body reconstruction (30 lessons, score ≥ 64).** Rebuild the explanation as teaching: scenario moments, reader questions, misconception contrasts, live do-it steps, rationed metaphors, varied rhythm. Includes the worst offenders across every era — `the-recycle-bin-and-i-deleted-it`, `the-ride-that-comes-to-you`, `neighbours-and-your-wifi`, `copy-and-paste-between-programs`, `the-shop-network`, `a-shortcut-is-not-the-file`, `the-downloads-pile`, `how-the-internet-arrives`, `the-road-ahead`, `the-vpn-explained`, `maps-without-getting-lost`, `when-the-network-is-sick`, `captions-pause-and-speed`, `locking-the-phone-and-the-laptop`, `watching-a-video-without-getting-lost`, `a-folder-for-school-or-work`, `paying-for-something-online`, `wi-fi-and-the-cable`, `what-a-qr-code-is-doing`, `do-not-disturb`, `booking-a-flight-online`, `names-on-the-network`, `sharing-on-the-network`, `volume-and-headphones`, `app-permissions`, `start-menu-and-taskbar`, `cc-bcc-and-reply-all`, `sharing-a-file-without-publishing-it`, `undo-and-redo`, `the-second-lock`.
- **Tier B — enrichment pass (~120 lessons).** Keep the prose that works; add the missing teaching moments at natural seams (1–2 scenarios, 1–2 questions, 1 misconception contrast), flatten the heaviest aphorism chains into plain teacher-speech, vary one heading per lesson into a question or step where natural.
- **Tier C — light touch (~60 lessons).** Already close to the standard (e.g. `when-the-screen-stays-dark`, `the-blue-screen-and-the-spinning-circle`, `the-fan-that-screams`, `five-questions-in-order`, `siem-in-ordinary-words`, `mail-merge-you-can-skip`). Small adjustments only; several are models for the rest.

---

## 4. Site-wide findings (beyond the notes)

1. **Academy lectures (~376k words) are drier than the notes** — near-zero scenarios, questions, or misconception contrasts (sample: 1 question across ~8k words). Same medicine applies; lower priority than the notes since learners arrive there with a teacher in the room, but the "See it → Understand it → Do it → Remember it" shape should govern session lectures too. *(Queued after the notes.)*
2. **Repeated explanations across collections.** Chapter 18's repair notes and the Computer Hardware & Repairs lectures teach the same bench knowledge in two voices. Not wrong (different formats), but terminology should be cross-checked so the same concept is never defined two different ways (e.g. "restart order", "the clicking drive").
3. **Terminology drift.** *Wi-Fi / wifi / WLAN*; *flash drive / USB drive / stick*; *laptop / machine / system* used interchangeably. Standardise in favour of the first word a beginner hears at the market, then mention the synonyms once.
4. **Glossary & resources are structurally dry** but appropriate to their formats. Recommendation: each glossary definition gains one concrete scene line ("The Recycle Bin — where deleted files wait… If you emptied it before searching, this is where to look first: …"), no more.
5. **Internal links are absent from note bodies.** Cross-references exist only as prose callbacks ("the lesson on the clicking drive"). The `related-content` block covers discovery; when bodies are next edited, weave 2–4 natural cross-references per lesson (e.g. "the clicking drive we will meet in the workshop chapter"). No link-stuffing.
6. **Heading style is uniformly poetic** (two-beat noun phrases). Keep many — they are part of the identity — but Tier B will convert some to the question or step a reader would actually search ("Where do I look first?").

---

## 5. The reconstruction standard (applied in Pass 2)

Per lesson, after reconstruction:

- [ ] Opens into something a beginner can *be inside* within the first screen: a scenario with a person, a direct question, or a plainly-stated promise — not an aphorism.
- [ ] 2–4 scenario moments with recognizable people and situations (market, office, class, family, the shop counter).
- [ ] 2–4 genuine reader questions, including at least one retrieval moment answered shortly after.
- [ ] 1–2 misconception contrasts ("It looks like… but actually…").
- [ ] At least one calm live walkthrough ("Press the Windows key. Type…") where the lesson has steps.
- [ ] Metaphors rationed (≤ 1 per section; the house lexicon earns its place rather than appearing three times a page).
- [ ] Sentence rhythm varied: plain short sentences mixed with longer explanations; σ above 12 where natural.
- [ ] No banned formula from the master prompt ("In today's digital world", "It's important to note", "In conclusion", "Let's dive in", "In simple terms", "Imagine a world where", "By understanding X you can", stacked "moreover/furthermore/additionally").
- [ ] Every paragraph earns its place: helps the reader understand, remember, decide, or do.
- [ ] Beginner's dignity intact: no "simply", no "obviously", no "as everyone knows".
- [ ] Technical truth preserved exactly; depth preserved; slugs/titles/excerpts/dates/figure sources untouched.
- [ ] Reads aloud like one person talking to one person. Not a performance. Not documentation.

---

## 6. Queue & cadence

| Batch | Content | Status |
|---|---|---|
| Pass 1 | Site-wide audit | **this document** |
| Pass 2 · batch 1 | Tier A rewrites (18 worst lessons, all eras) | **done** |
| Pass 2 · batch 2 | Remaining 12 Tier-A lessons | **done — all 30 Tier-A reconstructed** |
| Pass 2 · batch 3 | Next-worst by re-scan (197, 199, 182, 198, 41, 120, 189, 196, 150, 203) | **done — named people in every opening, 3+ questions and 1–2 misconception contrasts each** |
| Pass 2 · batch 4 | Next-worst (113, 145, 159, 170, 173, 194, 195, 200, 206, 209) | **done — the auction house & the long view** |
| Pass 2 · batch 5 | Next-worst (11, 56, 115, 119, 140, 151, 162, 165, 179, 180) | **done — the desk craft & the long view** |
| Pass 2 · batch 6 | Next-worst (7, 12, 73, 94, 107, 112, 135, 158, 184, 208) | **done — safety, everyday machine craft, the learning chapter** |
| Pass 2 · batch 7 | Next-worst (1, 3, 6, 15, 46, 49, 58, 78, 99, 126) | **done — the very first lessons (1, 3, 6, 15) done** |
| Pass 2 · batch 8 | Next-worst (16, 23, 29, 45, 60, 61, 100, 124, 125, 127) | **done — types, radios & the security compound** |
| Pass 2 · batch 9 | Next-worst (2, 13, 22, 30, 39, 44, 47, 53, 72, 98) | **done — sizes, housekeeping & the pocket locks** |
| Pass 2 · batch 10 | Next-worst (9, 17, 18, 50, 51, 71, 88, 89, 116, 134) | **done — 110 lessons reconstructed total (all Tier-A + 80 Tier-B)** |
| Pass 2 · batch 11 | Next-worst (54, 64, 81, 85, 97, 123, 128, 144, 172, 176) | **done — 120 lessons reconstructed total (enrichment-weighted; model prose in 123/144 preserved)** |
| Pass 2 · batch 12 | Next-worst (8, 25, 27, 59, 133, 136, 149, 157, 163, 177) | **done — 130 lessons reconstructed total (model prose in 177 preserved)** |
| Pass 2 · batch 13+ | Remaining lessons by scan rank (80 to go: enrichment in place where prose is strong, reconstruction where the machine voice dominates) | next turns |
| Figures | 57 new illustrations | **done — all 57 generated, all 439 refs resolve** |
| Academy lectures | Same standard, session by session | after the notes |

The standard at the end: a beginner should not feel *"I have read an article about computers."* They should feel *"I actually understand this now — I can picture it — and I think I can do it myself."*
