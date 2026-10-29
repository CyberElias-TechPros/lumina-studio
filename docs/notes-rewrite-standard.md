# Notes standard v2 — warm, direct teaching

Applies to all 210 lessons in `src/data/blog.ts` (series: **Computer skills from scratch**).
Supersedes v1 (29 October 2026, "straight teaching") and the literary voice it replaced.
Tracker: `npm run audit:notes` · Workflow: `§7` · Checklist: `§8`.

---

## 0. The short answer

The best style for this content is a **calm coach**, not a novelist and not a manual.

It gives the reader the result first, then the steps in the order they will perform them, then
**what their screen should look like**, then what to do when it does not, then a short practice
task. The warmth comes from **reassurance, not scenery**: "twenty seconds is normal", "nothing
here can damage the machine", "the cable is the first thing to check, and the first thing people
skip because they think they broke it".

That combination is also what highest-quality AdSense content looks like in practice. A reviewer
and a ranking system both reward a page that answers the query in the first screen, contains
specifics only someone who has taught this would know, and leaves nothing dangling. Warmth is not
decoration on top of quality. It is what keeps a nervous beginner reading long enough to be
helped, and returning.

**One sentence to write by:** _Respect the reader, remove their fear, show them the screen, and
stop when the job is taught._

---

## 1. How we got here, measured

|                        | v0 — literary (to Oct 2026)              | v1 — straight (29 Oct 2026)           | v2 — warm direct                              |
| ---------------------- | ---------------------------------------- | ------------------------------------- | --------------------------------------------- |
| Opening                | A named stranger, a scene, a proverb     | The outcome, plainly                  | The outcome, plus permission to be a beginner |
| Length                 | 891 words average, openings of 130 words | 650–1,000 words                       | 750–1,000 words                               |
| Em dashes              | 2,786 in the corpus                      | 0                                     | 0                                             |
| "What you will see"    | Occasional, inside the story             | **Absent**                            | Required, twice or more                       |
| Reassurance            | Constant, as atmosphere                  | **1 line per lesson**                 | 2–3 lines, placed where fear is real          |
| Misconception handling | Implied by the narrative                 | **Absent**                            | One per lesson, before it bites               |
| Strength               | Dignity, local texture, teaching moments | Clarity, scannability, speed          | Both, without either excess                   |
| Failure                | A reader waits 200 words to be taught    | A reader is informed but not steadied | —                                             |

The honest reading: v0 was written to be admired, v1 was written to be scanned, and neither was
written for a person who is frightened of the machine. v2 is.

---

## 2. The five reader needs

Every lesson serves these, in this order. They are the reason for every rule that follows.

1. **Dignity.** The reader is an adult who has been made to feel stupid. Never explain that the
   task is easy. Explain that nobody named the parts for them.
2. **Safety.** Say what cannot break, before they touch anything. Fear is what makes hands shake.
3. **Certainty.** Describe what will appear on the screen, how long it takes, and what is normal.
   A beginner cannot tell "working" from "frozen". That is the teacher's job, not theirs.
4. **Competence.** Give one visible win in the first ten minutes. Not a concept. A thing done.
5. **Belonging.** Use their world as fact, not as decoration: the light going out, the business
   centre price, the shared laptop, the data bundle, the school portal.

---

## 3. The template

| Position | Block                     | Requirement                                                                                                |
| -------- | ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1        | paragraph                 | Outcome + permission. What they will be able to do, and why starting here is normal. **65 words maximum.** |
| 2        | paragraph                 | The core idea in plain words, with one reframe that removes shame ("nobody named the parts").              |
| 3        | figure                    | The thing they are looking at, with a caption that teaches.                                                |
| 4        | `h2` + `ul`               | **Before you start** — only where it earns its place.                                                      |
| 5        | `h2` sections             | Teaching in the order they will do it: answer first, then why, then the action.                            |
| 6        | `ul` steps                | One numbered list they follow with their hands. Literal keys and menu paths.                               |
| 7        | paragraph                 | **What you will see.** The screen, the sound, the wait, the normal delay.                                  |
| 8        | paragraph                 | **One myth.** "It looks like X. It is usually Y." Placed before it bites.                                  |
| 9        | `h2` — _If it goes wrong_ | Four to six real failures with fixes, opened by one reassurance line.                                      |
| 10       | `h2` — _Practice_         | Two to five tasks, ten to twenty minutes, done alone.                                                      |
| 11       | paragraph                 | What they can now do, and the next lesson. No sales pitch.                                                 |

750–1,000 words as the contract counts them. Under 600 fails the site contract. Over 1,100 means
the lesson is two lessons, or it is padding.

Figures: 1–3, the existing ones, alt text that describes the screen, a caption that adds something.

---

## 4. Voice rules

**Sentence and word level**

1. Simple English for an adult reading English as a second language. Shorter twin if one exists.
2. One idea per sentence. Average under 16 words. Nothing over 30.
3. **No em dashes.** A full stop, a comma, or brackets. The em dash hides a sentence that should
   have been two, and it was the loudest fingerprint of v0.
