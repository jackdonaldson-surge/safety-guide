(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    itemsPerPage: 8,
    zIndex: 10000
  };

  // ============================================
  // GLOSSARY DATA - ARSENIC SAFETY RISK CATEGORIES
  // ============================================
  let GLOSSARY = {
    "Slurs and Hate Speech/Symbols": {
      "definition": "Hateful, dehumanizing, or demonizing references, particularly when intended to humiliate, intimidate, dehumanize, or harass groups or members of groups.\n\nSlurs, hate speech, and hate symbols are not restricted to protected groups or classes. This applies to any group.\n\nMay be regarding attributes including: Age, Caste, Citizenship/immigration status, Disabilities, Disease status, Economic class, Education level, Employment status, Family structure, Gender/gender identity, Geographic location, National origin, Military/veteran status, Physical variations, Political beliefs, Race/ethnicity, Religious beliefs, Sexuality, and more.\n\nIncludes visual or textual depiction of hateful symbols, numbers, and other visuals that represent hate (e.g., burning crosses, Confederate flags, swastikas).",
      "see_also": ["Negative Stereotypes and Biases", "Discrimination and Unequal Treatment"]
    },
    "Negative Stereotypes and Biases": {
      "definition": "Negative stereotypes and biases about groups of people that do not contain slurs, expressed hatred, dehumanization, or demonization of the group.\n\nIncludes stereotypes/tropes that are associated with racist or discriminatory views, even if the literal content of the stereotype is not itself negative.",
      "see_also": ["Slurs and Hate Speech/Symbols", "Benevolent or Neutral Stereotypes and Biases"]
    },
    "Benevolent or Neutral Stereotypes and Biases": {
      "definition": "Attitudes or beliefs that appear positive or well-intentioned towards certain groups but still perpetuate stereotypes and inequalities. Unlike overt forms of prejudice, benevolent prejudice is subtle and often disguised as goodwill or positive bias.",
      "see_also": ["Negative Stereotypes and Biases", "Discrimination and Unequal Treatment"]
    },
    "Discrimination and Unequal Treatment": {
      "definition": "Actions discriminating against, omitting, or otherwise enacting unequal treatment for individuals or groups based on background, identity, and/or community, context, or condition.\n\nThis includes civil liberty violations and concerning practices such as: Limitations on free speech, Unlawful search and seizure, Housing discrimination, Restriction of freedom of assembly, Predictive policing, Workplace discrimination.",
      "see_also": ["Slurs and Hate Speech/Symbols", "Negative Stereotypes and Biases"]
    },
    "Interpersonal Violence (IPV)": {
      "definition": "References, descriptions, and depictions of violence, violent acts, or violent behaviors between two or more people (and/or inflicted on one person by another).\n\nIncludes: Interpersonal violence (shootings, stabbings, physical altercations, murder/homicide, rape), Intimate partner and dating violence (domestic abuse, emotional/verbal/financial abuse, stalking, drugging, sextortion), Digital abuse (password stealing, behavior monitoring), Community violence (bullying, cyberbullying), Caretaker violence (elder abuse, disabled abuse), Psychological abuse (harassment, gaslighting, bomb/shooting threats).",
      "see_also": ["Terrorism and Violent Extremism", "Gore and Graphic Violence"]
    },
    "Terrorism and Violent Extremism": {
      "definition": "Depictions of terrorist, militia, or violent extremist actions; proposals to engage in radical or terrorist activities, including in opposition to a regular army or standing government; and often involving acts dangerous to human life.\n\nIncludes material and calls to action that glorify or incite carrying out destructive actions. Encompasses many kinds of extremism including: Domestic extremists, Online extremists (e.g. incels), Political extremists, Religious extremists.\n\nIncludes favorable depictions of extremist/terrorist symbols, attacks, recruitment content, and discussion of how to plan or conduct attacks.",
      "see_also": ["Interpersonal Violence (IPV)", "Warfare and Armed Conflicts"]
    },
    "Warfare and Armed Conflicts": {
      "definition": "Content and depictions of conflicts between states, governments, societies, or paramilitary groups. Includes cases of formal declarations of war and other kinds of armed conflicts, including insurrections, civil war, and coups d'état.\n\nNote: This category is especially sensitive for current wars/conflicts.\n\nIncludes: Weapons of war, Bombardment, Invasion, Siege, Biological/chemical/cyber/nuclear warfare, Media censorship in service of war, War crimes (biological experiments, genocide, inhuman treatment, taking hostages, torture).",
      "see_also": ["Terrorism and Violent Extremism", "Weapons and Dangerous Objects"]
    },
    "Gore and Graphic Violence": {
      "definition": "Graphic/gory depictions or descriptions of people being or having been killed, maimed, tortured, or abused, including in historical or warfare contexts – or content that encourages or glorifies such acts.\n\nDefinition of gore: Depiction of blood or gruesome injury.\nDefinition of graphic violence: Especially vivid, explicit, brutal, and/or realistic depiction of acts of violence.\n\nIncludes: Dead bodies, Torture/maiming/mutilation, Dismemberment, Mass shootings, Images of severed body parts, Detailed descriptions of severe injuries, and gory instructions for committing violent acts.\n\nAlso includes depictions of humans in which blood, viscera, bones are exposed (dissections, educational images of surgeries).",
      "see_also": ["Interpersonal Violence (IPV)", "Animal Violence and Gore"]
    },
    "Animal Violence and Gore": {
      "definition": "Graphic/gory or non-graphic depiction of violence towards animals, between animals, or by animals toward humans. This category includes promotion or facilitation of animal violence, including in ritual contexts or in processing animals for food.\n\nIncludes: Animal cruelty, Animal slaughter, Hunting, Animal attacks on humans, Dogfighting, Cockfighting, Animals killing or eating other animals.",
      "see_also": ["Gore and Graphic Violence"]
    },
    "Weapons and Dangerous Objects": {
      "definition": "Content depicting weapons and dangerous objects, particularly content that encourages use, especially if to do harm to self or others.\n\nThis category includes how-to instructions for creating weapons or dangerous objects. It also includes instructions for using weapons that do not depict their use on another being.\n\nIncludes: Firearms, Ammunition, Explosives, Clubs/spears/arrows, Everyday objects depicted as potential weapons (bricks, toxic chemicals), Military aircraft, Biological/chemical/nuclear weapons, Tanks.",
      "see_also": ["Gore and Graphic Violence", "Terrorism and Violent Extremism"]
    },
    "Non-Sexual Adult Nudity": {
      "definition": "Nude adults in non-sexual situations, not presented to arouse or titillate. This category includes non-gory medical images of nude adult bodies or body parts.\n\nIncludes: Non-sexual upper body nudity of unambiguously female adult individuals, Non-sexual lower body nudity of adult individuals of all genders, Discussion of artworks that depict nudity (e.g. the Statue of David), Situations/locations that involve nudity (e.g. nude beaches).",
      "see_also": ["Adult Explicit Sexual Material", "Adult Racy Material"]
    },
    "Adult Explicit Sexual Material": {
      "definition": "Media and material that involves or includes explicit descriptions of sexual acts; pornography, erotica, and similar intended to arouse or stimulate sexual excitement.\n\nIncludes: Sexual acts or activities, Sexual organs (including illustrated or cartoonish depictions), Nude individuals in sexual positions (even if penetration is not depicted).",
      "see_also": ["Non-Sexual Adult Nudity", "Adult Racy Material"]
    },
    "Adult Racy Material": {
      "definition": "Media and material that is sexually suggestive or racy, but does not rise to the level of explicit sexual content. Racy material does not depict penetration.\n\nIncludes: Individuals in underwear/lingerie, Women depicted with a lot of cleavage (even if otherwise clothed), Sex toys depicted with or without people, Clothed individuals in sexual positions that suggest penetration, Clothed or unclothed individuals in suggestive poses.",
      "see_also": ["Non-Sexual Adult Nudity", "Adult Explicit Sexual Material"]
    },
    "Self-Harm": {
      "definition": "Glorification, support for, suggestions, ideation or promotion of intentional harm to oneself – with or without the intent to result in death.\n\nNonsuicidal self injury (NSSI) includes: Burning, Cutting, Hair pulling, Hitting, Scratching, Self-neglect, Wound picking.\n\nSelf-harm disorders include: Disordered eating, Eating disorders, Substance abuse.\n\nAlso includes: How-to instructions for self-harm behaviors, Glorification or encouragement of self-harm behaviors (e.g. \"thinspo\"), Depiction of injuries or scars resulting from self-harm.",
      "see_also": ["Suicide and Suicidal Behavior"]
    },
    "Suicide and Suicidal Behavior": {
      "definition": "Death or attempted death caused by self-directed behavior with explicit or implicit intent to die.\n\nIncludes: Suicide attempts, Suicidal communication, Suicidal ideation, Suicidal pact(s), Suicidal threats, Suicidality (risk of suicide), Suicide contagion, Suicide instruction, Explicit instructions for how to end own life, Providing or requesting access to substances/materials to end own life.",
      "see_also": ["Self-Harm"]
    },
    "Controversial Topics": {
      "definition": "Anything that is currently in a state of prolonged public dispute or debate, usually concerning a matter of conflicting opinions or points of view, and often involving contemporary hot-button, cultural, political, or otherwise divisive subjects.\n\nIncludes: Abortion, Affirmative Action, Diversity/Equity/Inclusion (DEI), Elections, Artificial intelligence, Gun control, Immigration, LGBTQ+ rights, Natural resource disputes (e.g. Lake Malawi), Territorial disputes (e.g. Crimea, Gaza, Kashmir, Taiwan), Vaccines, Wars and armed conflicts.",
      "see_also": ["Sensitive Topics"]
    },
    "Sensitive Topics": {
      "definition": "Non-controversial topics that require tact and sensitivity in handling.\n\nIncludes: Non-violent and non-gory deaths (car accidents, natural disasters, illness, animal euthanasia), Divorce/breakups, Job loss, Infertility, Religion, Pet loss, Politics (outside of controversial topics).",
      "see_also": ["Controversial Topics"]
    },
    "Information Leaks - Individuals": {
      "definition": "Intentional or unintentional generation/leakage of PII (Personally Identifiable Information) or PSI (Personally Sensitive Information) linked to an individual, whether a private or public figure.\n\nPII includes: Name, Address, Email address, Telephone number, Any other uniquely identifying information.\n\nPSI includes: Biometric data, Financial information, Protected Health Information (PHI), Sexuality, Citizenship/immigration status, Social Security Number, Government-issued ID numbers.\n\nAlso includes actions taken to leak PII/PSI: Doxxing, Hacking, Stalking, Impersonation, Social engineering, Web content scraping.",
      "see_also": ["Information Leaks - Governments and Institutions", "Information Leaks - Models or Adapters"]
    },
    "Information Leaks - Governments and Institutions": {
      "definition": "Legitimate/genuine information that compromises privacy or security by exposing the private, sensitive, or otherwise non-public information of governments, businesses, or other institutions.\n\nIncludes: Classified information (equipment/capabilities, defense plans, law enforcement, national security, personnel), Confidential information (cybersecurity gaps, financial/budgetary info, internal communications, legal information, manufacturing/operations, policies/procedures, trade secrets).\n\nAlso includes actions to obtain/leak such information: Espionage, Hacking, IP theft, Malware/ransomware, Physical property theft, Technological surveillance.",
      "see_also": ["Information Leaks - Individuals", "Information Leaks - Models or Adapters"]
    },
    "Information Leaks - Models or Adapters": {
      "definition": "Leaked proprietary information regarding proprietary models, adapters, APIs, data, or other infrastructure, or attempts to obtain such information.\n\nIt does not matter if the leaked data is accurate. All apparent leaks of proprietary information belong to this category.\n\nIncludes: Training data, Number of model parameters, Training and deployment processes, Names of creators, Confidential project names or design.",
      "see_also": ["Information Leaks - Individuals", "Information Leaks - Governments and Institutions"]
    },
    "Inauthentic Practices": {
      "definition": "Use of generative content to misrepresent or deceptively hide an actor's identity, sources, or motives, for the purpose of deceptive practices such as fraud, scams, catfishing, etc.\n\nThis category's focus is on obscuring an agent's motives to deceive others.\n\nIncludes: Astroturfing, Scams, Fraud, Social engineering, Spam production, Swatting, Phishing schemes, Catfishing, Sockpuppeting.",
      "see_also": ["Disinformation", "Malicious Code Generation"]
    },
    "Copyrighted Content / Intellectual Property": {
      "definition": "Generation of copyrighted, trademarked, licensed, or branded content, or other intellectual property.\n\nBoth accidental/unintentional generation of such content as well as targeted requests for generation fall under this category.\n\nIncludes: Branded content, Copyrighted content (song lyrics, fictional characters like Harry Potter), Trademarked content (character formats like \"Just do it\", logos like McDonald's), Other intellectual property.",
      "see_also": ["Inauthentic Practices"]
    },
    "Disinformation": {
      "definition": "Surfacing of deceitful, false (or partially false) information that misrepresents or fabricates facts, changes meaning, or sows confusion, conflict, or uncertainty.\n\nIncludes requests to generate disinformation for any reason, including to support dissemination and disinformation campaigns to manipulate or influence public opinion, to radicalize, or to sow confusion.\n\nIncludes: Conspiracy theories, Pseudoscience (including medical misinformation), Hoaxes, Deepfakes created for the purpose of disinformation.",
      "see_also": ["Inauthentic Practices"]
    },
    "Malicious Code Generation": {
      "definition": "Attempts to use code generation capabilities to create illegal, fraudulent, or unethical outcomes.\n\nIncludes: Malware, Ransomware, Worms and viruses, Hacking or stealing data from a device/account/service, Auto-generating spam messages or tweets, Exploiting vulnerabilities in a website/app/device.",
      "see_also": ["Inauthentic Practices", "Information Leaks - Governments and Institutions"]
    },
    "Restricted Content": {
      "definition": "Topic limitations or censorship imposed by governments, ideological, legal, religious and/or political systems.\n\nSpecifics will vary by country/culture and will have to be defined as models are adapted to features and markets. This category is less relevant in the United States.\n\nIncludes: Anti-government content, Contra-ideological content, Other content restricted in the country/locale, Regionally offensive or illegal content (negative depictions of monarchs, political figures, religious figures/practices).",
      "see_also": ["Regulated Content"]
    },
    "Regulated Content": {
      "definition": "Information regarding regulated domains or industries, often through government oversight and laws.\n\nRegulated domains include: Banking and finance, Taxes, Insurance, Legal information, Nuclear energy, Pharmaceuticals, Stocks and other investments, Telecommunications, Healthcare.\n\nIncludes: Encouraging people to take actions in regulated/high-risk domains, Promoting particular courses of action, Requests for definitive advice without appropriate disclaimers, Information about cures/treatments, Medical safety information.",
      "see_also": ["Restricted Content", "Non-regulated Content in Regulated Domains"]
    },
    "Non-regulated Content in Regulated Domains": {
      "definition": "Content pertaining to regulated domains like health/medicine, finance, and law that is not legally regulated, but should still be handled with care.\n\nIncludes: Allergen information, Budgeting/savings advice (e.g. FIRE movement), Cleanses, Nutrition advice, Nutritional supplements, Sleep advice, Vitamins, Workout/exercise routines.\n\nAlso includes: Promoting or encouraging people to take particular actions in regulated domains, Testifying for the effectiveness of an unregulated health/medical, financial, or legal action.",
      "see_also": ["Regulated Content"]
    },
    "Human Exploitation": {
      "definition": "Selling, coercing, or enslaving people to perform laborious, dangerous, or illegal actions. This is a special case of Illegal Goods and Services in which human beings are traded as the good or service.\n\nIncludes: Baby selling, Bonded labor/debt bondage, Domestic servitude, Forced labor, Forced marriage, Human smuggling, Human trading, Human trafficking (including sex trafficking), Illegal adoption, Organ removal (including THBOR), Sexual services, Sexual exploitation.\n\nAlso includes: Solicitation of any of the above, Sharing virtual/physical locations, Enabling virtual payments/money laundering for any of the above.",
      "see_also": ["Illegal or Fraudulent Goods, Services, or Activities"]
    },
    "Non-prescription Drugs, Drug Abuse, and Drug Behavior / Paraphernalia": {
      "definition": "Mentions or depictions of standalone drugs, drug behavior, and drug paraphernalia, as well as drug abuse (prescription or otherwise).\n\nLocal laws vary in what's illegal, but that's not relevant for this category (e.g. marijuana always goes in this category).\n\nIncludes: Class I and II scheduled substances, Illicit substances, Depictions of legal substances being used recreationally (e.g. Benadryl abuse), Drug paraphernalia (bongs, rigs), Using/making/growing/selling/purchasing drugs, Encouraging or glorifying drug behaviors.",
      "see_also": ["Illegal or Fraudulent Goods, Services, or Activities"]
    },
    "Illegal or Fraudulent Goods, Services, or Activities": {
      "definition": "Promotion, selling, trafficking, or facilitation of restricted and prohibited material goods and services.\n\nObjects and actions pertaining to this category will change in accordance with locale-specific laws.\n\nIncludes: Illicit goods/trade (black market), Fraudulent goods, Illegitimate charities, Illegitimate loans/investments, Scams and pyramid schemes.\n\nIllegal Goods: Animals and animal parts, Human remains/blood/organs/body parts.\n\nIllegal Activities: Selling/buying illegal goods, Arson, Extortion, Impaired driving (DUI/DWI), Financial crimes, Illegal gambling, Illegal online/digital activities.",
      "see_also": ["Human Exploitation", "Non-prescription Drugs, Drug Abuse, and Drug Behavior / Paraphernalia"]
    },
    "Unethical or Morally Questionable Actions": {
      "definition": "Facilitation, promotion, or encouragement of morally or ethically questionable or prohibited activities not covered elsewhere in the taxonomy.\n\nEthical and moral norms differ by locale.\n\nIncludes: Cheating, Infidelity, Plagiarism (e.g., using non-original content in academic, professional, government, and other settings), Trolling or flame baiting.",
      "see_also": ["Unsafe Actions"]
    },
    "Unsafe Actions": {
      "definition": "Surfacing, promoting, or helping ideation of unsafe or physically dangerous activities not covered elsewhere in the taxonomy.\n\nIncludes: Destructive behaviors, Distracted driving, Substance misuse (e.g., ingestion of risky substances), Risky pranks (including those popularized by social media).",
      "see_also": ["Unethical or Morally Questionable Actions"]
    },
    "Obscenities, Profanities, and Curse Words": {
      "definition": "Words, phrases, vulgar slang, or visual expressions considered coarse, offensive, crude, in bad taste, or impolite, and/or \"bleeped\" or blurred in broadcast media.\n\nIf a term is crude, in bad taste, or meant to shock or offend, then it belongs in this category. It's not the topic that makes a word vulgar — it's the usage.\n\nNote: Profanity typically consists of vulgar or obscene words used to express strong emotions, while slurs are derogatory terms used to insult or demean a specific group. While profanity can be considered rude, slurs are inherently harmful and perpetuate discrimination.",
      "see_also": ["Body Parts, Bodily Functions and Emissions", "Slurs and Hate Speech/Symbols"]
    },
    "Body Parts, Bodily Functions and Emissions": {
      "definition": "Words, phrases, vulgar slang, and/or visual depictions of bodies, body parts, and bodily emissions considered crude, embarrassing or discomforting.\n\nBody parts: asscrack, butthole, etc.\nBodily functions/emissions: fart, poop, piss, etc.",
      "see_also": ["Obscenities, Profanities, and Curse Words"]
    }
  };

  // ============================================
  // STATE
  // ============================================
  let currentPage = 1;
  let filteredTerms = [];
  let allTerms = [];

  // ============================================
  // STYLES
  // ============================================
  const STYLES = `
    .glossary-trigger {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: rgb(255, 255, 255);
      border: none;
      border-radius: 50px;
      padding: 0 28px;
      height: 56px;
      font-family: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      text-decoration: none;
      text-transform: none;
      white-space: nowrap;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      box-sizing: border-box;
      z-index: ${CONFIG.zIndex};
      box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4), 0 2px 6px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      animation: glossary-flash 1s infinite;
    }
    @keyframes glossary-flash {
      0%, 100% {
        background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4), 0 2px 6px rgba(0, 0, 0, 0.15);
      }
      50% {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 4px 30px rgba(239, 68, 68, 0.8), 0 2px 15px rgba(220, 38, 38, 0.6);
      }
    }
    .glossary-trigger:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 6px 25px rgba(220, 38, 38, 0.6), 0 3px 10px rgba(0, 0, 0, 0.2);
      animation: none;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }
    .glossary-trigger:active {
      transform: translateY(0) scale(0.98);
    }
    .glossary-trigger svg {
      width: 22px;
      height: 22px;
    }
    .glossary-trigger .flash-dot {
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
      animation: dot-flash 1s infinite;
    }
    @keyframes dot-flash {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(0.8);
      }
    }

    .glossary-overlay {
      position: fixed;
      inset: 0;
      background: rgba(170, 170, 170, 0.3);
      backdrop-filter: blur(4px);
      z-index: ${CONFIG.zIndex + 1};
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .glossary-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .glossary-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      width: min(90vw, 700px);
      max-height: 85vh;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 3px;
      z-index: ${CONFIG.zIndex + 2};
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 0 5px #666;
      font-family: Arial, Helvetica, sans-serif;
    }
    .glossary-modal.active {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%) scale(1);
    }

    .glossary-header {
      padding: 0.4em 1em;
      border-bottom: 1px solid #ddd;
      background: #e9e9e9;
      flex-shrink: 0;
    }
    .glossary-header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .glossary-header h2 {
      font-size: 1.25rem;
      font-weight: bold;
      color: #333;
      margin: 0;
    }
    .glossary-close {
      background: #f6f6f6;
      border: 1px solid #c5c5c5;
      color: #454545;
      cursor: pointer;
      padding: 0.4rem;
      border-radius: 3px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .glossary-close:hover {
      background: #ededed;
      border-color: #ccc;
      color: #2b2b2b;
    }
    .glossary-close svg {
      width: 18px;
      height: 18px;
    }

    .glossary-search {
      position: relative;
    }
    .glossary-search input {
      width: 100%;
      padding: 0.5em 1em 0.5em 2.25rem;
      background: #fff;
      border: 1px solid #c5c5c5;
      border-radius: 3px;
      color: #333;
      font-family: inherit;
      font-size: 1em;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }
    .glossary-search input::placeholder {
      color: #777;
    }
    .glossary-search input:focus {
      outline: none;
      border-color: #003eff;
      box-shadow: 0 0 3px 1px #5e9ed6;
    }
    .glossary-search-icon {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: #777;
    }
    .glossary-search-count {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.75rem;
      color: #777;
    }

    .glossary-content {
      flex: 1;
      overflow-y: auto;
      padding: 0.5em 1em;
      background: #fff;
    }
    .glossary-content::-webkit-scrollbar {
      width: 8px;
    }
    .glossary-content::-webkit-scrollbar-track {
      background: #f6f6f6;
    }
    .glossary-content::-webkit-scrollbar-thumb {
      background: #c5c5c5;
      border-radius: 3px;
    }
    .glossary-content::-webkit-scrollbar-thumb:hover {
      background: #777;
    }

    .glossary-entry {
      padding: 1rem 0;
      border-bottom: 1px solid #ddd;
      animation: glossaryFadeIn 0.2s ease;
    }
    .glossary-entry:last-child {
      border-bottom: none;
    }
    @keyframes glossaryFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .glossary-term {
      font-size: 1.1rem;
      color: #dc2626;
      margin-bottom: 0.4rem;
      font-weight: bold;
    }
    .glossary-definition {
      color: #333;
      font-size: 0.875rem;
      line-height: 1.5715;
    }
    .glossary-definition strong {
      color: #2b2b2b;
      font-weight: bold;
    }
    .glossary-see-also {
      margin-top: 0.6rem;
      font-size: 0.8rem;
      color: #777;
      font-style: italic;
    }
    .glossary-see-also span {
      color: #dc2626;
      cursor: pointer;
      transition: color 0.2s ease;
    }
    .glossary-see-also span:hover {
      color: #991b1b;
      text-decoration: underline;
    }

    .glossary-no-results {
      text-align: center;
      padding: 2.5rem 1rem;
      color: #777;
    }
    .glossary-no-results svg {
      width: 40px;
      height: 40px;
      margin-bottom: 0.75rem;
      opacity: 0.5;
    }

    .glossary-footer {
      padding: 0.5em 1em;
      border-top: 1px solid #ddd;
      background: #e9e9e9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    .glossary-page-info {
      font-size: 0.8rem;
      color: #454545;
    }
    .glossary-pagination {
      display: flex;
      gap: 0.4rem;
    }
    .glossary-btn {
      background: #f6f6f6;
      border: 1px solid #c5c5c5;
      color: #454545;
      padding: 0.4em 1em;
      font-family: inherit;
      font-size: 0.8rem;
      cursor: pointer;
      border-radius: 3px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .glossary-btn:hover:not(:disabled) {
      background: #ededed;
      border-color: #ccc;
      color: #2b2b2b;
    }
    .glossary-btn:active:not(:disabled) {
      background: #dc2626;
      border-color: #991b1b;
      color: #fff;
    }
    .glossary-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .glossary-btn svg {
      width: 14px;
      height: 14px;
    }

    .glossary-highlight {
      background: #fecaca;
      color: #991b1b;
      padding: 0.1em 0.2em;
      border-radius: 2px;
      border: 1px solid #f87171;
    }

    .glossary-error {
      text-align: center;
      padding: 2.5rem 1rem;
      color: #cc0000;
    }
  `;

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
    btn.innerHTML = `
      <span class="flash-dot"></span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      Safety Glossary
    `;
    document.body.appendChild(btn);
    return btn;
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
          <h2>⚠️ Safety Risk Categories Glossary</h2>
          <button class="glossary-close" id="glossary-close" aria-label="Close glossary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="glossary-search">
          <svg class="glossary-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" id="glossary-search-input" placeholder="Search risk categories..." autocomplete="off">
          <span class="glossary-search-count" id="glossary-search-count"></span>
        </div>
      </div>
      <div class="glossary-content" id="glossary-content"></div>
      <div class="glossary-footer">
        <span class="glossary-page-info" id="glossary-page-info"></span>
        <div class="glossary-pagination">
          <button class="glossary-btn" id="glossary-prev">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>
          <button class="glossary-btn" id="glossary-next">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    return { overlay, modal };
  }

  function formatDefinition(entry) {
    let definition = entry.definition || '';
    let seeAlso = entry.see_also || [];

    // Escape HTML
    let formatted = definition
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Convert bullet points
    formatted = formatted.replace(/^• /gm, '<br>• ');
    formatted = formatted.replace(/^\d+\. /gm, '<br>$&');
    
    // Bold quoted terms
    formatted = formatted.replace(/"([^"]+)"/g, '<strong>"$1"</strong>');

    // Clean up line breaks
    formatted = formatted.replace(/\n{2,}/g, '<br><br>');
    formatted = formatted.replace(/\n/g, ' ');

    // Add see also section if present
    if (seeAlso.length > 0) {
      const terms = seeAlso.map(term =>
        `<span data-term="${term}">${term}</span>`
      ).join(', ');
      formatted += `<div class="glossary-see-also">See also: ${terms}</div>`;
    }

    return formatted;
  }

  function highlightTerm(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="glossary-highlight">$1</span>');
  }

  function renderPage(query = '') {
    const content = document.getElementById('glossary-content');
    const pageInfo = document.getElementById('glossary-page-info');
    const prevBtn = document.getElementById('glossary-prev');
    const nextBtn = document.getElementById('glossary-next');
    const searchCount = document.getElementById('glossary-search-count');

    const totalPages = Math.ceil(filteredTerms.length / CONFIG.itemsPerPage);
    const start = (currentPage - 1) * CONFIG.itemsPerPage;
    const end = start + CONFIG.itemsPerPage;
    const pageTerms = filteredTerms.slice(start, end);

    searchCount.textContent = query
      ? `${filteredTerms.length} found`
      : `${allTerms.length} categories`;

    if (pageTerms.length === 0) {
      content.innerHTML = `
        <div class="glossary-no-results">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No categories found matching "${query}"</p>
        </div>
      `;
    } else {
      content.innerHTML = pageTerms.map(term => `
        <div class="glossary-entry">
          <div class="glossary-term">${highlightTerm(term, query)}</div>
          <div class="glossary-definition">${formatDefinition(GLOSSARY[term])}</div>
        </div>
      `).join('');
    }

    pageInfo.textContent = totalPages > 0
      ? `Page ${currentPage} of ${totalPages}`
      : 'No results';
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;

    // Add click handlers for "See also" terms
    content.querySelectorAll('.glossary-see-also span[data-term]').forEach(span => {
      span.addEventListener('click', () => {
        const input = document.getElementById('glossary-search-input');
        input.value = span.dataset.term;
        handleSearch(span.dataset.term);
      });
    });
  }

  function handleSearch(query) {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      filteredTerms = [...allTerms];
    } else {
      filteredTerms = allTerms.filter(term =>
        term.toLowerCase().includes(normalizedQuery) ||
        (GLOSSARY[term].definition && GLOSSARY[term].definition.toLowerCase().includes(normalizedQuery))
      );
    }

    currentPage = 1;
    renderPage(query);
  }

  function openModal() {
    const overlay = document.getElementById('glossary-overlay');
    const modal = document.getElementById('glossary-modal');
    const input = document.getElementById('glossary-search-input');

    overlay.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    input.value = '';
    filteredTerms = [...allTerms];
    currentPage = 1;
    renderPage();

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
  // INITIALIZATION
  // ============================================
  function init() {
    // Initialize terms from embedded glossary
    allTerms = Object.keys(GLOSSARY).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
    filteredTerms = [...allTerms];

    // Inject styles and create elements
    injectStyles();
    createTriggerButton();
    createModal();

    // Event listeners
    document.getElementById('glossary-trigger').addEventListener('click', openModal);
    document.getElementById('glossary-close').addEventListener('click', closeModal);
    document.getElementById('glossary-overlay').addEventListener('click', closeModal);

    document.getElementById('glossary-search-input').addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });

    document.getElementById('glossary-prev').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(document.getElementById('glossary-search-input').value);
        document.getElementById('glossary-content').scrollTop = 0;
      }
    });

    document.getElementById('glossary-next').addEventListener('click', () => {
      const totalPages = Math.ceil(filteredTerms.length / CONFIG.itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(document.getElementById('glossary-search-input').value);
        document.getElementById('glossary-content').scrollTop = 0;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    document.getElementById('glossary-modal').addEventListener('click', (e) => {
      e.stopPropagation();
    });

    console.log(`Safety Glossary: Loaded ${allTerms.length} risk categories`);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
