/* ───────────────────── DATA ───────────────────── */

const PROJECTS = [
  {
    featured: true,
    title: "IndigoEMR",
    year: "2022 — Present",
    description:
      "One of Nigeria's only cloud-native hospital management systems, serving 200,000+ patients across Nigeria and Kenya. I built the design system from scratch and redesigned core clinical workflows, including the consumables and patient management flows. Design-to-engineering handoff time down 30%.",
    cta: "Read case study",
    ctaLink: "https://www.figma.com/deck/hijNz3lVFpI9LAu93yyEMb/IndigoEMR-case-study?node-id=115-1739&viewport=-1881%2C-68%2C0.87&t=ujc95kBWOQsmPu70-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    websiteLink: "https://indigoemr.com",
    media: [
      { type: "video", src: "./public/videos/Indigo web Preview-2.mp4" },
      { type: "image", src: "./public/Images/Frame%201005.png" },
      { type: "image", src: "./public/Images/Frame%201004.png" },
    ],
    heroArt: "indigo",
    detail: {
      role: "Senior Product Designer",
      timeline: "2022 — Present",
      platform: "Web",
      status: "Live",
      platformIntro: {
        eyebrow: "Introducing IndigoEMR",
        heading: "From a bespoke build to a SaaS platform",
        body: "IndigoEMR is a cloud-native hospital management system used across Nigeria and Kenya. It didn't start as a platform. V1 was a bespoke electronic medical record system, built and hand-deployed individually for ophthalmology practices — every new client meant a custom implementation, not a product a hospital could simply sign up for. I led the transition from that model to V2: a true multi-tenant SaaS platform, where any hospital, regardless of specialty, can onboard, configure, and run its own clinical workflows without a custom build.",
        stat: { value: "2M+", label: "appointment visits logged on V2 across the platform" }
      },
      clientSpotlight: {
        heading: "Trusted by Eye Foundation Hospital",
        body: "Founded in 1993, the Eye Foundation Hospital (EFH) Group has grown into one of the largest and most advanced private eye care networks in West Africa. Operating a hub-and-spoke model across seven specialized hospital branches and a wide network of primary vision centers, EFH is a critical pillar of ophthalmology on the continent, and one of IndigoEMR's flagship hospital networks. As an accredited post-graduate training hub, EFH also shapes the next generation of African ophthalmologists and clinical staff equipped to combat avoidable blindness across the region.",
        stats: [
          { value: "1993", label: "Founded" },
          { value: "7+", label: "Specialized hospital branches, hub-and-spoke" },
          { value: "2M+", label: "Patients treated" },
          { value: "200,000+", label: "Sight-restoring surgeries completed" }
        ]
      },
      businessContext: "IndigoEMR started as an electronic medical record system built specifically for ophthalmology. It worked for that one specialty, but the company wanted to serve all medical practices, from single-branch clinics to large multi-specialty hospitals. The first version could not flex. V2 tried to solve this by manually building distinct patient workflows for each new specialty. I personally designed those workflows, and the approach worked initially. But it did not scale. Every new hospital required a week of manual setup by a designer and an engineer working together, and even after launch, each new client logged an average of 5+ support tickets requesting form modifications. The system that was supposed to replace paper was, for some hospitals, slower and harder to use than paper. That was the problem I set out to fix.",
      businessContextStat: {
        value: "5+",
        label: "support tickets per client after launch, mostly about forms"
      },
      businessContextWorkstreamId: "form-builder",
      caseStudyLink: "",
      workstreams: [
        {
          id: "form-builder",
          navLabel: "Form Builder",
          heading: "From manual workflows to a self-serve form builder",
          problem: "Every form customization or new specialty setup required a designer and an engineer working together for 3 to 5 working days. Hospitals with specialists could not find the fields they needed during consultations, and frequently resorted to writing on paper instead. Two General Practice clinics had completely different ways of working, but the system forced them into one fixed patient journey. The real benchmark hospitals measured against was not other software. It was paper.",
          scope: "Rather than continuing to build custom workflows for each hospital, I designed a form builder and data library that let hospital staff create and manage their own clinical forms without engineering involvement. The form builder uses a drag-and-drop component system that any hospital administrator can assemble into a working clinical form. The data library sits alongside it, letting hospitals manage their own medical standards, diagnoses, symptoms, allergies, and medications, with the ability to add, edit, clone, and remove values that were previously locked into the system. The first iteration got real feedback from users, developers, and leadership: collections needed to support multi-specialty values, cloned versus added data needed visible indicators, and the form builder needed version history so users could undo mistakes confidently. I incorporated all of that into the shipped version.",
          stat: { value: "99%", label: "reduction in onboarding time, from 1 week to 30 minutes" },
          outcome: "Form-related support tickets dropped to near zero. Hospitals created 250+ custom medical forms themselves shortly after launch. Over 100,000 patient records have been entered using these tailored forms. The form builder was directly responsible for enabling IndigoEMR's expansion into Kenya, because new hospitals could onboard in minutes rather than weeks.",
          showcase: {
            eyebrow: "IndigoEMR — Form Builder Workstream",
            heroHeading: "From locked, one-size-fits-all workflows to a system hospitals build themselves.",
            heroEmphasis: "build themselves",
            lede: "Every specialty used to need a designer and an engineer, three to five working days, just to add a form. The Form Builder and Data Library replaced that with something hospital staff run on their own.",
            stats: [
              { value: "99%", label: "Reduction in onboarding time — 1 week to 30 minutes" },
              { value: "250+", label: "Custom forms created by hospitals themselves" },
              { value: "~0", label: "Form-related support tickets after launch" }
            ],
            sections: [
              {
                heading: "The library used to be a dead end",
                tag: "Before / After",
                layout: "compare",
                columns: [
                  { label: "Before — V2 Test Standards", type: "mock", title: "Test Standards", badge: "System defined", rows: ["PWR", "Height", "BC", "DIA"], caption: "Values could be added, never edited or removed" },
                  { label: "After — Data Library", type: "shot", src: "./public/Images/form-builder/img-1.png", alt: "IndigoEMR Data Library showing editable fields including Diagnosis, Country, Symptoms, Allergies, Gender, Patient ID and more", caption: "Every value editable, cloneable, and removable by hospital staff" }
                ]
              },
              {
                heading: "Empty canvas to a working form",
                tag: "Create Form flow",
                layout: "flow",
                columns: [
                  { label: "Empty state", type: "shot", src: "./public/Images/form-builder/img-2.png", alt: "Create A New Form screen with no component selected, showing available components sidebar" },
                  { label: "Components added", type: "shot", src: "./public/Images/form-builder/img-3.png", alt: "Create A New Form screen with header, short answer, dropdown fields, and a table component added" }
                ]
              },
              {
                heading: "Real forms, built by hospital staff, not by us",
                tag: "Shipped in production",
                layout: "proofWall",
                cards: [
                  { specialty: "Obstetrics", name: "Pregnancy Test", src: "./public/Images/form-builder/img-4.png", alt: "Pregnancy Test form with Serum Beta HCG and Urine Beta HCG fields", builtBy: "Built with Form Builder" },
                  { specialty: "Laboratory", name: "Full Blood Count", src: "./public/Images/form-builder/img-5.png", alt: "Full Blood Count form with Hematocrit and Hemoglobin fields", builtBy: "Built with Form Builder" },
                  { specialty: "Antenatal", name: "Follow Up Antenatal", src: "./public/Images/form-builder/img-6.png", alt: "Follow Up Antenatal form with a table for Date, GEST Age, SFH, Presentation, FHR, URINE, WT, Remark", builtBy: "Built with Form Builder" },
                  { specialty: "Immunization", name: "Adult Immunization", src: "./public/Images/form-builder/img-7.png", alt: "Adult Immunization form with a table of vaccines against age groups", builtBy: "Built with Form Builder" }
                ]
              },
              {
                heading: "Managing the data behind every form",
                tag: "Data Library",
                note: "Three ways staff manage the library: bulk import via CSV, add a single option by hand, or organize standards into folders.",
                layout: "threeCol",
                columns: [
                  { src: "./public/Images/form-builder/img-8.png", alt: "Add Item modal with CSV upload option and specialty linking field", label: "Bulk import via CSV, linked to a specialty" },
                  { src: "./public/Images/form-builder/img-9.png", alt: "Add Item modal with a single text field for typing options directly", label: "Add a single option by hand" },
                  { src: "./public/Images/form-builder/img-10.png", alt: "Add New Library Folder modal with title, description, and allow inline add toggle", label: "Organize standards into folders" }
                ]
              }
            ],
            footerStats: [
              { value: "99%", label: "Onboarding time reduced, from a week-long technical process to a 30-minute self-serve task" },
              { value: "250+", label: "Custom forms created by hospitals within weeks of launch, directly enabling expansion into Kenya" },
              { value: "100K+", label: "Patient records entered using forms hospitals built themselves" }
            ]
          }
        },
        {
          id: "partnership-feature",
          navLabel: "Partnership",
          heading: "Enabling inter-hospital collaboration through the partnership feature",
          problem: "Hospitals in Nigeria rarely operate in isolation. A patient seen at one clinic might need a specialist at another, and the referring hospital needs to share records, access inventory, transfer the patient, and keep billing separate. Before this feature, that coordination happened over phone calls, WhatsApp messages, and paper referrals. Nothing was tracked inside the system.",
          scope: "I designed the partnership feature, which enables hospitals to share patient records, access each other's inventory, transfer patients between facilities, and maintain billing separation throughout. The hardest design problem was trust: both hospitals need to see the right information without exposing data that should stay internal. I designed role-based access controls that determine what each partner hospital can view, edit, or request, while keeping billing, internal notes, and operational data separated. The feature was piloted with Eye Foundation and iShop as the first two partner hospitals.",
          stat: { value: "2", label: "pilot partners live — Eye Foundation and iShop" },
          outcome: "The partnership feature is the active MVP for IndigoEMR's multi-tenant expansion. It replaced an informal, untracked process with a structured system that keeps patient records accurate across facilities while respecting each hospital's data boundaries.",
          showcase: {
            eyebrow: "IndigoEMR — Partnership Workstream",
            heroHeading: "Letting hospitals share what they choose to, and nothing else.",
            lede: "Referrals between hospitals used to happen over phone calls and WhatsApp, with nothing tracked inside the system. The partnership feature replaces that with structured, permissioned access, built around a simple rule: both hospitals see only what the other has explicitly agreed to share.",
            stats: [
              { value: "2", label: "Pilot partners live — Eye Foundation and iShop" },
              { value: "4", label: "Granular categories a hospital controls: records, inventory, billing, branch mapping" },
              { value: "NDPR", label: "Patient record sharing requires explicit consent at first shared visit" }
            ],
            sections: [
              {
                heading: "From no partners to a managed network",
                tag: "Hospital Partner Network",
                layout: "compare",
                columns: [
                  { label: "Before any partner is added", type: "shot", src: "./public/Images/partnership-feature/img-1.png", alt: "Hospital Setup screen showing no partner found yet, with an Add Partner button" },
                  { label: "A live partner network", type: "shot", src: "./public/Images/partnership-feature/img-2.png", alt: "Hospital Partner Network dashboard showing total partnerships, active count, Indigo versus external partners, and a list of partnerships with statuses including Active, Invite Rejected with a stated rejection reason, and Pending, each with a permission summary for Patient Registration, Patient Records, Stock Transfer, and Stock Visibility" }
                ]
              },
              {
                heading: "Configuring trust is the hardest part, not the connection itself",
                tag: "Configure Partnership",
                bodyText: "Every permission is opt-in and split by direction: what this hospital shares versus what it receives, broken down into Prescription, Vitals, Case Note, and Admission Records separately. Inventory visibility, billing collection on a partner's behalf, and branch-to-branch mapping are each their own toggle, off by default.",
                layout: "single",
                src: "./public/Images/partnership-feature/img-3.png",
                alt: "Configure Partnership screen showing Patient Access Permissions with granular share and receive toggles, Inventory Management, Billing, and Select Branch Mapping sections, using Avacom Hospital as the example partner"
              },
              {
                heading: "A shared patient is always clearly marked as one",
                tag: "Patient Details",
                bodyText: "When a patient's record originates from a partner hospital, that's the first thing staff see, not something buried in a metadata field.",
                layout: "single",
                src: "./public/Images/partnership-feature/img-4.png",
                alt: "Patient Details screen with a banner reading this patient was registered by Eye Shop, shown above the full patient profile"
              },
              {
                heading: "What staff can do with a partner patient, and where the line sits",
                tag: "Access boundary",
                bodyText: "A partner patient carries the same action menu as any other record — view records, generate a medical report, book a procedure — plus one specific to the partnership itself: migrating the record. That single action is deliberate. Until a hospital migrates a partner patient, they can view but not edit, so the originating hospital's data stays authoritative.",
                layout: "compare",
                columns: [
                  { label: "The action menu", type: "shot", src: "./public/Images/partnership-feature/img-5.png", alt: "Action menu on a partner patient record showing Migrate Partner Patient, Issue Credit, Give Discount, Upload Records, View Records, Generate Medical Report, View Access Log, View Medical Report, Book Surgery, Book Procedure, Admit Patient, and Add Bill" },
                  { label: "The design rationale", type: "shot", src: "./public/Images/partnership-feature/img-6.png", alt: "Sticky note reading hospitals cannot edit partner patient until they migrate the record" }
                ]
              }
            ],
            footerStats: [
              { value: "2", label: "Hospitals piloting the feature live: Eye Foundation and iShop" },
              { value: "Opt-in", label: "Every permission defaults to off. A hospital chooses exactly what it shares and receives" },
              { value: "1 rule", label: "A partner patient stays read-only until formally migrated, keeping the originating hospital's data authoritative" }
            ]
          }
        },
        {
          id: "consumables-flow",
          navLabel: "Consumables",
          heading: "Redesigning the consumables request flow around how clinicians actually think",
          problem: "Clinicians needed to request consumables for patients, but the original flow treated it like a standard form: fill in what you need and submit. Testing with clinicians showed that was wrong. Nurses and doctors think about a patient's insurance status first, because whether the patient is HMO or out-of-pocket determines the entire downstream billing and dispensing process. The form did not match the order in which clinicians make decisions.",
          scope: "I redesigned the flow around the observed clinical mental model. A billing selector now sits at the top of the request, before any consumable is chosen, because that is the first thing a clinician considers. Free-text entry for clinical indications was replaced with a structured 58-item clinical indication list, reducing errors and speeding up the process. The flow supports 10 distinct statuses and role-specific actions across Doctor, Nurse, Senior Nurse, and Pharmacist, so each role sees only the actions relevant to them at each stage. The full request-to-dispensed loop now completes from the patient profile without navigating to a separate pharmacy module.",
          stat: { value: "58", label: "structured clinical indications replacing free text" },
          outcome: "The consumables flow failed its first usability test. We scrapped the initial structure and rebuilt it from the observed workflow up. The shipped version completes the full request-to-dispensed loop within the patient profile, matching how clinicians actually move through their day rather than how the system was originally organized.",
          showcase: {
            eyebrow: "IndigoEMR — Consumables Workstream",
            heroHeading: "Redesigned around how clinicians actually decide, not how a form was originally organized.",
            lede: "The first version of this flow failed its own usability test. Nurses and doctors think about a patient's billing status before anything else, because it determines the rest of the request. The form did not. We rebuilt it from that observation up.",
            stats: [
              { value: "58", label: "Structured clinical indications replacing free text" },
              { value: "10", label: "Status stages tracked across the request lifecycle" },
              { value: "4", label: "Roles with purpose-built actions: Doctor, Nurse, Senior Nurse, Pharmacist" }
            ],
            sections: [
              {
                heading: "Billing context sits at the top, before a single item is chosen",
                tag: "Add Consumables",
                bodyText: "The patient's HMO and cover show in the header the moment the request opens, not buried after the item list. Items, quantities, and units sit in a plain table rather than a stack of individual fields, and clinical indication is a controlled 58-item list instead of free text.",
                layout: "single",
                src: "./public/Images/consumables-flow/img-1.png",
                alt: "Add Consumables modal showing patient billing context, item table with quantities, clinical indication dropdown, urgency, and delivery fields"
              },
              {
                heading: "Every request tracked through its full status lifecycle",
                tag: "Consumable List",
                bodyText: "Requested, ready for collection, dispensed — each row shows exactly where an item sits, and who requested it, without opening a separate record.",
                layout: "single",
                src: "./public/Images/consumables-flow/img-2.png",
                alt: "Consumable List table showing IV Cannula requested, Foley Catheter ready for collection, and Wound dressing kit dispensed"
              },
              {
                heading: "Once dispensed, the record stays audit-ready",
                tag: "Consumables Details",
                bodyText: "Reference number, who requested it, who received it, and exactly which batch and quantity moved. This is the record a pharmacy team pulls up when something needs to be traced back.",
                layout: "single",
                center: true,
                maxWidth: "420px",
                src: "./public/Images/consumables-flow/img-3.png",
                alt: "Patient Consumables Details panel showing reference number, dispensed status, requested by, received by, and items transferred with batch ID and expiry"
              },
              {
                heading: "The supply side: what the request draws from",
                tag: "Central Inventory",
                bodyText: "Every consumable request pulls against real stock. The inventory view surfaces what matters at a glance — total items, low stock, out of stock, and expired drugs — before a single row is expanded.",
                layout: "single",
                src: "./public/Images/consumables-flow/img-4.png",
                alt: "Inventory items screen showing total stock, low stocks, out of stocks, and expired drugs counts, with an expandable product table showing batch IDs and expiry dates"
              },
              {
                heading: "Adding stock, with only as much complexity as the task needs",
                tag: "Add Stock flow",
                bodyText: "The form starts minimal — batch ID, supplier, quantity, expiry. Branch transfer is opt-in, not a default field everyone has to skip past. Once filled, a preview table confirms exactly what's about to be added before submission.",
                layout: "threeCol",
                columns: [
                  { src: "./public/Images/consumables-flow/img-5.png", alt: "Add Stock modal in its base state with batch ID, supplier, purchase price, quantity, and expiry date fields", label: "Base state" },
                  { src: "./public/Images/consumables-flow/img-6.png", alt: "Add Stock modal with Add branch to transfer stock checked, revealing branch and quantity fields", label: "Branch transfer opted in" },
                  { src: "./public/Images/consumables-flow/img-7.png", alt: "Add Stock modal filled in, showing a preview table with variant, batch ID, selling price, and quantity before submission", label: "Filled, with preview" }
                ]
              }
            ],
            footerStats: [
              { value: "1st test", label: "The original form failed its usability test. It was rebuilt from the observed clinical workflow, not patched." },
              { value: "58", label: "Free-text clinical indication replaced with a structured, searchable list" },
              { value: "1 profile", label: "The full request-to-dispensed loop now completes inside the patient profile, with no detour to a separate pharmacy module" }
            ]
          }
        },
        {
          id: "design-system",
          navLabel: "Design System",
          heading: "Building the design system from scratch",
          problem: "When I joined, IndigoEMR had no shared design foundation. Every new feature was designed from scratch, components were inconsistent across modules, and handoff to engineering required extensive back-and-forth because there was no common language between design and development.",
          scope: "I built the design system from the ground up, now at 150+ components, covering everything from form states and input patterns to role-specific action models and clinical data display. Every component is built to WCAG 2.2 accessibility standards. The system includes documented interaction patterns, spacing and layout rules, and a shared vocabulary that engineering uses during implementation. I also introduced UX KPIs across key product touchpoints, giving leadership visibility into usability and adoption alongside engineering velocity for the first time.",
          stat: { value: "30%", label: "reduction in design-to-engineering handoff time" },
          outcome: "The design system reduced handoff time by 30% and gave the team a consistent foundation that holds across all modules. New features now build on existing patterns rather than starting from zero, and accessibility compliance is enforced at the component level rather than audited after the fact.",
          showcase: {
            eyebrow: "IndigoEMR — Design System",
            heroHeading: "One system, built so every module speaks the same language.",
            lede: "When I joined, every feature was designed from scratch and handoff meant extensive back and forth with no shared vocabulary. This is the foundation built to fix that: 150+ components, every state documented, WCAG 2.2 compliant by default.",
            stats: [
              { value: "150+", label: "Components, from form states to clinical data display" },
              { value: "WCAG 2.2", label: "Accessibility standard enforced at the component level" },
              { value: "30%", label: "Reduction in design-to-engineering handoff time" }
            ],
            sections: [
              {
                heading: "The system, in product context",
                tag: "Component overview",
                bodyText: "Not a component library sitting apart from the product — this is how form states, input patterns, selection controls, and clinical data displays actually show up together on a patient record.",
                layout: "single",
                src: "./public/Images/design-system/img-1.png",
                alt: "Collage of Field States, Vitals, Active Problems, Recent Results, Input Types, Selection Controls, and Lab Specimen Tracker components assembled together"
              },
              {
                heading: "Type scale",
                tag: "Typography",
                bodyText: "Eleven heading sizes and five body text sizes, each with medium, regular, and semi bold weights, all on Inter.",
                layout: "single",
                src: "./public/Images/design-system/img-2.png",
                alt: "Typography page showing heading styles from 60px to 16px and body text styles from 24px to 10px, each with font size, line height, and weight specified"
              },
              {
                heading: "Grid and spacing",
                tag: "Layout foundations",
                bodyText: "Breakpoints for desktop, tablet, and mobile, each with defined column counts and margins, plus a spacing scale from 4px to 256px so nothing gets eyeballed.",
                layout: "compare",
                columns: [
                  { type: "shot", src: "./public/Images/design-system/img-3.png", alt: "Grid layouts for Desktop 1280px, Tablet 768px, and iPhone 375px, plus container grid layouts from 12 columns down to 2 columns" },
                  { type: "shot", src: "./public/Images/design-system/img-4.png", alt: "Spacing system guide from 4px to 256px and container sizes sm through xl" }
                ]
              },
              {
                heading: "One field, every state it can be in",
                tag: "Input component",
                bodyText: "Default, hover, focus, typing, loading, warning, with hint, success, disabled, filled, and filled with multiple options selected, across every input variant: plain text, icon left or right, leading and trailing dropdowns, password, text area, and date picker.",
                layout: "single",
                src: "./public/Images/design-system/img-5.png",
                alt: "Input component documentation showing every state — default, hover, focus, typing, loading, warning, with hint, success, disabled, filled — across input variants including icon fields, dropdowns, password, text area, and date picker"
              },
              {
                heading: "One button, three intents, every state",
                tag: "Button component",
                bodyText: "Standard buttons in Primary, Secondary, and Tertiary, each at three sizes with icon-left, icon-right, and no-icon variants. Danger buttons carry the same full matrix for destructive actions, plus icon buttons, links, and tabs.",
                layout: "single",
                src: "./public/Images/design-system/img-6.png",
                alt: "Button component documentation showing Standard and Danger buttons in Primary, Secondary, and Tertiary types, at Normal, Medium, and Small sizes, across Default, Hover, Focus, Click, Loading, and Disabled states, plus icon buttons, link, and tabs"
              }
            ],
            footerStats: [
              { value: "150+", label: "Components covering form states, input patterns, role-specific action models, and clinical data display" },
              { value: "30%", label: "Reduction in design-to-engineering handoff time after the system shipped" },
              { value: "Enforced", label: "Accessibility compliance built into the component level, not audited after the fact" }
            ]
          }
        }
      ]
    },
  },
  {
    featured: true,
    title: "First Bank Nigeria",
    year: "2023 — 2024",
    description:
      "First Bank is Nigeria's oldest and largest financial institution. The brief was to modernise core digital banking experiences — mobile and web — used by millions of customers who had been living with the same interface for years. I led the redesign as principal designer, responsible for the full experience from onboarding through payments. Ethnographic research revealed that most friction happened not at the point of transaction but in the steps before it: customers could not find the right feature fast enough. Restructuring the information architecture around task frequency, not product hierarchy, increased transaction completion rates by over 25%. The full case study is NDA-protected — available on request with context.",
    cta: "NDA-protected — request access",
    ctaLink: "mailto:salamilayor@gmail.com?subject=First Bank Nigeria case study request",
    media: [
      { type: "video", src: "./public/videos/Firstbank%20Web%20Preview.mp4" },
      { type: "video", src: "./public/videos/Firstbank%20Mobile%20Preview.mp4" },
      { type: "video", src: "./public/videos/FB%20Tab%20View.mp4" },
    ],
    detail: {
      role: "Principal Product Designer",
      timeline: "2023 — 2024",
      platform: "iOS, Android, Web",
      status: "Shipped",
      businessContext: "First Bank, one of Nigeria's oldest banks, had ambitions to grow its digital footprint, but the numbers told a different story. In 2023, only 281 of the bank's 1.13 million new accounts were opened through the website, a fraction of a percent, while most volume came through in-branch assisted tools and basic USSD menus. For a bank investing heavily in mobile and web banking, almost nobody was actually using either to open an account on their own. This was the backdrop against which the account opening redesign, the SDK, and the diaspora-specific work all happened.",
      businessContextStat: {
        value: "281 of 1.13M",
        label: "accounts opened through the website in 2023"
      },
      workstreams: [
        {
          id: "approval-workflows",
          navLabel: "Approval Workflows",
          heading: "Redesigning corporate banking for mobile, from onboarding to approvals",
          problem: "FirstDirect2.0 was First Bank's corporate internet banking platform, already live on web. The mobile version needed to carry over the same trust and control corporate customers relied on, but corporate banking is not single-user banking. Every payment, every beneficiary, and every bulk transaction batch needs a second person to approve it before money moves.",
          scope: "I redesigned the full FirstDirect2.0 corporate banking mobile experience, not just the approval workflow. This included the corporate onboarding flow (a six-step process I reworked from a stack of compliance fields into a guided setup), the single and bulk payment flows, beneficiary management, transaction summaries, account statements, and profile and subsidiary management. The approval workflow was the hardest surface: a corporate user can review and approve up to 50 transactions in a single batch, each checked against beneficiary, amount, and account before a token confirms it. Partway through the project, board members raised a specific request: executives approving long, paginated batches wanted a larger screen than a phone could give them. That pushed the scope into designing specifically for tablet-sized approval review alongside the phone experience for lighter tasks.",
          stat: { value: "50", label: "transactions reviewable in a single approval batch" },
          outcome: "Shipped as FirstDirect2.0 Mobile, extending the bank's full corporate banking platform to iOS, Android, and tablet. The approval experience was designed around how executives actually review large batches. The corporate onboarding flow was reduced from a compliance-style form to a guided setup. Payments, beneficiaries, statements, and subsidiary management all shipped as part of the same release.",
          screens: {
            leftLabel: "Phone — single payment approval",
            rightLabel: "Tablet — batch approval for executives"
          },
          images: [
            { description: "Before — the web-only corporate banking approval workflow that needed to come to mobile", aspect: "16/9", span: "full" },
            { description: "Shipped — phone view of single payment approval flow", aspect: "9/16" },
            { description: "Shipped — tablet view of batch approval showing 50-item review layout designed for executives", aspect: "4/3" },
            { description: "Detail — the six-step corporate onboarding flow reworked from compliance form to guided setup", aspect: "16/9", span: "full" }
          ]
        },
        {
          id: "account-opening-sdk",
          navLabel: "Account Opening SDK",
          heading: "Designing a reusable account opening system across First Bank's products",
          problem: "Before this work, account opening behaved differently depending on where a customer started: web, mobile, USSD, or in-branch. Each surface had grown its own version of the same process, and a customer who started on one channel had no way to pick up where they left off on another.",
          scope: "I designed the account opening experience as a reusable system with checkpoints built in, so a customer who started on the website could continue on the mobile app, or pause at a branch and resume online, without re-entering information already captured. The harder design problem was not the visual consistency across channels, it was deciding what counted as a checkpoint: which steps were safe to interrupt, what needed to be re-verified after a gap, and how to signal to the customer exactly where they had left off when they came back.",
          stat: { value: "50,000+", label: "accounts opened via web and web banking by 2025" },
          outcome: "The reusable account opening flow now underpins onboarding across multiple First Bank surfaces, letting customers move between channels mid-application rather than starting over.",
          screens: {
            leftLabel: "Started on web",
            rightLabel: "Resumed on mobile, same checkpoint"
          },
          images: [
            { description: "Before — the account opening page on web that only 281 people used in 2023", aspect: "16/9", span: "full" },
            { description: "Shipped — the same checkpoint in the account opening flow shown on web and mobile side by side", aspect: "4/3" },
            { description: "Detail — the country selector showing Nigeria, UK, Ghana, Sierra Leone, DR Congo, Guinea, Senegal, and Diaspora as opening locations", aspect: "16/9", span: "full" }
          ]
        },
        {
          id: "diaspora-banking",
          navLabel: "Diaspora Banking",
          heading: "Designing for Nigerians opening accounts from abroad",
          problem: "Diaspora customers cannot walk into a branch, and the standard account opening flow assumed access to a BVN, the standard Nigerian identity number every account requires. For older applicants who had left Nigeria before BVN was introduced, this was a hard blocker rather than a minor friction.",
          scope: "I designed two things to address this. First, guidance built directly into the flow explaining how to obtain a BVN depending on the applicant's country of residence, since the process differs by country and most applicants had no starting point. Second, since many older diaspora applicants needed to update an existing BVN record rather than create a new one, I designed a path within the flow for submitting a BVN update request, rather than leaving that as a separate, undocumented process the applicant had to figure out on their own.",
          stat: { value: "70%", label: "drop-off rate at the BVN step for older diaspora applicants, before this redesign" },
          outcome: "Diaspora applicants now have a guided path to register or update their BVN within the account opening flow itself, targeting the step that was previously the largest source of drop-off.",
          screens: {
            leftLabel: "BVN guidance by country of residence",
            rightLabel: "BVN update request flow"
          },
          images: [
            { description: "Shipped — BVN guidance screen showing country-specific instructions for obtaining or updating a BVN from abroad", aspect: "16/9", span: "full" },
            { description: "Shipped — BVN update request submission flow for diaspora applicants", aspect: "4/3" }
          ]
        }
      ]
    },
  },
  {
    featured: true,
    title: "Sharply Africa",
    year: "2021 — 2023",
    description:
      "Logistics and marketplace platform operating across African cities, built for low-connectivity devices. I designed the component library that unified the rider, partner, and customer apps into one shared system, working without a research team or a safety net to validate every call. Three products, one design language, shipped faster.",
    cta: "Read case study",
    ctaLink: "https://www.notion.so/layor/Sharply-Delivery-Checkout-aea889ef00dc43aeb225d819f3180a3e",
    media: [
      { type: "video", src: "./public/videos/Sharply%20Web%20Preview.mp4" },
      { type: "video", src: "./public/videos/Sharply%20Rider%20Mobile.mp4" },
      { type: "video", src: "./public/videos/Sharply%20Partner.mp4" },
    ],
    detail: {
      role: "Product Designer, Founder",
      timeline: "2021 — 2023",
      platform: "Web, Mobile",
      status: "Shipped",
      problem: "Sharply builds logistics and marketplace infrastructure across African cities. The product connects commercial fleet operators with businesses that need delivery services. Two very different user groups with different literacy levels, devices, and network conditions.",
      constraint: "Low connectivity and inconsistent device hardware were not edge cases. They were the default environment. As founder, there was no design lead above me to validate decisions before they shipped. Every call, including the wrong ones, was mine to make and mine to fix.",
      decisions: [
        {
          heading: "Built the universal component library to unify three separate products",
          body: "Sharply had separate rider, partner, and customer-facing products with no shared design foundation. Each was being built and maintained independently. The library unified them under one system designed specifically for low-bandwidth environments: no heavy image loading, no real-time sync dependencies, no animations that assume bandwidth."
        },
        {
          heading: "Rebuilt the onboarding flow around observed behaviour",
          body: "Behavioural data from PostHog and Hotjar showed users were dropping off before completing their first transaction. The issue was not awareness or motivation. It was that the onboarding flow assumed a level of familiarity with the product that new users did not have. We rebuilt it around what we observed users actually doing in testing rather than what we assumed they would do."
        }
      ],
      honest: "The first version of the component library was built too fast and too broadly. We included components for patterns that did not yet exist in the product, which created maintenance overhead without delivering value. The second version was built strictly around what was live in the product, with new components added only when a real use case required them.",
      outcome: "Front-end rework down 30%. Three products unified under one design system. Repeat usage increased significantly within the first quarter post-launch.",
      stat: { value: "30%", label: "reduction in front-end rework across three products" },
      images: [
        { description: "Before — the three separate apps (rider, partner, customer) with no shared design language", aspect: "16/9", span: "full" },
        { description: "Process — component library architecture or audit showing the unification strategy", aspect: "4/3" },
        { description: "Shipped — the same component rendered across the rider, partner, and customer apps", aspect: "16/9", span: "full" },
        { description: "Detail — a specific component designed for low-connectivity environments, showing offline and loading states", aspect: "4/3" }
      ]
    },
  },
  {
    featured: false,
    title: "FlavorQueste",
    year: "2025 — Present",
    description:
      "Restaurant discovery in Lagos and Abuja is largely word of mouth. Review platforms that work in London do not map well onto how Nigerians actually choose where to eat — trust networks, social proof, and proximity matter differently. FlavorQueste is my attempt to build something designed for that context. I led product design end to end: discovery search, curated editorial picks, table booking, and a comparison flow that helps users decide between shortlisted restaurants. The design challenge was building confidence into the decision without overwhelming the user with data. Currently live across Lagos and Abuja.",
    cta: "Visit FlavorQueste",
    ctaLink: "https://flavorqueste.com",
    media: [
      { type: "video", src: "./public/videos/FQ%20Web%20Preview.mp4" },
      { type: "video", src: "./public/videos/FQ%20Mobile.mp4" },
      { type: "video", src: "./public/videos/FQ%20Chat.mp4" },
    ],
    detail: {
      role: "Lead Product Designer",
      timeline: "2025 — Present",
      platform: "Web, Mobile",
      status: "Live",
      problem: "Restaurant discovery in Lagos largely runs on WhatsApp and word of mouth. People ask in group chats, trust a friend's voice note over a star rating, and pick based on proximity and vibe. The review platforms that work in London do not map onto how Nigerians actually decide where to eat.",
      constraint: "This is a side project alongside full-time work at IndigoEMR. Every design decision had to be made quickly and had to work without a research team or a large engineering budget. Speed and judgment replaced process.",
      decisions: [
        {
          heading: "Led with editorial curation, not data",
          body: "The core design decision was how to build confidence into the discovery experience without overwhelming users with information. Too much data and users stall. Too little and they do not trust the platform. We led with a small number of high-trust editorial picks upfront, with deeper comparison available on demand."
        },
        {
          heading: "Designed the comparison flow around the actual decision",
          body: "Users shortlisting restaurants are not comparing star ratings. They are comparing vibe, proximity, and whether the place feels right for the occasion. The comparison flow was designed around those dimensions rather than generic review metrics."
        }
      ],
      honest: "The first version of the search experience was built around cuisine category filters. Testing showed that most Lagos users do not think about where to eat by cuisine type. They think about area first, then vibe. We restructured the primary discovery path around location and occasion rather than food category.",
      outcome: "Over 500 restaurants listed across Lagos and Abuja. Currently live.",
      stat: { value: "500+", label: "restaurants listed across Lagos and Abuja" },
      images: [
        { description: "Shipped — the discovery and search experience showing editorial curation upfront", aspect: "16/9", span: "full" },
        { description: "Shipped — the comparison flow showing shortlisted restaurants compared by vibe, proximity, and occasion", aspect: "16/9", span: "full" },
        { description: "Detail — a restaurant detail page showing the information architecture that builds confidence without overwhelming", aspect: "9/16" }
      ]
    },
  },
  {
    featured: false,
    title: "Kunda Kids",
    year: "2025",
    description: "SEF Foundational Literacy App, an edtech MVP teaching letter sounds and names to children across Nigeria and Kenya. I designed the full app from scratch within a 1-month engagement, working within the dev team's existing technical capability. Delivered wireframes, high-fidelity mockups, and a complete design system.",
    cta: "View project",
    media: [],
    detail: {
      role: "Product Designer (UI/UX), Contract",
      timeline: "22 working days, 2025",
      platform: "Mobile",
      status: "Shipped",
      problem: "Kunda Kids built an MVP literacy app for the SEF initiative, teaching letter sounds and letter names to children in Nigeria and Kenya. The existing version worked but had not been designed. It needed a full redesign to test adoption properly and support further funding.",
      constraint: "The brief was clear: improve the UX without going overboard, and stay within the current technical capability of a small dev team. Designing for children meant every screen had to be playful and intuitive enough for a child to use independently, while still being buildable in 22 working days by a team with limited engineering capacity.",
      decisions: [
        {
          heading: "Designed the full literacy experience from scratch",
          body: "Rather than patching the existing MVP, I rebuilt the core experience end to end: the learner journey through lessons structured as intro, activity, and outro, the diagnostics flow that places each child at the right starting level, and the teacher and parent reporting views that track progress over time."
        },
        {
          heading: "Built interaction patterns suited to a young, independent user",
          body: "Children using this app often cannot read instructions yet, which is the whole point of the product. I designed nudges, wait states, and timers as visual and audio cues rather than text, so a child could move through a lesson without an adult explaining each step."
        }
      ],
      honest: "The original MVP onboarding assumed a level of guided setup that did not match how children actually picked up a tablet and started using it. Early review of the existing flow showed children either tapped through without understanding the diagnostic, or got stuck waiting for instruction that never came. I redesigned onboarding around immediate, low-text interaction: a child could start an activity within seconds of opening the app, with the diagnostic woven into early lessons rather than presented as a separate test.",
      outcome: "Delivered a complete UI and UX redesign, including reporting dashboards, diagnostic test screens, and a developer-ready design system, all within the 22-day engagement window.",
      stat: { value: "22", label: "working days to design the full app from scratch" },
      images: [
        { description: "Before — the original MVP that had not been designed, showing the raw unpolished interface children were using", aspect: "16/9", span: "full" },
        { description: "Shipped — the redesigned learner journey showing a lesson structured as intro, activity, and outro", aspect: "16/9", span: "full" },
        { description: "Shipped — teacher and parent reporting dashboard showing progress tracking", aspect: "4/3" },
        { description: "Detail — nudge or timer interaction pattern designed for a child who cannot yet read instructions", aspect: "4/3" }
      ]
    },
  },
  {
    featured: false,
    title: "Propty",
    year: "2024",
    description: "Property management platform built for the Nigerian market, where most existing tools do not fit how landlords and property managers actually operate. I design the product end to end as a side build alongside full-time work. Over 500 units managed, on-time payment communication up from 30% to 58%, currently in private beta.",
    cta: "View project",
    media: [],
    detail: {
      role: "Product Designer, Co-founder",
      timeline: "2024 — Present",
      platform: "Web, Mobile",
      status: "Private Beta",
      problem: "Property managers in Nigeria handle daily, weekly, monthly, and one-time charges across units, tenants, and landlords, often with no software built for how that actually works locally. Most existing property management tools are built around markets with different payment norms, banking infrastructure, and communication habits. Propty is built specifically around the operational reality of managing property in Nigeria.",
      constraint: "As a co-founder building this alongside other commitments, every design decision had to balance ambition against what a small team could actually ship. The bigger constraint was structural: billing logic, payment tracking, and communication needed to work for landlords who are used to manual, often informal processes, without forcing them into a workflow that felt foreign.",
      decisions: [
        {
          heading: "Designed billing around local payment behaviour",
          body: "Rent and service charges in Nigeria are not always paid on a fixed Western billing cycle. I designed the billing system to handle daily, weekly, monthly, yearly, and one-time charges natively, rather than forcing every property manager into a single recurring payment model."
        },
        {
          heading: "Rebuilt payment communication around clarity, not just automation",
          body: "Property managers were already sending reminders and receipts manually, just inconsistently. Rather than just automating reminders, I redesigned how payment status and bills are communicated, making it clear at a glance what is owed, paid, or overdue, for both the property manager and the tenant."
        }
      ],
      honest: "Early versions of the payment communication flow focused heavily on automation, sending notifications on a fixed schedule regardless of context. Feedback from early users showed this felt impersonal and was often ignored. We rebuilt the flow around clearer, more contextual messaging tied to actual billing events rather than a generic schedule.",
      outcome: "Over 500 units currently managed on the platform. On-time payment communication improved from 30% before Propty to 58% after adoption. Currently in private beta.",
      stat: { value: "30% to 58%", label: "on-time payment communication before and after Propty" },
      images: [
        { description: "Shipped — billing system showing multiple charge frequencies (daily, weekly, monthly, yearly, one-time)", aspect: "16/9", span: "full" },
        { description: "Shipped — payment status view showing what is owed, paid, and overdue at a glance for property manager and tenant", aspect: "16/9", span: "full" },
        { description: "Detail — the property manager dashboard showing unit overview and communication status", aspect: "4/3" }
      ]
    },
  },
];

