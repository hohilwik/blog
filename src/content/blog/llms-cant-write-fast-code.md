---
title: LLMs still can't write fast code
description: as of Opus 5.5
pubDate: 2026-09-26
tags: [llms, performance]
---

I mostly program in C++ and Rust (sometimes Go), and so far there have been very few programs where LLMs have come close to my level of optimization. Even when directing Opus 5.5 through all details, I have to stop and write 100-150 lines of code to get the most out of the CPU. Somehow Opus 5.5 isn't very good at writing concurrent code or even any kind of performance optimization beyond the obvious things. It can do specific functions after a lot of bonking but not a whole system. It's decent at single-instance but kinda sucks at concurrency or writing code where multiple users interact. Have they not run any RL for this?

I have been thinking about how you would go about designing RL for high performance code (not pseudo agentic RL), and I don't quite have a clean answer. It could be millions of traces but without the thought process and all the false starts, it would not be worth much, and is anyway not an "elegant" approach, just brute-forcing through millions of agentic runs. 


# Benchmark Stuff

On my personal benchmark (for performance engineering and optimization), it's at an 11% success rate (previous best was 4%). It seems like encoding performance engineering into a model is quite hard. They need to figure out how to get these things to write well-optimized code. They don't even get close at the moment, even if you bonk them 4-6 times.

## Where LLMs do help

In my experience, most of the optimizations live in the architecture decisions, especially data movement. Then I can squeeze out maybe 20% more speed with everything else. But with the help of LLMs, I can try out so many more designs that I can know with higher certainty whether something is the right approach. It's never going to be 100%, but it's definitely closer than an educated guess.

I haven't had to manually go through valgrind in months because I have my whole process written down and it can find issues with memory (especially cache) so that I can fix the hot paths.

More on how I steer them in [wasting computing power is a grave sin](/blog/wasting-compute-is-a-sin/).
