---
title: "Effective Pull Request Reviews"
description: "Strategies on being more effective on PR reviews. Stop nitpicking and start having value"
tags: ["Pull Request", "Review", "PR Review", "Best Practices"]
date: 2025-11-15
draft: false
excerpt: "Strategies on being more effective on PR reviews. Stop nitpicking and start having value"
est_duration_min: "10"
---

Why is a senior engineer's PR review different from a junior's? It's not just about syntax; it's about strategy. The senior engineer views a pull request not as a feature to check off, but as an opportunity to reinforce system integrity, mentor team members, and prevent future technical debt.

Let’s dive into the three topics that differentiate an effective PR review: System Integrity, Mentorship, and Efficiency.

But first, story time!

If you want a practical version up front, here’s the short version of my PR review flow:

1. Confirm the why before reading code.
2. Review tests, risks, and docs before implementation details.
3. Focus comments on architecture, correctness, and maintainability.
4. Label feedback clearly (`Blocker`, `Suggestion`, `Nit`).
5. Teach through comments and questions, not drive-by rewrites.

---

When I was a junior developer, I had someone on my team that would review every line of code in your PR and nitpick everything in it. This wasn’t alphabetized or that wasn’t descriptive enough. One time he had an initiative to add a comment to every function, even if the function was named getDescription and the comment just said // Gets the description.

It got to the point where I would hope that I would get my PR approvals before he had a chance to look at my code. It was awful!

He is a good engineer, and I would have loved to learn more from him, but it was not happening.

One day, I added a new function to a file that had a bunch of utility functions defined. This particular file was a code smell, and contained a lot of unrelated functions in it. It was basically the junk drawer of our codebase.

The feedback I received in my PR from this engineer was not on the bigger issue of the junk drawer, but to make the file alphabetical by function name. Firstly, none of the functions were in alphabetical order in the first place. Secondly, the functions were kind of grouped by features already, and alphabetizing them would have caused related functions to get separated in the file.

I’m sure you can see the problem here. The real feedback was that we needed to have a better way of organizing these junk drawer functions, but the review was only focused on a random nitpick.

The other problem this caused was a junior engineer (me) avoided this senior engineer as much as possible, and potentially lost a lot of good mentorship opportunities. I would never have approached this developer if I had questions, and instead went to others who had more valuable feedback.

---

As senior developers, we can do better!

### PR Review Playbook (copy/paste)

I use this sequence to keep reviews high value and avoid random nitpicks.

#### 1) Context first

- What problem is this PR solving?
- Is this the right solution for that problem?
- Is there an existing pattern we should reuse?

#### 2) Non-code artifacts

- Is the description clear (what changed, why, risks, rollback)?
- Is the test plan realistic and complete?
- Are docs/runbooks updated where needed?

#### 3) Code review, ordered by impact

- Correctness and edge cases
- Security and data handling
- Performance and scale
- Architecture and maintainability
- Readability/style last

#### 4) Label comments by severity

- `Blocker`: must be fixed before merge (correctness, security, data loss, major design flaws)
  - Ex: A teammate logged a large object that included PII. I labeled it `Blocker` and marked `Requested Changes` so it could not merge until fixed.
- `Suggestion`: strong recommendation, but not required for this merge
  - Ex: A new component name was unclear, so I suggested alternatives. I did not block the PR because the naming issue was meaningful but not high risk.
- `Nit`: polish only
  - Ex: A new function did not include JSDoc. We do not require JSDoc today, so I left it as a `Nit` instead of making it merge-blocking.

Blocker is a heavy label. It's putting your foot down and blocking the merge of this piece of code. As such, it should be reserved for serious issues. When in doubt, go with `Suggestion`!

#### 5) Approve with intent

- Confirm blockers are resolved
- Do not block merge on nits
- Follow up after merge if there is behavior risk

### The Strategic Mindset

The playbook above is the tactical flow. The mindset behind it is simple: optimize for long-term system quality and team growth, not short-term nitpicks.

When reviewing, ask yourself:

- Is this feedback reducing real risk?
- Is it improving maintainability for future engineers?
- Is it teaching the author something useful?

---

### The Technical Deep Dive

