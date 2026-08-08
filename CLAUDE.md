@AGENTS.md

# HOWL — Working Rules for Claude

HOWL (howlofficial.com) is a small streetwear brand, solo-founder (Pau). Business decisions, supplier history, and launch status live in the Obsidian vault (`~/Documents/HOWL-Vault`), not here — this file is about **how** to work on this repo, not a log of **what** was decided.

Antes de cualquier decisión de diseño, estética, mockup o presentación de producto, consulta REFERENCIAS.md — define la identidad visual de HOWL.

## Video work
- Every promo video must be built for a distracted/scrolling viewer: motion or change in the first 0.5-1s (no static logo intro), bold on-screen text always (many watch muted), quick cuts (1.3-2s per shot), brand wordmark as **outro**, not intro.
- Never build a video solo and present it as done. Extract real frames (ffmpeg) and get the `design-auditor` and `social-media-manager` personas (`.claude/agents/`) to review them as part of the build, not as an afterthought.
- No blurred-fill/pillarbox backgrounds to force landscape photos into vertical format — it reads instantly as a CapCut/ad template. Use full-bleed crops, or one consistent flat background across every clip.

## Pricing & copy honesty
- Never show a crossed-out "compareAtPrice" unless it reflects a real prior price. No fake discount psychology.
- "Edición limitada" / stock-limited claims must be literally true against real inventory numbers, not marketing flourish.

## Supplier / cost claims
- Never trust a supplier's headline price without the real breakdown: shipping, duties, plate/setup fees, sample-vs-bulk pricing. Base numbers on real quotes Pau pastes, not assumptions.
- A price that looks too good relative to comparable suppliers is a signal to check for a bait price or hidden fees before recommending it — not a reason to get excited.

## Design / print-ready artwork
- Render on-brand wordmark text with the real Anton font (Google Fonts), not an approximation.
- Key transparency via corner-pixel background sampling, never mode/most-frequent-color sampling (inverts the mask when the foreground is larger than the background).
- Upscale RGBA art with premultiplied-alpha resize, never a naive resize (causes edge color fringing).
- For designs on a black garment, prefer keeping the shirt's real black background + luminance-based keying over an artificial chroma-key color — avoids color spill entirely.

## Print-ready QA checklist (run before calling any artwork "done")
Three real bugs (pink color-cast in a dust cloud, a letter counter filled solid white instead of transparent/textured, a supplier substituting the wrong font) all slipped through near-final review this session. Before marking any print-ready file done:
1. Zoom into any text/wordmark at 2x — check every letter's counters (holes, like the inside of an "O"/"A"/"B") are correctly transparent or textured, not solid-filled by mistake.
2. Check the corners/edges of any keyed (transparency-extracted) design for residual color spill or tint — composite on a neutral gray to spot it easily.
3. If front and back prints belong to the same garment, view them side by side and confirm they share the same rendering style (both line-art, or both full-color, etc.) — mismatched styles between front/back reads as two unrelated designs stitched together.

## Working style
- On iterative visual fixes (color correction, alignment, etc.), check in after the first real attempt instead of silently iterating multiple rounds — ask whether to keep refining or stop.
- For design/marketing/pricing calls with a real tradeoff, use the team-debate workflow: dispatch a subagent to read the relevant `.claude/agents/{role}.md` persona and give a reasoned recommendation, rather than deciding unilaterally.
