// CV content for the five public CV variants.
//
// Source of truth: Master CV (v7) and Master Achievement Bank (v6), plus the
// owner's updates for this build (UK-wide location, 5M+ visits, FirstBank role
// line, SDK figures, workshop figures). Anything marked OPEN or VERIFY in the
// achievement bank is left out. Every variant draws on the same bullet library
// below, so the facts stay identical and only the selection and order change.

export const CONTACT = {
  name: "Layor Salami",
  legalName: "Mubarak Salami",
  location: "United Kingdom",
  email: "salamilayor@gmail.com",
  phone: "+44 7881 188551",
  site: "layorsalami.com",
  linkedin: "linkedin.com/in/layor-salami",
};

export const SKILLS = {
  design: [
    "Product design",
    "End-to-end product design, interaction design, UI and visual design, wireframing and prototyping, responsive and native mobile (iOS, Android, React Native), motion and micro-interactions (Lottie), onboarding and conversion, 0-to-1 products",
  ],
  mobile: [
    "Consumer and mobile",
    "Native mobile design for iOS, Android and React Native, phone and tablet layouts, one-handed and in-motion use, onboarding and conversion, checkout and payments, motion and micro-interactions (Lottie), 0-to-1 products",
  ],
  research: [
    "Research and strategy",
    "User research, line-managing researchers, research briefs and questions, ethnographic observation and shadowing, usability testing, A/B testing, journey mapping, information architecture, service design, discovery and co-design workshops, behavioural analytics (PostHog, Hotjar), market sizing, competitive analysis, PRDs and roadmapping",
  ],
  systems: [
    "Systems and delivery",
    "Design systems, component libraries and tokens, accessibility (WCAG 2.2), design operations, Agile and Scrum, cross-functional collaboration, stakeholder management at scale, design leadership and mentoring",
  ],
  data: [
    "Data visualisation and BI",
    "Dashboard design for D3.js implementation, business intelligence for non-technical stakeholders, custom report builders, natural-language report retrieval, chart and data table design, Excel export",
  ],
  ops: [
    "Operational and regulated",
    "Clinical and operational workflows, queue and scheduling systems, role-based permissions, localisation and regulatory compliance, KYC/AML, digital account opening, transaction approvals and fraud review, regulatory sign-off",
  ],
  fintech: [
    "Fintech and compliance",
    "KYC/AML, digital account opening, payments, wallets and FX, card products, banking partnerships, transaction approvals and fraud review, regulatory sign-off",
  ],
  ai: [
    "AI",
    "AI product design (guardrails, safe handoffs to people), AI-assisted design and rapid iteration, building products with AI tools (Claude Code, Cursor, v0, Google AI Studio, GitHub Copilot, Figma AI, Figma Make)",
  ],
  tools: [
    "Tools",
    "Figma (Variables, Auto Layout, Component Properties), FigJam, Framer, Lottie, Miro, Jira, GitHub, PostHog, Hotjar, Supabase, React Native, HTML and CSS, Microsoft Word, Excel and PowerPoint (expert)",
  ],
};

export const JOBS = {
  indigo: {
    org: "IndigoEMR",
    title: "Senior Product Designer, Team Lead",
    dates: "April 2022 to present",
    intro:
      "Cloud hospital management platform: 200,000+ patient records, 300+ healthcare professionals and 20+ branches across multiple markets, with 5M+ appointment visits logged across the platform. Lead and mentor a team of three designers (senior, mid-level, junior) on some products, such as V3, and am the sole designer on others: the patient app, the admin back office and business intelligence. Own the design system.",
  },
  firstbank: {
    org: "FirstBank",
    title: "Product Consultant, design contract (Senior Product Designer)",
    dates: "February 2023 to March 2024",
    intro:
      "Concurrent with IndigoEMR; reported to the CTO. Digital banking across individual account opening, diaspora banking, account maintenance and corporate banking, working with Sales, KYC, Compliance, Marketing, account officers, corporate banking executives, directors and MDs.",
  },
  sharply: {
    org: "Sharply Africa",
    title: "Founder and Lead Product Designer",
    dates: "February 2021 to 2024",
    intro: "",
  },
  summitech: {
    org: "Summitech Computing Ltd",
    title: "UI/UX Designer to Senior Product Designer",
    dates: "May 2017 to January 2021",
    intro:
      "Digital agency. Progressed from UI/UX Designer to Product Designer to Senior Product Designer, with project management duties, across several client projects at once; some owned end to end, others scoped contributions against a project manager's requirements.",
  },
};