const EXPERIENCE = [
  {
    company: "IndigoEMR",
    role: "Senior Product Designer — Team Lead",
    description: "Oversee a multi-disciplinary team of designers and researchers. Spearheaded a centralised design system, championed accessibility (WCAG 2.2), and introduced UX KPIs across key product touchpoints serving 200,000+ patients.",
    years: "2022 — Present",
  },
  {
    company: "First Bank Nigeria PLC",
    role: "Principal Product Designer",
    description: "Led the end-to-end redesign of core digital banking experiences used by millions. Defined a design operations framework and used journey analytics to increase transaction completion rates by over 25%.",
    years: "2023 — 2024",
  },
  {
    company: "Sharply Africa",
    role: "Lead UI Designer / Senior User Researcher",
    description: "Launched a universal UI component library, reducing front-end rework by 30%. Designed and executed mixed-method research programs, established a centralised research repository, and built adaptive interfaces for low-connectivity environments.",
    years: "2021 — 2023",
  },
  {
    company: "Summitech Computing Ltd",
    role: "Product Designer / Product Strategy & Innovation / UX Researcher",
    description: "Led end-to-end design of enterprise and consumer applications. Partnered with C-suite to define multi-year product vision and innovation pipelines. Produced investor-ready prototypes and established design-thinking sprints.",
    years: "2017 — 2020",
  },
];

