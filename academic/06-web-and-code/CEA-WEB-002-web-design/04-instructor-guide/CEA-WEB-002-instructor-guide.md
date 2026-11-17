# CEA Instructor Guide — CEA-WEB-002 Web Design

| Field       | Value                    |
| ----------- | ------------------------ |
| Document ID | CEA-ACA-GUI-WEB-002      |
| Version     | 1.0 · **Instructor use** |
| Status      | Draft — pending pilot    |

**Do not distribute.** Keys in Section 7.

## 1. What this course is

Publishing a real site, not collecting CSS trivia. Every session ends with something on screen; the final hour is launch day for every student who shows up prepared.

## 2. Preparation

Editors (VS Code) pre-installed, Live Server extension, three demo sites (great/broken/honest), Netlify +
GitHub demo accounts, loaner Android phone, image compressor bookmarked, printed Mrs. Obi discovery brief,
classroom contrast-checker link.

## 3. Delivery model

105 min: 0–10 hot-or-not recap · 10–25 teach at projector with the live demo site · 25–45 build-along · 45–70 practice · 70–95 solo · 95–110 KC · 110–120 close.

## 4. Failure points

- S2: students write `label for` without matching input id — relationship is the point; drill it.
- S4: float-itis and manual margin stacking — repeat: flexbox first, always.
- S6: "it works on my laptop" — the loaner phone is the judge; laptops lie about touch.
- S7: teams skip Lighthouse because scores sting — reframe: the red score is a free audit, not a verdict.
- S8 gate: localhost cannot pass; public URL or reassess.

## 5. Assessment guidance

A1: the 3-page staging site gets one live walk-through each; final: live load on YOUR phone, link audit,
form round-trip if wired. Show-and-tell: reasoning about audience, never gushing about their own gradient.

## 6. Equity & access

Shared editors; loaner phones passed in pairs; printed briefs; step-by-step Netlify cards; home internet not required for any deliverable (all publish in-class).

## 7. Knowledge-check keys

KC1: 1) DNS resolves names→IPs. 2) Domain = name; hosting = files on. 3) DNS → IP → HTML → parse/paint → assets. 4) Shop window vs vault. 5) Inform vs work.
KC2: 1) SR semantics; SEO hierarchy. 2) SR readout + SEO. 3) Data only. 4) Focus steering. 5) head=meta · body=human.
KC3: 1) Width honesty. 2) element < class < id > everything-ish (!important trap). 3) 60/30/10. 4) 4.5:1 text contrast. 5) One file, all pages, cached.
KC4: 1) justify main · align cross. 2) Grow equal share. 3) Overflow. 4) max-width+auto+pad. 5) Sticky corner CTA bubble.
KC5: 1) One line, one CTA. 2) wa.me/234…?text=. 3) Real work only. 4) Call · chat · find. 5) CAC/RC + repeat nav + ©.
KC6: 1) Mobile majority. 2) 320/375/768–1024. 3) Wrap first; query for structure. 4) max-width:100%;height:auto. 5) 44×44 — taps not missiles.
KC7: 1) Biz + service + city. 2) ~150 chars, search-result pitch. 3) 4.5:1 low-vision + sunlight. 4) ≤200KB hero. 5) Replace, never just remove, focus ring.
KC8: 1) Free certs via host. 2) A/AAAA + CNAME-www (or nameserver). 3) Silent failure = lost orders. 4) Discoverability + error fixing. 5) Two copies, two places.

## 8. Expected outputs & calibration

S2: landmark-correct homepage by minute 95 for 80% of the room. S4: zero horizontal scroll at 320px. S7: everyone runs Lighthouse and sees before/after. S8: all sites on public URLs in cohort file.

## 9. Rubric (0–4)

0 file broken · 1 local-only · 2 live but broken pages · 3 live, phone-clean, honest content · 4 live + fast + score ≥80 + articulate client framing. Gate: public URL + phone render.