4. Second person, active voice. "Press the power button", not "the power button is pressed".
5. Name the thing, then explain it once: "the cursor, the blinking line where the next letter
   lands". After that, just "the cursor".
6. British spelling: organise, colour, recognise, licence (noun), practise (verb).

**Warmth, with a budget**

7. **Reassurance: two or three lines per lesson**, and only where fear is real (switching on,
   deleting, paying, passwords, asking for help). Never a blanket "don't worry" at the top.
8. **"What you will see": twice minimum.** The logo, the spinner, the blinking cursor, the red
   error text, the twenty-second wait.
9. **One myth per lesson**, just before it would cause a mistake. "It looks like the computer is
   broken. It is usually a loose cable."
10. **A why for every instruction**, once. "Plug it in, because an update restarts the machine and
    a flat battery mid-update can leave it unable to start."
11. **No invented named characters.** Use the reader: "If the light goes while you are typing…"
12. **At most one comparison per lesson**, and only when it shortens the explanation.

**What not to do**

13. No aphorisms, no proverbs, no lines written to be quoted.
14. No hype: robust, seamless, cutting-edge, world-class, comprehensive, dynamic, leverage,
    unlock, game-changer.
15. Never condescend: no "simply", "just", "obviously", "easy". The reader decides what is easy.
16. Local detail is fact, not colour. "A business centre charges roughly ₦100 to ₦300 a page",
    not "the shop smelled of rain and old paper".
17. Admit the limit in one line when a step differs by version or device. Do not pretend one path
    covers Windows, Mac, iPhone, and a 2015 laptop.

---

## 5. The same moment, three ways

The reader has just pressed the power button and the screen is still black.

> **v0 (literary).** Madam Grace had avoided the office desktop since 2014, because the first time
> she touched it, everything happened too fast and nobody would name the parts. A dark screen is
> not an accusation. It is a room with the curtain still closed.

> **v1 (straight).** The power button is round. Press it once and take your finger away. Wait
> while the machine starts. Do not press the button again.

> **v2 (warm direct).** Press the round power button once, then take your finger away. Nothing may
> happen for twenty seconds, and that is normal: the machine is putting itself in order. You will
> see the maker's logo, sometimes a spinning circle, then a sign-in screen or a desktop. If the
> screen stays black, do not press the button again yet. Look at the monitor's power light, then
> the wall socket. A dark screen is usually a cable, not a broken computer.

Same facts, same length discipline. v2 is the only one that tells the reader what normal looks
like, and the only one that leaves them able to diagnose the silence.

---

## 6. What actually counts for AdSense, and what does not

Quality is not a tone. For this site, the reviewable signals are:

- **Intent satisfaction.** The query that lands on the page is answered in the first screen.
  v2's opening paragraph exists for that.
- **First-hand experience.** "You will see", exact menu paths, prices, and the specific failures
  beginners hit are things you only know by teaching. That is experience, demonstrated.
- **Originality.** Every lesson keeps its own examples, its own failure list, its own practice.
  A shared skeleton is fine; a shared script is not.
- **Trust.** Named author and role, review dates, corrections log, changelog, honest limits.
- **Maintenance.** Dated revisions, working links, no orphan pages.

What does not count: word count for its own sake, keyword density, or sounding formal. A 750-word
page that removes a real obstacle beats a 2,000-word page that circles it.

**The one structural risk to watch.** Two hundred and ten lessons that all open the same way, end
the same way, and use the same eleven headings start to read as generated, however good each one
is. So: vary where sections fall, vary the heading names, keep the specifics distinct, and never
write a lesson that could belong to another topic with three words changed.

---

## 7. Workflow

```sh
npm run audit:notes                       # where the corpus stands
npm run audit:notes -- --next 10          # what to write next
node scripts/apply-note-rewrite.mjs content/notes/batch-01.json
npm run validate:lessons -- --strict      # depth, figures, images, excerpts, records
npm run audit:notes                       # voice, warmth, readability, structure
npm run audit:content                     # duplication across the corpus
npm run typecheck
```

`apply-note-rewrite.mjs` replaces one object per slug and refuses a batch that drops below 600
words, loses a figure, points at a missing image, breaks the excerpt limit, or reuses a title.

---

## 8. Checklist before a lesson is called done

- [ ] The first paragraph says what they will be able to do, and gives permission to be a beginner.
- [ ] I have described the screen at least twice: what appears, what is normal, how long it takes.
- [ ] I named one thing that looks broken but is not.
- [ ] Every instruction has its reason, once.
- [ ] The failure list covers what a beginner actually does wrong, not what is theoretically wrong.
- [ ] The practice can be done alone, today, without buying anything.
- [ ] No em dashes, no "simply", no hype, no invented characters, no proverb.
- [ ] A person who has never used a computer could follow it with the machine in front of them.