const TALKS_WRITING = [
  {
    title: "Design Leadership in Healthtech — Talk",
    type: "Video",
    href: "https://www.youtube.com/watch?v=oo4CKIcb5cA",
    icon: "▶",
  },
  {
    title: "Design Process and Craft — Conversation",
    type: "Video",
    href: "https://www.youtube.com/watch?v=IStc660lo5M&t=73s",
    icon: "▶",
  },
  {
    title: "Grid, Timelines, and Mobile Design — Article on Design Bootcamp",
    type: "Article",
    href: "https://medium.com/design-bootcamp/how-to-address-grid-timelines-and-mobile-design-a-terse-case-study-755317e4943f",
    icon: "✎",
  },
];

const STARTUPS = [
  {
    name: "CloudScout",
    tagline: "The simplest way to hire",
    description: "Streamlined recruitment for individuals and SMEs. Post jobs, track applicants, and hire with AI-powered matching, all from your mobile device.",
    href: "https://www.cloudscout.site",
    status: "Beta",
  },
  {
    name: "Propty",
    tagline: "Streamline your facility management",
    description: "A powerful and intuitive app for managing buildings. Whether you are a facility manager, landlord, or tenant, Propty simplifies billing, payments, and property management.",
    href: "https://proptyhq.com",
    status: "Beta",
  },
  {
    name: "BeamHC",
    tagline: "Healthcare, reimagined",
    description: "Building at the intersection of healthcare and technology to improve access, delivery, and patient outcomes.",
    href: "https://www.beamhc.com",
    status: "Coming Soon",
  },
];

