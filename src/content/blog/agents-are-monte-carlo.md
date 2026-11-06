---
title: Parallel agents are Monte Carlo Sampling The Search Space
description: K agents with or without communication, it's Monte Carlo or stratified sampling.
pubDate: 2026-10-02
tags: [llms, math]
---


For a few months now, I have been obsessed with this paper, "Scaling Discovery Through Test-Time Communication" and keep thinking about it and had certain thoughts about how this would work in a better theoretical framework to validate these empirical findings.

Running many agents on the same problem is Monte Carlo sampling of the search space. That's basically the entire hypothesis this started from because everything I graphed regarding multi-agent work looked like Monte Carlo.

I did a bunch of math over 2 days to try and figure out if this was the case and it's kind of a mixed bag of right and wrong. Largely, it depends.

## Without communication

With K agents without communication, it's Monte Carlo (heterogeneous or homogeneous agents) or stratified sampling. For K independent agents all drawn from the same model (ie, the same learned priors, the same starting settings etc), it's just crude Monte Carlo. With K heterogeneous agents (same models with different settings, or different models), it's a mixture proposal with cluster per agent setting 

(shoutout to Cochran 1977 and Hesterberg 1995 for the required math, and to GLM-5.3 for helping me find the Hesterberg paper, was not aware of it before)

## With communication

With communication, depending on selection, it's population Monte Carlo, or multilevel splitting. Or even "successive sampling without replacement" if there's a message board of previously tried approaches and their results.

I really wanted to see if it was still Monte Carlo in the case of message boards, and if my hypothesis actually held. Depends on how the message board works, it turns out. Because how do you define in mathematical terms, "these agents can talk to each other"? What are they communicating? What is the information in terms of their successes or traces?

If the message boards contains a shared log of learned results, then we get an adaptive mixture importance sampling, which looks like population Monte Carlo.

If we have a shared log of tried approaches, we start to see the math work exactly like that for successive sampling without replacement

If we have a shared log of verified process in a multi-step problem with a verifier, with "go with the winner" selection, then we start to see multilevel splitting.

Selection with an evaluator? Things start to look like the cross-entropy method.

How about you copy earlier agents? You'll start getting cascades and there's a nice name for 

## In practice

It's going to be a very, very interesting time to be in complexity theory the next few years.
