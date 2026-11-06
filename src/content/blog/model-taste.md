---
title: Some LLMs have taste
description: So far of all the models I have tried, GLM-5.3 has the best "taste".
pubDate: 2026-10-07
tags: [llms, code]
---

So far of all the models I have tried, GLM-5.3 has the best "taste". It needs help for the first shot but carries on quite well afterward, with better instruction following. I'm assuming they cleaned their data more.

It's such a beautiful model. It just does things, and the code it writes has TASTE. It makes minimal edits instead of being overly verbose, maintains compatibility, and overall diffs are small whenever they can be.

## Galactic Knowledge Machines

It's very interesting because Opus 5.5 definitely has access to way more information, it can pull from things without web searches that no other model comes close to, but once you provide all the same info from the research phase, GLM-5.3 starts beating it on most things.

Opus 5.5 has been quite decent for projects up to 4-5 systems, though still with issues. But the more interconnected systems there are, the worse the effect gets. 1st round of implementation goes okay but in attempts to correct its issues it makes the code worse.

I also discovered that Opus 5.5 is kinda lazy with finding bugs if you use a subagent within the session, so I use Minimax M3 and it catches a lot of things Opus doesn't (lot of false positives with M3 obviously, it's not exactly the smartest model, but easier to throw tokens at things when the model is so cheap to run). GLM-5.3 is quite good so I might shift to that fully for code reviews.

Gemini is so bad at doing things that it's usually faster to type out the correct code instead of arguing with it, encouraging it, giving it all the suggestions it needs. Momentarily does some very inspired things so maybe the next model is going to have some spark in it.

## Everyone sounds like Claude

I'm slightly anti-distillation because I want there to be more variety among the models instead of all of them sounding like Claude or GPT. I don't want the various model families to have the same blind spots or biases. Probably where taste will come from eventually. But also makes mathematical sense for them to be trained on different learned priors

Some of my personal terminology has been eternally tainted. I can't say "byte-identical" anymore when it comes to porting code from MATLAB to C++ and comparing outputs because that's the wording Claude uses. I kinda dislike that I have started finding people ironically speaking Claude-dialect funny.

Other thoughts about LLMs: [fast code](/blog/llms-cant-write-fast-code/).
