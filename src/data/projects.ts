import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    slug: "indigoemr",
    featured: true,
    title: "IndigoEMR",
    year: "2022 — Present",
    description:
      "One of Nigeria's only cloud-native hospital management systems, serving 200,000+ patients across Nigeria and Kenya. I built the design system from scratch and redesigned core clinical workflows, including the consumables and patient management flows. Design-to-engineering handoff time down 30%.",
    cta: "Read case study",
    ctaLink:
      "https://www.figma.com/deck/hijNz3lVFpI9LAu93yyEMb/IndigoEMR-case-study?node-id=115-1739&viewport=-1881%2C-68%2C0.87&t=ujc95kBWOQsmPu70-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    websiteLink: "https://indigoemr.com",
    media: [
      { type: "video", src: "/videos/indigo-web-preview-2.mp4" },
      { type: "image", src: "/images/frame-1005.webp" },
      { type: "image", src: "/images/frame-1004.webp" },
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
        stat: { value: "2M+", label: "appointment visits logged on V2 across the platform" },
      },
      clientSpotlight: {
        heading: "Trusted by Eye Foundation Hospital",
        body: "Founded in 1993, the Eye Foundation Hospital (EFH) Group has grown into one of the largest and most advanced private eye care networks in West Africa. Operating a hub-and-spoke model across seven specialized hospital branches and a wide network of primary vision centers, EFH is a critical pillar of ophthalmology on the continent, and one of IndigoEMR's flagship hospital networks. As an accredited post-graduate training hub, EFH also shapes the next generation of African ophthalmologists and clinical staff equipped to combat avoidable blindness across the region.",
        stats: [
          { value: "1993", label: "Founded" },
          { value: "7+", label: "Specialized hospital branches, hub-and-spoke" },
          { value: "2M+", label: "Patients treated" },
          { value: "200,000+", label: "Sight-restoring surgeries completed" },
        ],
      },
      businessContext:
        "IndigoEMR started as an electronic medical record system built specifically for ophthalmology. It worked for that one specialty, but the company wanted to serve all medical practices, from single-branch clinics to large multi-specialty hospitals. The first version could not flex. V2 tried to solve this by manually building distinct patient workflows for each new specialty. I personally designed those workflows, and the approach worked initially. But it did not scale. Every new hospital required a week of manual setup by a designer and an engineer working together, and even after launch, each new client logged an average of 5+ support tickets requesting form modifications. The system that was supposed to replace paper was, for some hospitals, slower and harder to use than paper. That was the problem I set out to fix.",
      businessContextStat: {
        value: "5+",
        label: "support tickets per client after launch, mostly about forms",
      },
      businessContextWorkstreamId: "form-builder",
      caseStudyLink: "",
      workstreams: [
        {
          id: "form-builder",
          navLabel: "Form Builder",
          heading: "From manual workflows to a self-serve form builder",
          problem:
            "Every form customization or new specialty setup required a designer and an engineer working together for 3 to 5 working days. Hospitals with specialists could not find the fields they needed during consultations, and frequently resorted to writing on paper instead. Two General Practice clinics had completely different ways of working, but the system forced them into one fixed patient journey. The real benchmark hospitals measured against was not other software. It was paper.",
          scope:
            "Rather than continuing to build custom workflows for each hospital, I designed a form builder and data library that let hospital staff create and manage their own clinical forms without engineering involvement. The form builder uses a drag-and-drop component system that any hospital administrator can assemble into a working clinical form. The data library sits alongside it, letting hospitals manage their own medical standards, diagnoses, symptoms, allergies, and medications, with the ability to add, edit, clone, and remove values that were previously locked into the system. The first iteration got real feedback from users, developers, and leadership: collections needed to support multi-specialty values, cloned versus added data needed visible indicators, and the form builder needed version history so users could undo mistakes confidently. I incorporated all of that into the shipped version.",
          stat: { value: "99%", label: "reduction in onboarding time, from 1 week to 30 minutes" },
          outcome:
            "Form-related support tickets dropped to near zero. Hospitals created 250+ custom medical forms themselves shortly after launch. Over 100,000 patient records have been entered using these tailored forms. The form builder was directly responsible for enabling IndigoEMR's expansion into Kenya, because new hospitals could onboard in minutes rather than weeks.",
          showcase: {
            eyebrow: "IndigoEMR — Form Builder Workstream",
            heroHeading:
              "From locked, one-size-fits-all workflows to a system hospitals build themselves.",
            heroEmphasis: "build themselves",
            lede: "Every specialty used to need a designer and an engineer, three to five working days, just to add a form. The Form Builder and Data Library replaced that with something hospital staff run on their own.",
            stats: [
              { value: "99%", label: "Reduction in onboarding time — 1 week to 30 minutes" },
              { value: "250+", label: "Custom forms created by hospitals themselves" },
              { value: "~0", label: "Form-related support tickets after launch" },
            ],
            sections: [
              {
                heading: "The library used to be a dead end",
                tag: "Before / After",
                layout: "compare",
                columns: [
                  {
                    label: "Before — V2 Test Standards",
                    type: "mock",
                    title: "Test Standards",
                    badge: "System defined",
                    rows: ["PWR", "Height", "BC", "DIA"],
                    caption: "Values could be added, never edited or removed",
                  },
                  {
                    label: "After — Data Library",
                    type: "shot",
                    src: "/images/form-builder/img-1.webp",
                    alt: "IndigoEMR Data Library showing editable fields including Diagnosis, Country, Symptoms, Allergies, Gender, Patient ID and more",
                    caption: "Every value editable, cloneable, and removable by hospital staff",
                  },
                ],
              },
              {
                heading: "Empty canvas to a working form",
                tag: "Create Form flow",
                layout: "flow",
                columns: [
                  {
                    label: "Empty state",
                    type: "shot",
                    src: "/images/form-builder/img-2.webp",
                    alt: "Create A New Form screen with no component selected, showing available components sidebar",
                  },
                  {
                    label: "Components added",
                    type: "shot",
                    src: "/images/form-builder/img-3.webp",
                    alt: "Create A New Form screen with header, short answer, dropdown fields, and a table component added",
                  },
                ],
              },
              {
                heading: "Real forms, built by hospital staff, not by us",
                tag: "Shipped in production",
                layout: "proofWall",
                cards: [
                  {
                    specialty: "Obstetrics",
                    name: "Pregnancy Test",
                    src: "/images/form-builder/img-4.webp",
                    alt: "Pregnancy Test form with Serum Beta HCG and Urine Beta HCG fields",
                    builtBy: "Built with Form Builder",
                  },
                  {
                    specialty: "Laboratory",
                    name: "Full Blood Count",
                    src: "/images/form-builder/img-5.webp",
                    alt: "Full Blood Count form with Hematocrit and Hemoglobin fields",
                    builtBy: "Built with Form Builder",
                  },
                  {
                    specialty: "Antenatal",
                    name: "Follow Up Antenatal",
                    src: "/images/form-builder/img-6.webp",
                    alt: "Follow Up Antenatal form with a table for Date, GEST Age, SFH, Presentation, FHR, URINE, WT, Remark",
                    builtBy: "Built with Form Builder",
                  },
                  {
                    specialty: "Immunization",
                    name: "Adult Immunization",
                    src: "/images/form-builder/img-7.webp",
                    alt: "Adult Immunization form with a table of vaccines against age groups",
                    builtBy: "Built with Form Builder",
                  },
                ],
              },
              {
                heading: "Managing the data behind every form",
                tag: "Data Library",
                note: "Three ways staff manage the library: bulk import via CSV, add a single option by hand, or organize standards into folders.",
                layout: "threeCol",
                columns: [
                  {
                    src: "/images/form-builder/img-8.webp",
                    alt: "Add Item modal with CSV upload option and specialty linking field",
                    label: "Bulk import via CSV, linked to a specialty",
                  },
                  {
                    src: "/images/form-builder/img-9.webp",
                    alt: "Add Item modal with a single text field for typing options directly",
                    label: "Add a single option by hand",
                  },
                  {
                    src: "/images/form-builder/img-10.webp",
                    alt: "Add New Library Folder modal with title, description, and allow inline add toggle",
                    label: "Organize standards into folders",
                  },
                ],
              },
            ],
            footerStats: [
              {
                value: "99%",
                label:
                  "Onboarding time reduced, from a week-long technical process to a 30-minute self-serve task",
              },
              {
                value: "250+",
                label:
                  "Custom forms created by hospitals within weeks of launch, directly enabling expansion into Kenya",
              },
              {
                value: "100K+",
                label: "Patient records entered using forms hospitals built themselves",
              },
            ],
          },
        },
        {
          id: "partnership-feature",
          navLabel: "Partnership",
          heading: "Enabling inter-hospital collaboration through the partnership feature",
          problem:
            "Hospitals in Nigeria rarely operate in isolation. A patient seen at one clinic might need a specialist at another, and the referring hospital needs to share records, access inventory, transfer the patient, and keep billing separate. Before this feature, that coordination happened over phone calls, WhatsApp messages, and paper referrals. Nothing was tracked inside the system.",
          scope:
            "I designed the partnership feature, which enables hospitals to share patient records, access each other's inventory, transfer patients between facilities, and maintain billing separation throughout. The hardest design problem was trust: both hospitals need to see the right information without exposing data that should stay internal. I designed role-based access controls that determine what each partner hospital can view, edit, or request, while keeping billing, internal notes, and operational data separated. The feature was piloted with Eye Foundation and iShop as the first two partner hospitals.",
          stat: { value: "2", label: "pilot partners live — Eye Foundation and iShop" },
          outcome:
            "The partnership feature is the active MVP for IndigoEMR's multi-tenant expansion. It replaced an informal, untracked process with a structured system that keeps patient records accurate across facilities while respecting each hospital's data boundaries.",
          showcase: {
            eyebrow: "IndigoEMR — Partnership Workstream",
            heroHeading: "Letting hospitals share what they choose to, and nothing else.",
            lede: "Referrals between hospitals used to happen over phone calls and WhatsApp, with nothing tracked inside the system. The partnership feature replaces that with structured, permissioned access, built around a simple rule: both hospitals see only what the other has explicitly agreed to share.",
            stats: [
              { value: "2", label: "Pilot partners live — Eye Foundation and iShop" },
              {
                value: "4",
                label:
                  "Granular categories a hospital controls: records, inventory, billing, branch mapping",
              },
              {
                value: "NDPR",
                label: "Patient record sharing requires explicit consent at first shared visit",
              },
            ],
            sections: [
              {
                heading: "From no partners to a managed network",
                tag: "Hospital Partner Network",
                layout: "compare",
                columns: [
                  {
                    label: "Before any partner is added",
                    type: "shot",
                    src: "/images/partnership-feature/img-1.webp",
                    alt: "Hospital Setup screen showing no partner found yet, with an Add Partner button",
                  },
                  {
                    label: "A live partner network",
                    type: "shot",
                    src: "/images/partnership-feature/img-2.webp",
                    alt: "Hospital Partner Network dashboard showing total partnerships, active count, Indigo versus external partners, and a list of partnerships with statuses including Active, Invite Rejected with a stated rejection reason, and Pending, each with a permission summary for Patient Registration, Patient Records, Stock Transfer, and Stock Visibility",
                  },
                ],
              },
              {
                heading: "Configuring trust is the hardest part, not the connection itself",
                tag: "Configure Partnership",
                bodyText:
                  "Every permission is opt-in and split by direction: what this hospital shares versus what it receives, broken down into Prescription, Vitals, Case Note, and Admission Records separately. Inventory visibility, billing collection on a partner's behalf, and branch-to-branch mapping are each their own toggle, off by default.",
                layout: "single",
                src: "/images/partnership-feature/img-3.webp",
                alt: "Configure Partnership screen showing Patient Access Permissions with granular share and receive toggles, Inventory Management, Billing, and Select Branch Mapping sections, using Avacom Hospital as the example partner",
              },
              {
                heading: "A shared patient is always clearly marked as one",
                tag: "Patient Details",
                bodyText:
                  "When a patient's record originates from a partner hospital, that's the first thing staff see, not something buried in a metadata field.",
                layout: "single",
                src: "/images/partnership-feature/img-4.webp",
                alt: "Patient Details screen with a banner reading this patient was registered by Eye Shop, shown above the full patient profile",
              },
              {
                heading: "What staff can do with a partner patient, and where the line sits",
                tag: "Access boundary",
                bodyText:
                  "A partner patient carries the same action menu as any other record — view records, generate a medical report, book a procedure — plus one specific to the partnership itself: migrating the record. That single action is deliberate. Until a hospital migrates a partner patient, they can view but not edit, so the originating hospital's data stays authoritative.",
                layout: "compare",
                columns: [
                  {
                    label: "The action menu",
                    type: "shot",
                    src: "/images/partnership-feature/img-5.webp",
                    alt: "Action menu on a partner patient record showing Migrate Partner Patient, Issue Credit, Give Discount, Upload Records, View Records, Generate Medical Report, View Access Log, View Medical Report, Book Surgery, Book Procedure, Admit Patient, and Add Bill",
                  },
                  {
                    label: "The design rationale",
                    type: "shot",
                    src: "/images/partnership-feature/img-6.webp",
                    alt: "Sticky note reading hospitals cannot edit partner patient until they migrate the record",
                  },
                ],
              },
            ],
            footerStats: [
              {
                value: "2",
                label: "Hospitals piloting the feature live: Eye Foundation and iShop",
              },
              {
                value: "Opt-in",
                label:
                  "Every permission defaults to off. A hospital chooses exactly what it shares and receives",
              },
              {
                value: "1 rule",
                label:
                  "A partner patient stays read-only until formally migrated, keeping the originating hospital's data authoritative",
              },
            ],
          },
        },
        {
          id: "consumables-flow",
          navLabel: "Consumables",
          heading:
            "Redesigning the consumables request flow around how clinicians actually think",
          problem:
            "Clinicians needed to request consumables for patients, but the original flow treated it like a standard form: fill in what you need and submit. Testing with clinicians showed that was wrong. Nurses and doctors think about a patient's insurance status first, because whether the patient is HMO or out-of-pocket determines the entire downstream billing and dispensing process. The form did not match the order in which clinicians make decisions.",
          scope:
            "I redesigned the flow around the observed clinical mental model. A billing selector now sits at the top of the request, before any consumable is chosen, because that is the first thing a clinician considers. Free-text entry for clinical indications was replaced with a structured 58-item clinical indication list, reducing errors and speeding up the process. The flow supports 10 distinct statuses and role-specific actions across Doctor, Nurse, Senior Nurse, and Pharmacist, so each role sees only the actions relevant to them at each stage. The full request-to-dispensed loop now completes from the patient profile without navigating to a separate pharmacy module.",
          stat: { value: "58", label: "structured clinical indications replacing free text" },
          outcome:
            "The consumables flow failed its first usability test. We scrapped the initial structure and rebuilt it from the observed workflow up. The shipped version completes the full request-to-dispensed loop within the patient profile, matching how clinicians actually move through their day rather than how the system was originally organized.",
          showcase: {
            eyebrow: "IndigoEMR — Consumables Workstream",
            heroHeading:
              "Redesigned around how clinicians actually decide, not how a form was originally organized.",
            lede: "The first version of this flow failed its own usability test. Nurses and doctors think about a patient's billing status before anything else, because it determines the rest of the request. The form did not. We rebuilt it from that observation up.",
            stats: [
              { value: "58", label: "Structured clinical indications replacing free text" },
              { value: "10", label: "Status stages tracked across the request lifecycle" },
              {
                value: "4",
                label: "Roles with purpose-built actions: Doctor, Nurse, Senior Nurse, Pharmacist",
              },
            ],
            sections: [
              {
                heading: "Billing context sits at the top, before a single item is chosen",
                tag: "Add Consumables",
                bodyText:
                  "The patient's HMO and cover show in the header the moment the request opens, not buried after the item list. Items, quantities, and units sit in a plain table rather than a stack of individual fields, and clinical indication is a controlled 58-item list instead of free text.",
                layout: "single",
                src: "/images/consumables-flow/img-1.webp",
                alt: "Add Consumables modal showing patient billing context, item table with quantities, clinical indication dropdown, urgency, and delivery fields",
              },
              {
                heading: "Every request tracked through its full status lifecycle",
                tag: "Consumable List",
                bodyText:
                  "Requested, ready for collection, dispensed — each row shows exactly where an item sits, and who requested it, without opening a separate record.",
                layout: "single",
                src: "/images/consumables-flow/img-2.webp",
                alt: "Consumable List table showing IV Cannula requested, Foley Catheter ready for collection, and Wound dressing kit dispensed",
              },
              {
                heading: "Once dispensed, the record stays audit-ready",
                tag: "Consumables Details",
                bodyText:
                  "Reference number, who requested it, who received it, and exactly which batch and quantity moved. This is the record a pharmacy team pulls up when something needs to be traced back.",
                layout: "single",
                center: true,
                maxWidth: "420px",
                src: "/images/consumables-flow/img-3.webp",
                alt: "Patient Consumables Details panel showing reference number, dispensed status, requested by, received by, and items transferred with batch ID and expiry",
              },
              {
                heading: "The supply side: what the request draws from",
                tag: "Central Inventory",
                bodyText:
                  "Every consumable request pulls against real stock. The inventory view surfaces what matters at a glance — total items, low stock, out of stock, and expired drugs — before a single row is expanded.",
                layout: "single",
                src: "/images/consumables-flow/img-4.webp",
                alt: "Inventory items screen showing total stock, low stocks, out of stocks, and expired drugs counts, with an expandable product table showing batch IDs and expiry dates",
              },
              {
                heading: "Adding stock, with only as much complexity as the task needs",
                tag: "Add Stock flow",
                bodyText:
                  "The form starts minimal — batch ID, supplier, quantity, expiry. Branch transfer is opt-in, not a default field everyone has to skip past. Once filled, a preview table confirms exactly what's about to be added before submission.",
                layout: "threeCol",
                columns: [
                  {
                    src: "/images/consumables-flow/img-5.webp",
                    alt: "Add Stock modal in its base state with batch ID, supplier, purchase price, quantity, and expiry date fields",
                    label: "Base state",
                  },
                  {
                    src: "/images/consumables-flow/img-6.webp",
                    alt: "Add Stock modal with Add branch to transfer stock checked, revealing branch and quantity fields",
                    label: "Branch transfer opted in",
                  },
                  {
                    src: "/images/consumables-flow/img-7.webp",
                    alt: "Add Stock modal filled in, showing a preview table with variant, batch ID, selling price, and quantity before submission",
                    label: "Filled, with preview",
                  },
                ],
              },
            ],
            footerStats: [
              {
                value: "1st test",
                label:
                  "The original form failed its usability test. It was rebuilt from the observed clinical workflow, not patched.",
              },
              {
                value: "58",
                label: "Free-text clinical indication replaced with a structured, searchable list",
              },
              {
                value: "1 profile",
                label:
                  "The full request-to-dispensed loop now completes inside the patient profile, with no detour to a separate pharmacy module",
              },
            ],
          },
        },
        {
          id: "design-system",
          navLabel: "Design System",
          heading: "Building the design system from scratch",
          problem:
            "When I joined, IndigoEMR had no shared design foundation. Every new feature was designed from scratch, components were inconsistent across modules, and handoff to engineering required extensive back-and-forth because there was no common language between design and development.",
          scope:
            "I built the design system from the ground up, now at 150+ components, covering everything from form states and input patterns to role-specific action models and clinical data display. Every component is built to WCAG 2.2 accessibility standards. The system includes documented interaction patterns, spacing and layout rules, and a shared vocabulary that engineering uses during implementation. I also introduced UX KPIs across key product touchpoints, giving leadership visibility into usability and adoption alongside engineering velocity for the first time.",
          stat: { value: "30%", label: "reduction in design-to-engineering handoff time" },
          outcome:
            "The design system reduced handoff time by 30% and gave the team a consistent foundation that holds across all modules. New features now build on existing patterns rather than starting from zero, and accessibility compliance is enforced at the component level rather than audited after the fact.",
          showcase: {
            eyebrow: "IndigoEMR — Design System",
            heroHeading: "One system, built so every module speaks the same language.",
            lede: "When I joined, every feature was designed from scratch and handoff meant extensive back and forth with no shared vocabulary. This is the foundation built to fix that: 150+ components, every state documented, WCAG 2.2 compliant by default.",
            stats: [
              { value: "150+", label: "Components, from form states to clinical data display" },
              { value: "WCAG 2.2", label: "Accessibility standard enforced at the component level" },
              { value: "30%", label: "Reduction in design-to-engineering handoff time" },
            ],
            sections: [
              {
                heading: "The system, in product context",
                tag: "Component overview",
                bodyText:
                  "Not a component library sitting apart from the product — this is how form states, input patterns, selection controls, and clinical data displays actually show up together on a patient record.",
                layout: "single",
                src: "/images/design-system/img-1.webp",
                alt: "Collage of Field States, Vitals, Active Problems, Recent Results, Input Types, Selection Controls, and Lab Specimen Tracker components assembled together",
              },
              {
                heading: "Type scale",
                tag: "Typography",
                bodyText:
                  "Eleven heading sizes and five body text sizes, each with medium, regular, and semi bold weights, all on Inter.",
                layout: "single",
                src: "/images/design-system/img-2.webp",
                alt: "Typography page showing heading styles from 60px to 16px and body text styles from 24px to 10px, each with font size, line height, and weight specified",
              },
              {
                heading: "Grid and spacing",
                tag: "Layout foundations",
                bodyText:
                  "Breakpoints for desktop, tablet, and mobile, each with defined column counts and margins, plus a spacing scale from 4px to 256px so nothing gets eyeballed.",
                layout: "compare",
                columns: [
                  {
                    type: "shot",
                    src: "/images/design-system/img-3.webp",
                    alt: "Grid layouts for Desktop 1280px, Tablet 768px, and iPhone 375px, plus container grid layouts from 12 columns down to 2 columns",
                  },
                  {
                    type: "shot",
                    src: "/images/design-system/img-4.webp",
                    alt: "Spacing system guide from 4px to 256px and container sizes sm through xl",
                  },
                ],
              },
              {
                heading: "One field, every state it can be in",
                tag: "Input component",
                bodyText:
                  "Default, hover, focus, typing, loading, warning, with hint, success, disabled, filled, and filled with multiple options selected, across every input variant: plain text, icon left or right, leading and trailing dropdowns, password, text area, and date picker.",
                layout: "single",
                src: "/images/design-system/img-5.webp",
                alt: "Input component documentation showing every state — default, hover, focus, typing, loading, warning, with hint, success, disabled, filled — across input variants including icon fields, dropdowns, password, text area, and date picker",
              },
              {
                heading: "One button, three intents, every state",
                tag: "Button component",
                bodyText:
                  "Standard buttons in Primary, Secondary, and Tertiary, each at three sizes with icon-left, icon-right, and no-icon variants. Danger buttons carry the same full matrix for destructive actions, plus icon buttons, links, and tabs.",
                layout: "single",
                src: "/images/design-system/img-6.webp",
                alt: "Button component documentation showing Standard and Danger buttons in Primary, Secondary, and Tertiary types, at Normal, Medium, and Small sizes, across Default, Hover, Focus, Click, Loading, and Disabled states, plus icon buttons, link, and tabs",
              },
            ],
            footerStats: [
              {
                value: "150+",
                label:
                  "Components covering form states, input patterns, role-specific action models, and clinical data display",
              },
              {
                value: "30%",
                label: "Reduction in design-to-engineering handoff time after the system shipped",
              },
              {
                value: "Enforced",
                label:
                  "Accessibility compliance built into the component level, not audited after the fact",
              },
            ],
          },
        },
      ],
    },
  },
  {
    slug: "first-bank-nigeria",
    featured: true,
    title: "First Bank Nigeria",
    year: "2023 — 2024",
    description:
      "First Bank is Nigeria's oldest and largest financial institution. The brief was to modernise core digital banking experiences — mobile and web — used by millions of customers who had been living with the same interface for years. I led the redesign as principal designer, responsible for the full experience from onboarding through payments. Ethnographic research revealed that most friction happened not at the point of transaction but in the steps before it: customers could not find the right feature fast enough. Restructuring the information architecture around task frequency, not product hierarchy, increased transaction completion rates by over 25%. The full case study is NDA-protected — available on request with context.",
    cta: "NDA-protected — request access",
    ctaLink: "mailto:salamilayor@gmail.com?subject=First Bank Nigeria case study request",
    media: [
      { type: "video", src: "/videos/firstbank-web-preview.mp4" },
      { type: "video", src: "/videos/firstbank-mobile-preview.mp4" },
      { type: "video", src: "/videos/fb-tab-view.mp4" },
    ],
    detail: {
      role: "Principal Product Designer",
      timeline: "2023 — 2024",
      platform: "iOS, Android, Web",
      status: "Shipped",
      businessContext:
        "First Bank, one of Nigeria's oldest banks, had ambitions to grow its digital footprint, but the numbers told a different story. In 2023, only 281 of the bank's 1.13 million new accounts were opened through the website, a fraction of a percent, while most volume came through in-branch assisted tools and basic USSD menus. For a bank investing heavily in mobile and web banking, almost nobody was actually using either to open an account on their own. This was the backdrop against which the account opening redesign, the SDK, and the diaspora-specific work all happened.",
      businessContextStat: {
        value: "281 of 1.13M",
        label: "accounts opened through the website in 2023",
      },
      workstreams: [
        {
          id: "approval-workflows",
          navLabel: "Approval Workflows",
          heading: "Redesigning corporate banking for mobile, from onboarding to approvals",
          problem:
            "FirstDirect2.0 was First Bank's corporate internet banking platform, already live on web. The mobile version needed to carry over the same trust and control corporate customers relied on, but corporate banking is not single-user banking. Every payment, every beneficiary, and every bulk transaction batch needs a second person to approve it before money moves.",
          scope:
            "I redesigned the full FirstDirect2.0 corporate banking mobile experience, not just the approval workflow. This included the corporate onboarding flow (a six-step process I reworked from a stack of compliance fields into a guided setup), the single and bulk payment flows, beneficiary management, transaction summaries, account statements, and profile and subsidiary management. The approval workflow was the hardest surface: a corporate user can review and approve up to 50 transactions in a single batch, each checked against beneficiary, amount, and account before a token confirms it. Partway through the project, board members raised a specific request: executives approving long, paginated batches wanted a larger screen than a phone could give them. That pushed the scope into designing specifically for tablet-sized approval review alongside the phone experience for lighter tasks.",
          stat: { value: "50", label: "transactions reviewable in a single approval batch" },
          outcome:
            "Shipped as FirstDirect2.0 Mobile, extending the bank's full corporate banking platform to iOS, Android, and tablet. The approval experience was designed around how executives actually review large batches. The corporate onboarding flow was reduced from a compliance-style form to a guided setup. Payments, beneficiaries, statements, and subsidiary management all shipped as part of the same release.",
          screens: {
            leftLabel: "Phone — single payment approval",
            rightLabel: "Tablet — batch approval for executives",
          },
          images: [
            {
              description:
                "Before — the web-only corporate banking approval workflow that needed to come to mobile",
              aspect: "16/9",
              span: "full",
            },
            { description: "Shipped — phone view of single payment approval flow", aspect: "9/16" },
            {
              description:
                "Shipped — tablet view of batch approval showing 50-item review layout designed for executives",
              aspect: "4/3",
            },
            {
              description:
                "Detail — the six-step corporate onboarding flow reworked from compliance form to guided setup",
              aspect: "16/9",
              span: "full",
            },
          ],
        },
        {
          id: "account-opening-sdk",
          navLabel: "Account Opening SDK",
          heading: "Designing a reusable account opening system across First Bank's products",
          problem:
            "Before this work, account opening behaved differently depending on where a customer started: web, mobile, USSD, or in-branch. Each surface had grown its own version of the same process, and a customer who started on one channel had no way to pick up where they left off on another.",
          scope:
            "I designed the account opening experience as a reusable system with checkpoints built in, so a customer who started on the website could continue on the mobile app, or pause at a branch and resume online, without re-entering information already captured. The harder design problem was not the visual consistency across channels, it was deciding what counted as a checkpoint: which steps were safe to interrupt, what needed to be re-verified after a gap, and how to signal to the customer exactly where they had left off when they came back.",
          stat: { value: "50,000+", label: "accounts opened via web and web banking by 2025" },
          outcome:
            "The reusable account opening flow now underpins onboarding across multiple First Bank surfaces, letting customers move between channels mid-application rather than starting over.",
          screens: {
            leftLabel: "Started on web",
            rightLabel: "Resumed on mobile, same checkpoint",
          },
          images: [
            {
              description: "Before — the account opening page on web that only 281 people used in 2023",
              aspect: "16/9",
              span: "full",
            },
            {
              description:
                "Shipped — the same checkpoint in the account opening flow shown on web and mobile side by side",
              aspect: "4/3",
            },
            {
              description:
                "Detail — the country selector showing Nigeria, UK, Ghana, Sierra Leone, DR Congo, Guinea, Senegal, and Diaspora as opening locations",
              aspect: "16/9",
              span: "full",
            },
          ],
        },
        {
          id: "diaspora-banking",
          navLabel: "Diaspora Banking",
          heading: "Designing for Nigerians opening accounts from abroad",
          problem:
            "Diaspora customers cannot walk into a branch, and the standard account opening flow assumed access to a BVN, the standard Nigerian identity number every account requires. For older applicants who had left Nigeria before BVN was introduced, this was a hard blocker rather than a minor friction.",
          scope:
            "I designed two things to address this. First, guidance built directly into the flow explaining how to obtain a BVN depending on the applicant's country of residence, since the process differs by country and most applicants had no starting point. Second, since many older diaspora applicants needed to update an existing BVN record rather than create a new one, I designed a path within the flow for submitting a BVN update request, rather than leaving that as a separate, undocumented process the applicant had to figure out on their own.",
          stat: {
            value: "70%",
            label: "drop-off rate at the BVN step for older diaspora applicants, before this redesign",
          },
          outcome:
            "Diaspora applicants now have a guided path to register or update their BVN within the account opening flow itself, targeting the step that was previously the largest source of drop-off.",
          screens: {
            leftLabel: "BVN guidance by country of residence",
            rightLabel: "BVN update request flow",
          },
          images: [
            {
              description:
                "Shipped — BVN guidance screen showing country-specific instructions for obtaining or updating a BVN from abroad",
              aspect: "16/9",
              span: "full",
            },
            {
              description: "Shipped — BVN update request submission flow for diaspora applicants",
              aspect: "4/3",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "sharply-africa",
    featured: true,
    title: "Sharply Africa",
    year: "2021 — 2023",
    description:
      "Logistics and marketplace platform operating across African cities, built for low-connectivity devices. I designed the component library that unified the rider, partner, and customer apps into one shared system, working without a research team or a safety net to validate every call. Three products, one design language, shipped faster.",
    cta: "Read case study",
    ctaLink:
      "https://www.notion.so/layor/Sharply-Delivery-Checkout-aea889ef00dc43aeb225d819f3180a3e",
    media: [
      { type: "video", src: "/videos/sharply-web-preview.mp4" },
      { type: "video", src: "/videos/sharply-rider-mobile.mp4" },
      { type: "video", src: "/videos/sharply-partner.mp4" },
    ],
    detail: {
      role: "Product Designer, Founder",
      timeline: "2021 — 2023",
      platform: "Web, Mobile",
      status: "Shipped",
      problem:
        "Sharply builds logistics and marketplace infrastructure across African cities. The product connects commercial fleet operators with businesses that need delivery services. Two very different user groups with different literacy levels, devices, and network conditions.",
      constraint:
        "Low connectivity and inconsistent device hardware were not edge cases. They were the default environment. As founder, there was no design lead above me to validate decisions before they shipped. Every call, including the wrong ones, was mine to make and mine to fix.",
      decisions: [
        {
          heading: "Built the universal component library to unify three separate products",
          body: "Sharply had separate rider, partner, and customer-facing products with no shared design foundation. Each was being built and maintained independently. The library unified them under one system designed specifically for low-bandwidth environments: no heavy image loading, no real-time sync dependencies, no animations that assume bandwidth.",
        },
        {
          heading: "Rebuilt the onboarding flow around observed behaviour",
          body: "Behavioural data from PostHog and Hotjar showed users were dropping off before completing their first transaction. The issue was not awareness or motivation. It was that the onboarding flow assumed a level of familiarity with the product that new users did not have. We rebuilt it around what we observed users actually doing in testing rather than what we assumed they would do.",
        },
      ],
      honest:
        "The first version of the component library was built too fast and too broadly. We included components for patterns that did not yet exist in the product, which created maintenance overhead without delivering value. The second version was built strictly around what was live in the product, with new components added only when a real use case required them.",
      outcome:
        "Front-end rework down 30%. Three products unified under one design system. Repeat usage increased significantly within the first quarter post-launch.",
      stat: { value: "30%", label: "reduction in front-end rework across three products" },
      images: [
        {
          description:
            "Before — the three separate apps (rider, partner, customer) with no shared design language",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Process — component library architecture or audit showing the unification strategy",
          aspect: "4/3",
        },
        {
          description: "Shipped — the same component rendered across the rider, partner, and customer apps",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Detail — a specific component designed for low-connectivity environments, showing offline and loading states",
          aspect: "4/3",
        },
      ],
    },
  },
  {
    slug: "flavorqueste",
    featured: false,
    title: "FlavorQueste",
    year: "2025 — Present",
    description:
      "Restaurant discovery in Lagos and Abuja is largely word of mouth. Review platforms that work in London do not map well onto how Nigerians actually choose where to eat — trust networks, social proof, and proximity matter differently. FlavorQueste is my attempt to build something designed for that context. I led product design end to end: discovery search, curated editorial picks, table booking, and a comparison flow that helps users decide between shortlisted restaurants. The design challenge was building confidence into the decision without overwhelming the user with data. Currently live across Lagos and Abuja.",
    cta: "Visit FlavorQueste",
    ctaLink: "https://flavorqueste.com",
    media: [
      { type: "video", src: "/videos/fq-web-preview.mp4" },
      { type: "video", src: "/videos/fq-mobile.mp4" },
      { type: "video", src: "/videos/fq-chat.mp4" },
    ],
    detail: {
      role: "Lead Product Designer",
      timeline: "2025 — Present",
      platform: "Web, Mobile",
      status: "Live",
      problem:
        "Restaurant discovery in Lagos largely runs on WhatsApp and word of mouth. People ask in group chats, trust a friend's voice note over a star rating, and pick based on proximity and vibe. The review platforms that work in London do not map onto how Nigerians actually decide where to eat.",
      constraint:
        "This is a side project alongside full-time work at IndigoEMR. Every design decision had to be made quickly and had to work without a research team or a large engineering budget. Speed and judgment replaced process.",
      decisions: [
        {
          heading: "Led with editorial curation, not data",
          body: "The core design decision was how to build confidence into the discovery experience without overwhelming users with information. Too much data and users stall. Too little and they do not trust the platform. We led with a small number of high-trust editorial picks upfront, with deeper comparison available on demand.",
        },
        {
          heading: "Designed the comparison flow around the actual decision",
          body: "Users shortlisting restaurants are not comparing star ratings. They are comparing vibe, proximity, and whether the place feels right for the occasion. The comparison flow was designed around those dimensions rather than generic review metrics.",
        },
      ],
      honest:
        "The first version of the search experience was built around cuisine category filters. Testing showed that most Lagos users do not think about where to eat by cuisine type. They think about area first, then vibe. We restructured the primary discovery path around location and occasion rather than food category.",
      outcome: "Over 500 restaurants listed across Lagos and Abuja. Currently live.",
      stat: { value: "500+", label: "restaurants listed across Lagos and Abuja" },
      images: [
        {
          description: "Shipped — the discovery and search experience showing editorial curation upfront",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Shipped — the comparison flow showing shortlisted restaurants compared by vibe, proximity, and occasion",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Detail — a restaurant detail page showing the information architecture that builds confidence without overwhelming",
          aspect: "9/16",
        },
      ],
    },
  },
  {
    slug: "kunda-kids",
    featured: false,
    title: "Kunda Kids",
    year: "2025",
    description:
      "SEF Foundational Literacy App, an edtech MVP teaching letter sounds and names to children across Nigeria and Kenya. I designed the full app from scratch within a 1-month engagement, working within the dev team's existing technical capability. Delivered wireframes, high-fidelity mockups, and a complete design system.",
    cta: "View project",
    media: [],
    detail: {
      role: "Product Designer (UI/UX), Contract",
      timeline: "22 working days, 2025",
      platform: "Mobile",
      status: "Shipped",
      problem:
        "Kunda Kids built an MVP literacy app for the SEF initiative, teaching letter sounds and letter names to children in Nigeria and Kenya. The existing version worked but had not been designed. It needed a full redesign to test adoption properly and support further funding.",
      constraint:
        "The brief was clear: improve the UX without going overboard, and stay within the current technical capability of a small dev team. Designing for children meant every screen had to be playful and intuitive enough for a child to use independently, while still being buildable in 22 working days by a team with limited engineering capacity.",
      decisions: [
        {
          heading: "Designed the full literacy experience from scratch",
          body: "Rather than patching the existing MVP, I rebuilt the core experience end to end: the learner journey through lessons structured as intro, activity, and outro, the diagnostics flow that places each child at the right starting level, and the teacher and parent reporting views that track progress over time.",
        },
        {
          heading: "Built interaction patterns suited to a young, independent user",
          body: "Children using this app often cannot read instructions yet, which is the whole point of the product. I designed nudges, wait states, and timers as visual and audio cues rather than text, so a child could move through a lesson without an adult explaining each step.",
        },
      ],
      honest:
        "The original MVP onboarding assumed a level of guided setup that did not match how children actually picked up a tablet and started using it. Early review of the existing flow showed children either tapped through without understanding the diagnostic, or got stuck waiting for instruction that never came. I redesigned onboarding around immediate, low-text interaction: a child could start an activity within seconds of opening the app, with the diagnostic woven into early lessons rather than presented as a separate test.",
      outcome:
        "Delivered a complete UI and UX redesign, including reporting dashboards, diagnostic test screens, and a developer-ready design system, all within the 22-day engagement window.",
      stat: { value: "22", label: "working days to design the full app from scratch" },
      images: [
        {
          description:
            "Before — the original MVP that had not been designed, showing the raw unpolished interface children were using",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Shipped — the redesigned learner journey showing a lesson structured as intro, activity, and outro",
          aspect: "16/9",
          span: "full",
        },
        {
          description: "Shipped — teacher and parent reporting dashboard showing progress tracking",
          aspect: "4/3",
        },
        {
          description:
            "Detail — nudge or timer interaction pattern designed for a child who cannot yet read instructions",
          aspect: "4/3",
        },
      ],
    },
  },
  {
    slug: "propty",
    featured: false,
    title: "Propty",
    year: "2024",
    description:
      "Property management platform built for the Nigerian market, where most existing tools do not fit how landlords and property managers actually operate. I design the product end to end as a side build alongside full-time work. Over 500 units managed, on-time payment communication up from 30% to 58%, currently in private beta.",
    cta: "View project",
    media: [],
    detail: {
      role: "Product Designer, Co-founder",
      timeline: "2024 — Present",
      platform: "Web, Mobile",
      status: "Private Beta",
      problem:
        "Property managers in Nigeria handle daily, weekly, monthly, and one-time charges across units, tenants, and landlords, often with no software built for how that actually works locally. Most existing property management tools are built around markets with different payment norms, banking infrastructure, and communication habits. Propty is built specifically around the operational reality of managing property in Nigeria.",
      constraint:
        "As a co-founder building this alongside other commitments, every design decision had to balance ambition against what a small team could actually ship. The bigger constraint was structural: billing logic, payment tracking, and communication needed to work for landlords who are used to manual, often informal processes, without forcing them into a workflow that felt foreign.",
      decisions: [
        {
          heading: "Designed billing around local payment behaviour",
          body: "Rent and service charges in Nigeria are not always paid on a fixed Western billing cycle. I designed the billing system to handle daily, weekly, monthly, yearly, and one-time charges natively, rather than forcing every property manager into a single recurring payment model.",
        },
        {
          heading: "Rebuilt payment communication around clarity, not just automation",
          body: "Property managers were already sending reminders and receipts manually, just inconsistently. Rather than just automating reminders, I redesigned how payment status and bills are communicated, making it clear at a glance what is owed, paid, or overdue, for both the property manager and the tenant.",
        },
      ],
      honest:
        "Early versions of the payment communication flow focused heavily on automation, sending notifications on a fixed schedule regardless of context. Feedback from early users showed this felt impersonal and was often ignored. We rebuilt the flow around clearer, more contextual messaging tied to actual billing events rather than a generic schedule.",
      outcome:
        "Over 500 units currently managed on the platform. On-time payment communication improved from 30% before Propty to 58% after adoption. Currently in private beta.",
      stat: { value: "30% to 58%", label: "on-time payment communication before and after Propty" },
      images: [
        {
          description:
            "Shipped — billing system showing multiple charge frequencies (daily, weekly, monthly, yearly, one-time)",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Shipped — payment status view showing what is owed, paid, and overdue at a glance for property manager and tenant",
          aspect: "16/9",
          span: "full",
        },
        {
          description: "Detail — the property manager dashboard showing unit overview and communication status",
          aspect: "4/3",
        },
      ],
    },
  },
];