export const B = {
  // IndigoEMR
  emr_research:
    "Ran my own research for V3, then commissioned and line-managed two external researchers (one senior) for about three months of on-site fieldwork across hospitals: wrote the brief and research questions, chose the sites and reviewed weekly reports. Withheld the product at first to keep observations unbiased, then checked their findings against my own hypotheses; several held up and shaped V3's architecture and onboarding.",
  emr_bi:
    "Designed a suite of business intelligence dashboards for D3.js implementation (inventory, revenue and cost, patient health, hospital performance, returning-patient and post-surgical tracking), used across all 20+ branches and giving administrators, department heads and CMDs visibility of revenue, medication sales, diagnosis trends, admissions, readmission rate and referral flow. Led the discovery with CMDs, hospital leaders, clients, prospects, surveys and system-usage review, and worked hands-on with the data to map each report to what the database could produce.",
  emr_report:
    "Designed a self-service report builder (sections, filters, date ranges, selectable columns, export) that cut management and board report preparation by 90%; reports generate in 2 to 10 minutes depending on complexity.",
  emr_nlq:
    "Designed and shipped natural-language report queries in the BI module: users ask for a report in plain language, and when no report matches it asks a follow-up question instead of hitting a dead end.",
  emr_symptom:
    "Designed and shipped an AI-powered symptom checker in the patient app, built on an existing LLM through its API (prompts, instructions, interface and guardrails; no custom-trained model). Wrote the guardrails myself: it never gives a final diagnosis and always ends by directing the patient to book an appointment with a consultant.",
  emr_ai_practice:
    "Drove adoption of AI-assisted rapid iteration across the product organisation: ran workshops teaching product managers to test hypotheses with AI tools before roadmap commitment, demoed concepts to the company ahead of Figma handoff, and worked with engineering to set up a dedicated experiments environment, separate from production, dev and staging, so AI-generated concepts could be tested with real users before build. The sales team later adopted the practice for experimental website concepts.",
  emr_backoffice:
    "Led the admin back office that internal teams use to manage and monitor the EMR service: requirements discovery, metric definition with the CEO and management, information architecture and workflows for client and subscription management, plan configuration, performance and error monitoring, locations, currencies, and market-specific compliance and reporting. Defined the permissions, risks and actions administrators should and should not have in the core EMR.",
  emr_form:
    "Identified that manual form configuration requests were outpacing what the team could support, then proposed and designed a self-service Form Builder end to end: configuration time cut from 1 week to 30 minutes (99%), form-related support tickets near zero, and 250+ custom forms in production (13 per hospital on average) over 2 to 3 years.",
  emr_patient:
    "Identified the unmet need for patient record access and independently designed and shipped a native React Native patient app: results, bill payment, booking and viewing appointments, recent complaints and prescribed medications. Used by 20,000+ active patients across 200,000+ registered records.",
  emr_pay:
    "Designed a standalone scan-to-pay portal, with no download needed, so patients settle bills from the waiting room instead of queuing at the cashier; payment queues fell by up to 25% on busy clinic days. Kept accounting intact (pro forma invoices, invoices, QuickBooks and Sage compatibility) and positioned the portal as a low-commitment first touchpoint before the full app.",
  emr_triage:
    "Triage workflow (deployed 2026): replaced a loop in which nurses opened a full patient file to record vitals, then returned to the dashboard for the next patient, with a dedicated triage queue. Accepting and attending the next patient is now 1 click, down from 3 to 4 (patient search and the vitals form excluded), and each acceptance records which staff member is attending.",
  emr_consumables:
    "Redesigned the clinical consumables workflow after the first version failed its own usability test: traced it from issuance to return, added a checkpoint at admission, and rebuilt it around billing and insurance status first (HMO versus out-of-pocket), a structured 58-item clinical indication list instead of free text, 10 tracked status stages and purpose-built actions for 4 roles (Doctor, Nurse, Senior Nurse, Pharmacist), with the full request-to-dispensed loop inside the patient profile.",
  emr_queue:
    "Designed a queue management system with visible status screens and specialty-specific stages, after finding that appointment records alone could not show who was checked in and who was next.",
  emr_rota:
    "Designed the staff scheduling and rota system: shift and availability setup, swap requests and assignment flow, with availability deciding who can be assigned to appointment slots. Live since V1 and used by 300+ clinicians.",
  emr_ds:
    "Led visual direction for the IndigoEMR design system from the ground up: 150+ components, WCAG 2.2 compliant by default, with token-driven typography, colour and spacing used on every surface, cutting design-to-engineering handoff time by 30%. Introduced UX KPIs that gave leadership visibility of usability and adoption alongside engineering velocity.",
  emr_findability:
    "Tested three prototype iterations (structured list views against appointment cards) to fix how users find historical patient records; reported time to locate records fell by more than 70%, and 90% of users who started using the new view did not return to the old one.",
  emr_nav:
    "Found through interviews and observation that rigid module separation forced full-page reloads, an estimated 60 to 70% more time per task (about 10 seconds per navigation); proposed and led a navigation restructure, and in A/B testing against the legacy menu most users who tried the new navigation did not go back.",
  emr_partnership:
    "Designed the Partnership feature, live as a pilot with Eye Foundation and The Eye Shop, replacing phone, WhatsApp and paper referrals with permissioned inter-hospital data sharing: role-based access, opt-in by default across four categories (records, inventory, billing, branch mapping) and a read-only-until-migrated rule that keeps the originating hospital's data authoritative.",
  emr_kenya:
    "Led market-specific design for the Kenya expansion, adapting language, flows and health-system architecture (a government-backed insurance model and required HMO claims portals), and keep the product compliant as rules change; more Kenyan hospitals have since been onboarded.",
  emr_carer:
    "Research into chronic care showed family caregivers coordinating day-to-day care with no system access; designed a tiered patient-carer access model with secure delegated access to prescriptions and appointments, resulting in fewer missed appointments among carer-linked accounts.",
  emr_sales:
    "Market sizing (surveys, questionnaires, desk research) showed fewer than 10% of home-market hospitals run multiple branches; built the case for a sales function aimed at single-branch and partner-network hospitals, and hired and led the first sales hire (interview criteria, KPIs), contributing to a doubling of the hospitals sold to.",
  emr_v3:
    "Made the case for a ground-up V3 rebuild after finding that V2's five-year-old architecture limited onboarding and scalability; commissioned it and lead its system architecture and design system (in design, not yet shipped), while limiting interim V2 changes to fixes that need no backend rework.",

  // FirstBank
  fb_sdk:
    "Designed the Account Opening SDK for web and mobile: a reusable, checkpoint-based system that lets customers start on one channel (web, mobile, branch) and resume on another without re-entering data, defining which steps were safe to interrupt and what needed re-verification after a gap. Online accounts rose from under 1% to 7% of all account openings by the end of the financial year of launch, with minimal marketing support. Separately, website and web-banking account openings grew from 281 in 2023 to 50,000+ by 2025 (figure from the bank's CTO).",
  fb_workshops:
    "Facilitated 10+ workshops for the account opening initiative, some with 300+ attendees, including an 8-lead BRD alignment and a 100+ stakeholder co-design session, and presented the work at a company-wide demo day to directors and MDs.",
  fb_diaspora:
    "Traced a reported drop-off at identity verification among overseas applicants to a gap between the stated requirement and what shipped (a dead-end button with no location information); redesigned the diaspora journeys for opening and reactivating accounts around a country-specific enrolment centre lookup with addresses and opening hours, save-and-resume, and a guided path for applicants who have the required ID number but do not know it offhand.",
  fb_maintenance:
    "Designed self-service digital account maintenance through the bank's website and digital channels, so customers update supported account details without visiting a branch or queuing; shipped and promoted through banners and marketing.",
  fb_direct:
    "Sole designer of FirstDirect 2.0, the bank's native corporate banking app for iOS and Android, phone and tablet: modernised a legacy app, brought web-only capabilities into mobile, and redesigned it end to end, from a six-step onboarding reworked from a compliance form into guided setup, to single and bulk payments, beneficiary management, subsidiary switching across 8 organisations, liquidity management, payment insights, invoicing and account sweeping. Designed phone and tablet separately for their contexts; the tablet solution extended the app to more types of users.",
  fb_approvals:
    "Designed a multi-user transaction approval workflow with batch review; when executives asked for a larger review screen at a demo day, synthesised their feedback into empathy and affinity maps and scoped a dedicated tablet approval experience.",
  fb_foundation:
    "Led visual direction for a shared design foundation (colour, typography, spacing, components, iconography and a responsive grid from 375px to 1200px) after spotting fragmentation across three vendor-built products; built without a brief, and the other workstreams now run on it.",
  fb_compliance:
    "Partnered with engineering and compliance through QA and regulatory sign-off, so production interfaces matched approved designs while meeting banking and security requirements; introduced structured design critiques and mentored mid-level designers.",

  // Sharply Africa
  sh_scale:
    "Founded and led a logistics marketplace as CEO and majority-equity founder with two engineering co-founders, owning product management, research, design, operations, financing and payroll. The platform served 100+ logistics organisations with 1,000+ riders and thousands of orders delivered daily, sustaining a 96% DIFOT rate. On closing in 2024, licensed the product IP to Famasi Africa for their internal logistics while keeping ownership.",
  sh_apps:
    "Designed four connected apps end to end (Business Admin, Rider, Partners, Customer), offline-first for local operating conditions, with logistics orchestration that connects businesses without their own fleet to third-party logistics companies and supports businesses running their own.",
  sh_rider:
    "Designed the rider app as Android-only after research showed 90% of the rider market used Android; built for one-handed, in-motion use, with colour-coded swipe actions replacing tap-to-confirm for pickup and delivery.",
  sh_bidding:
    "Designed a partner bidding portal where third-party logistics companies compete for delivery jobs through a shareable link with no app install, with clear wait-state messaging for variable connectivity.",
  sh_ds:
    "Led visual direction for a shared component library built for low-bandwidth use; rebuilt an overbuilt first version around live use cases only, cutting front-end rework by 30%.",
  sh_onboarding:
    "Used PostHog and Hotjar data to find users dropping off before their first transaction, and rebuilt onboarding around observed behaviour, contributing to a significant rise in repeat usage within the first quarter.",
  sh_team:
    "Built and managed a team of 7+ designers and developers, and ran mixed-method research with no dedicated research function, contributing to a 20% increase in feature adoption.",

  // Summitech
  su_moniwave:
    "Moniwave (fintech): lead designer and product lead, reporting to the CEO and COO of Summit Group, across multi-currency wallets, FX and P2P exchange, bill payments, virtual and physical cards, KYC gating, transaction approvals, fraud review, sanctions screening and back-office tooling. Designed the product architecture, how KYC interacts with the product and how money moves; led the banking licence process, bank partnerships, the KYC/AML framework and the CBN relationship, managing a team of 5.",
  su_nubian:
    "Nubian Skin: designed the Shopify storefront and mobile checkout with the CEO after Google Analytics showed mobile was the weakest area; improved the mobile storefront, checkout and skin-tone representation around Black Friday, contributing to a 15% uplift in mobile checkouts and roughly doubled sales during a major shopping event.",
  su_goby:
    "Goby Homes (US real estate): sole product designer from V2, owning the redesign end to end (design system, visual identity and logo) and a three-pane architecture that replaced manual listing import with pulled listings; the platform later reached 20,000+ users, per the founder.",
  su_multichoice:
    "MultiChoice (DStv): designed, to the project manager's requirements, a nationwide field service tool: a technician mobile app logging warehouse pickup, arrival, departure and job completion, reporting in real time to a tiered central system, after a significant discovery phase.",
  su_cinema:
    "Filmhouse Cinemas and EbonyLife Place: contributed movie discovery, multi-location navigation and food ordering to Filmhouse's online booking rebuild, which led to designing EbonyLife Place's cinema booking and seat selection (with its own design system), hotel and restaurant booking.",
  su_enaro:
    "Enaro Energy: led design for a mini-grid provider's customer top-up and usage app and an admin grid-monitoring tool (production, source switching, power loss), mentoring a second designer; the platform is reported to cover over 400,000 households.",
  su_general:
    "Built interactive prototypes and motion concepts that cut the time between usability testing and launch by 25%, and investor-ready prototypes that helped leadership support new commercial partnerships.",

  // Other projects
  op_rabii:
    "Rabii (2026): designed and built, front end and back end, a UK coach ticket comparison app (FlixBus and National Express) with Claude Code and Cursor. First working build in one sitting; privacy-first (no account, no analytics, on-device search history); moved the backend from a third-party data service to self-hosted fetching after seeing the cost curve; Supabase with a custom back office for routes. MVP on TestFlight.",
  op_mumbuddie:
    "Mumbuddie (2026): designed and built, with Claude Code, Cursor, v0 and Google AI Studio, a pregnancy and postpartum companion app for underserved minority communities in the UK and Germany: a native React Native app plus a React web version. Shipped and in private beta.",
  op_story:
    "Story-writing and reading platform (2026, freelance design lead): writer and reader experience, a story-first model of theme-based public collections, an admin rebuilt around one flag-then-resolve moderation loop with role-based admins, and voice dictation for the writing flow.",
  op_propty:
    "Propty (co-founder, in beta): designed the landlord and tenant apps for a property management platform managing 500+ units, improving on-time payment communication from 30% to 58%; wrote the billing requirements, OKRs, PRD and roadmap.",
  op_propty_ai:
    "Propty (co-founder, in beta): designed the landlord and tenant apps for a property management platform managing 500+ units, built with AI coding tools then handed to engineers; improved on-time payment communication from 30% to 58%, and wrote the billing requirements, OKRs, PRD and roadmap.",
  op_caresify:
    "Caresify (white-label, delivered through IndigoEMR): designed a shift and care management system for a US and UK home care provider with over 200 carers (client figure): care applications, carer recruitment, shift management, payroll, complaint logging and a carer mobile app with location check-in. Shipped and live.",
  op_flavor:
    "FlavorQueste: designed restaurant discovery and booking from search to reservation, for a platform with 500+ restaurants listed and live in Lagos and Abuja.",
  op_kunda:
    "Kunda Kids: designed a children's literacy app from research to shipped product within a 22-day contract.",
};