- Architecture and Abstraction:
  - Does this change introduce a leaky abstraction?
  - Is the new code placed in the correct layer of the application (e.g., separating business logic from data access)?
  - Does the code follow our normal patterns? Is it unique enough to create its own pattern?
  - Future-Proofing: Does this design choice lock us into a hard-to-change path, or is it flexible?
- Performance and Scale:
  - Are there any "N+1" database queries?
  - Is heavy synchronous processing being done that should be async?
    - I have seen so many developers await multiple independent function calls, when they could have used Promise.all().
  - Could this logic be resource intensive?
- Security and Edge Cases:
  - Where does user input flow? (Checking for SQL injection, XSS, and insecure deserialization).
  - How does the system handle failures (e.g., network timeout, service crash)? Are error messages user-friendly or overly revealing?
  - Are we logging or mishandling Personal Identifiable Information (PII)?
    - A sneaky mistake junior devs tend to make is logging out entire errors or event objects.
- The other good things to do:
  - Are strings, dates, etc, localized?
  - Do any “WTF” moments have comments?
    - This makes me think of the WTF per minute comic. But for this bullet point, if the code causes a “WTF” moment, there should be a helpful comment associated with it.
  - Are we typing appropriately? Do the types make sense and handle the core of the object being typed? Or are they being typed to “just work”.
    - I see this a lot. A developer will call an API, get the response, and create a type/interface/class/etc that includes just the fields they use and name it something specific to their feature. In reality, that response was probably composed by a bunch of different types. When a new feature comes out, a brand new type is constructed, when both features should have used the same type.
  - This list could go on forever. I tried to include the examples I typically see.

---

### The Mentorship Opportunity: Guiding Growth

This is my favorite section, because the PR review is generally where we interact with others the most. It provides a space dedicated to leveling up junior developers. It also helps developers in the future when they read the comment chains.

- Don't Just Fix It, Teach It: Avoid fixing issues in your comments (e.g., "Change line 42 to X"). Instead, ask guiding questions (e.g., "What happens if the array is empty here? Consider adding a guard clause.")
- Ask why: Rather than assuming a decision was wrong because you would do it differently, ask why a decision was made! The author may have already explored your idea and deemed it ineffective. And you may have uncovered a good place to add a comment or documentation.
- Contextualizing Feedback: Explain why a pattern is preferred over another. (e.g., "We prefer using map() here over a traditional for loop because it makes the intent clearer and avoids mutation side effects.")
- Balancing Polish vs. Pragmatism: Decide what is necessary to merge and what is simply a "nice-to-have" polish item (e.g., styling, renaming). Use labels (like "Nits" or "Suggestion") to clarify non-blocking feedback.
  - Ex: “Nit: this block could be its own function”

---

### The Art of Communication: Constructive Feedback

- Tone is Everything: Start with positive reinforcement (e.g., "Great job on tackling this complex interaction!")
- Using "We" Instead of "You": Frame feedback as a shared responsibility (e.g., "We might run into performance issues if this scales," vs. "Your code will perform poorly.").
  - “We” makes you so much more approachable and encourages more conversation, because you aren’t perceived as attacking the PR author.
- Focus on the Code, Not the Coder: Never make comments personal. Always tie feedback back to documentation, company style guides, or established architectural patterns.
  - I love to link to similar code that follows the pattern that I hope the PR author implements. That gives a concrete example just in case there is any confusion.
- Know When to Stop Typing and Start Talking: For complex or contentious issues, end the comment thread and suggest a brief sync-up meeting (in person or video call) to resolve it collaboratively.

---

### The PR Approval

- Final Check: Verify that all major comments have been addressed and that the author has committed the necessary changes.
  - Big emphasis on necessary! If you said “Nit: …”, it’s up to the author to implement it or not. Don’t get hung up on small issues.
- The Post-Merge Responsibility: Your job isn't done. Follow up with the author to ensure they learned from the process. Monitor the merged code briefly if necessary in production/staging environments.

---

Effective PR review is one of the most important tools a senior engineer has for ensuring a high-quality, sustainable codebase. For a more junior engineer, it can feel uncomfortable to share their work with their peers, just like showing a piece of art. Be respectful, kind, and always be in the mindset that we are aiming to teach and not to put down.

Happy coding!
