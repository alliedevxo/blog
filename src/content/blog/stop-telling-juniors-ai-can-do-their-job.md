---
title: "Stop Telling Juniors AI Can Do Their Job"
description: "AI can speed up parts of engineering work, but replacing junior roles with tools is a long-term talent and quality risk."
tags: ["AI", "Entry-Level", "Best Practices"]
date: 2026-01-04
draft: false
excerpt: "AI can speed up parts of engineering work, but replacing junior roles with tools is a long-term talent and quality risk."
est_duration_min: "11"
---

As you may have heard, the end is near. AI will do all of the software engineering and we will be redundant. Except, that’s just not quite true, is it?

Like most devs, I have been following Gen AI and riding the emotional rollercoaster of wondering if my career is going to be replaced. I spent a lot of time reading claims from both social media and tech leaders, and felt like I must be missing something.

With the great divide between pro-AI and anti-AI folks, it was hard to get a realistic signal. One side says AI will take over everything, the other says every output is unusable. Like most things, the truth is probably somewhere in the middle.

So I went on a hunt to investigate the claims and form an opinion based on both evidence and my own experience.

My take: Generative AI is a tool that can help developers learn faster, maybe write some boilerplate code, do janitorial engineering for us, and be a sounding board. Generative AI cannot do the job of a software engineer, and that includes the work of a junior engineer.

Before getting into numbers, one note on evidence: different sources use different definitions of productivity (self-reported vs observed, narrow task performance vs full software engineering work). So I treat these data points as directional signals, not universal truth.

### TL;DR

- AI can speed up parts of engineering work, especially boilerplate and learning workflows.
- Software engineering is still much broader than code generation.
- Junior roles are apprenticeship roles, not "easy ticket" roles.
- Replacing junior hiring with AI creates a long-term talent pipeline problem.

---

### Let’s talk about junior developers for a minute

My heart breaks for the junior engineers trying to get their careers started right now. We are in the middle of companies moving jobs overseas, laying off workers for cost savings, and still correcting for over hiring during covid.

But none of those reasons sound sexy to shareholders, so they are doing it in the name of AI. This paints a picture that AI is more effective than it truly is. However, regardless of the reason, the job market is tough. And when the job market is tough, it will of course be the hardest on entry level roles.

When I read that AI can do the job of a junior developer, my skin crawls. Sure, entry level devs do not have the foundation that senior+ developers have quite yet, but their role is much more than writing basic code. This is a career that has nearly no training on how to learn the craft, and relies on devs teaching themselves basically everything. I think of the junior role as an apprenticeship where they can be surrounded by more experienced workers to learn the ropes and grow into an effective engineer.

Do juniors take on easier tickets? Yeah.

Do we hire juniors so that we can have someone to do the easy parts of the job? Hell no! For every easy ticket a junior pulls, a mid-level can do it better, faster, and with less hand holding.

The purpose of hiring an entry level engineer is not so that we can have an assistant to do these tasks, and saying that AI can take the job of a junior is implying just that. The mentality is backwards. We don’t have juniors to complete easier tickets, we have easier tickets so that junior engineers have approachable work to do while they work on their actual job duty.

What is that job duty? Being an apprentice and learning their craft.

When I was a junior, my very first ticket was reordering a menu on our website. Could an AI do this task? Absolutely. Was I hired because my team desperately needed someone to reorder menus? No. That ticket existed because a new engineer needed something approachable to learn the team workflow.

That ticket taught me how we run our unit tests. It taught me that pull requests templates exist and how to fill our specific template out. It taught me the process we have for requesting reviews and that we need two approvers. It taught me how to set up my dev environment and where these files lived in the codebase. It taught me our ticketing software and process. It taught me what the ship-it squirrel was. And it gave me the confidence to keep going, because my entire team showered the PR with their approvals. 

The person who made that ticket for me could have done this work in seconds without needing a dedicated ticket for it. But that wasn’t the point. The point was that I was learning to be a developer on a team and I would not have become the software engineer I am today without the lessons I learned doing that menial ticket. It wasn’t a trivial task we should give the AI. It was a building block required in the making of a new engineer.

Years later, I am the senior engineer leading teams and I pay it forward. I actively break new features up in buckets of increasing difficulty. I have trivial tasks new engineers can work on, tasks that I’d expect a midlevel to put some work into, and tasks that I expect the engineer to get buy-in from the team on. And the first people I try to push to pick up these tickets are the ones that will benefit the most from the learning if time allows. Of course, there is always the business to think about and sometimes it’s crunch time and we have to get moving.

My point here is that the job of a junior engineer exists to churn out future mid, senior, and staff+ engineers. These are the people who will be leading technical efforts in the future, and they are worth investing in. The last thing we want is a bunch of code zombies who can prompt the AI to do a thing, and have nothing but AI generated answers when support comes paging about issues.

---

### So how effective is AI in the workplace?
With the industry pushing developers to stop writing code in favor of using AI, we run into productivity pitfalls.

What leaders are saying: Microsoft’s CEO claims that 20-30% of their code is now AI generated, and their CTO forecasted that this figure could reach 95% by 2030 [^1]. That second number is a forecast, not an observed outcome.