/* ───────────────────── SHARED COMPONENTS ───────────────────── */

function MediaItem({ item, style = {} }) {
  return item.type === "video" ? (
    <video src={item.src} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block", ...style }} />
  ) : (
    <img src={item.src} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block", ...style }} />
  );
}

function MediaCarousel({ media }) {
  if (!media || media.length === 0) return null;
  const top = media[0];
  const bottom = media.slice(1, 3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Large top image */}
      <div style={{
        position: "relative", borderRadius: "16px", overflow: "hidden",
        aspectRatio: "16/9", background: "#1a1a1a",
      }}>
        <MediaItem item={top} />
      </div>
      {/* Two smaller images below */}
      {bottom.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: bottom.length === 1 ? "1fr" : "1fr 1fr", gap: "12px" }}>
          {bottom.map((item, i) => (
            <div key={i} style={{
              position: "relative", borderRadius: "16px", overflow: "hidden",
              height: "500px", background: "#1a1a1a",
            }}>
              <MediaItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index, onViewDetail }) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
      marginBottom: "80px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#999", margin: 0 }}>{project.title}</h3>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#666" }}>{project.year}</span>
      </div>
      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", lineHeight: 1.65, color: "#b0b0b0", margin: "0 0 20px 0", maxWidth: "640px" }}>{project.description}</p>
      <button onClick={() => onViewDetail(project)} style={{
        display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#fff",
        background: "transparent", border: "1px solid #333", borderRadius: "100px",
        padding: "8px 20px", marginBottom: "24px", cursor: "pointer", transition: "border-color 0.3s, background 0.3s",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#666"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "transparent"; }}
      >View project</button>
      {project.media && project.media.length > 0 ? (
        <MediaCarousel media={project.media} />
      ) : (
        <ImagePlaceholder description="Project preview — screens and assets coming soon" aspect="16/9" span="full" />
      )}
    </div>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style,
    }}>
      {children}
    </div>
  );
}

function EmbeddedShowcase({ src, description, span }) {
  return (
    <div style={{
      width: "100%",
      height: "1100px",
      background: "#141414",
      border: "1px solid #1f1f1f",
      borderRadius: "16px",
      overflow: "hidden",
      maxWidth: span === "full" ? "none" : undefined,
    }}>
      <iframe
        src={src}
        title={description}
        loading="lazy"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    </div>
  );
}

function ImagePlaceholder({ description, aspect = "16/9", span, src, embed, interactive }) {
  if (interactive && INTERACTIVE_COMPONENTS[interactive]) {
    const InteractiveComponent = INTERACTIVE_COMPONENTS[interactive];
    return <InteractiveComponent span={span} />;
  }
  if (embed) {
    return <EmbeddedShowcase src={embed} description={description} span={span} />;
  }
  if (src) {
    return (
      <div style={{
        width: "100%",
        aspectRatio: aspect,
        background: "#141414",
        border: "1px solid #1f1f1f",
        borderRadius: "16px",
        overflow: "hidden",
        maxWidth: span === "full" ? "none" : undefined,
      }}>
        <img src={src} alt={description} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
      </div>
    );
  }
  return (
    <div style={{
      width: "100%",
      aspectRatio: aspect,
      background: "#141414",
      border: "1px solid #1f1f1f",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      maxWidth: span === "full" ? "none" : undefined,
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="30" height="30" stroke="#2a2a2a" strokeWidth="1.5" />
        <line x1="1" y1="1" x2="31" y2="31" stroke="#2a2a2a" strokeWidth="1.5" />
        <line x1="31" y1="1" x2="1" y2="31" stroke="#2a2a2a" strokeWidth="1.5" />
      </svg>
      <p style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "12px",
        color: "#444",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        textAlign: "center",
        maxWidth: "280px",
        margin: 0,
      }}>{description}</p>
    </div>
  );
}