export const EDUCATION = [
  ["MSc User Experience Design", "University of Portsmouth", "2025"],
  ["BSc Finance", "University of Lagos", "2021"],
  ["AML and KYC certification", "Coursera", "2020"],
];

// Section order: profile and skills always lead. `order` lists the remaining
// sections in the order they appear.
export const VARIANTS = [
  {
    slug: "Mubarak-Salami-CV-Senior-Product-Designer",
    headline: "Senior Product Designer",
    profile:
      "Senior Product Designer with 9+ years of experience designing and shipping digital products across healthtech, fintech, SaaS, logistics and marketplaces, on web and native mobile (iOS, Android, React Native). Leads product design at IndigoEMR, a cloud hospital management platform used across 20+ branches, owning the design system and designing clinical, operational, business intelligence and patient-facing products. Conducts research hands-on and has line-managed external researchers. Led visual direction on three design systems built from the ground up (IndigoEMR, FirstBank, Sharply). Has designed and shipped AI-powered features, and builds and ships independent products with AI tools. Founded and led a logistics marketplace. Known for spotting strategic problems in data and behaviour before being briefed on them.",
    skills: ["design", "research", "systems", "data", "ai", "fintech", "tools"],
    order: ["work", "education", "projects"],
    jobs: {
      indigo: ["emr_research", "emr_bi", "emr_report", "emr_patient", "emr_symptom", "emr_form", "emr_triage", "emr_ds", "emr_ai_practice"],
      firstbank: ["fb_sdk", "fb_workshops", "fb_direct", "fb_foundation"],
      sharply: ["sh_scale", "sh_rider", "sh_onboarding"],
      summitech: ["su_moniwave", "su_nubian", "su_goby"],
    },
    projects: ["op_rabii", "op_mumbuddie", "op_propty"],
  },
  {
    slug: "Mubarak-Salami-CV-Senior-Product-Designer-B2B",
    headline: "Senior Product Designer, B2B and Platforms",
    profile:
      "Senior Product Designer with 9+ years of experience on B2B platforms, internal tools and data-heavy products in healthtech, fintech and logistics. At IndigoEMR, designs the business intelligence suite, self-service report builder, admin back office and Form Builder for a cloud hospital management platform used across 20+ branches. At FirstBank, was sole designer of FirstDirect 2.0, the native corporate banking app for iOS and Android, phone and tablet. Led visual direction on three design systems built from the ground up (IndigoEMR, FirstBank, Sharply), and aligns executives, operations teams and engineering through facilitated workshops. Founded and led Sharply, a B2B logistics marketplace serving 100+ logistics organisations.",
    skills: ["data", "systems", "research", "design", "fintech", "ai", "tools"],
    order: ["work", "projects", "education"],
    jobs: {
      indigo: ["emr_bi", "emr_report", "emr_nlq", "emr_backoffice", "emr_form", "emr_partnership", "emr_ds", "emr_research", "emr_sales"],
      firstbank: ["fb_direct", "fb_approvals", "fb_foundation", "fb_workshops", "fb_sdk"],
      sharply: ["sh_scale", "sh_apps", "sh_bidding", "sh_ds"],
      summitech: ["su_moniwave", "su_enaro"],
    },
    projects: ["op_caresify", "op_propty", "op_story"],
  },
  {
    slug: "Mubarak-Salami-CV-Senior-Product-Designer-Operational",
    headline: "Senior Product Designer, Operational and Regulated Products",
    profile:
      "Senior Product Designer with 9+ years of experience designing operational, workflow-heavy and regulated products in healthcare, banking and logistics. At IndigoEMR, designs clinical and operational workflows (triage, consumables, queue management, staff scheduling and rota) for a cloud hospital management platform used across 20+ branches, and adapted the product for the Kenyan market and its health-system rules. At FirstBank, designed KYC-dependent account opening and diaspora journeys through compliance and regulatory sign-off. Starts from observation and shadowing of real work, and has line-managed external field researchers. Led visual direction on three design systems built from the ground up.",
    skills: ["ops", "research", "design", "systems", "data", "ai", "tools"],
    order: ["work", "projects", "education"],
    jobs: {
      indigo: ["emr_triage", "emr_consumables", "emr_queue", "emr_rota", "emr_findability", "emr_nav", "emr_kenya", "emr_backoffice", "emr_research"],
      firstbank: ["fb_compliance", "fb_diaspora", "fb_sdk", "fb_workshops", "fb_maintenance", "fb_approvals"],
      sharply: ["sh_scale", "sh_apps", "sh_rider"],
      summitech: ["su_multichoice", "su_moniwave", "su_enaro"],
    },
    projects: ["op_caresify", "op_propty"],
  },
  {
    slug: "Mubarak-Salami-CV-Product-Designer-Consumer-Mobile",
    headline: "Product Designer, Consumer and Native Mobile",
    profile:
      "Product Designer with 9+ years of experience designing and shipping consumer and native mobile products for iOS, Android and React Native. At IndigoEMR, designed and shipped the React Native patient app, used by 20,000+ active patients across 200,000+ registered records, and a no-download scan-to-pay portal. Designs and builds independent consumer apps with AI tools: Rabii, a UK coach ticket comparison app on TestFlight, and Mumbuddie, a pregnancy and postpartum companion app in private beta. Earlier work spans an Android-only rider app, banking journeys on phone and tablet, and ecommerce mobile checkout. Grounds mobile decisions in research and behavioural data.",
    skills: ["mobile", "research", "systems", "ai", "tools"],
    order: ["work", "projects", "education"],
    jobs: {
      indigo: ["emr_patient", "emr_pay", "emr_symptom", "emr_carer", "emr_findability", "emr_ds", "emr_research"],
      firstbank: ["fb_sdk", "fb_direct", "fb_diaspora", "fb_maintenance"],
      sharply: ["sh_rider", "sh_onboarding", "sh_scale", "sh_ds"],
      summitech: ["su_nubian", "su_goby", "su_cinema", "su_general"],
    },
    projects: ["op_rabii", "op_mumbuddie", "op_flavor", "op_kunda", "op_caresify", "op_story"],
  },
  {
    slug: "Mubarak-Salami-CV-Product-Designer-AI-Services",
    headline: "Product Designer, AI-Powered Products",
    profile:
      "Product Designer with 9+ years of experience who designs AI-powered product features and builds products with AI tools. At IndigoEMR, designed and shipped an AI-powered symptom checker, including writing its guardrails, and natural-language report queries in the business intelligence module, and set up an AI adoption practice with workshops for product managers and a dedicated experiments environment. Designs and builds independent products with Claude Code and Cursor: Rabii, a UK coach ticket comparison app on TestFlight, and Mumbuddie, a pregnancy and postpartum companion app in private beta. Grounded in design systems and research: led visual direction on three design systems built from the ground up, and has line-managed external researchers.",
    skills: ["ai", "design", "research", "systems", "data", "tools"],
    order: ["work", "projects", "education"],
    jobs: {
      indigo: ["emr_symptom", "emr_nlq", "emr_ai_practice", "emr_bi", "emr_report", "emr_research", "emr_ds", "emr_patient", "emr_form"],
      firstbank: ["fb_sdk", "fb_workshops", "fb_direct", "fb_foundation"],
      sharply: ["sh_scale", "sh_onboarding", "sh_ds"],
      summitech: ["su_moniwave", "su_general"],
    },
    projects: ["op_rabii", "op_mumbuddie", "op_propty_ai", "op_story"],
  },
];