What developers are reporting: Developers interviewed state that AI tools are useful for boilerplate, testing, explaining unknown code, fixing bugs, and prototyping [^2].

A METR study found that while forecasted and perceived productivity of AI usage among developers was high, observed results were lower than the baseline productivity without AI use [^3]. Developer surveys indicated that nearly 70% say they spend more time debugging AI-generated code and resolving AI-related security vulnerabilities [^4].

So what gives? Is it writing a large chunk of our code and making us vastly more productive? My read is yes and no. Boilerplate and unit tests can account for a lot of lines, so a high percentage of AI-generated code is plausible. But that is not the same as saying AI can perform the full job of a software engineer end-to-end.

---

### Pitfalls of AI code generation

Code generation is great to aim for, but the job of a software engineer is way more than code. Most of my time is meetings, cross-team coordination, tradeoff discussions, and mentoring. Even if AI handled 100% of my coding, it would only impact a slice of my day.

But there are downsides that come along with this time savings. We already found that AI-generated code often needs more debugging and review time. A survey by Faros found PR review times increased by 91% with AI-assisted coding, and METR found that 61% of AI suggestions needed modification [^5]. So while it can feel fast, teams can still spend a lot of time fixing and validating output.

On top of that, a worse downside of relying on AI code generation is losing our abilities to code well. The more we delegate code to a machine, the less we are doing it ourselves and the less muscle memory we have. Maybe this isn’t a big deal if AI is writing 100% of our code, but we just learned that we need a human in the loop to correct the AI. Now we have a less effective human reviewing the code to correct it, and the problems will just keep getting worse. Until AI can generate code with an accuracy that does not need human intervention, it is vital we keep our coding abilities at a level where we are ready to step in at any moment.

I worry about the new generation of developers who started off their learning with AI tools and never built a foundation, but that’s a topic for another time.

And I know, people will say this is different with tools like Claude Code. I agree that Claude Code is pretty neat. It does a great job at gathering context across a codebase and can do well with project scaffolding. However, I have noticed a trend with projects written this way.

Usually I see two categories. 1) Completely “vibe coded” with a prompter that does not understand the craft. 2) Software engineers who are controlling the tool and constantly using domain-specific terminology that a lay person would not use. I think this is a point that a lot of people lose when they are arguing for these tools. A non-developer will not be nearly as effective with them because of the lack of context they can provide to the tool and the fact that they will not be able to review the output. And if we require a trained developer to use the tool effectively, how is it going to ever replace our jobs? And if we lean on the tool and lose our development skills, how does the quality of the code not naturally degrade over time?

---

### So where does that leave us?
AI has usages that can make us more productive. I am working on another post detailing how I use it to be more productive, which will come soon! But as a preview, it’s generally not code generation. I use AI tools to help me learn by creating roadmaps, explaining and reviewing code, and acting as a sounding board.

It also helps me during admin tasks, such as preparing feedback at work. I do not generate feedback directly, but I do use AI to ask me clarifying questions and help me think of actionable talking points. Some suggestions are bad, some are useful, but it helps me break through blank-page syndrome.

I will sometimes send it a code snippet for a language I am learning and ask if it follows best practices, or how would it review that piece of code if it were doing a code review at work. This has been great for getting me to think of things in an ecosystem that I have little experience in. 

With that being said, I don’t foresee AI doing the job unless something drastic changes. In order to have confidence in its output, we need a trained software engineer in the loop. If we remove junior engineers and only have seniors monitor AI, we reduce the future pool of qualified reviewers year over year. We would also be pulling senior time away from the parts of engineering that matter most: system design, coordination, tradeoffs, and mentoring.

### What teams should do now

- Keep hiring and training junior engineers.
- Use AI to accelerate workflows, not to remove apprenticeship paths.
- Be explicit about where AI is allowed and where human review is mandatory.
- Measure outcomes beyond lines of code: reliability, incident rate, review time, and onboarding success.

### Where I land

AI is useful. I use it, and I think most engineers should learn how to use it well. It helps with learning, prototyping, and some of the repetitive parts of the job.

But it still needs skilled engineers in the loop, and it definitely does not replace the need to grow junior developers. If we cut the apprenticeship path and expect seniors to just supervise generated output forever, we create a long-term talent problem for ourselves.

So my position is simple: use AI as a force multiplier, but keep investing in people.

As with all forecasts, who knows what the future will bring.


[^1]: https://techcrunch.com/2025/04/29/microsoft-ceo-says-up-to-30-of-the-companys-code-was-written-by-ai/
[^2]: https://www.technologyreview.com/2025/12/15/1128352/rise-of-ai-coding-developers-2026/
[^3]: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
[^4]: https://www.prnewswire.com/news-releases/harness-releases-its-state-of-software-delivery-report-developers-excited-by-promise-of-ai-to-combat-burnout-but-security-and-governance-gaps-persist-302345391.html
[^5]: https://www.softwareseni.com/the-hidden-quality-costs-of-ai-generated-code-and-how-to-manage-them/

---

#### Other good reads
https://bootcamps.cs.cmu.edu/blog/will-ai-replace-software-engineers-reality-check