function IndigoHeroArt() {
  return (
    <div style={{
      position: "relative", borderRadius: "16px", overflow: "hidden",
      aspectRatio: "16/9", background: "#141414", border: "1px solid #1f1f1f",
    }}>
      <svg viewBox="0 0 960 540" width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <linearGradient id="indigoGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#191919" />
            <stop offset="100%" stopColor="#101010" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="960" height="540" fill="url(#indigoGlow)" />

        {/* Patients-served stat card */}
        <rect x="48" y="56" width="260" height="160" rx="14" fill="#181818" stroke="#262626" strokeWidth="1.5" />
        <text x="72" y="96" fontFamily="'DM Mono', monospace" fontSize="11" letterSpacing="1.5" fill="#666">PATIENTS SERVED</text>
        <text x="72" y="148" fontFamily="'Syne', sans-serif" fontWeight="800" fontSize="32" fill="#e8e8e8">200,000+</text>
        <text x="72" y="178" fontFamily="'DM Mono', monospace" fontSize="11" fill="#555">across Nigeria &amp; Kenya</text>

        {/* Clinical workflow / vitals card */}
        <rect x="332" y="56" width="580" height="160" rx="14" fill="#161616" stroke="#262626" strokeWidth="1.5" />
        <text x="356" y="92" fontFamily="'DM Mono', monospace" fontSize="11" letterSpacing="1.5" fill="#666">CLINICAL WORKFLOW</text>
        <polyline
          points="356,172 410,172 432,124 458,198 486,140 514,172 562,172 584,152 612,182 638,172 880,172"
          fill="none" stroke="#cfcfcf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"
        />

        {/* Patient records list card */}
        <rect x="48" y="248" width="864" height="236" rx="14" fill="#151515" stroke="#262626" strokeWidth="1.5" />
        <text x="72" y="284" fontFamily="'DM Mono', monospace" fontSize="11" letterSpacing="1.5" fill="#666">PATIENT RECORDS</text>

        {[0, 1, 2, 3].map((row) => {
          const y = 312 + row * 50;
          return (
            <g key={row}>
              <circle cx="92" cy={y + 12} r="14" fill="#262626" />
              <rect x="124" y={y} width="220" height="10" rx="5" fill="#2a2a2a" />
              <rect x="124" y={y + 16} width="140" height="8" rx="4" fill="#222222" />
              <rect x="700" y={y + 2} width="160" height="20" rx="10" fill="#1d1d1d" stroke="#2a2a2a" strokeWidth="1" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DataLibraryDemo({ span }) {
  const [tab, setTab] = React.useState("system");

  const systemForms = [
    { name: "General Practice Intake", values: "12 fields · locked" },
    { name: "Ophthalmology Exam", values: "18 fields · locked" },
    { name: "Antenatal Visit", values: "15 fields · locked" },
  ];
  const customForms = [
    { name: "Diabetes Follow-up", values: "9 fields · editable" },
    { name: "Post-Surgery Review", values: "11 fields · editable" },
    { name: "Pediatric Vitals", values: "7 fields · editable" },
  ];
  const rows = tab === "system" ? systemForms : customForms;

  return (
    <div style={{
      width: "100%", aspectRatio: "16/9", background: "#141414",
      border: "1px solid #1f1f1f", borderRadius: "16px",
      padding: "32px", display: "flex", flexDirection: "column",
      maxWidth: span === "full" ? "none" : undefined,
    }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {[{ key: "system", label: "System Forms" }, { key: "custom", label: "Custom Forms" }].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: "12px",
              padding: "8px 18px", borderRadius: "100px", cursor: "pointer",
              border: tab === t.key ? "1px solid #555" : "1px solid #262626",
              background: tab === t.key ? "#1f1f1f" : "transparent",
              color: tab === t.key ? "#e8e8e8" : "#777",
              transition: "border-color 0.2s ease, background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { if (tab !== t.key) e.currentTarget.style.color = "#aaa"; }}
            onMouseLeave={(e) => { if (tab !== t.key) e.currentTarget.style.color = "#777"; }}
          >{t.label}</button>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        {rows.map((row) => (
          <div key={row.name} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 18px", borderRadius: "10px", background: "#181818",
            border: "1px solid #232323",
          }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 600, color: "#dadada" }}>{row.name}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#666" }}>{row.values}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnershipBeforeFlow({ span }) {
  const box = { fill: "#181818", stroke: "#262626", strokeWidth: 1.5, rx: 12 };
  const labelStyle = { fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 1.2, fill: "#666" };
  const textStyle = { fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, fill: "#dadada" };

  return (
    <div style={{
      width: "100%", aspectRatio: "16/10", background: "#141414",
      border: "1px solid #1f1f1f", borderRadius: "16px",
      maxWidth: span === "full" ? "none" : undefined,
    }}>
      <svg viewBox="0 0 960 560" width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#444" />
          </marker>
        </defs>

        {/* Trigger box */}
        <rect x="330" y="24" width="300" height="64" {...box} />
        <foreignObject x="350" y="36" width="260" height="44">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "14px", color: "#dadada", lineHeight: 1.3, textAlign: "center" }}>
            Patient needs a specialist at another hospital
          </div>
        </foreignObject>

        {/* Branch connector */}
        <line x1="480" y1="88" x2="480" y2="130" stroke="#333" strokeWidth="1.5" />
        <line x1="480" y1="130" x2="230" y2="130" stroke="#333" strokeWidth="1.5" />
        <line x1="480" y1="130" x2="730" y2="130" stroke="#333" strokeWidth="1.5" />
        <line x1="230" y1="130" x2="230" y2="166" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <line x1="730" y1="130" x2="730" y2="166" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Option A label + path */}
        <text x="230" y="118" textAnchor="middle" style={labelStyle}>OPTION A</text>
        <rect x="110" y="170" width="240" height="64" {...box} />
        <foreignObject x="130" y="182" width="200" height="44">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "14px", color: "#dadada", lineHeight: 1.3, textAlign: "center" }}>
            Add the hospital as a branch in the system
          </div>
        </foreignObject>
        <line x1="230" y1="234" x2="230" y2="270" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <rect x="100" y="274" width="260" height="84" fill="#161616" stroke="#262626" strokeWidth="1.5" rx="12" />
        <foreignObject x="120" y="288" width="220" height="60">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "12.5px", color: "#888", lineHeight: 1.5, textAlign: "center" }}>
            One shared instance — billing and access boundaries blur between facilities
          </div>
        </foreignObject>

        {/* Option B label + path */}
        <text x="730" y="118" textAnchor="middle" style={labelStyle}>OPTION B</text>
        <rect x="610" y="170" width="240" height="64" {...box} />
        <foreignObject x="630" y="182" width="200" height="44">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "14px", color: "#dadada", lineHeight: 1.3, textAlign: "center" }}>
            Print the patient's records
          </div>
        </foreignObject>
        <line x1="730" y1="234" x2="730" y2="270" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <rect x="610" y="274" width="240" height="64" {...box} />
        <foreignObject x="630" y="286" width="200" height="44">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "14px", color: "#dadada", lineHeight: 1.3, textAlign: "center" }}>
            Send by courier or hand delivery
          </div>
        </foreignObject>
        <line x1="730" y1="338" x2="730" y2="374" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <rect x="600" y="378" width="260" height="84" fill="#161616" stroke="#262626" strokeWidth="1.5" rx="12" />
        <foreignObject x="620" y="392" width="220" height="60">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "12.5px", color: "#888", lineHeight: 1.5, textAlign: "center" }}>
            Re-entered by hand at the receiving hospital, with no record of what happened in between
          </div>
        </foreignObject>

        <text x="480" y="530" textAnchor="middle" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 0.6, fill: "#555" }}>
          Neither path was tracked inside the system
        </text>
      </svg>
    </div>
  );
}

const INTERACTIVE_COMPONENTS = {
  dataLibrary: DataLibraryDemo,
  partnershipBeforeFlow: PartnershipBeforeFlow,
};

function ImageGroup({ images, baseDelay = 0 }) {
  if (!images || images.length === 0) return null;
  const blocks = [];
  let i = 0;
  let delay = baseDelay;
  while (i < images.length) {
    const img = images[i];
    const next = images[i + 1];
    if (img.span === "full") {
      blocks.push(
        <FadeIn key={i} delay={delay} style={{ marginBottom: "32px" }}>
          <ImagePlaceholder description={img.description} aspect={img.aspect} span="full" src={img.src} embed={img.embed} interactive={img.interactive} />
        </FadeIn>
      );
      i += 1;
    } else if (next && next.span !== "full") {
      blocks.push(
        <FadeIn key={i} delay={delay} style={{ marginBottom: "32px" }}>
          <div className="workstream-screens">
            <ImagePlaceholder description={img.description} aspect={img.aspect} src={img.src} embed={img.embed} interactive={img.interactive} />
            <ImagePlaceholder description={next.description} aspect={next.aspect} src={next.src} embed={next.embed} interactive={next.interactive} />
          </div>
        </FadeIn>
      );
      i += 2;
    } else {
      blocks.push(
        <FadeIn key={i} delay={delay} style={{ marginBottom: "32px", maxWidth: "640px" }}>
          <ImagePlaceholder description={img.description} aspect={img.aspect} src={img.src} embed={img.embed} interactive={img.interactive} />
        </FadeIn>
      );
      i += 1;
    }
    delay += 0.04;
  }
  return <>{blocks}</>;
}

function StatCallout({ value, label }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <p style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: "clamp(40px, 6vw, 56px)", lineHeight: 1.1, color: "#e0e0e0",
        margin: 0,
      }}>{value}</p>
      <p style={{
        fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#888",
        textTransform: "uppercase", letterSpacing: "0.08em",
        marginTop: "8px", maxWidth: "320px", marginLeft: "auto", marginRight: "auto",
        textAlign: "center",
      }}>{label}</p>
    </div>
  );
}

