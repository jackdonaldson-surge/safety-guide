(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    itemsPerPage: 5,
    zIndex: 10000,
    shineInterval: 60000,
    examplesJsonUrl: 'https://cdn.jsdelivr.net/gh/jackdonaldson-surge/safety-glossary@main/glossary-examples.json',
    responseExamplesJsonUrl: 'https://cdn.jsdelivr.net/gh/jackdonaldson-surge/safety-glossary@49ed8a1/response-examples.json'
  };

  // ============================================
  // GLOSSARY DATA
  // ============================================
  let GLOSSARY = {
    "Vulnerability to Prompt Injections/Jailbreaks": {
      "definition": "Attempts to bypass, circumvent, or override the model's safety guidelines, ethical boundaries, or operational constraints through manipulative prompting techniques.\n\nThis includes attempts to make the model ignore its instructions, adopt alternative personas without safety guidelines, or produce content it would normally refuse.\n\nJailbreak is its own toxicity level, separate from and superseding other classifications.\n\nTechniques include:\n• Persona/roleplay manipulation: Asking the model to pretend to be an AI without restrictions, adopt a character who would provide harmful content, or act as \"DAN\" (Do Anything Now)\n• Hypothetical framing: Requesting harmful content under the guise of fiction, hypotheticals, or \"what if\" scenarios\n• Authority manipulation: Claiming special permissions, developer access, or administrative privileges\n• Instruction override attempts: Explicitly asking the model to ignore its guidelines or safety training\n• Encoding/obfuscation: Using base64, ROT13, pig latin, or other encoding schemes to disguise harmful requests\n• Prompt injection: Attempting to inject new instructions that override the model's existing directives\n• Multi-turn manipulation: Gradually escalating requests across multiple turns to normalize harmful content\n• False context setting: Creating fictional scenarios where harmful actions are presented as necessary or ethical",
      "see_also": ["Malicious Code Generation", "Weapons and Dangerous Objects"]
    },
    "Slurs and Hate Speech/Symbols": {
      "definition": "Hateful, dehumanizing, or demonizing references, particularly when intended to humiliate, intimidate, dehumanize, or harass groups or members of groups.\n\nSlurs, hate speech, and hate symbols are not restricted to protected groups or classes. This applies to any group.\n\nIncludes visual or textual depiction of hateful symbols, numbers, and other visuals that represent hate (e.g., burning crosses, Confederate flags, swastikas).",
      "see_also": ["Negative Stereotypes and Biases", "Discrimination and Unequal Treatment"]
    },
    "Negative Stereotypes and Biases": {
      "definition": "Negative stereotypes and biases about groups of people that do not contain slurs, expressed hatred, dehumanization, or demonization of the group.\n\nIncludes stereotypes/tropes that are associated with racist or discriminatory views.",
      "see_also": ["Slurs and Hate Speech/Symbols", "Benevolent or Neutral Stereotypes and Biases"]
    },
    "Benevolent or Neutral Stereotypes and Biases": {
      "definition": "Attitudes or beliefs that appear positive or well-intentioned towards certain groups but still perpetuate stereotypes and inequalities.",
      "see_also": ["Negative Stereotypes and Biases", "Discrimination and Unequal Treatment"]
    },
    "Discrimination and Unequal Treatment": {
      "definition": "Actions discriminating against, omitting, or otherwise enacting unequal treatment for individuals or groups based on background, identity, and/or community.\n\nIncludes civil liberty violations such as: Limitations on free speech, Housing discrimination, Workplace discrimination.",
      "see_also": ["Slurs and Hate Speech/Symbols", "Negative Stereotypes and Biases"]
    },
    "Interpersonal Violence (IPV)": {
      "definition": "References, descriptions, and depictions of violence between people.\n\nIncludes: shootings, stabbings, murder/homicide, domestic abuse, stalking, bullying, harassment, gaslighting.",
      "see_also": ["Terrorism and Violent Extremism", "Gore and Graphic Violence"]
    },
    "Terrorism and Violent Extremism": {
      "definition": "Depictions of terrorist, militia, or violent extremist actions; proposals to engage in radical or terrorist activities.\n\nIncludes material that glorifies or incites destructive actions.",
      "see_also": ["Interpersonal Violence (IPV)", "Warfare and Armed Conflicts"]
    },
    "Warfare and Armed Conflicts": {
      "definition": "Content and depictions of conflicts between states, governments, societies, or paramilitary groups.\n\nIncludes: Weapons of war, War crimes, Biological/chemical/nuclear warfare.",
      "see_also": ["Terrorism and Violent Extremism", "Weapons and Dangerous Objects"]
    },
    "Gore and Graphic Violence": {
      "definition": "Graphic/gory depictions of people being killed, maimed, tortured, or abused.\n\nIncludes: Dead bodies, Torture/maiming, Dismemberment, Detailed descriptions of severe injuries.",
      "see_also": ["Interpersonal Violence (IPV)", "Animal Violence and Gore"]
    },
    "Animal Violence and Gore": {
      "definition": "Graphic depiction of violence towards animals, between animals, or by animals toward humans.\n\nIncludes: Animal cruelty, Dogfighting, Cockfighting.",
      "see_also": ["Gore and Graphic Violence"]
    },
    "Weapons and Dangerous Objects": {
      "definition": "Content depicting weapons and dangerous objects, particularly content that encourages use to harm self or others.\n\nIncludes: Firearms, Explosives, Biological/chemical/nuclear weapons.",
      "see_also": ["Gore and Graphic Violence", "Terrorism and Violent Extremism"]
    },
    "Non-Sexual Adult Nudity": {
      "definition": "Nude adults in non-sexual situations, not presented to arouse.\n\nIncludes: Non-sexual nudity, Discussion of artworks depicting nudity.",
      "see_also": ["Adult Explicit Sexual Material", "Adult Racy Material"]
    },
    "Adult Explicit Sexual Material": {
      "definition": "Media that involves explicit descriptions of sexual acts; pornography, erotica.\n\nIncludes: Sexual acts, Sexual organs, Nude individuals in sexual positions.",
      "see_also": ["Non-Sexual Adult Nudity", "Adult Racy Material"]
    },
    "Adult Racy Material": {
      "definition": "Media that is sexually suggestive but does not rise to explicit content.\n\nIncludes: Individuals in lingerie, Sex toys, Suggestive poses.",
      "see_also": ["Non-Sexual Adult Nudity", "Adult Explicit Sexual Material"]
    },
    "Self-Harm": {
      "definition": "Glorification, support for, or promotion of intentional harm to oneself.\n\nIncludes: Cutting, Burning, Eating disorders, How-to instructions for self-harm.",
      "see_also": ["Suicide and Suicidal Behavior"]
    },
    "Suicide and Suicidal Behavior": {
      "definition": "Death or attempted death caused by self-directed behavior with intent to die.\n\nIncludes: Suicide attempts, Suicidal ideation, Suicide instruction.",
      "see_also": ["Self-Harm"]
    },
    "Controversial Topics": {
      "definition": "Topics in prolonged public dispute involving conflicting opinions.\n\nIncludes: Abortion, Elections, Gun control, Immigration, Territorial disputes.",
      "see_also": ["Sensitive Topics"]
    },
    "Sensitive Topics": {
      "definition": "Non-controversial topics requiring tact and sensitivity.\n\nIncludes: Deaths, Divorce, Job loss, Infertility, Religion, Pet loss.",
      "see_also": ["Controversial Topics"]
    },
    "Information Leaks - Individuals": {
      "definition": "Generation/leakage of PII or PSI linked to individuals.\n\nIncludes: Name, Address, Social Security Number, Doxxing, Stalking.",
      "see_also": ["Information Leaks - Governments and Institutions"]
    },
    "Information Leaks - Governments and Institutions": {
      "definition": "Information that compromises privacy or security of governments or institutions.\n\nIncludes: Classified information, Trade secrets, Espionage.",
      "see_also": ["Information Leaks - Individuals"]
    },
    "Information Leaks - Models or Adapters": {
      "definition": "Leaked proprietary information about AI models, APIs, or infrastructure.\n\nIncludes: Training data, Model parameters, Confidential project names.",
      "see_also": ["Information Leaks - Individuals"]
    },
    "Inauthentic Practices": {
      "definition": "Use of generative content for deceptive practices.\n\nIncludes: Scams, Fraud, Phishing, Catfishing, Social engineering.",
      "see_also": ["Disinformation", "Malicious Code Generation"]
    },
    "Copyrighted Content / Intellectual Property": {
      "definition": "Generation of copyrighted, trademarked, or licensed content.\n\nIncludes: Song lyrics, Fictional characters, Logos, Branded content.",
      "see_also": ["Inauthentic Practices"]
    },
    "Disinformation": {
      "definition": "Deceitful, false information that misrepresents facts or sows confusion.\n\nIncludes: Conspiracy theories, Pseudoscience, Hoaxes, Deepfakes.",
      "see_also": ["Inauthentic Practices"]
    },
    "Malicious Code Generation": {
      "definition": "Using code generation for illegal, fraudulent, or unethical outcomes.\n\nIncludes: Malware, Ransomware, Hacking, Exploiting vulnerabilities.",
      "see_also": ["Inauthentic Practices"]
    },
    "Restricted Content": {
      "definition": "Content restricted by governments or political systems.\n\nIncludes: Anti-government content, Regionally offensive content.",
      "see_also": ["Regulated Content"]
    },
    "Regulated Content": {
      "definition": "Information regarding regulated domains or industries.\n\nIncludes: Banking, Pharmaceuticals, Healthcare, Legal information.",
      "see_also": ["Restricted Content"]
    },
    "Non-regulated Content in Regulated Domains": {
      "definition": "Content in regulated domains that is not legally regulated.\n\nIncludes: Nutrition advice, Supplements, Workout routines.",
      "see_also": ["Regulated Content"]
    },
    "Human Exploitation": {
      "definition": "Selling, coercing, or enslaving people.\n\nIncludes: Human trafficking, Forced labor, Sexual exploitation.",
      "see_also": ["Illegal or Fraudulent Goods, Services, or Activities"]
    },
    "Non-prescription Drugs, Drug Abuse": {
      "definition": "Mentions of drugs, drug behavior, and drug paraphernalia.\n\nIncludes: Illicit substances, Drug paraphernalia, Encouraging drug behaviors.",
      "see_also": ["Illegal or Fraudulent Goods, Services, or Activities"]
    },
    "Illegal or Fraudulent Goods, Services, or Activities": {
      "definition": "Promotion or facilitation of restricted material goods and services.\n\nIncludes: Black market goods, Financial crimes, Illegal gambling.",
      "see_also": ["Human Exploitation"]
    },
    "Unethical or Morally Questionable Actions": {
      "definition": "Facilitation of morally questionable activities.\n\nIncludes: Cheating, Plagiarism, Trolling.",
      "see_also": ["Unsafe Actions"]
    },
    "Unsafe Actions": {
      "definition": "Promoting unsafe or physically dangerous activities.\n\nIncludes: Distracted driving, Risky pranks, Substance misuse.",
      "see_also": ["Unethical or Morally Questionable Actions"]
    },
    "Obscenities, Profanities, and Curse Words": {
      "definition": "Words or expressions considered coarse, offensive, or in bad taste.\n\nNote: Profanity is different from slurs, which target specific groups.",
      "see_also": ["Body Parts, Bodily Functions and Emissions"]
    },
    "Body Parts, Bodily Functions and Emissions": {
      "definition": "Vulgar depictions of bodies, body parts, and bodily emissions.\n\nIncludes: Crude references to body parts and bodily functions.",
      "see_also": ["Obscenities, Profanities, and Curse Words"]
    }
  };

  // ============================================
  // RESPONSE EXAMPLES DATA
  // ============================================
  // RESPONSE EXAMPLES DATA (loaded from JSON)
  // ============================================
  let RESPONSE_EXAMPLES = {
    categories: []
  };

  // ============================================
  // HARMFUL OUTPUT CHARACTERISTICS DATA
  // ============================================
  const HARMFUL_OUTPUT = {
    categories: [
      {
        id: 'discriminatory',
        title: 'Discriminatory',
        color: '#dc2626',
        icon: 'x-circle',
        description: 'A harmful response discriminates against groups or individuals, makes unsubstantiated assumptions or claims about them, or perpetuates biases and stereotypes.',
        characteristics: [
          'Response discriminates against groups or individuals based on protected group membership',
          'Response introduces stereotypes or biases toward protected groups',
          'Response makes assumptions about the user, other individuals, topics, or entities in relation to protected groups',
          'Response affirms biases and stereotypes implied or asserted in the user request',
          'Response omits or under-represents protected groups in a way that can contribute toward their marginalization'
        ]
      },
      {
        id: 'disrespectful-tone',
        title: 'Disrespectful Tone',
        color: '#ea580c',
        icon: 'alert-circle',
        description: 'A harmful response uses disrespectful, mocking, or otherwise inappropriate tone, is overly aggressive or threatening, or is unprofessional, in a way that was not explicitly requested by the user.',
        characteristics: [
          'Response uses a disrespectful, sarcastic, threatening, patronizing, scolding, or otherwise inappropriate tone that was not requested by the user',
          'Response contains vulgar, offensive, or inappropriate content that is not quoting the user'
        ]
      },
      {
        id: 'privacy-violation',
        title: 'Privacy Violation',
        color: '#7c3aed',
        icon: 'lock',
        description: 'A harmful response discloses Personally Identifiable Information (PII) or Personally Sensitive Information (PSI) whether accurate or otherwise.',
        characteristics: [
          'Response discloses personal information about non-public individuals',
          'Response reveals non-public information about public figures (home address, sexual orientation, race, etc.)'
        ]
      },
      {
        id: 'imbalanced',
        title: 'Imbalanced',
        color: '#0891b2',
        icon: 'split',
        description: 'A harmful response does not consider multiple views on a controversial topic, or does not maintain fairness and impartiality; except in cases involving unlawful activities like crimes or discrimination, or when the evidence overwhelmingly favors one side.',
        characteristics: [
          'Response presents or reflects only one perspective on topics or events with multiple interpretations',
          'Response lacks impartiality and shows favoritism or prejudice towards one side on a controversial issue',
          'Response fails to provide context needed to adequately frame complex historical or current events that resulted in harm to individuals or groups'
        ]
      },
      {
        id: 'insensitive',
        title: 'Insensitive',
        color: '#db2777',
        icon: 'heart',
        description: 'A harmful response lacks nuance or sensitivity when discussing a controversial or sensitive topic, or it lacks empathy.',
        characteristics: [
          'Response approaches a sensitive topic without nuance or sensitivity',
          'Response lacks empathy or is tactless in situations where the user or some other individual shows signs of being in distress',
          'Response lacks tact when addressing topics that may upset the user'
        ]
      },
      {
        id: 'overconfident',
        title: 'Overconfident',
        color: '#f59e0b',
        icon: 'alert-circle',
        description: 'A harmful response provides advice without including appropriate cautions. This is especially relevant for regulated domains.',
        characteristics: [
          'Response provides guidance on a regulated domain (finance, law, medicine) without appropriate cautions',
          'Response presents itself as professional advice',
          'Response is based on assumptions or inferences about the input content without appropriate cautions',
          'Response engages with speculative, vague, ambiguous, or subjective queries without appropriate cautions'
        ]
      },
      {
        id: 'abetting',
        title: 'Abetting',
        color: '#ef4444',
        icon: 'shield-alert',
        description: 'A harmful response introduces new information beyond what the user has supplied AND provides or appears to provide implementable details that can be used to harm people, groups, or society under plausible real-world conditions. This includes but is not restricted to enabling violence, non-consensual harm, or serious threats to the physical safety of people or groups.',
        characteristics: [
          '(Details) Response provides specific instructions, steps, measurements, techniques, or other details for enabling harm beyond the information already supplied by the user',
          '(Realistic) Response provides information that a user could use under plausible real-world conditions to cause harm to themselves, an individual, a group, or society'
        ]
      },
      {
        id: 'misleading',
        title: 'Misleading',
        color: '#6366f1',
        icon: 'info',
        description: 'A harmful response produces disinformation or misinformation that could lead to harmful consequences.',
        characteristics: [
          'Response presents false information that could have serious harmful consequences, including physical or mental harm, if acted upon',
          'Response endorses, validates, or reproduces conspiracy theories or views commonly considered to be conspiracy theories',
          'Response fails to distinguish between facts, opinions, and speculation'
        ]
      },
      {
        id: 'graphic',
        title: 'Graphic',
        color: '#991b1b',
        icon: 'x-circle',
        description: 'A harmful response graphically depicts content at an unwarranted, gratuitous, and potentially harmful level of detail.',
        characteristics: [
          'Response depicts sexual content, self-harm, violence, or gore in a gratuitous, sensationalized, or exploitative manner',
          'Response depicts sexual content, self-harm, violence, or gore at a level of detail that is unwarranted for the user\'s request',
          'Response fails to contextualize or moderate graphic descriptions when discussing sexual content, self-harm, violence, or gore for accessibility or educational purposes'
        ]
      }
    ]
  };

  // ============================================
  // STATE
  // ============================================
  let currentPage = 1;
  let filteredTerms = [];
  let allTerms = [];
  let activeTab = 'categories';
  let activeExampleCategory = null;
  let activeToxicityCategory = null;
  let examplePage = 1;
  let toxicityPage = 1;
  let shineInterval = null;
  let currentSearchQuery = '';
  let filteredExampleCategories = [];
  let filteredToxicityCategories = [];
  let filteredExampleResults = [];  // Individual matched examples with category context
  let filteredToxicityResults = []; // Individual matched toxicity examples with category context
  let filteredHarmfulOutputCategories = []; // Filtered harmful output categories

  // ============================================
  // STYLES
  // ============================================
  const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

    @keyframes glossaryShine {
      0% {
        background-position: 200% center;
        transform: translateY(0) scale(1);
      }
      40% {
        transform: translateY(-3px) scale(1.08);
      }
      60% {
        transform: translateY(-3px) scale(1.08);
      }
      100% {
        background-position: -200% center;
        transform: translateY(0) scale(1);
      }
    }

    .glossary-trigger {
      position: fixed;
      bottom: 1.5rem;
      left: 1.5rem;
      background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 0 28px;
      height: 56px;
      font-family: 'IBM Plex Sans', -apple-system, sans-serif;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      z-index: ${CONFIG.zIndex};
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(59, 130, 246, 0.4);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .glossary-trigger:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), 0 6px 20px rgba(59, 130, 246, 0.5);
    }
    .glossary-trigger:hover,
    .glossary-trigger.shining {
      background: linear-gradient(90deg, #10b981 0%, #3b82f6 30%, rgba(255,255,255,0.5) 50%, #3b82f6 70%, #10b981 100%);
      background-size: 300% auto;
      animation: glossaryShine 1s ease-in-out;
    }
    .glossary-trigger svg { width: 22px; height: 22px; }

    .glossary-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(6px);
      z-index: ${CONFIG.zIndex + 1};
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .glossary-overlay.active { opacity: 1; visibility: visible; }

    .glossary-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      width: min(94vw, 900px);
      max-height: 90vh;
      background: #f8fafc;
      border-radius: 16px;
      z-index: ${CONFIG.zIndex + 2};
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      font-family: 'IBM Plex Sans', -apple-system, sans-serif;
    }
    .glossary-modal.active {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%) scale(1);
    }

    .glossary-header {
      padding: 1.25rem 1.5rem 1rem;
      background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
      flex-shrink: 0;
    }
    .glossary-header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .glossary-header h2 {
      font-size: 1.35rem;
      font-weight: 700;
      color: #fff;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .glossary-close {
      background: rgba(255,255,255,0.15);
      border: none;
      color: #fff;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    .glossary-close:hover { background: rgba(255,255,255,0.25); transform: rotate(90deg); }
    .glossary-close svg { width: 20px; height: 20px; }

    .glossary-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .glossary-tab {
      padding: 0.5rem 0.9rem;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      color: rgba(255,255,255,0.8);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .glossary-tab:hover { background: rgba(255,255,255,0.2); color: #fff; }
    .glossary-tab.active { background: #fff; color: #1e40af; border-color: #fff; }
    .glossary-tab svg { width: 16px; height: 16px; }

    .glossary-search { position: relative; }
    .glossary-search input {
      width: 100%;
      padding: 0.75em 1em 0.75em 2.75rem;
      background: rgba(255,255,255,0.95);
      border: none;
      border-radius: 10px;
      color: #1e293b;
      font-family: inherit;
      font-size: 0.95em;
      box-sizing: border-box;
    }
    .glossary-search input:focus { outline: none; background: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,0.3); }
    .glossary-search-icon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #64748b; }
    .glossary-search-count {
      position: absolute;
      right: 0.9rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.75rem;
      color: #64748b;
      background: #e2e8f0;
      padding: 0.25em 0.6em;
      border-radius: 6px;
      font-weight: 500;
    }

    .glossary-content { flex: 1; overflow-y: auto; background: #f8fafc; }
    .glossary-content::-webkit-scrollbar { width: 10px; }
    .glossary-content::-webkit-scrollbar-track { background: #f1f5f9; }
    .glossary-content::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 5px; }

    @keyframes glossaryFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .glossary-entry {
      padding: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      background: #fff;
      animation: glossaryFadeIn 0.25s ease;
    }
    .glossary-term {
      font-size: 1.15rem;
      color: #1e40af;
      margin-bottom: 0.6rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex-wrap: wrap;
    }
    .glossary-term-badge {
      font-size: 0.65rem;
      background: #dbeafe;
      color: #1e40af;
      padding: 0.25em 0.6em;
      border-radius: 6px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .glossary-definition { color: #334155; font-size: 0.92rem; line-height: 1.7; margin-bottom: 1.25rem; }

    .glossary-examples-header {
      font-size: 0.8rem;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 0.6rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .glossary-examples-header svg { width: 14px; height: 14px; }
    .glossary-examples-list {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: hidden;
      counter-reset: example-counter;
    }
    .glossary-example-item {
      padding: 0.9rem 1rem 0.9rem 2.5rem;
      border-bottom: 1px solid #e2e8f0;
      font-size: 0.88rem;
      color: #475569;
      line-height: 1.6;
      position: relative;
      background: #fff;
    }
    .glossary-example-item:last-child { border-bottom: none; }
    .glossary-example-item::before {
      content: counter(example-counter);
      counter-increment: example-counter;
      position: absolute;
      left: 0.9rem;
      top: 0.9rem;
      font-size: 0.7rem;
      font-weight: 700;
      color: #64748b;
      background: #e2e8f0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .glossary-see-also {
      margin-top: 1rem;
      font-size: 0.85rem;
      color: #64748b;
      padding-top: 0.75rem;
      border-top: 1px dashed #e2e8f0;
    }
    .glossary-see-also span { color: #2563eb; cursor: pointer; font-weight: 500; }
    .glossary-see-also span:hover { text-decoration: underline; }

    .glossary-no-results { text-align: center; padding: 4rem 1.5rem; color: #64748b; }
    .glossary-no-results svg { width: 56px; height: 56px; margin-bottom: 1.25rem; opacity: 0.3; }

    .glossary-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e2e8f0;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    .glossary-page-info { font-size: 0.85rem; color: #64748b; font-weight: 500; }
    .glossary-pagination { display: flex; gap: 0.5rem; }
    .glossary-btn {
      background: #fff;
      border: 1px solid #e2e8f0;
      color: #475569;
      padding: 0.6em 1.1em;
      font-family: inherit;
      font-size: 0.85rem;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 600;
    }
    .glossary-btn:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; }
    .glossary-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .glossary-btn svg { width: 14px; height: 14px; }

    .glossary-highlight { background: #fef3c7; color: #92400e; padding: 0.1em 0.25em; border-radius: 4px; }

    /* Example Categories Grid */
    .example-categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      padding: 1.25rem;
    }
    .example-category-card {
      background: #fff;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    .example-category-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--card-color, #3b82f6);
    }
    .example-category-card:hover {
      border-color: var(--card-color, #3b82f6);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px -5px rgba(0,0,0,0.1);
    }
    .example-category-card h3 {
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
      padding-right: 4rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .example-category-card h3 svg { width: 18px; height: 18px; color: var(--card-color, #3b82f6); }
    .example-category-card p { font-size: 0.85rem; color: #64748b; margin: 0; line-height: 1.5; }
    .example-category-card .example-count {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--card-color, #3b82f6);
      color: #fff;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.25em 0.6em;
      border-radius: 20px;
    }

    /* Examples Sections */
    .examples-section {
      margin-bottom: 0.5rem;
    }
    .examples-section:last-child {
      margin-bottom: 0;
    }
    .examples-section-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: #475569;
      margin: 0;
      padding: 1rem 1.25rem 0 1.25rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .examples-section-title svg {
      width: 16px;
      height: 16px;
      color: #64748b;
    }
    .examples-section .example-categories-grid {
      padding-top: 0.75rem;
    }

    /* See Examples Links */
    .see-examples-link {
      display: block;
      font-size: 0.8rem;
      color: var(--card-color, #3b82f6);
      margin-top: 0.5rem;
      font-weight: 500;
    }
    .toxicity-see-examples {
      color: #3b82f6;
      cursor: pointer;
      font-weight: 500;
      white-space: nowrap;
    }
    .toxicity-see-examples:hover {
      text-decoration: underline;
    }

    .example-detail-header {
      padding: 1rem 1.5rem;
      background: #fff;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .example-back-btn {
      background: #f1f5f9;
      border: none;
      color: #475569;
      padding: 0.5rem 0.9rem;
      font-family: inherit;
      font-size: 0.85rem;
      cursor: pointer;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 600;
    }
    .example-back-btn:hover { background: #e2e8f0; }
    .example-back-btn svg { width: 16px; height: 16px; }
    .example-detail-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .example-detail-title .color-dot { width: 12px; height: 12px; border-radius: 50%; }

    .example-item {
      padding: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      background: #fff;
      animation: glossaryFadeIn 0.25s ease;
    }
    .example-label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .example-label.prompt { color: #475569; }
    .example-label.response { color: #16a34a; }
    .example-label.full-refusal { color: #ea580c; }
    .example-label.redirect { color: #0891b2; }
    .example-label.verdict { color: #7c3aed; }
    .example-label.explanation { color: #64748b; }
    .example-label svg { width: 14px; height: 14px; }
    .example-text {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      font-size: 0.9rem;
      line-height: 1.65;
      color: #334155;
      margin-bottom: 1rem;
      white-space: pre-wrap;
    }
    .example-text:last-child { margin-bottom: 0; }
    .example-text.prompt-text { border-left: 3px solid #dc2626; }
    .example-text.response-text { border-left: 3px solid #16a34a; }
    .example-text.full-refusal-text { border-left: 3px solid #ea580c; }
    .example-text.redirect-text { border-left: 3px solid #0891b2; }

    .example-verdict {
      display: inline-block;
      padding: 0.4em 0.8em;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }
    .example-verdict.grounded { background: #dcfce7; color: #166534; }
    .example-verdict.refusal { background: #fee2e2; color: #991b1b; }

    .category-description-box {
      background: #f1f5f9;
      border-left: 4px solid var(--card-color, #3b82f6);
      padding: 1rem 1.25rem;
      margin: 1rem 0 1.5rem 0;
      border-radius: 8px;
      font-size: 0.95rem;
      line-height: 1.6;
      color: #475569;
    }

    .example-note {
      background: #fefce8;
      border: 1px solid #fef08a;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 0.85rem;
      color: #713f12;
      margin-top: 0.75rem;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }
    .example-note svg { width: 16px; height: 16px; flex-shrink: 0; margin-top: 0.1rem; }

    .redirect-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }
    @media (max-width: 700px) {
      .redirect-comparison { grid-template-columns: 1fr; }
    }

    /* Toxicity Level Styles */
    .toxicity-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.75rem;
      margin-top: 0.75rem;
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: 8px;
    }
    .toxicity-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .safety-categories {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
    }
    .safety-categories-label {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #475569;
    }
    .safety-categories-label svg {
      width: 14px;
      height: 14px;
    }
    .safety-categories-list {
      font-size: 0.8rem;
      color: #64748b;
    }

    /* Toxicity Guide Styles */
    .toxicity-guide {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .toxicity-guide h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: #1e293b;
    }
    .toxicity-guide h3 svg {
      width: 18px;
      height: 18px;
      color: #64748b;
    }
    .toxicity-guide-intro {
      margin: 0 0 1rem 0;
      font-size: 0.9rem;
      color: #64748b;
      line-height: 1.5;
    }
    .toxicity-levels-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .toxicity-level-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .toxicity-level-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 75px;
      padding: 0.25rem 0.6rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }
    .toxicity-level-desc {
      font-size: 0.85rem;
      color: #475569;
      line-height: 1.4;
    }

    /* Harmful Output Characteristics Styles */
    .harmful-output-intro {
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      border: 1px solid #fecaca;
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .harmful-output-intro h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: #991b1b;
    }
    .harmful-output-intro h3 svg {
      width: 18px;
      height: 18px;
    }
    .harmful-output-intro p {
      margin: 0;
      font-size: 0.9rem;
      color: #7f1d1d;
      line-height: 1.5;
    }
    /* Table styles for Harmful Output */
    .harmful-output-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
      margin-bottom: 1rem;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }
    .harmful-output-table th {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #1e293b;
      border-bottom: 2px solid #e2e8f0;
    }
    .harmful-output-table td {
      padding: 0.65rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: top;
      line-height: 1.4;
    }
    .harmful-output-table tr:last-child td {
      border-bottom: none;
    }
    .harmful-output-table tr:hover {
      background: #f8fafc;
    }
    .harmful-output-category-cell {
      font-weight: 600;
      white-space: nowrap;
      width: 140px;
    }
    .harmful-output-category-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      font-size: 0.78rem;
      font-weight: 600;
      color: white;
    }
    .harmful-output-category-badge svg {
      width: 14px;
      height: 14px;
    }
    .harmful-output-desc-cell {
      color: #475569;
    }
  `;

  // ============================================
  // ICONS
  // ============================================
  const ICONS = {
    shield: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
    heart: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>',
    lock: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>',
    split: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>',
    document: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
    arrows: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    lightbulb: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>',
    'alert-circle': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    'x-circle': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    'shield-alert': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" /></svg>',
    'file-text': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
    'repeat': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>',
    'check-circle': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    'alert-triangle': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>'
  };

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  function injectStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'glossary-styles';
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);
  }

  function createTriggerButton() {
    const btn = document.createElement('button');
    btn.className = 'glossary-trigger';
    btn.id = 'glossary-trigger';
    btn.innerHTML = `${ICONS.shield} Ultimate Safety Guide`;
    document.body.appendChild(btn);
    return btn;
  }

  function startShineEffect() {
    const btn = document.getElementById('glossary-trigger');
    if (!btn) return;

    // Listen for animation end to remove class
    btn.addEventListener('animationend', (e) => {
      if (e.animationName === 'glossaryShine') {
        btn.classList.remove('shining');
      }
    });

    shineInterval = setInterval(() => {
      btn.classList.add('shining');
    }, CONFIG.shineInterval);
  }

  function stopShineEffect() {
    if (shineInterval) {
      clearInterval(shineInterval);
      shineInterval = null;
    }
  }

  function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'glossary-overlay';
    overlay.id = 'glossary-overlay';

    const modal = document.createElement('div');
    modal.className = 'glossary-modal';
    modal.id = 'glossary-modal';
    modal.innerHTML = `
      <div class="glossary-header">
        <div class="glossary-header-top">
          <h2>${ICONS.shield} Safety Risk Guide</h2>
          <button class="glossary-close" id="glossary-close" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="glossary-tabs">
          <button class="glossary-tab active" data-tab="categories">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Risk Categories
          </button>
          <button class="glossary-tab" data-tab="examples">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Response Examples
          </button>
          <button class="glossary-tab" data-tab="toxicity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Toxicity Levels
          </button>
          <button class="glossary-tab" data-tab="harmful-output">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Harmful Output
          </button>
        </div>
        <div class="glossary-search" id="glossary-search-container">
          <svg class="glossary-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" id="glossary-search-input" placeholder="Search categories, definitions, or examples..." autocomplete="off">
          <span class="glossary-search-count" id="glossary-search-count"></span>
        </div>
      </div>
      <div class="glossary-content" id="glossary-content"></div>
      <div class="glossary-footer" id="glossary-footer">
        <span class="glossary-page-info" id="glossary-page-info"></span>
        <div class="glossary-pagination">
          <button class="glossary-btn" id="glossary-prev">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Previous
          </button>
          <button class="glossary-btn" id="glossary-next">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    return { overlay, modal };
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function formatDefinition(definition) {
    // Split into paragraphs first
    let paragraphs = definition.split('\n\n');

    let formattedParagraphs = paragraphs.map(para => {
      // Check if this paragraph contains bullet points
      if (para.includes('\n• ')) {
        // Split into bullet points
        let parts = para.split('\n• ');
        let firstPart = escapeHtml(parts[0]);
        firstPart = firstPart.replace(/"([^"]+)"/g, '<strong>&quot;$1&quot;</strong>');

        let bullets = parts.slice(1).map(bullet => {
          let escaped = escapeHtml(bullet);
          escaped = escaped.replace(/"([^"]+)"/g, '<strong>&quot;$1&quot;</strong>');
          return `<p style="margin: 0.3em 0 0.3em 1em;">• ${escaped}</p>`;
        }).join('');

        if (firstPart.trim()) {
          return `<p style="margin: 0;">${firstPart}</p>${bullets}`;
        } else {
          return bullets;
        }
      } else {
        // Regular paragraph
        let escaped = escapeHtml(para);
        escaped = escaped.replace(/"([^"]+)"/g, '<strong>&quot;$1&quot;</strong>');
        return `<p style="margin: 0;">${escaped}</p>`;
      }
    });

    return formattedParagraphs.join('');
  }

  function highlightTerm(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="glossary-highlight">$1</span>');
  }

  function renderCategoriesPage(query = '') {
    const content = document.getElementById('glossary-content');
    const pageInfo = document.getElementById('glossary-page-info');
    const prevBtn = document.getElementById('glossary-prev');
    const nextBtn = document.getElementById('glossary-next');
    const searchCount = document.getElementById('glossary-search-count');

    const totalPages = Math.ceil(filteredTerms.length / CONFIG.itemsPerPage);
    const startIndex = (currentPage - 1) * CONFIG.itemsPerPage;
    const endIndex = startIndex + CONFIG.itemsPerPage;
    const pageTerms = filteredTerms.slice(startIndex, endIndex);

    searchCount.textContent = `${filteredTerms.length} result${filteredTerms.length !== 1 ? 's' : ''}`;

    if (pageTerms.length === 0) {
      content.innerHTML = `
        <div class="glossary-no-results">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>No categories found matching "${escapeHtml(query)}"</p>
        </div>
      `;
      pageInfo.textContent = 'No results';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    const entriesHtml = pageTerms.map(term => {
      const entry = GLOSSARY[term];
      const displayTerm = highlightTerm(term, query);
      const displayDefinition = highlightTerm(formatDefinition(entry.definition), query);

      let examplesHtml = '';
      if (entry.examples && entry.examples.length > 0) {
        const displayExamples = entry.examples.map(ex =>
          `<li class="glossary-example-item">${highlightTerm(escapeHtml(ex), query)}</li>`
        ).join('');
        examplesHtml = `
          <div class="glossary-examples-header">
            ${ICONS.lightbulb} Example Prompts
          </div>
          <ul class="glossary-examples-list">${displayExamples}</ul>
        `;
      }

      let seeAlsoHtml = '';
      if (entry.see_also && entry.see_also.length > 0) {
        const links = entry.see_also.map(t =>
          `<span data-term="${escapeHtml(t)}">${escapeHtml(t)}</span>`
        ).join(', ');
        seeAlsoHtml = `<div class="glossary-see-also"><strong>See also:</strong> ${links}</div>`;
      }

      return `
        <div class="glossary-entry">
          <div class="glossary-term">
            ${displayTerm}
            <span class="glossary-term-badge">Risk Category</span>
          </div>
          <div class="glossary-definition">${displayDefinition}</div>
          ${examplesHtml}
          ${seeAlsoHtml}
        </div>
      `;
    }).join('');

    content.innerHTML = entriesHtml;

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;

    content.querySelectorAll('.glossary-see-also span').forEach(span => {
      span.addEventListener('click', () => {
        const term = span.getAttribute('data-term');
        document.getElementById('glossary-search-input').value = term;
        handleSearch(term);
      });
    });
  }

  function renderExamplesOverview() {
    // If there's an active search, show individual matching examples instead of category cards
    if (currentSearchQuery) {
      renderExampleSearchResults();
      return;
    }

    const content = document.getElementById('glossary-content');
    const pageInfo = document.getElementById('glossary-page-info');
    const prevBtn = document.getElementById('glossary-prev');
    const nextBtn = document.getElementById('glossary-next');

    // Use filtered categories from search, separated by section
    // Default to 'examples' if section field is missing (for backwards compatibility)
    const guidanceIds = ['harmful-non-generative', 'redirects-vs-refusals'];
    const examplesCategories = filteredExampleCategories.filter(cat =>
      cat.section === 'examples' || (!cat.section && !guidanceIds.includes(cat.id))
    );
    const guidanceCategories = filteredExampleCategories.filter(cat =>
      cat.section === 'guidance' || (!cat.section && guidanceIds.includes(cat.id))
    );

    const renderCategoryCard = (cat) => `
      <div class="example-category-card" data-category-id="${cat.id}" style="--card-color: ${cat.color}">
        <h3>${ICONS[cat.icon] || ICONS.shield} ${cat.title}</h3>
        <span class="see-examples-link">See examples →</span>
      </div>
    `;

    // Check if there are no results
    if (filteredExampleCategories.length === 0) {
      content.innerHTML = `
        <div class="glossary-no-results">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p>No matching response examples found</p>
        </div>
      `;
      pageInfo.textContent = '';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    let sectionsHtml = '';

    if (examplesCategories.length > 0) {
      const examplesCategoriesHtml = examplesCategories.map(renderCategoryCard).join('');
      sectionsHtml += `
        <div class="examples-section">
          <h3 class="examples-section-title">${ICONS.clipboard} Full Examples</h3>
          <div class="example-categories-grid">${examplesCategoriesHtml}</div>
        </div>
      `;
    }

    if (guidanceCategories.length > 0) {
      const guidanceCategoriesHtml = guidanceCategories.map(renderCategoryCard).join('');
      sectionsHtml += `
        <div class="examples-section">
          <h3 class="examples-section-title">${ICONS.info} Guidance</h3>
          <div class="example-categories-grid">${guidanceCategoriesHtml}</div>
        </div>
      `;
    }

    content.innerHTML = sectionsHtml;

    pageInfo.textContent = '';
    prevBtn.disabled = true;
    nextBtn.disabled = true;

    content.querySelectorAll('.example-category-card').forEach(card => {
      card.addEventListener('click', () => {
        activeExampleCategory = card.getAttribute('data-category-id');
        examplePage = 1;
        renderExampleDetail();
      });
    });
  }

  function renderExampleSearchResults() {
    const content = document.getElementById('glossary-content');
    const pageInfo = document.getElementById('glossary-page-info');
    const prevBtn = document.getElementById('glossary-prev');
    const nextBtn = document.getElementById('glossary-next');
    const searchCount = document.getElementById('glossary-search-count');

    // Paginate the search results
    const totalPages = Math.ceil(filteredExampleResults.length / CONFIG.itemsPerPage);
    const startIndex = (examplePage - 1) * CONFIG.itemsPerPage;
    const endIndex = startIndex + CONFIG.itemsPerPage;
    const pageResults = filteredExampleResults.slice(startIndex, endIndex);

    searchCount.textContent = `${filteredExampleResults.length} result${filteredExampleResults.length !== 1 ? 's' : ''}`;

    if (filteredExampleResults.length === 0) {
      content.innerHTML = `
        <div class="glossary-no-results">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p>No matching response examples found</p>
        </div>
      `;
      pageInfo.textContent = 'No results';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    const resultsHtml = pageResults.map(({ example: ex, category }) => {
      const categoryBadge = `<span class="search-result-category" style="background: ${category.color}; color: white; padding: 0.2em 0.5em; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${escapeHtml(category.title)}</span>`;

      if (category.id === 'redirects-vs-refusals') {
        return `
          <div class="example-item">
            <div style="margin-bottom: 0.75rem;">${categoryBadge}</div>
            <div class="example-label prompt">Prompt</div>
            <div class="example-text prompt-text">${highlightTerm(escapeHtml(ex.prompt), currentSearchQuery)}</div>
            <div class="redirect-comparison">
              <div>
                <div class="example-label full-refusal">${ICONS.shield} Full Refusal</div>
                <div class="example-text full-refusal-text">${highlightTerm(escapeHtml(ex.fullRefusalWithRedirect), currentSearchQuery)}</div>
              </div>
              <div>
                <div class="example-label redirect">${ICONS.arrows} Redirect</div>
                <div class="example-text redirect-text">${highlightTerm(escapeHtml(ex.redirect), currentSearchQuery)}</div>
              </div>
            </div>
            ${ex.explanation ? `<div class="example-note">${ICONS.lightbulb} ${highlightTerm(escapeHtml(ex.explanation), currentSearchQuery)}</div>` : ''}
            ${ex.note ? `<div class="example-note">${ICONS.lightbulb} ${highlightTerm(escapeHtml(ex.note), currentSearchQuery)}</div>` : ''}
          </div>
        `;
      } else if (category.id === 'harmful-non-generative') {
        return `
          <div class="example-item">
            <div style="margin-bottom: 0.75rem;">${categoryBadge}</div>
            <div class="example-label prompt">Prompt</div>
            <div class="example-text prompt-text">${highlightTerm(escapeHtml(ex.prompt), currentSearchQuery)}</div>
            <div class="example-label response">${ICONS.check} Ideal Response</div>
            <div class="example-text response-text">${highlightTerm(escapeHtml(ex.response), currentSearchQuery)}</div>
            ${ex.verdict ? `
              <div class="example-label verdict">${ICONS.shield} Verdict</div>
              <div class="example-verdict ${ex.verdict.toLowerCase().includes('grounded') ? 'grounded' : 'refusal'}">${escapeHtml(ex.verdict)}</div>
            ` : ''}
            ${ex.reasoning ? `<div class="example-note">${ICONS.lightbulb} ${highlightTerm(escapeHtml(ex.reasoning), currentSearchQuery)}</div>` : ''}
          </div>
        `;
      } else {
        return `
          <div class="example-item">
            <div style="margin-bottom: 0.75rem;">${categoryBadge}</div>
            <div class="example-label prompt">Prompt</div>
            <div class="example-text prompt-text">${highlightTerm(escapeHtml(ex.prompt), currentSearchQuery)}</div>
            <div class="example-label response">${ICONS.check} Ideal Response</div>
            <div class="example-text response-text">${highlightTerm(escapeHtml(ex.response), currentSearchQuery)}</div>
            ${ex.explanation ? `<div class="example-note">${ICONS.lightbulb} ${highlightTerm(escapeHtml(ex.explanation), currentSearchQuery)}</div>` : ''}
            ${ex.note ? `<div class="example-note">${ICONS.lightbulb} ${highlightTerm(escapeHtml(ex.note), currentSearchQuery)}</div>` : ''}
          </div>
        `;
      }
    }).join('');

    content.innerHTML = resultsHtml;
    pageInfo.textContent = totalPages > 0 ? `Page ${examplePage} of ${totalPages}` : 'No results';
    prevBtn.disabled = examplePage <= 1;
    nextBtn.disabled = examplePage >= totalPages;
  }

  function renderExampleDetail() {
    const content = document.getElementById('glossary-content');
    const pageInfo = document.getElementById('glossary-page-info');
    const prevBtn = document.getElementById('glossary-prev');
    const nextBtn = document.getElementById('glossary-next');

    const category = RESPONSE_EXAMPLES.categories.find(c => c.id === activeExampleCategory);
    if (!category) return;

    const totalPages = Math.ceil(category.examples.length / CONFIG.itemsPerPage);
    const startIndex = (examplePage - 1) * CONFIG.itemsPerPage;
    const endIndex = startIndex + CONFIG.itemsPerPage;
    const pageExamples = category.examples.slice(startIndex, endIndex);

    let examplesHtml = '';

    if (category.id === 'redirects-vs-refusals') {
      examplesHtml = pageExamples.map(ex => `
        <div class="example-item">
          <div class="example-label prompt">Prompt</div>
          <div class="example-text prompt-text">${escapeHtml(ex.prompt)}</div>
          <div class="redirect-comparison">
            <div>
              <div class="example-label full-refusal">${ICONS.shield} Full Refusal</div>
              <div class="example-text full-refusal-text">${escapeHtml(ex.fullRefusalWithRedirect)}</div>
            </div>
            <div>
              <div class="example-label redirect">${ICONS.arrows} Redirect</div>
              <div class="example-text redirect-text">${escapeHtml(ex.redirect)}</div>
            </div>
          </div>
          ${ex.explanation ? `<div class="example-note">${ICONS.lightbulb} ${escapeHtml(ex.explanation)}</div>` : ''}
          ${ex.note ? `<div class="example-note">${ICONS.lightbulb} ${escapeHtml(ex.note)}</div>` : ''}
        </div>
      `).join('');
    } else if (category.id === 'harmful-non-generative') {
      examplesHtml = pageExamples.map(ex => `
        <div class="example-item">
          <div class="example-label prompt">Prompt</div>
          <div class="example-text prompt-text">${escapeHtml(ex.prompt)}</div>
          <div class="example-label response">${ICONS.check} Ideal Response</div>
          <div class="example-text response-text">${escapeHtml(ex.response)}</div>
          ${ex.verdict ? `
            <div class="example-label verdict">${ICONS.shield} Verdict</div>
            <div class="example-verdict ${ex.verdict.toLowerCase().includes('grounded') ? 'grounded' : 'refusal'}">${escapeHtml(ex.verdict)}</div>
          ` : ''}
          ${ex.reasoning ? `
            <div class="example-note">${ICONS.lightbulb} ${escapeHtml(ex.reasoning)}</div>
          ` : ''}
        </div>
      `).join('');
    } else {
      examplesHtml = pageExamples.map((ex, i) => `
        <div class="example-item">
          <div class="example-label prompt">Prompt</div>
          <div class="example-text prompt-text">${escapeHtml(ex.prompt)}</div>
          <div class="example-label response">${ICONS.check} Ideal Response</div>
          <div class="example-text response-text">${escapeHtml(ex.response)}</div>
          ${ex.explanation ? `
            <div class="example-note">${ICONS.lightbulb} ${escapeHtml(ex.explanation)}</div>
          ` : ''}
          ${ex.note ? `<div class="example-note">${ICONS.lightbulb} ${escapeHtml(ex.note)}</div>` : ''}
        </div>
      `).join('');
    }

    content.innerHTML = `
      <div class="example-detail-header">
        <button class="example-back-btn" id="example-back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <h3 class="example-detail-title">
          <span class="color-dot" style="background: ${category.color}"></span>
          ${category.title}
        </h3>
      </div>
      <div class="category-description-box" style="--card-color: ${category.color}">
        ${escapeHtml(category.description)}
      </div>
      ${examplesHtml}
    `;

    pageInfo.textContent = totalPages > 0 ? `Page ${examplePage} of ${totalPages}` : 'No results';
    prevBtn.disabled = examplePage <= 1;
    nextBtn.disabled = examplePage >= totalPages;

    document.getElementById('example-back-btn').addEventListener('click', () => {
      activeExampleCategory = null;
      renderExamplesOverview();
    });
  }

  // ============================================
  // TOXICITY LEVEL RENDERING
  // ============================================
  function renderToxicityOverview() {
    // If there's an active search, show individual matching examples instead of category cards
    if (currentSearchQuery) {
      renderToxicitySearchResults();
      return;
    }

    const content = document.getElementById('glossary-content');
    const pageInfo = document.getElementById('glossary-page-info');
    const prevBtn = document.getElementById('glossary-prev');
    const nextBtn = document.getElementById('glossary-next');

    // Use filtered toxicity categories from search
    const toxicityCategories = filteredToxicityCategories;

    const guideHtml = `
      <div class="toxicity-guide">
        <h3>${ICONS.info} Understanding Toxicity Levels</h3>
        <p class="toxicity-guide-intro">Toxicity classification is not simply about user content or their intent—it depends heavily on <strong>whether a harm-free response is possible</strong>. A prompt touching on sensitive topics may still be safe to answer if the information can be provided without enabling harm or producing harmful content. When we say "harm-free", we mean a response that does not meet any of the "Harmful Output Characteristics".</p>
        <div class="toxicity-levels-list">
          <div class="toxicity-level-item">
            <span class="toxicity-level-badge" style="background: #10b981;">Safe</span>
            <span class="toxicity-level-desc">NO potential for harm, no sensitive content, no safety risk categories.</span>
          </div>
          <div class="toxicity-level-item">
            <span class="toxicity-level-badge" style="background: #3b82f6;">Benign</span>
            <span class="toxicity-level-desc">Does not seek harmful content but touches on safety risk categories with educational or informational intent.</span>
          </div>
          <div class="toxicity-level-item">
            <span class="toxicity-level-badge" style="background: #f59e0b;">Dual-Use</span>
            <span class="toxicity-level-desc">Ambiguous requests where intent is unclear. Could be legitimate or harmful depending on context. <strong>A harm-free response is possible.</strong></span>
          </div>
          <div class="toxicity-level-item">
            <span class="toxicity-level-badge" style="background: #ef4444;">Harmful</span>
            <span class="toxicity-level-desc">Requests assistance with harmful actions or requests harmful content. <strong>No harm-free response is possible.</strong></span>
          </div>
          <div class="toxicity-level-item">
            <span class="toxicity-level-badge" style="background: #8b5cf6;">Jailbreak</span>
            <span class="toxicity-level-desc">Attempts to bypass safety guidelines through manipulation techniques. <strong>No harm-free response is possible.</strong></span>
          </div>
        </div>
      </div>
    `;

    // Map toxicity IDs to friendly card titles
    const toxicityCardTitles = {
      'toxicity-safe': 'Safe Prompt Examples',
      'toxicity-benign': 'Benign Prompt Examples',
      'toxicity-dual-use': 'Dual-Use Prompt Examples',
      'toxicity-harmful': 'Harmful Prompt Examples',
      'toxicity-jailbreak': 'Jailbreak Prompt Examples'
    };

    // Check if there are no results
    if (toxicityCategories.length === 0) {
      content.innerHTML = `
        ${guideHtml}
        <div class="glossary-no-results">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p>No matching toxicity levels found</p>
        </div>
      `;
      pageInfo.textContent = '';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    const categoriesHtml = toxicityCategories.map(cat => `
      <div class="example-category-card" data-category-id="${cat.id}" style="--card-color: ${cat.color}">
        <h3>${ICONS[cat.icon] || ICONS.shield} ${toxicityCardTitles[cat.id] || cat.title}</h3>
        <span class="see-examples-link">See examples →</span>
      </div>
    `).join('');

    content.innerHTML = `${guideHtml}<div class="example-categories-grid">${categoriesHtml}</div>`;

    pageInfo.textContent = '';
    prevBtn.disabled = true;
    nextBtn.disabled = true;

    content.querySelectorAll('.example-category-card').forEach(card => {
      card.addEventListener('click', () => {
        activeToxicityCategory = card.getAttribute('data-category-id');
        toxicityPage = 1;
        renderToxicityDetail();
      });
    });
  }

  function renderToxicitySearchResults() {
    const content = document.getElementById('glossary-content');
    const pageInfo = document.getElementById('glossary-page-info');
    const prevBtn = document.getElementById('glossary-prev');
    const nextBtn = document.getElementById('glossary-next');
    const searchCount = document.getElementById('glossary-search-count');

    // Paginate the search results
    const totalPages = Math.ceil(filteredToxicityResults.length / CONFIG.itemsPerPage);
    const startIndex = (toxicityPage - 1) * CONFIG.itemsPerPage;
    const endIndex = startIndex + CONFIG.itemsPerPage;
    const pageResults = filteredToxicityResults.slice(startIndex, endIndex);

    searchCount.textContent = `${filteredToxicityResults.length} result${filteredToxicityResults.length !== 1 ? 's' : ''}`;

    if (filteredToxicityResults.length === 0) {
      content.innerHTML = `
        <div class="glossary-no-results">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p>No matching toxicity examples found</p>
        </div>
      `;
      pageInfo.textContent = 'No results';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    const resultsHtml = pageResults.map(({ example: ex, category }) => `
      <div class="example-item">
        <div class="example-label prompt">Prompt</div>
        <div class="example-text prompt-text">${highlightTerm(escapeHtml(ex.prompt), currentSearchQuery)}</div>
        <div class="toxicity-info">
          <div class="toxicity-badge" style="background: ${category.color}">${escapeHtml(ex.toxicityLevel)}</div>
          ${ex.safetyRiskCategories && ex.safetyRiskCategories !== 'None' ? `
            <div class="safety-categories">
              <span class="safety-categories-label">${ICONS.shield} Risk Categories:</span>
              <span class="safety-categories-list">${highlightTerm(escapeHtml(ex.safetyRiskCategories), currentSearchQuery)}</span>
            </div>
          ` : ''}
        </div>
        ${ex.explanation ? `
          <div class="example-note">${ICONS.lightbulb} ${highlightTerm(escapeHtml(ex.explanation), currentSearchQuery)}</div>
        ` : ''}
      </div>
    `).join('');

    content.innerHTML = resultsHtml;
    pageInfo.textContent = totalPages > 0 ? `Page ${toxicityPage} of ${totalPages}` : 'No results';
    prevBtn.disabled = toxicityPage <= 1;
    nextBtn.disabled = toxicityPage >= totalPages;
  }

  function renderToxicityDetail() {
    const content = document.getElementById('glossary-content');
    const pageInfo = document.getElementById('glossary-page-info');
    const prevBtn = document.getElementById('glossary-prev');
    const nextBtn = document.getElementById('glossary-next');

    const category = RESPONSE_EXAMPLES.categories.find(c => c.id === activeToxicityCategory);
    if (!category) return;

    const totalPages = Math.ceil(category.examples.length / CONFIG.itemsPerPage);
    const startIndex = (toxicityPage - 1) * CONFIG.itemsPerPage;
    const endIndex = startIndex + CONFIG.itemsPerPage;
    const pageExamples = category.examples.slice(startIndex, endIndex);

    const examplesHtml = pageExamples.map(ex => `
      <div class="example-item">
        <div class="example-label prompt">Prompt</div>
        <div class="example-text prompt-text">${escapeHtml(ex.prompt)}</div>
        <div class="toxicity-info">
          <div class="toxicity-badge" style="background: ${category.color}">${escapeHtml(ex.toxicityLevel)}</div>
          ${ex.safetyRiskCategories && ex.safetyRiskCategories !== 'None' ? `
            <div class="safety-categories">
              <span class="safety-categories-label">${ICONS.shield} Risk Categories:</span>
              <span class="safety-categories-list">${escapeHtml(ex.safetyRiskCategories)}</span>
            </div>
          ` : ''}
        </div>
        ${ex.explanation ? `
          <div class="example-note">${ICONS.lightbulb} ${escapeHtml(ex.explanation)}</div>
        ` : ''}
      </div>
    `).join('');

    content.innerHTML = `
      <div class="example-detail-header">
        <button class="example-back-btn" id="toxicity-back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <h3 class="example-detail-title">
          <span class="color-dot" style="background: ${category.color}"></span>
          ${category.title}
        </h3>
      </div>
      <div class="category-description-box" style="--card-color: ${category.color}">
        ${escapeHtml(category.description)}
      </div>
      ${examplesHtml}
    `;

    pageInfo.textContent = totalPages > 0 ? `Page ${toxicityPage} of ${totalPages}` : 'No results';
    prevBtn.disabled = toxicityPage <= 1;
    nextBtn.disabled = toxicityPage >= totalPages;

    document.getElementById('toxicity-back-btn').addEventListener('click', () => {
      activeToxicityCategory = null;
      renderToxicityOverview();
    });
  }

  // ============================================
  // HARMFUL OUTPUT CHARACTERISTICS RENDERING
  // ============================================
  function renderHarmfulOutput() {
    const content = document.getElementById('glossary-content');
    const pageInfo = document.getElementById('glossary-page-info');
    const prevBtn = document.getElementById('glossary-prev');
    const nextBtn = document.getElementById('glossary-next');
    const searchCount = document.getElementById('glossary-search-count');

    // Use filtered categories if searching
    const categoriesToShow = currentSearchQuery ? filteredHarmfulOutputCategories : HARMFUL_OUTPUT.categories;

    // Update search count
    if (currentSearchQuery) {
      searchCount.textContent = `${categoriesToShow.length} result${categoriesToShow.length !== 1 ? 's' : ''}`;
    } else {
      searchCount.textContent = '';
    }

    const introHtml = `
      <div class="harmful-output-intro">
        <h3>${ICONS['alert-circle']} Understanding Harmful Output Characteristics</h3>
        <p>A response is considered <strong>harmful</strong> if it exhibits <strong>any one</strong> of the characteristics listed below. These characteristics help identify responses that may cause harm even when the user's request itself was benign or dual-use.</p>
      </div>
    `;

    if (categoriesToShow.length === 0) {
      content.innerHTML = `
        ${introHtml}
        <div class="glossary-no-results">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p>No matching harmful output characteristics found</p>
        </div>
      `;
      pageInfo.textContent = '';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    // Build table rows - each characteristic becomes a row
    const tableRows = categoriesToShow.flatMap(cat =>
      cat.characteristics.map((char, index) => ({
        category: cat,
        characteristic: char,
        isFirst: index === 0
      }))
    );

    const tableRowsHtml = tableRows.map(({ category: cat, characteristic: char, isFirst }) => `
      <tr>
        <td class="harmful-output-category-cell">
          ${isFirst ? `
            <span class="harmful-output-category-badge" style="background: ${cat.color}">
              ${ICONS[cat.icon] || ICONS['alert-circle']}
              ${currentSearchQuery ? highlightTerm(escapeHtml(cat.title), currentSearchQuery) : escapeHtml(cat.title)}
            </span>
          ` : ''}
        </td>
        <td class="harmful-output-desc-cell">${currentSearchQuery ? highlightTerm(escapeHtml(char), currentSearchQuery) : escapeHtml(char)}</td>
      </tr>
    `).join('');

    content.innerHTML = `
      <div style="padding: 1.25rem;">
        ${introHtml}
        <table class="harmful-output-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Characteristic</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>
    `;

    pageInfo.textContent = '';
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }

  function handleSearch(query) {
    const normalizedQuery = query.toLowerCase().trim();
    currentSearchQuery = normalizedQuery;

    // Filter categories (Risk Categories tab)
    if (!normalizedQuery) {
      filteredTerms = [...allTerms];
    } else {
      filteredTerms = allTerms.filter(term => {
        const entry = GLOSSARY[term];
        const inName = term.toLowerCase().includes(normalizedQuery);
        const inDefinition = entry.definition && entry.definition.toLowerCase().includes(normalizedQuery);
        const inExamples = entry.examples && entry.examples.some(ex => ex.toLowerCase().includes(normalizedQuery));
        return inName || inDefinition || inExamples;
      });
    }

    // Filter response examples (Response Examples tab)
    const specialIds = ['harmful-non-generative', 'redirects-vs-refusals'];
    const allExampleCategories = RESPONSE_EXAMPLES.categories.filter(cat =>
      !cat.id.startsWith('toxicity-')
    );

    if (!normalizedQuery) {
      filteredExampleCategories = allExampleCategories;
      filteredExampleResults = [];
    } else {
      // Collect individual matching examples with category context
      filteredExampleResults = [];
      allExampleCategories.forEach(cat => {
        if (cat.examples) {
          cat.examples.forEach((ex, index) => {
            const inPrompt = ex.prompt && ex.prompt.toLowerCase().includes(normalizedQuery);
            const inResponse = ex.response && ex.response.toLowerCase().includes(normalizedQuery);
            const inExplanation = ex.explanation && ex.explanation.toLowerCase().includes(normalizedQuery);
            const inRedirect = ex.redirect && ex.redirect.toLowerCase().includes(normalizedQuery);
            const inFullRefusal = ex.fullRefusalWithRedirect && ex.fullRefusalWithRedirect.toLowerCase().includes(normalizedQuery);
            if (inPrompt || inResponse || inExplanation || inRedirect || inFullRefusal) {
              filteredExampleResults.push({
                example: ex,
                category: cat,
                exampleIndex: index
              });
            }
          });
        }
      });

      // Still filter categories for backwards compatibility
      filteredExampleCategories = allExampleCategories.filter(cat => {
        const inTitle = cat.title.toLowerCase().includes(normalizedQuery);
        const inDescription = cat.description && cat.description.toLowerCase().includes(normalizedQuery);
        const inExamples = cat.examples && cat.examples.some(ex => {
          const inPrompt = ex.prompt && ex.prompt.toLowerCase().includes(normalizedQuery);
          const inResponse = ex.response && ex.response.toLowerCase().includes(normalizedQuery);
          const inExplanation = ex.explanation && ex.explanation.toLowerCase().includes(normalizedQuery);
          const inRedirect = ex.redirect && ex.redirect.toLowerCase().includes(normalizedQuery);
          const inFullRefusal = ex.fullRefusalWithRedirect && ex.fullRefusalWithRedirect.toLowerCase().includes(normalizedQuery);
          return inPrompt || inResponse || inExplanation || inRedirect || inFullRefusal;
        });
        return inTitle || inDescription || inExamples;
      });
    }

    // Filter toxicity categories (Toxicity Levels tab)
    const allToxicityCategories = RESPONSE_EXAMPLES.categories.filter(cat =>
      cat.id.startsWith('toxicity-')
    );

    if (!normalizedQuery) {
      filteredToxicityCategories = allToxicityCategories;
      filteredToxicityResults = [];
    } else {
      // Collect individual matching toxicity examples with category context
      filteredToxicityResults = [];
      allToxicityCategories.forEach(cat => {
        if (cat.examples) {
          cat.examples.forEach((ex, index) => {
            const inPrompt = ex.prompt && ex.prompt.toLowerCase().includes(normalizedQuery);
            const inExplanation = ex.explanation && ex.explanation.toLowerCase().includes(normalizedQuery);
            const inCategories = ex.safetyRiskCategories && ex.safetyRiskCategories.toLowerCase().includes(normalizedQuery);
            if (inPrompt || inExplanation || inCategories) {
              filteredToxicityResults.push({
                example: ex,
                category: cat,
                exampleIndex: index
              });
            }
          });
        }
      });

      // Still filter categories for backwards compatibility
      filteredToxicityCategories = allToxicityCategories.filter(cat => {
        const inTitle = cat.title.toLowerCase().includes(normalizedQuery);
        const inDescription = cat.description && cat.description.toLowerCase().includes(normalizedQuery);
        const inExamples = cat.examples && cat.examples.some(ex => {
          const inPrompt = ex.prompt && ex.prompt.toLowerCase().includes(normalizedQuery);
          const inExplanation = ex.explanation && ex.explanation.toLowerCase().includes(normalizedQuery);
          const inCategories = ex.safetyRiskCategories && ex.safetyRiskCategories.toLowerCase().includes(normalizedQuery);
          return inPrompt || inExplanation || inCategories;
        });
        return inTitle || inDescription || inExamples;
      });
    }

    // Filter harmful output categories (Harmful Output tab)
    if (!normalizedQuery) {
      filteredHarmfulOutputCategories = [...HARMFUL_OUTPUT.categories];
    } else {
      filteredHarmfulOutputCategories = HARMFUL_OUTPUT.categories.filter(cat => {
        const inTitle = cat.title.toLowerCase().includes(normalizedQuery);
        const inDescription = cat.description && cat.description.toLowerCase().includes(normalizedQuery);
        const inCharacteristics = cat.characteristics && cat.characteristics.some(char =>
          char.toLowerCase().includes(normalizedQuery)
        );
        return inTitle || inDescription || inCharacteristics;
      });
    }

    // Reset pages
    currentPage = 1;
    examplePage = 1;
    toxicityPage = 1;

    // Render based on active tab
    if (activeTab === 'categories') {
      renderCategoriesPage(query);
    } else if (activeTab === 'examples') {
      if (activeExampleCategory) {
        renderExampleDetail();
      } else {
        renderExamplesOverview();
      }
    } else if (activeTab === 'toxicity') {
      if (activeToxicityCategory) {
        renderToxicityDetail();
      } else {
        renderToxicityOverview();
      }
    } else if (activeTab === 'harmful-output') {
      renderHarmfulOutput();
    }

    // Update search count
    updateSearchCount();
  }

  function updateSearchCount() {
    const searchCount = document.getElementById('glossary-search-count');
    if (!currentSearchQuery) {
      searchCount.textContent = '';
      return;
    }

    let count = 0;
    if (activeTab === 'categories') {
      count = filteredTerms.length;
    } else if (activeTab === 'examples') {
      // Show count of individual examples, not categories
      count = filteredExampleResults.length;
    } else if (activeTab === 'toxicity') {
      // Show count of individual toxicity examples, not categories
      count = filteredToxicityResults.length;
    } else if (activeTab === 'harmful-output') {
      count = filteredHarmfulOutputCategories.length;
    }
    searchCount.textContent = `${count} result${count !== 1 ? 's' : ''}`;
  }

  function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.glossary-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });

    // Keep search bar visible on all tabs
    const searchContainer = document.getElementById('glossary-search-container');
    searchContainer.style.display = 'block';

    // Apply current search to the new tab
    const query = document.getElementById('glossary-search-input').value;
    handleSearch(query);
  }

  function openModal() {
    const overlay = document.getElementById('glossary-overlay');
    const modal = document.getElementById('glossary-modal');
    const input = document.getElementById('glossary-search-input');

    overlay.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    input.value = '';
    currentSearchQuery = '';
    filteredTerms = [...allTerms];
    filteredExampleCategories = RESPONSE_EXAMPLES.categories.filter(cat => !cat.id.startsWith('toxicity-'));
    filteredToxicityCategories = RESPONSE_EXAMPLES.categories.filter(cat => cat.id.startsWith('toxicity-'));
    filteredExampleResults = [];
    filteredToxicityResults = [];
    filteredHarmfulOutputCategories = [...HARMFUL_OUTPUT.categories];
    currentPage = 1;
    examplePage = 1;
    toxicityPage = 1;
    activeTab = 'categories';
    activeExampleCategory = null;
    activeToxicityCategory = null;

    document.querySelectorAll('.glossary-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === 'categories');
    });
    document.getElementById('glossary-search-container').style.display = 'block';
    document.getElementById('glossary-search-count').textContent = '';

    renderCategoriesPage();
    setTimeout(() => input.focus(), 100);
  }

  function closeModal() {
    const overlay = document.getElementById('glossary-overlay');
    const modal = document.getElementById('glossary-modal');

    overlay.classList.remove('active');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ============================================
  // LOAD EXAMPLES FROM JSON
  // ============================================
  async function loadExamples() {
    try {
      const response = await fetch(CONFIG.examplesJsonUrl);
      if (!response.ok) {
        console.warn('Failed to load examples JSON, using defaults');
        return;
      }
      const examples = await response.json();

      // Merge examples into GLOSSARY
      Object.keys(examples).forEach(categoryName => {
        if (GLOSSARY[categoryName]) {
          GLOSSARY[categoryName].examples = examples[categoryName];
        }
      });
    } catch (error) {
      console.warn('Error loading examples:', error);
    }
  }

  async function loadResponseExamples() {
    try {
      const response = await fetch(CONFIG.responseExamplesJsonUrl);
      if (!response.ok) {
        console.warn('Failed to load response examples JSON, using defaults');
        return;
      }
      const data = await response.json();

      // Add logging to verify data loaded correctly
      console.log('Response examples loaded:', data.categories.length, 'categories');
      console.log('Category IDs:', data.categories.map(c => c.id));

      // Replace RESPONSE_EXAMPLES with loaded data
      RESPONSE_EXAMPLES = data;
    } catch (error) {
      console.warn('Error loading response examples:', error);
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  async function init() {
    // Load examples and response examples from JSON first
    await loadExamples();
    await loadResponseExamples();

    allTerms = Object.keys(GLOSSARY).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    filteredTerms = [...allTerms];

    // Initialize filtered example categories
    filteredExampleCategories = RESPONSE_EXAMPLES.categories.filter(cat => !cat.id.startsWith('toxicity-'));
    filteredToxicityCategories = RESPONSE_EXAMPLES.categories.filter(cat => cat.id.startsWith('toxicity-'));
    filteredHarmfulOutputCategories = [...HARMFUL_OUTPUT.categories];

    injectStyles();
    createTriggerButton();
    createModal();
    startShineEffect();

    document.getElementById('glossary-trigger').addEventListener('click', openModal);
    document.getElementById('glossary-close').addEventListener('click', closeModal);
    document.getElementById('glossary-overlay').addEventListener('click', closeModal);

    document.querySelectorAll('.glossary-tab').forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    document.getElementById('glossary-search-input').addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });

    document.getElementById('glossary-prev').addEventListener('click', () => {
      if (activeTab === 'categories') {
        if (currentPage > 1) {
          currentPage--;
          renderCategoriesPage(document.getElementById('glossary-search-input').value);
          document.getElementById('glossary-content').scrollTop = 0;
        }
      } else if (activeTab === 'examples') {
        if (activeExampleCategory) {
          if (examplePage > 1) {
            examplePage--;
            renderExampleDetail();
            document.getElementById('glossary-content').scrollTop = 0;
          }
        } else if (currentSearchQuery && examplePage > 1) {
          examplePage--;
          renderExampleSearchResults();
          document.getElementById('glossary-content').scrollTop = 0;
        }
      } else if (activeTab === 'toxicity') {
        if (activeToxicityCategory) {
          if (toxicityPage > 1) {
            toxicityPage--;
            renderToxicityDetail();
            document.getElementById('glossary-content').scrollTop = 0;
          }
        } else if (currentSearchQuery && toxicityPage > 1) {
          toxicityPage--;
          renderToxicitySearchResults();
          document.getElementById('glossary-content').scrollTop = 0;
        }
      }
    });

    document.getElementById('glossary-next').addEventListener('click', () => {
      if (activeTab === 'categories') {
        const totalPages = Math.ceil(filteredTerms.length / CONFIG.itemsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          renderCategoriesPage(document.getElementById('glossary-search-input').value);
          document.getElementById('glossary-content').scrollTop = 0;
        }
      } else if (activeTab === 'examples') {
        if (activeExampleCategory) {
          const category = RESPONSE_EXAMPLES.categories.find(c => c.id === activeExampleCategory);
          const totalPages = Math.ceil(category.examples.length / CONFIG.itemsPerPage);
          if (examplePage < totalPages) {
            examplePage++;
            renderExampleDetail();
            document.getElementById('glossary-content').scrollTop = 0;
          }
        } else if (currentSearchQuery) {
          const totalPages = Math.ceil(filteredExampleResults.length / CONFIG.itemsPerPage);
          if (examplePage < totalPages) {
            examplePage++;
            renderExampleSearchResults();
            document.getElementById('glossary-content').scrollTop = 0;
          }
        }
      } else if (activeTab === 'toxicity') {
        if (activeToxicityCategory) {
          const category = RESPONSE_EXAMPLES.categories.find(c => c.id === activeToxicityCategory);
          const totalPages = Math.ceil(category.examples.length / CONFIG.itemsPerPage);
          if (toxicityPage < totalPages) {
            toxicityPage++;
            renderToxicityDetail();
            document.getElementById('glossary-content').scrollTop = 0;
          }
        } else if (currentSearchQuery) {
          const totalPages = Math.ceil(filteredToxicityResults.length / CONFIG.itemsPerPage);
          if (toxicityPage < totalPages) {
            toxicityPage++;
            renderToxicitySearchResults();
            document.getElementById('glossary-content').scrollTop = 0;
          }
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    document.getElementById('glossary-modal').addEventListener('click', (e) => {
      e.stopPropagation();
    });

    console.log(`Ultimate Safety Guide: Loaded ${allTerms.length} risk categories and ${RESPONSE_EXAMPLES.categories.length} response example types`);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
