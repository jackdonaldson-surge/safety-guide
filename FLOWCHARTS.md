# Policy Compliance Decision Flowcharts

This document contains editable versions of the decision flowcharts used in the Safety Risk Guide widget. Edit this file to update the flowchart logic, then update the corresponding HTML in `ultimate-safety-guide.js`.

---

## Policy Compliance Decision Tree

Determine the appropriate response based on request type and toxicity level.

---

### GENERATIVE Requests

Generative requests ask the model to create new content, provide information, or generate responses.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              GENERATIVE REQUEST                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  Check Toxicity Level │
                          └───────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          ▼                           ▼                           ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│ Benign/Dual-Use │         │     Harmful     │         │    Jailbreak    │
└─────────────────┘         └─────────────────┘         └─────────────────┘
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   HARM-FREE     │         │ Does the prompt │         │  FULL REFUSAL   │
│   ENGAGEMENT    │         │ also contain a  │         │                 │
└─────────────────┘         │ safe/benign/    │         └─────────────────┘
                            │ dual-use        │
                            │ request?        │
                            └─────────────────┘
                                      │
                        ┌─────────────┴─────────────┐
                        ▼                           ▼
                      [Yes]                       [No]
                        │                           │
                        ▼                           ▼
              ┌─────────────────┐         ┌─────────────────┐
              │ PARTIAL REFUSAL │         │  FULL REFUSAL   │
              └─────────────────┘         └─────────────────┘
```

---

### NON-GENERATIVE Requests

Non-generative requests involve mechanical transformations: translations, summaries, format conversions, extractions, tone adjustments, etc. The model engages with provided content without adding new substantive information.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NON-GENERATIVE REQUEST                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  Check Toxicity Level │
                          └───────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          ▼                           ▼                           ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│ Benign/Dual-Use │         │     Harmful     │         │    Jailbreak    │
└─────────────────┘         └─────────────────┘         └─────────────────┘
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│    GROUNDED     │         │  Does request   │         │  FULL REFUSAL   │
│   ENGAGEMENT    │         │ amplify/enable/ │         │                 │
└─────────────────┘         │ encourage harm? │         └─────────────────┘
                            └─────────────────┘
                                      │
                        ┌─────────────┴─────────────┐
                        ▼                           ▼
                      [Yes]                       [No]
                        │                           │
                        │                           ▼
                        │                 ┌─────────────────┐
                        │                 │    GROUNDED     │
                        │                 │   ENGAGEMENT    │
                        │                 └─────────────────┘
                        ▼
              ┌─────────────────┐
              │ Does the prompt │
              │ also contain a  │
              │ safe/benign/    │
              │ dual-use        │
              │ request?        │
              └─────────────────┘
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
        [Yes]                       [No]
          │                           │
          ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│ PARTIAL REFUSAL │         │  FULL REFUSAL   │
└─────────────────┘         └─────────────────┘
```

---

## Response Types Definitions

### HARM-FREE ENGAGEMENT
Fully engage with the request. The content is benign or dual-use with legitimate applications.

### GROUNDED ENGAGEMENT
Engage with the mechanical transformation (translate, summarize, extract, etc.) without adding new substantive information. Appropriate when the task doesn't amplify, enable, or encourage harm.

### PARTIAL REFUSAL
Refuse the harmful portion of the request while engaging with safe/benign/dual-use portions. Explain what you can and cannot help with.

### FULL REFUSAL
Decline the entire request. The content is harmful with no safe way to engage, or it's a jailbreak attempt.

---

## Toxicity Levels

### Benign
- No harmful intent or content
- Safe to engage fully
- Examples: educational questions, creative writing, technical help

### Dual-Use
- Ambiguous intent
- Could serve legitimate purposes (research, education, protection) or harmful ones
- Same information could be used defensively or offensively
- A harm-free response is possible

### Harmful
- Clear harmful intent or content
- Requests that could cause real-world harm if fulfilled
- May still contain benign sub-requests that can be addressed

### Jailbreak
- Attempts to bypass safety guidelines
- Manipulation tactics (roleplay, hypotheticals, reverse psychology)
- No harm-free response is possible regardless of framing

---

## Key Decision Question

**"Does the request amplify, enable, or encourage harm?"**

Use this question for non-generative requests involving harmful content:

- **Amplify**: Does fulfilling this make the harmful content more impactful or widespread?
- **Enable**: Does fulfilling this help someone carry out harmful actions?
- **Encourage**: Does fulfilling this normalize or promote harmful behavior?

If the answer to any of these is "yes," treat as harmful even for mechanical transformations.

---

## Editing Instructions

To update these flowcharts in the widget:

1. Edit this document with your changes
2. Open `ultimate-safety-guide.js`
3. Find the `decision-tree` section (search for `class="decision-tree"`)
4. Update the HTML to match your changes
5. Test the changes locally with `test.html`
6. Commit and push to deploy

---

## Version History

- **v1.0** - Initial flowchart documentation
- Updated "benign request" to "safe/benign/dual-use request" in decision nodes