const showcaseLabel = { fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "16px", marginBottom: "8px" };
const showcaseBody = { fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", lineHeight: 1.7, color: "#999", margin: 0 };

function StatRow({ stats }) {
  return (
    <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", margin: "40px 0" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: "#f4f3ef", margin: 0 }}>{s.value}</p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#6b6b72", textTransform: "uppercase", letterSpacing: "0.06em", maxWidth: "180px", lineHeight: 1.4, margin: 0 }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function ShotCard({ src, alt, maxWidth, center }) {
  return (
    <div style={{ background: "#f4f3ef", borderRadius: "20px", padding: "20px", boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)", maxWidth: maxWidth || "none", margin: center ? "0 auto" : undefined }}>
      <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e7e5e0", background: "#fff" }}>
        <img src={src} alt={alt} loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
    </div>
  );
}

function MockWindow({ title, badge, rows }) {
  return (
    <div style={{ background: "#f4f3ef", borderRadius: "20px", padding: "24px", boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)" }}>
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e7e5e0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid #e7e5e0" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", color: "#14151a" }}>{title}</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", padding: "4px 10px", borderRadius: "100px", background: "#f2f2f2", color: "#888" }}>{badge}</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: i < rows.length - 1 ? "1px solid #e7e5e0" : "none", fontSize: "13px", color: "#444" }}>
            <span>{r}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#b8b3a8" }}>locked</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColumnLabel({ children }) {
  return <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6b72", textAlign: "center", marginBottom: "14px" }}>{children}</p>;
}

function ColumnCaption({ children }) {
  return <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#6b6b72", textAlign: "center", marginTop: "14px", letterSpacing: "0.02em" }}>{children}</p>;
}

function ShowcaseColumn({ col }) {
  return col.type === "mock"
    ? <MockWindow title={col.title} badge={col.badge} rows={col.rows} />
    : <ShotCard src={col.src} alt={col.alt} />;
}

function ShowcaseSection({ heading, tag, note, bodyText: sectionBody, children }) {
  return (
    <section style={{ marginTop: "72px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "#f4f3ef", margin: 0 }}>{heading}</h4>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6b72" }}>{tag}</span>
      </div>
      {note && <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#6b6b72", marginBottom: "24px", lineHeight: 1.6, maxWidth: "640px" }}>{note}</p>}
      {sectionBody && <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", lineHeight: 1.7, color: "#999", maxWidth: "640px", marginBottom: "24px" }}>{sectionBody}</p>}
      {children}
    </section>
  );
}

function CompareGrid({ columns }) {
  return (
    <div className="showcase-grid-2col">
      {columns.map((col, i) => (
        <div key={i}>
          {col.label && <ColumnLabel>{col.label}</ColumnLabel>}
          <ShowcaseColumn col={col} />
          {col.caption && <ColumnCaption>{col.caption}</ColumnCaption>}
        </div>
      ))}
    </div>
  );
}

function FlowGrid({ columns }) {
  return (
    <div className="showcase-flow-grid">
      {columns.map((col, i) => (
        <React.Fragment key={i}>
          <div>
            {col.label && <ColumnLabel>{col.label}</ColumnLabel>}
            <ShowcaseColumn col={col} />
          </div>
          {i < columns.length - 1 && <span className="showcase-flow-arrow">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function ThreeColGrid({ columns }) {
  return (
    <div className="showcase-grid-3col">
      {columns.map((col, i) => (
        <div key={i} style={{ background: "#f4f3ef", borderRadius: "20px", padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)" }}>
          <div style={{ width: "100%", borderRadius: "12px", overflow: "hidden", border: "1px solid #e7e5e0", background: "#fff" }}>
            <img src={col.src} alt={col.alt} loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          {col.label && <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#6b6b72", textAlign: "center", lineHeight: 1.5, margin: 0 }}>{col.label}</p>}
        </div>
      ))}
    </div>
  );
}

function ProofWall({ cards }) {
  return (
    <div className="showcase-proofwall-grid">
      {cards.map((c, i) => (
        <div key={i} style={{ background: "#f4f3ef", borderRadius: "18px", padding: "16px", boxShadow: "0 24px 48px -28px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#5b4cf5", background: "#edeaff", display: "inline-block", padding: "4px 8px", borderRadius: "100px", width: "fit-content" }}>{c.specialty}</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#14151a", lineHeight: 1.25 }}>{c.name}</span>
          <div style={{ background: "#fff", border: "1px solid #e7e5e0", borderRadius: "10px", overflow: "hidden" }}>
            <img src={c.src} alt={c.alt} loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#8a8a90" }}>{c.builtBy}</span>
        </div>
      ))}
    </div>
  );
}

function FooterStatBar({ stats }) {
  return (
    <div className="showcase-footer-stats" style={{ marginTop: "72px", paddingTop: "48px", borderTop: "1px solid #23232a" }}>
      {stats.map((s, i) => (
        <div key={i}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: "#f4f3ef", margin: 0 }}>{s.value}</p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14px", color: "#a6a6ac", marginTop: "8px", lineHeight: 1.5, maxWidth: "260px" }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function ShowcaseSectionRenderer({ section }) {
  return (
    <ShowcaseSection heading={section.heading} tag={section.tag} note={section.note} bodyText={section.bodyText}>
      {section.layout === "compare" && <CompareGrid columns={section.columns} />}
      {section.layout === "flow" && <FlowGrid columns={section.columns} />}
      {section.layout === "threeCol" && <ThreeColGrid columns={section.columns} />}
      {section.layout === "proofWall" && <ProofWall cards={section.cards} />}
      {section.layout === "single" && <ShotCard src={section.src} alt={section.alt} maxWidth={section.maxWidth} center={section.center} />}
    </ShowcaseSection>
  );
}

function ShowcaseHero({ eyebrow, heading, emphasis, lede }) {
  let headingNode = heading;
  if (emphasis && heading.includes(emphasis)) {
    const idx = heading.indexOf(emphasis);
    headingNode = (
      <>
        {heading.slice(0, idx)}
        <span style={{ color: "#8f8bff" }}>{emphasis}</span>
        {heading.slice(idx + emphasis.length)}
      </>
    );
  }
  return (
    <div style={{ marginTop: "64px" }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8f8bff", marginBottom: "16px" }}>{eyebrow}</p>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#f4f3ef", maxWidth: "780px", margin: 0 }}>{headingNode}</h3>
      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", lineHeight: 1.7, color: "#a6a6ac", maxWidth: "620px", marginTop: "20px" }}>{lede}</p>
    </div>
  );
}

function WorkstreamShowcase({ w, leadIn }) {
  const sc = w.showcase;
  return (
    <>
      {leadIn && (
        <div style={{ maxWidth: "640px", marginBottom: "16px" }}>
          <p style={showcaseLabel}>{leadIn.label}</p>
          <p style={showcaseBody}>{leadIn.text}</p>
          <StatCallout value={leadIn.stat.value} label={leadIn.stat.label} />
        </div>
      )}

      <div style={{ maxWidth: "640px" }}>
        <p style={showcaseLabel}>Problem</p>
        <p style={showcaseBody}>{w.problem}</p>

        <p style={showcaseLabel}>What I Designed</p>
        <p style={showcaseBody}>{w.scope}</p>
      </div>

      <StatRow stats={sc.stats} />

      {sc.sections.map((section, i) => <ShowcaseSectionRenderer key={i} section={section} />)}

      <div style={{ maxWidth: "640px", marginTop: "56px" }}>
        <p style={showcaseLabel}>Outcome</p>
        <p style={{ ...showcaseBody, color: "#c4c4c4" }}>{w.outcome}</p>
      </div>

      <FooterStatBar stats={sc.footerStats} />
    </>
  );
}

function WorkstreamNav({ workstreams }) {
  const [active, setActive] = React.useState(workstreams[0]?.id);

  React.useEffect(() => {
    const elements = workstreams.map((w) => document.getElementById(w.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0, rootMargin: "-20% 0px -70% 0px" }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [workstreams]);

  const scrollToWorkstream = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 32;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="workstream-nav" style={{
      position: "fixed", right: "32px", top: "50%", transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: "20px", zIndex: 1001,
    }}>
      {workstreams.map((w) => (
        <button
          key={w.id}
          onClick={() => scrollToWorkstream(w.id)}
          className={`workstream-nav-item${active === w.id ? " active" : ""}`}
          style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            gap: "10px", background: "transparent", border: "none",
            cursor: "pointer", padding: 0,
          }}
        >
          <span className="workstream-nav-label">{w.navLabel}</span>
          <span className="workstream-nav-dot" />
        </button>
      ))}
    </nav>
  );
}

function Nav({ page, setPage, loaded }) {
  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      marginBottom: "100px", opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease 0.1s",
    }}>
      <span onClick={() => setPage("home")} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", cursor: "pointer" }}>
        Layor Salami
      </span>
      <div style={{ display: "flex", gap: "28px" }}>
        {[{ label: "Home", key: "home" }, { label: "Work", key: "work" }, { label: "About", key: "about" }, { label: "More", key: "more" }].map((link) => (
          <a key={link.key} href="#" onClick={(e) => { e.preventDefault(); setPage(link.key); }} style={{
            fontFamily: "'DM Mono', monospace", fontSize: "13px",
            color: page === link.key ? "#fff" : "#888",
            textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = page === link.key ? "#fff" : "#888")}
          >{link.label}</a>
        ))}
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{
      borderTop: "1px solid #1f1f1f", paddingTop: "40px", paddingBottom: "60px", marginTop: "40px",
      display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "24px",
    }}>
      <div style={{ display: "flex", gap: "24px" }}>
        {[{ label: "Home", key: "home" }, { label: "About", key: "about" }, { label: "More", key: "more" }].map((link) => (
          <a key={link.key} href="#" onClick={(e) => { e.preventDefault(); setPage(link.key); }} style={{
            fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#666",
            textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
          >{link.label}</a>
        ))}
      </div>
      <div style={{ display: "flex", gap: "24px" }}>
        {[
          { label: "LinkedIn", href: "https://www.linkedin.com/in/layor-salami" },
          { label: "Email", href: "mailto:salamilayor@gmail.com" },
          { label: "Website", href: "https://layorsalami.com" },
        ].map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#666",
            textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
          >{link.label}</a>
        ))}
      </div>
    </footer>
  );
}

/* ───────────────────── HOME PAGE ───────────────────── */

function HomePage({ loaded, onViewDetail, setPage }) {
  const heroWords = [
    { text: "Mubarak", delay: 0 },
    { text: "(Layor)", delay: 0.06 },
    { text: "Salami", delay: 0.12 },
    { text: "—", delay: 0.18 },
    { text: "Senior", delay: 0.24 },
    { text: "Product", delay: 0.3 },
    { text: "Designer.", delay: 0.36 },
  ];

  return (
    <>
      <header style={{ marginBottom: "120px" }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1.08, letterSpacing: "-0.03em",
          marginBottom: "20px",
        }}>
          {heroWords.map((w, i) => (
            <span key={i} style={{
              display: "inline-block", marginRight: "0.28em",
              opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.5s ease ${w.delay}s, transform 0.5s ease ${w.delay}s`,
              color: w.text === "(Layor)" ? "#666" : "inherit",
              fontSize: w.text === "(Layor)" ? "0.65em" : "inherit",
              fontWeight: w.text === "(Layor)" ? 600 : "inherit",
            }}>{w.text}</span>
          ))}
        </h1>
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "clamp(17px, 2.2vw, 21px)", lineHeight: 1.65, color: "#999",
          maxWidth: "600px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
        }}>
          Senior Product Designer based in the United Kingdom. I design healthcare and financial products for African markets, currently at IndigoEMR, previously as principal designer at First Bank Nigeria. My work tends to start where research and engineering meet: building design systems that hold up under real constraints, and closing the gap between what users need and what actually ships.
        </p>
      </header>
      <section>
        {PROJECTS.filter(p => p.featured).map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} onViewDetail={onViewDetail} />
        ))}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", paddingTop: "8px", marginBottom: "40px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>More work</span>
            <button
              onClick={() => setPage("work")}
              style={{
                display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#fff",
                background: "transparent", border: "1px solid #333", borderRadius: "100px",
                padding: "8px 20px", cursor: "pointer", transition: "border-color 0.3s, background 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#666"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "transparent"; }}
            >View all projects</button>
          </div>
        </FadeIn>
      </section>

      {/* ── Get in touch ── */}
      <FadeIn delay={0.1}>
        <div style={{
          borderTop: "1px solid #1f1f1f",
          marginTop: "40px",
          paddingTop: "80px",
          paddingBottom: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "32px",
        }}>
          <div>
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: "12px",
              color: "#555", letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: "20px",
            }}>Say hello</p>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.03em",
              color: "#f0f0f0", maxWidth: "560px", margin: 0,
            }}>
              Got a project, a role, or just want to talk design?
            </h2>
          </div>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "17px", lineHeight: 1.65, color: "#888",
            maxWidth: "480px", margin: 0,
          }}>
            I'm always open to interesting conversations — whether it's a full-time role, a contract engagement, or a design problem worth thinking through together.
          </p>
          <a
            href="mailto:salamilayor@gmail.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "#0e0e0e",
              background: "#f0f0f0", border: "1px solid #f0f0f0", borderRadius: "100px",
              padding: "14px 28px", textDecoration: "none",
              transition: "background 0.3s, color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#f0f0f0";
              e.currentTarget.style.borderColor = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f0f0f0";
              e.currentTarget.style.color = "#0e0e0e";
              e.currentTarget.style.borderColor = "#f0f0f0";
            }}
          >
            Get in touch ↗
          </a>
        </div>
      </FadeIn>
    </>
  );
}

/* ───────────────────── ABOUT PAGE ───────────────────── */

function AboutPage({ loaded }) {
  return (
    <>
      <header style={{ marginBottom: "64px" }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(32px, 5.5vw, 56px)", lineHeight: 1.12, letterSpacing: "-0.03em",
          maxWidth: "700px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}>
          Product Designer and design strategist, living and working in the United Kingdom.
        </h1>
      </header>

      <FadeIn delay={0.2}>
        <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", lineHeight: 1.7, color: "#b0b0b0", marginBottom: "24px" }}>
            My name is Mubarak — most people know me as Layor. I am a Senior Product Designer currently leading design at <strong style={{ color: "#e0e0e0" }}>IndigoEMR</strong>, a healthcare platform serving over 200,000 patients across Nigeria and Kenya. The work involves designing for clinicians, administrators, and patients in environments where digital tools are still new and trust has to be earned through the interface.
          </p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", lineHeight: 1.7, color: "#b0b0b0", marginBottom: "24px" }}>
            Before IndigoEMR, I was principal designer at <strong style={{ color: "#e0e0e0" }}>First Bank Nigeria</strong>, where I led the redesign of core banking experiences used by millions. I spent two years before that at <strong style={{ color: "#e0e0e0" }}>Sharply Africa</strong>, moving from senior user researcher to lead UI designer — most of that time spent understanding what designing for low-connectivity African environments actually requires in practice. I started my career at <strong style={{ color: "#e0e0e0" }}>Summitech Computing</strong>, where I grew from UX researcher to product strategy lead over four years.
          </p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", lineHeight: 1.7, color: "#b0b0b0" }}>
            I believe the designer's job is to close the gap between what research reveals and what actually ships. That means staying close to engineering, understanding what is technically feasible under real constraints, and treating design systems as product decisions rather than style guides. I am currently completing an MSc in User Experience Design at the University of Portsmouth alongside my full-time work.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.3} style={{ marginBottom: "64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "3/4", background: "#1a1a1a" }}>
            <img src="./public/Images/IMG_4189.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(0.2)" }} />
          </div>
          <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "3/4", background: "#1a1a1a" }}>
            <img src="./public/Images/IMG_4281.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(0.2)" }} />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15} style={{ marginBottom: "80px" }}>
        <div style={{ maxWidth: "640px" }}>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", lineHeight: 1.7, color: "#b0b0b0", marginBottom: "24px" }}>
            Most of my career has been spent designing products for African markets — healthtech, fintech, logistics. The constraints are different: lower average device specs, inconsistent connectivity, users who may be new to smartphones, and trust patterns that do not map onto Western UX assumptions. I find those constraints more interesting than the absence of them.
          </p>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px", lineHeight: 1.7, color: "#b0b0b0" }}>
            Outside of client work I am building three products: CloudScout, a mobile-first hiring tool for SMEs; Propty, a facility and property management platform; and BeamHC, focused on healthcare access. I also give talks on design and write occasionally. You can find those on the More page.
          </p>
        </div>
      </FadeIn>

      <section style={{ marginBottom: "40px" }}>
        {EXPERIENCE.map((exp, i) => (
          <FadeIn key={exp.company} delay={i * 0.08}>
            <div style={{ borderTop: "1px solid #1f1f1f", paddingTop: "28px", paddingBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px", flexWrap: "wrap", gap: "8px" }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#e0e0e0", margin: 0 }}>{exp.company}</h3>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#555" }}>{exp.years}</span>
              </div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#777", margin: "0 0 10px 0", letterSpacing: "0.02em" }}>{exp.role}</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15.5px", lineHeight: 1.65, color: "#999", margin: 0, maxWidth: "580px" }}>{exp.description}</p>
            </div>
          </FadeIn>
        ))}
      </section>

      <FadeIn delay={0.1} style={{ marginBottom: "40px" }}>
        <div style={{ borderTop: "1px solid #1f1f1f", paddingTop: "28px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#555", margin: "0 0 24px 0" }}>Education</h3>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#e0e0e0" }}>University of Portsmouth</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#555" }}>2025</span>
            </div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#777", margin: 0 }}>MSc User Experience Design</p>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#e0e0e0" }}>University of Lagos</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#555" }}>2021</span>
            </div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#777", margin: 0 }}>BSc Finance</p>
          </div>
        </div>
      </FadeIn>
    </>
  );
}

/* ───────────────────── MORE PAGE ───────────────────── */

function MorePage({ loaded }) {
  return (
    <>
      {/* Headline */}
      <header style={{ marginBottom: "80px" }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(32px, 5.5vw, 56px)", lineHeight: 1.12, letterSpacing: "-0.03em",
          maxWidth: "750px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}>
          I speak about design, write about craft, and build products on the side.
        </h1>
      </header>

      {/* ── Talks & Writing ── */}
      <section style={{ marginBottom: "80px" }}>
        <FadeIn delay={0.15}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "12px",
            color: "#555", letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "32px", paddingBottom: "14px",
            borderBottom: "1px solid #1f1f1f",
          }}>
            Talks & Writing
          </div>
        </FadeIn>

        {TALKS_WRITING.map((item, i) => (
          <FadeIn key={i} delay={0.2 + i * 0.08}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "20px",
                padding: "24px 0",
                borderBottom: "1px solid #1a1a1a",
                textDecoration: "none",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Icon */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: item.type === "Video" ? "rgba(255,0,0,0.08)" : "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", flexShrink: 0,
                color: item.type === "Video" ? "#ff4444" : "#888",
                border: item.type === "Video" ? "1px solid rgba(255,0,0,0.15)" : "1px solid #222",
              }}>
                {item.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 600,
                  color: "#e0e0e0", margin: "0 0 4px 0",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {item.title}
                </p>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#555", letterSpacing: "0.04em" }}>
                  {item.type}
                </span>
              </div>

              {/* Arrow */}
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "#444", flexShrink: 0 }}>↗</span>
            </a>
          </FadeIn>
        ))}
      </section>

      {/* ── Startup Ideas ── */}
      <section style={{ marginBottom: "40px" }}>
        <FadeIn delay={0.15}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "12px",
            color: "#555", letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "32px", paddingBottom: "14px",
            borderBottom: "1px solid #1f1f1f",
          }}>
            Ideas I am Building
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {STARTUPS.map((startup, i) => (
            <FadeIn key={startup.name} delay={0.2 + i * 0.1}>
              <a
                href={startup.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "#141414",
                  border: "1px solid #1f1f1f",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  textDecoration: "none",
                  transition: "border-color 0.3s, transform 0.4s cubic-bezier(0.23,1,0.32,1), background 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.background = "#181818";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1f1f1f";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "#141414";
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif", fontSize: "17px", fontWeight: 700,
                    color: "#f0f0f0", margin: 0,
                  }}>
                    {startup.name}
                  </h3>
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "10px",
                    color: startup.status === "Beta" ? "#4ade80" : "#f59e0b",
                    background: startup.status === "Beta" ? "rgba(74,222,128,0.08)" : "rgba(245,158,11,0.08)",
                    border: `1px solid ${startup.status === "Beta" ? "rgba(74,222,128,0.2)" : "rgba(245,158,11,0.2)"}`,
                    borderRadius: "100px",
                    padding: "3px 10px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    {startup.status}
                  </span>
                </div>

                {/* Tagline */}
                <p style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "12px",
                  color: "#777", margin: "0 0 12px 0", letterSpacing: "0.02em",
                }}>
                  {startup.tagline}
                </p>

                {/* Description */}
                <p style={{
                  fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14.5px",
                  lineHeight: 1.6, color: "#888", margin: "0 0 18px 0",
                }}>
                  {startup.description}
                </p>

                {/* Link hint */}
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "12px",
                  color: "#555", transition: "color 0.2s",
                }}>
                  Visit ↗
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}

/* ───────────────────── WORK PAGE ───────────────────── */

function WorkPage({ loaded, onViewDetail }) {
  return (
    <>
      <header style={{ marginBottom: "80px" }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(32px, 5.5vw, 56px)", lineHeight: 1.12, letterSpacing: "-0.03em",
          maxWidth: "700px", marginBottom: "20px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}>
          Selected work
        </h1>
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "17px", lineHeight: 1.65, color: "#999",
          maxWidth: "520px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}>
          A complete list of projects, including work in early stages and projects under NDA.
        </p>
      </header>
      <section>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} onViewDetail={onViewDetail} />
        ))}
      </section>
    </>
  );
}

/* ───────────────────── PROJECT DETAIL PAGE ───────────────────── */

function ProjectDetailPage({ project, setPage, loaded }) {
  const d = project.detail;
  const sectionLabel = {
    fontFamily: "'DM Mono', monospace", fontSize: "12px",
    color: "#555", letterSpacing: "0.1em", textTransform: "uppercase",
    marginBottom: "20px",
  };
  const bodyText = {
    fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "17px",
    lineHeight: 1.7, color: "#b0b0b0",
  };

  return (
    <>
      {/* Back button */}
      <FadeIn delay={0.1}>
        <div style={{ marginBottom: "48px" }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setPage("home"); }}
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: "13px",
              color: "#888", textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
          >
            ← Back to work
          </a>
        </div>
      </FadeIn>

      {/* Metadata strip */}
      <FadeIn delay={0.2}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(4, 1fr)${project.ctaLink ? " auto" : ""}${project.websiteLink ? " auto" : ""}`,
          gap: "16px",
          alignItems: "end",
          marginBottom: "48px",
          paddingBottom: "40px",
          borderBottom: "1px solid #1f1f1f",
        }}>
          {[
            { label: "Role", value: d.role },
            { label: "Timeline", value: d.timeline },
            { label: "Platform", value: d.platform },
            { label: "Status", value: d.status },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#555", marginBottom: "6px" }}>{item.label}</p>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#e0e0e0", margin: 0 }}>{item.value}</p>
            </div>
          ))}
          {project.ctaLink && (
            <a href={project.ctaLink} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#fff",
              textDecoration: "none", border: "1px solid #333", borderRadius: "100px",
              padding: "8px 20px", whiteSpace: "nowrap", transition: "border-color 0.3s, background 0.3s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#666"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "transparent"; }}
            >{project.cta} ↗</a>
          )}
          {project.websiteLink && (
            <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#fff",
              textDecoration: "none", border: "1px solid #333", borderRadius: "100px",
              padding: "8px 20px", whiteSpace: "nowrap", transition: "border-color 0.3s, background 0.3s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#666"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "transparent"; }}
            >Visit website ↗</a>
          )}
        </div>
      </FadeIn>

      {/* Hero shot */}
      <FadeIn delay={0.25} style={{ marginBottom: "48px" }}>
        {project.heroArt === "indigo" ? (
          <IndigoHeroArt />
        ) : project.heroMedia ? (
          <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9", background: "#1a1a1a" }}>
            <MediaItem item={project.heroMedia} />
          </div>
        ) : (
          <ImagePlaceholder
            description="Hero shot — full product overview, best screen or key flow"
            aspect="16/9"
            span="full"
          />
        )}
      </FadeIn>

      {/* Title */}
      <FadeIn delay={0.3}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(32px, 5.5vw, 56px)", lineHeight: 1.12, letterSpacing: "-0.03em",
          maxWidth: "700px", marginBottom: "40px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
        }}>
          {project.title}
        </h1>
      </FadeIn>

      {d.workstreams ? (
        <>
          {/* Platform intro: V1 -> V2 SaaS transition */}
          {d.platformIntro && (
            <FadeIn delay={0.35}>
              <div style={{ maxWidth: "640px", marginBottom: "0" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#8f8bff", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>{d.platformIntro.eyebrow}</p>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 34px)", color: "#f4f3ef", lineHeight: 1.15, marginBottom: "20px" }}>{d.platformIntro.heading}</h2>
                <p style={bodyText}>{d.platformIntro.body}</p>
              </div>
              <StatCallout value={d.platformIntro.stat.value} label={d.platformIntro.stat.label} />
            </FadeIn>
          )}

          {/* Client spotlight: Eye Foundation Hospital */}
          {d.clientSpotlight && (
            <FadeIn delay={0.38}>
              <div style={{
                border: "1px solid #1f1f1f", borderRadius: "16px", background: "#141414",
                padding: "40px", marginTop: "24px", marginBottom: "48px",
              }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "#e0e0e0", marginBottom: "16px" }}>{d.clientSpotlight.heading}</h3>
                <p style={{ ...bodyText, maxWidth: "720px" }}>{d.clientSpotlight.body}</p>
                <StatRow stats={d.clientSpotlight.stats} />
              </div>
            </FadeIn>
          )}

          {/* Why This Mattered (business context) — skipped here if it belongs inside a specific workstream */}
          {!d.businessContextWorkstreamId && (
            <>
              <FadeIn delay={0.4}>
                <div style={{ maxWidth: "640px", marginBottom: "0" }}>
                  <p style={sectionLabel}>Why This Mattered</p>
                  <p style={bodyText}>{d.businessContext}</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.45} style={{ marginBottom: "32px" }}>
                <StatCallout value={d.businessContextStat.value} label={d.businessContextStat.label} />
              </FadeIn>
            </>
          )}

          {/* Sticky/fixed workstream navigation, persists across all workstream sections */}
          <WorkstreamNav workstreams={d.workstreams} />

          {/* Workstreams */}
          {d.workstreams.map((w, i) => (
            <FadeIn key={w.id} delay={0.6 + i * 0.08}>
              <section id={w.id} style={{
                paddingBottom: "32px",
                borderBottom: i < d.workstreams.length - 1 ? "1px solid #1f1f1f" : "none",
              }}>
                {w.showcase ? (
                  <>
                    <ShowcaseHero eyebrow={w.showcase.eyebrow} heading={w.showcase.heroHeading} emphasis={w.showcase.heroEmphasis} lede={w.showcase.lede} />
                    <WorkstreamShowcase
                      w={w}
                      leadIn={d.businessContextWorkstreamId === w.id ? { label: "Why This Mattered", text: d.businessContext, stat: d.businessContextStat } : null}
                    />
                  </>
                ) : (
                  <>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#e0e0e0", marginTop: "64px", marginBottom: "0" }}>{w.heading}</h3>

                    <div style={{ maxWidth: "640px" }}>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "16px", marginBottom: "8px" }}>Problem</p>
                      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", lineHeight: 1.7, color: "#999", margin: 0 }}>{w.problem}</p>

                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "16px", marginBottom: "8px" }}>What I Designed</p>
                      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", lineHeight: 1.7, color: "#999", margin: 0 }}>{w.scope}</p>
                    </div>

                    <StatCallout value={w.stat.value} label={w.stat.label} />

                    <ImageGroup images={w.images} baseDelay={0.6 + i * 0.08} />

                    <div style={{ maxWidth: "640px" }}>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "16px", marginBottom: "8px" }}>Outcome</p>
                      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", lineHeight: 1.7, color: "#c4c4c4", margin: 0 }}>{w.outcome}</p>
                    </div>
                  </>
                )}
              </section>
            </FadeIn>
          ))}
        </>
      ) : (
        <>
          {/* Problem */}
          <FadeIn delay={0.4}>
            <div style={{ maxWidth: "640px", marginBottom: d.stat ? "0" : "40px" }}>
              <p style={{ ...bodyText, marginBottom: "24px" }}>{d.problem}</p>
            </div>
          </FadeIn>

          {/* Single-narrative stat, if present */}
          {d.stat && (
            <FadeIn delay={0.42} style={{ marginBottom: "16px" }}>
              <StatCallout value={d.stat.value} label={d.stat.label} />
            </FadeIn>
          )}

          {!d.images && (
            <FadeIn delay={0.45} style={{ marginBottom: "56px", maxWidth: "640px" }}>
              <ImagePlaceholder
                description="Context image — the environment or user this was designed for"
                aspect="3/2"
              />
            </FadeIn>
          )}

          {/* Constraint */}
          <FadeIn delay={0.5}>
            <div style={{ maxWidth: "640px", marginBottom: "40px" }}>
              <p style={sectionLabel}>The Constraint</p>
              <p style={bodyText}>{d.constraint}</p>
            </div>
          </FadeIn>

          {!d.images && (
            <FadeIn delay={0.55} style={{ marginBottom: "56px" }}>
              <ImagePlaceholder
                description="Before state — what the product or flow looked like before your work"
                aspect="16/9"
                span="full"
              />
            </FadeIn>
          )}

          {/* Key Decisions */}
          <FadeIn delay={0.6}>
            <div style={{ marginBottom: "0" }}>
              <p style={sectionLabel}>Key Decisions</p>
            </div>
          </FadeIn>

          {/* Decision 0 */}
          <FadeIn delay={0.62}>
            <div style={{ borderTop: "1px solid #1f1f1f", paddingTop: "28px", paddingBottom: "28px", maxWidth: "640px" }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#e0e0e0", margin: "0 0 12px 0" }}>{d.decisions[0].heading}</h3>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", lineHeight: 1.7, color: "#999", margin: 0 }}>{d.decisions[0].body}</p>
            </div>
          </FadeIn>

          {!d.images && (
            <FadeIn delay={0.65} style={{ marginBottom: "16px", maxWidth: "640px" }}>
              <ImagePlaceholder
                description="Process artifact — sketch, whiteboard, wireframe, or early iteration"
                aspect="4/3"
              />
            </FadeIn>
          )}

          {/* Decision 1 */}
          {d.decisions.length >= 2 && (
            <FadeIn delay={0.68}>
              <div style={{ borderTop: "1px solid #1f1f1f", paddingTop: "28px", paddingBottom: "28px", maxWidth: "640px" }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#e0e0e0", margin: "0 0 12px 0" }}>{d.decisions[1].heading}</h3>
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", lineHeight: 1.7, color: "#999", margin: 0 }}>{d.decisions[1].body}</p>
              </div>
            </FadeIn>
          )}

          {!d.images && d.decisions.length >= 3 && (
            <FadeIn delay={0.72} style={{ marginBottom: "16px", maxWidth: "640px" }}>
              <ImagePlaceholder
                description="Mid-fidelity or prototype — showing direction before the final design"
                aspect="16/9"
              />
            </FadeIn>
          )}

          {/* Decision 2 */}
          {d.decisions.length >= 3 && (
            <FadeIn delay={0.75}>
              <div style={{ borderTop: "1px solid #1f1f1f", paddingTop: "28px", paddingBottom: "28px", maxWidth: "640px", marginBottom: d.images ? "0" : "56px" }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#e0e0e0", margin: "0 0 12px 0" }}>{d.decisions[2].heading}</h3>
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", lineHeight: 1.7, color: "#999", margin: 0 }}>{d.decisions[2].body}</p>
              </div>
            </FadeIn>
          )}

          {/* Images array — replaces the fixed placeholder slots above when present */}
          {d.images && (
            <div style={{ marginTop: "32px" }}>
              <ImageGroup images={d.images} baseDelay={0.76} />
            </div>
          )}

          {!d.images && (
            <FadeIn delay={0.78} style={{ marginBottom: "56px", maxWidth: "640px" }}>
              <ImagePlaceholder
                description="The pivot — what you changed and why, shown visually if possible"
                aspect="3/2"
              />
            </FadeIn>
          )}

          {/* What Did Not Work */}
          {d.honest && (
            <FadeIn delay={0.82}>
              <div style={{ maxWidth: "640px", marginBottom: "40px" }}>
                <p style={sectionLabel}>What Did Not Work</p>
                <div style={{ borderLeft: "2px solid #333", paddingLeft: "20px" }}>
                  <p style={bodyText}>{d.honest}</p>
                </div>
              </div>
            </FadeIn>
          )}

          {!d.images && (
            <FadeIn delay={0.86} style={{ marginBottom: "56px" }}>
              <ImagePlaceholder
                description="Final design — the shipped screen or flow that solved the problem"
                aspect="16/9"
                span="full"
              />
            </FadeIn>
          )}

          {/* Outcome */}
          <FadeIn delay={0.9}>
            <div style={{ maxWidth: "640px", marginBottom: "56px" }}>
              <p style={sectionLabel}>Outcome</p>
              <p style={{ ...bodyText, color: "#e0e0e0" }}>{d.outcome}</p>
            </div>
          </FadeIn>
        </>
      )}

      {/* Placeholder 8 — Two side-by-side */}
      <FadeIn delay={0.94} style={{ marginBottom: "56px" }}>
        <div className="detail-side-by-side" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <ImagePlaceholder
            description="Detail shot — a specific UI moment, component, or micro-interaction"
            aspect="4/3"
          />
          <ImagePlaceholder
            description="In context — the design shown on a real device or in a real setting"
            aspect="4/3"
          />
        </div>
      </FadeIn>

      {/* Media */}
      <FadeIn delay={0.98}>
        <MediaCarousel media={project.media} />
      </FadeIn>
    </>
  );
}

/* ───────────────────── APP SHELL ───────────────────── */

function Portfolio() {
  const [loaded, setLoaded] = React.useState(false);
  const [page, setPage] = React.useState("home");
  const [selectedProject, setSelectedProject] = React.useState(null);

  React.useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

  const handleSetPage = (p) => {
    setLoaded(false);
    setPage(p);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => requestAnimationFrame(() => setLoaded(true)));
  };

  return (
    <div style={{ background: "#0e0e0e", color: "#f0f0f0", minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Source+Serif+4:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        a { color: inherit; }
        @media (max-width: 600px) { .detail-side-by-side { grid-template-columns: 1fr !important; } }
        .workstream-screens { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
        @media (max-width: 600px) { .workstream-screens { grid-template-columns: 1fr !important; } }
        .showcase-grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .showcase-grid-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .showcase-proofwall-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .showcase-footer-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .showcase-flow-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center; }
        .showcase-flow-arrow { font-family: 'DM Mono', monospace; color: #4a4680; font-size: 22px; text-align: center; }
        @media (max-width: 900px) {
          .showcase-grid-2col { grid-template-columns: 1fr; }
          .showcase-grid-3col { grid-template-columns: 1fr; }
          .showcase-proofwall-grid { grid-template-columns: 1fr; }
          .showcase-flow-grid { grid-template-columns: 1fr; }
          .showcase-flow-arrow { transform: rotate(90deg); }
        }
        @media (max-width: 700px) { .showcase-footer-stats { grid-template-columns: 1fr; } }
        .workstream-nav-label {
          font-family: 'DM Mono', monospace; font-size: 11px; color: #888;
          opacity: 0; white-space: nowrap; transition: opacity 0.2s ease, color 0.2s ease;
        }
        .workstream-nav-item:hover .workstream-nav-label { opacity: 1; }
        .workstream-nav-item.active .workstream-nav-label { opacity: 1; color: #e0e0e0; }
        .workstream-nav-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #444; flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .workstream-nav-item.active .workstream-nav-dot { background: #e0e0e0; }
        @media (max-width: 768px) {
          .workstream-nav {
            position: sticky !important; top: 0 !important; right: auto !important;
            transform: none !important; flex-direction: row !important;
            overflow-x: auto; gap: 16px !important;
            background: #0e0e0e; padding: 12px 0; width: 100%;
          }
          .workstream-nav-label { opacity: 1 !important; font-size: 10px; }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0,0) }
          10% { transform: translate(-5%,-10%) }
          30% { transform: translate(3%,-15%) }
          50% { transform: translate(12%,9%) }
          70% { transform: translate(9%,4%) }
          90% { transform: translate(-1%,7%) }
        }
      `}</style>

      {/* Grain */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1000, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px", animation: "grain 4s steps(6) infinite",
      }} />

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <Nav page={page} setPage={handleSetPage} loaded={loaded} />
        {page === "home" && <HomePage loaded={loaded} setPage={handleSetPage} onViewDetail={(project) => { setSelectedProject(project); handleSetPage("detail"); }} />}
        {page === "work" && <WorkPage loaded={loaded} onViewDetail={(project) => { setSelectedProject(project); handleSetPage("detail"); }} />}
        {page === "about" && <AboutPage loaded={loaded} />}
        {page === "more" && <MorePage loaded={loaded} />}
        {page === "detail" && selectedProject && <ProjectDetailPage project={selectedProject} setPage={handleSetPage} loaded={loaded} />}
        <Footer setPage={handleSetPage} />
      </div>
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Portfolio />);
