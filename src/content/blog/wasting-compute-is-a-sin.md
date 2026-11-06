---
title: Wasting computing power is a grave sin
description: and a useful prompt
pubDate: 2026-10-05
tags: [llms, code]
---

I tried vibe coding once in April and immediately gave up. Lasted all of 2 days. Now I write 3000-word software design docs to get the tedious parts of implementation done and get it to write stubs I can fill in with my own code. More reliable and overall faster.

My prompts are ~800-1200 words long and essentially a small software design doc with complete specifications. I usually completely rewrite the design doc generated, then add specifics what to use where. Then tell it to not make dumb implementation mistakes because "wasting computing power is a grave sin".

It's incredible how much you can get Claude to cooperate if you tell it that something is "a sin". I just talk like this about programming, I didn't know this was a prompting technique. Wasting computing power being a sin: O(N^2) when O(N) is possible, walking through an index instead of using a hashmap, cache thrashing, random disk reads when sequential is possible.

I don't even refer to Claude. I talk about "the task must be done this way, it must not involve this. A mistake has been made in the code, the wrong architecture was used" like extremely aggressive NYT passive voice. Until now I've had my username as "The User" so that it doesn't talk to me in sycophantic ways.

## On Prompting and LLM use cases

I usually test people with "if you can do it with Minimax-M2.5, you can do it with pretty much any other model" because you have to be so much more specific with dumb models.

GLM-5.3 does some weird things where the compaction takes forever but the context shrinks from 900k down to 50k. It still remembers most details which is fascinating to me, but I keep an append-only worklog just in case.

I now have this setup wherein I write code, and the LLM keeps giving me feedback every 10 seconds on missed edge cases, or where a memory bug is possible, and also doing some dry runs for profiling the hot path. It's.... quite nice? I have minute control but also it speeds me up.

