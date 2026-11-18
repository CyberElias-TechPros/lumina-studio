# CEA Instructor Guide — CEA-WEB-003 Web Development

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-GUI-WEB-003           |
| Version     | 1.0 · **Instructor use**      |
| Status      | Approved v1.0 — pending pilot |

**Do not distribute.** Keys in Section 7.

## 1. What this course is

The full stack of a front-end carpenter: markup → style → programming → interaction → hygiene → deployment. Twelve sessions, one shipping project, zero slides-only hours.

## 2. Preparation

VS Code + Live Server · git installed for EVERY machine (verify in week -1) · Netlify/GitHub demo accounts ·
three specimen projects (clean / buggy / hostile-input) · loaner phones · printed flexbox/grid/events cheat sheets ·
Mrs. Obi project brief cards · projector.

## 3. Delivery model

105 min: 0–10 war-story recap · 10–25 whiteboard/projector teaching · 25–45 build-along coding · 45–70 pair-build · 70–95 solo milestone · 95–110 KC · 110–120 preview+leave.

## 4. Failure points

- S2: placeholder-as-label creep — dock the point at review; it's the industry's #1 sin.
- S5: `==` everywhere — run the coercion table aloud until it burns in.
- S7: innerHTML XSS demo MUST land — students refuse textContent until they've seen the hostile image.
- S10: students fix multiple bugs then can't say which worked — enforce one-fix-then-test aloud.
- S11: Netlify verification emails block deploys — resolve IN CLASS, never "go home and verify".
- S12 gate: static tutorial clones fail P4 — insist on the student-named interactive feature.

## 5. Assessment guidance

A1 (S11 submit): live walk-through + repo glance. Final: fresh-machine live load, console open, interactive feature demonstrated, commit history. Show-and-tell: reasoning, not applause.

## 6. Equity & access

Loaner phones; VS Code on all machines; offline cheat sheets; home internet not required (all deploys in-class); extra Saturday lab week before final for machine-less students.

## 7. Knowledge-check keys

KC1: 1) meaning-bearing tags. 2) AT/SEO-invisible. 3) Outline clarity. 4) self-contained unit vs thematic group. 5) Forgives-nothing structural check.
KC2: 1) placeholder vanishes on input. 2) Click-target + programmatic pair. 3) Numeric keyboard. 4) Help/error association. 5) Dynamic announcement to AT.
KC3: 1) padding=inside, margin=outside. 2) Width includes pad+border. 3) element<class<id. 4) Reading comfort zone. 5) One edit re-themes site-wide.
KC4: 1) justify=main axis; align=cross. 2) Responsive auto columns. 3) Phone majority. 4) Track-only gaps. 5) 150–250ms, transform/opacity only.
KC5: 1) const fixed; let reassign. 2) === strict. 3) backticks + ${}. 4) 0,"",null/undefined/NaN. 5) Run after parse, no race.
KC6: 1) const f=(a)=>…. 2) map/filter/reduce roles. 3) APIs/tables are AoOs. 4) ('event', handler). 5) Named shortcuts.
KC7: 1) Live editable tree model. 2) One vs all. 3) Plain text vs parsed HTML. 4) Class switch. 5) Parent listener + e.target.
KC8: 1) UX vs truth. 2) required/type/min-max. 3) Focus to first error. 4) Open/ESC/overlay + focus return. 5) Disable on submit.
KC9: 1) Future-you + collaborators. 2) init→add→commit. 3) Imperative verbs. 4) .env/node_modules/OS junk. 5) Bisectable history.
KC10: 1) Reproduce + read first error. 2) Failed HTTP. 3) Windows hides it; Linux hosting breaks it. 4) Pretty arrays. 5) The publishing bar.
KC11: 1) commit→push→build→HTTPS. 2) Push to watched branch. 3) First red line, top-down. 4) One-click last-good restore. 5) main = deployable only.
KC12: 1) Judgement assessment. 2) No uncaught errors fresh load. 3) Process discipline evidence. 4) Reasoning + honesty. 5) Engineer + communicator.

## 8. Expected outputs & calibration

S4: every pair at 320px without hand-holding. S7: everyone survives the XSS demo viscerally. S9: repo on GitHub by minute 95. S11: every student deployed same-session. S12: gate passes only on public URL + working interactive feature.

## 9. Rubric (0–4)

0 broken · 1 local-only/tutorial clone · 2 live, minor bugs · 3 live + clean console + own interaction · 4 3+ a crisp presentation + repo story. Gate: public URL + self-coded interactive feature.
