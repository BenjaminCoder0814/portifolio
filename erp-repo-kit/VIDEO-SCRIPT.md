# Demo video — script and shot list

**Target: 2 minutes. Not 5.** A recruiter watches 30 seconds; an Engineering Manager who is
already interested watches all of it. Both need the first 15 seconds to be the system working.

**Language: English.** Even for European markets. Subtitle if your accent worries you — but
narrate it yourself. A voice on the video is a person; a silent screencast is a slideshow.

---

## The rule that decides whether this video works

> **Show the system doing the work. Do not show yourself talking about the system.**

No face cam. No intro slide with your name. No "hi everyone, welcome to my portfolio."
Screen recording from second zero. Your name goes at the end, on one card, for four seconds.

---

## Shot list

### 0:00–0:15 — The problem, shown not stated
**Screen:** the spreadsheet. Genuinely — a real one, or a reconstruction with mock data.
Scroll it. Show two sheets side by side with numbers that disagree.

**Narration:**
> "Three companies. One warehouse. Stock tracked in spreadsheets that didn't agree with each other. A price quote took fifteen minutes."

**Why this opening:** everyone else opens with a dashboard. Opening with the problem makes the next shot land.

---

### 0:15–0:35 — The system, first impression
**Screen:** log in, land on the dashboard. Let it load in real time — do not cut the loading.

**Narration:**
> "This replaced it. React front end, Express REST API, PostgreSQL through Prisma. In production, used daily by the whole operations team."

---

### 0:35–1:00 — Multi-entity inventory, the core
**Screen:** record a stock movement. Then transfer stock between two legal entities. Show the movement history with the entity attribution visible.

**Narration:**
> "Every movement is attributed to a legal entity — recorded, auditable, reversible. Transfers between entities are a single transaction, so the two ledgers can't disagree."

---

### 1:00–1:20 — Real-time, the trust shot ⭐
**Screen:** **two browser windows side by side.** Record a movement in one. The number updates in the other without a refresh.

**Narration:**
> "Every movement is a row: what moved, who moved it, why. The balance and the record are written in one transaction, so they cannot disagree — which was never true with the spreadsheets."

**This is the most important 20 seconds of the video.** It's the one thing a screenshot cannot show, and it's the feature that made the team trust the system. Rehearse it until the timing is clean.

---

### 1:20–1:40 — Pricing, the headline metric
**Screen:** open the pricing screen, select a product, enter quantity, show the quote appear.
**Let the timer be visible or say it out loud.**

**Narration:**
> "Pricing used to mean calculating cubic weight by hand against a freight table. Ten to fifteen minutes, with the customer waiting. Now it's this."

*(pause while it computes — the silence does the work)*

> "Under thirty seconds."

---

### 1:40–1:55 — Roles
**Screen:** log out, log in as a different role. Show the navigation being genuinely different.

**Narration:**
> "Three permission tiers. Operations, sales, administration. The role shapes the API and the interface — for people who aren't software users by trade, a smaller interface is a faster one."

---

### 1:55–2:00 — Close
**Screen:** one static card.

```
Enterprise Operations Platform
React · Node.js · Express · Prisma · PostgreSQL · Firebase

Built and shipped solo · In production

Benjamin Maciel
github.com/BenjaminCoder0814/enterprise-operations-platform
benjaminmaciel.com.br
```

**Narration:**
> "Specified, architected and built solo. Architecture and decision records are in the repository."

---

## Production notes

| | |
|---|---|
| **Recording** | OBS Studio (free). 1080p minimum, 60fps if the machine allows |
| **Data** | Mock data only. No real customer names, no real prices, no real stock figures |
| **Cursor** | Move deliberately and slowly. Fast cursor movement reads as nervous |
| **Cuts** | Cut dead air, never cut a load time — showing real latency is credibility |
| **Music** | None. Music on a technical demo signals marketing |
| **Audio** | Matters more than video quality. A phone earbud mic in a quiet room beats a laptop mic anywhere |
| **Hosting** | Unlisted YouTube + embedded in the README and portfolio. Not a raw file download |

## Rehearse before recording

Do a silent run-through of every click first. The most common failure is a UI hesitation
mid-demo — a wrong menu, a slow lookup, a form that needed a field you forgot. It reads as
"he doesn't know his own system," which is the opposite of the point.

Record the narration **separately** from the screen capture and sync it. Trying to narrate live
while clicking produces both a worse demo and worse narration.

---

## Where the video goes

1. **README**, right below the title — before anyone reads a word of documentation
2. **Portfolio**, on the ERP case study page
3. **LinkedIn**, as a post — native video, not a link. Repost it once when you start applying
4. **Recruiter replies** — one line: *"Two-minute demo of the system, if it's useful: [link]"*
