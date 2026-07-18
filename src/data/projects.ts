import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    slug: "first-bank-nigeria",
    featured: true,
    title: "First Bank Nigeria",
    year: "2023–2024",
    description:
      "First Bank is Nigeria's oldest and largest financial institution. The brief was to modernise core digital banking experiences, mobile and web, used by millions of customers who had been living with the same interface for years. I led the redesign as principal designer, responsible for the full experience from onboarding through payments. Ethnographic research revealed that most friction happened not at the point of transaction but in the steps before it: customers could not find the right feature fast enough. Restructuring the information architecture around task frequency, not product hierarchy, increased transaction completion rates by over 25%. The full case study is NDA-protected, available on request with context.",
    cta: "Request access (NDA-protected)",
    ctaLink: "mailto:salamilayor@gmail.com?subject=First Bank Nigeria case study request",
    heroMedia: { type: "image", src: "/images/portfolio-hero.webp" },
    media: [
      { type: "video", src: "/videos/firstbank-web-preview.mp4" },
      { type: "video", src: "/videos/firstbank-mobile-preview.mp4" },
      { type: "video", src: "/videos/fb-tab-view.mp4" },
    ],
    detail: {
      role: "Principal Product Designer",
      timeline: "2023–2024",
      platform: "iOS, Android, Web",
      status: "Shipped",
      platformIntro: {
        eyebrow: "The client",
        heading: "Nigeria's oldest bank, 130 years old, meeting its customers on a phone",
        body: "First Bank of Nigeria has been operating since 1894. It serves tens of millions of customers across nine countries, and for most of them the branch, not the app, was still the real bank. I joined as principal designer on the effort to change that, and the work split into four independent products: the design system underneath everything, a reusable account opening SDK for the web and mobile, FirstDirect 2.0 for corporate banking, and a diaspora journey for Nigerians banking from abroad. Each one is below, collapsed. Open whichever is closest to what you're hiring for.",
        stat: {
          value: "4 products",
          label: "designed across web, iOS, Android, and tablet. Pick any one to open it",
        },
      },
      businessContext:
        "First Bank, one of Nigeria's oldest banks, had ambitions to grow its digital footprint, but the numbers told a different story. In 2023, only 281 of the bank's 1.13 million new accounts were opened through the website, a fraction of a percent, while most volume came through in-branch assisted tools and basic USSD menus. For a bank investing heavily in mobile and web banking, almost nobody was actually using either to open an account on their own. This was the backdrop against which the account opening redesign, the SDK, and the diaspora-specific work all happened.",
      businessContextStat: {
        value: "281 of 1.13M",
        label: "accounts opened through the website in 2023",
      },
      businessContextWorkstreamId: "account-opening-sdk",
      workstreams: [
        {
          id: "design-system",
          tags: ["systems thinking", "multi-product governance", "self-directed"],
          highlights: [
            "/images/first-bank-design-system/dynamic-banking-components.webp",
            "/images/first-bank-design-system/color-palette.webp",
            "/images/first-bank-design-system/iconography.webp",
            "/images/first-bank-design-system/web-sdk-responsive-grid.webp",
          ],
          navLabel: "Design System",
          heading: "Building one visual language across three products that had none",
          problem:
            "First Bank's digital products had grown up separately. Different vendors had done one-off work across account opening, corporate banking, and the diaspora flows, and each had arrived at its own answer for the same questions: what a primary button looks like, how an input signals an error, what a verification step should feel like. Nobody had specified it, so everybody specified it differently.",
          scope:
            "There were no workshops behind this one. I spotted the fragmentation across the products I was already working on and built the system myself: the color palette, the type scale, spacing and grid rules, buttons, inputs and their full state matrix, iconography, the composed banking components, and a responsive grid for the Web SDK. The harder part was not drawing the components. It was making one system that could absorb three products with genuinely different jobs (a corporate treasury app, a public account opening flow, and a diaspora journey) without collapsing into a lowest common denominator.",
          stat: {
            value: "3",
            label: "products running on one shared system, built without a dedicated systems team",
          },
          outcome:
            "The system now underpins the Account Opening SDK, FirstDirect 2.0 Mobile, and Diaspora Banking. Every screen in the three case studies below is drawn from it: the navy and gold, the state-driven inputs, the stepper, and the status chips are all the same components, specified once.",
          showcase: {
            eyebrow: "First Bank Nigeria: Design System",
            heroHeading:
              "Three products, three vendors, three answers to every question. This is the one answer.",
            lede: "No brief asked for this. The fragmentation was visible from inside the products I was already designing, so I built the foundation the other three workstreams now stand on: color, type, spacing, components, iconography, and a responsive grid for the Web SDK.",
            stats: [
              {
                value: "3",
                label:
                  "Products unified: Account Opening SDK, FirstDirect 2.0 Mobile, and Diaspora Banking",
              },
              {
                value: "4px",
                label: "Base increment the whole spatial scale is built on, from space-xxs to space-xxl",
              },
              {
                value: "No mandate",
                label:
                  "Nobody commissioned the system. I identified the fragmentation and built it alongside the product work",
              },
            ],
            sections: [
              {
                heading: "The system doing its actual job",
                tag: "Composed components",
                bodyText:
                  "The float account balance block, the switch-account control carrying eight organizations, the Action/Approval Center CTA, the BVN and NIN retrieval instructions, the OTP entry, the status chips, and the five-step stepper are the pieces the other three workstreams are assembled from. This shows them together in context rather than as an abstract set of parts.",
                layout: "single",
                src: "/images/first-bank-design-system/dynamic-banking-components.webp",
                alt: "Dynamic Banking Components board showing a navy float account balance block with switch account control and Action/Approval Center button, four bottom navigation bar states, BVN and NIN USSD retrieval instruction blocks, a liquidity sweep instruction card in collapsed and expanded states, proof of address cards in start and verified states, an OTP entry field, status chips reading Awaiting Approval, Processed, and Declined, and five progress stepper states",
              },
              {
                heading: "Navy carries the trust, gold carries the action",
                tag: "Color and type",
                bodyText:
                  "Eight colors, no more: primary navy and accent gold off the First Bank brand, white and black, a success green and error red for system state, and two greys. The type is Inter throughout, chosen for tabular legibility, because a corporate banking app is mostly numbers in rows, and account numbers, sort codes, and naira figures have to survive being read quickly on a phone.",
                layout: "compare",
                columns: [
                  {
                    label: "Color palette",
                    type: "shot",
                    src: "/images/first-bank-design-system/color-palette.webp",
                    alt: "Color Palette System board showing Primary Navy #162D4C, Accent Gold #DCAA10, White, Black, Success Green #27AE60, Error Red #EB5757, Light Gray #F5F5F5, and Dark Gray #4F4F4F, each with hex and RGB values",
                  },
                  {
                    label: "Type scale",
                    type: "shot",
                    src: "/images/first-bank-design-system/typography.webp",
                    alt: "Typography Specimens board showing Inter as the primary typeface with an Aa specimen and a scale from H1 Display at 32px bold, H2 Header at 24px bold, H3 Subheader at 18px medium, Body Text at 14px regular, and Caption at 12px regular",
                  },
                ],
              },
              {
                heading: "Nothing gets eyeballed",
                tag: "Spacing and grid",
                bodyText:
                  "A 4px-increment scale from space-xxs through space-xxl, and a four-column mobile grid with 16px outer margins and 16px gutters. The bottom half is the part that matters: the tokens shown allocated inside real banking modules, so the rule isn't just declared, it's demonstrated on a transaction row and a form.",
                layout: "single",
                src: "/images/first-bank-design-system/spacing-and-grid.webp",
                alt: "Spacing and Grid System board showing spatial tokens from space-xxs at 4px to space-xxl at 48px with visual references, a mobile responsive grid spec with 4 columns, 16px outer margins and 16px inner gutters, and a spatial allocation in practice section annotating outer padding and gap tokens on a transaction row and form fields",
              },
              {
                heading: "Every state a control can be in, specified once",
                tag: "Buttons and inputs",
                bodyText:
                  "Buttons across primary, biometric, and accent intents, with disabled treatment and size variants redlined for handoff. Inputs carry the full matrix (default, optional, hover, active, disabled, error with message, and valid) alongside the variants a banking form actually needs: currency-locked fields, selection dropdowns, and a date picker.",
                layout: "compare",
                columns: [
                  {
                    label: "Buttons",
                    type: "shot",
                    src: "/images/first-bank-design-system/interactive-buttons.webp",
                    alt: "Interactive Buttons board showing a navy Sign In primary button, an outlined Sign in with biometrics button, a gold Apply for Loan button, a disabled transaction action, and small, medium, and large size variants with redlined padding, radius, and font specifications",
                  },
                  {
                    label: "Inputs",
                    type: "shot",
                    src: "/images/first-bank-design-system/inputs-and-fields.webp",
                    alt: "Inputs and Field Variations board showing input field states labelled defaultState, optionalState, hoverState, activeState, disabledState, errorState with an error message, and validState, plus input variations including a unit-specific currency input, an open selection dropdown, an active date picker with a March 2021 calendar, and checkbox and radio option controls",
                  },
                ],
              },
              {
                heading: "The elephant, at every size it has to survive",
                tag: "Iconography",
                bodyText:
                  "The First Bank mark rendered as a real app icon across squircle, rounded, and circular masks, then shown where it actually lands: an Android home screen, an iOS dock, a browser tab. Alongside it, a monochromatic functional set, and the last four earn a second look. Own account, FirstBank, Other Banks, and FX Sales aren't generic icons; they map one-to-one onto the four transfer categories in FirstDirect 2.0.",
                layout: "single",
                src: "/images/first-bank-design-system/iconography.webp",
                alt: "Iconography and Core Assets board showing the FirstBank elephant app icon in squircle, rounded-square, and circular treatments, the icon in situ on an Android home screen, an iOS dock, and as a browser tab favicon, plus a functional icon set including home, arrow-up-right, bell, settings, lock, eye, help-circle, chevron-right, and four transfer-category icons for Own account, Firstbank, Other Banks, and FX Sales",
              },
              {
                heading: "The system had to reach the web too, not only the app",
                tag: "Web SDK responsive grid",
                bodyText:
                  "The Account Opening SDK runs on the public website as well as in-app, so the grid needed to hold from a 375px phone up to a fixed 1200px content box. Four columns to eight to twelve, with the breakpoint matrix written as consolidated CSS logic, a spec the front-end team can build against rather than a picture to interpret.",
                layout: "single",
                src: "/images/first-bank-design-system/web-sdk-responsive-grid.webp",
                alt: "Web SDK Responsive Grid board showing mobile at 375px with 4 columns, tablet at 768px with 8 columns, and desktop at 1440px with 12 columns, above a breakpoint matrix table specifying range, columns, margin, gutter, and layout behavior for mobile, tablet, desktop, and large desktop",
              },
            ],
            footerStats: [
              {
                value: "One language",
                label:
                  "Account opening, corporate banking, and diaspora journeys drawing on the same palette, type, spacing, and components",
              },
              {
                value: "375 → 1200px",
                label:
                  "The range the Web SDK grid holds across, from a phone to a fixed desktop content box",
              },
              {
                value: "Self-directed",
                label:
                  "Built without a brief, a workshop, or a systems team. The fragmentation was visible from inside the product work",
              },
            ],
          },
        },
        {
          id: "account-opening-sdk",
          tags: ["0→1 SDK", "stakeholder alignment at scale", "research-led"],
          highlights: [
            "/images/account-opening-sdk/before-account-hub.webp",
            "/images/account-opening-sdk/img-2.webp",
            "/images/account-opening-sdk/img-4.webp",
            "/images/account-opening-sdk/img-9.webp",
          ],
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
          showcase: {
            eyebrow: "First Bank Nigeria: Account Opening SDK",
            heroHeading: "281 people opened an account through the website in 2023. The problem wasn't marketing.",
            lede: "Account opening was scattered across channels and account types, each with its own logic. This SDK replaced that with one reusable system: a persona-based recommendation engine, real-time business validation for corporate applicants, a digitized reference request that removes a physical-world dependency, and a way for anyone to track their application after they submit it.",
            stats: [
              { value: "281 → 50,000+", label: "Website account openings in 2023 versus web and web banking combined by 2025" },
              { value: "9+", label: "Account types covered by one shared flow" },
              { value: "Digitized", label: "Reference requirement moved from an in-person favor to a trackable digital request" },
            ],
            sections: [
              {
                heading: "Ten-plus workshops, and the one where the scope changed",
                tag: "Workshop lifecycle",
                sourcing: "sourced",
                bodyText:
                  "This didn't start at a screen, and it wasn't linear. Across 10+ sessions, three did the structural work: a BRD alignment with 8 team leads, a co-design session that put 100+ stakeholders in one room, and a physical workshop with 15 designers where I presented wireframes and flows. That session is where the conversation stopped being about account opening and became about the whole journey. Demo day was a company-wide retreat in front of directors and MDs from every region, and it didn't end there: a 12-person post-demo iteration turned executive feedback into sprint work.",
                layout: "themedShot",
                themed: {
                  light: "/images/first-bank-process/workshop-lifecycle-light.webp",
                  dark: "/images/first-bank-process/workshop-lifecycle-dark.webp",
                  lightMobile: "/images/first-bank-process/workshop-lifecycle-light-mobile.webp",
                  darkMobile: "/images/first-bank-process/workshop-lifecycle-dark-mobile.webp",
                },
                alt: "Workshop lifecycle timeline across 10+ intensive, non-linear workshops. Workshop 01, BRD Core Alignment, a small group session with 8 leads scoping parameters and mapping the technical problem space. Workshop 02, Broad Alignment, a co-design event aligning 100+ stakeholders and consolidating action items. Workshop 03, Physical Flow Mapping, a hands-on session with 15 designers drafting wireframes and critiquing flows. Demo Day, a company-wide retreat bringing together Directors and Managing Directors from every operating region. And a Post-Demo Iteration with 12 participants deconstructing executive feedback into development sprints",
              },
              {
                heading: "The requirement that turned into the architecture",
                tag: "Checkpoint decision",
                sourcing: "sourced",
                bodyText:
                  "\"Resume and track application functionality\" appears in the January 2024 BRD from the Customer Experience Office as a requirement across all four customer journey types: retail web and mobile, retail RM-assisted, SME, and corporate. It reads like a feature request. Treated seriously it's a constraint on the whole flow, because document verification was where applicants stalled: they rarely had every document to hand in one sitting. That forces three decisions: which steps are safe to interrupt, what gets re-verified after a gap, and how to show someone exactly where they left off. The December 2023 CxO review had already pointed the same way, asking for an account number as soon as due diligence clears and for tracking of the request by the customer.",
                layout: "themedShot",
                themed: {
                  light: "/images/first-bank-process/checkpoint-timeline-light.webp",
                  dark: "/images/first-bank-process/checkpoint-timeline-dark.webp",
                  lightMobile: "/images/first-bank-process/checkpoint-timeline-light-mobile.webp",
                },
                alt: "Timeline from onboarding friction to shipped flow across five stages. The Jan 2024 BRD from the Customer Experience Office, whose customer journey mapping identified critical drop-offs during identity setup. The requirement, logged formally to enable resume and track application functionality across all four journey types. Friction discovery, where document verification was the heaviest real-world drop-off because applicants could not complete verification in one sitting due to missing paperwork. The design decision to engineer automatic progress-save checkpoints into the onboarding steps, refined via quick user tests. And the release: a stateful Progress Tracker with per-document review status and single-click resume at any stage",
              },
              {
                heading: "The flow I put on the wall in workshop 3",
                tag: "Full user flow",
                sourcing: "reconstructed",
                bodyText:
                  "Two decisions carry this flow. The first is at entry: the system already knows its own context, so nobody picks a country or an account type from a menu before they've even started. The second is at NIN/BVN, where verification runs directly against First Bank's own portal, because the bank checking its own records doesn't need a separate manual backend script the way an outside integrator would. Three checkpoints hang off the path at the points where real life interrupts.",
                layout: "wideShot",
                src: "/images/first-bank-process/full-user-flow.webp",
                alt: "Full account opening user flow, left to right: entry from mobile app or website with the system already knowing context and no manual country or type selection; a persona question that can be skipped; account recommended or self-selected; core details of name, email and phone; email verification, which branches to a save-and-resume checkpoint; personal details capture with error correction; additional details including next of kin and signature; NIN and BVN entry verified directly against First Bank's own portal with no separate manual backend script call; a Face ID liveness check using the same verification pass; document verification, which branches to a second save-and-resume checkpoint; submit application; asynchronous account generation taking up to a day, branching to a checkpoint where the customer is notified rather than left waiting; and finally the account regularized and ready to use",
              },
              {
                heading: "Where it actually hurt, stage by stage",
                tag: "Journey map",
                sourcing: "reconstructed",
                bodyText:
                  "The interesting row is the third one. Every pain point in it is a thing the old flow did to people: manual selection before you'd started, a generic product list with no guidance, silent failures, progress lost on interruption, and a submission that looked like a frozen app. The design response row is the case study in one line.",
                layout: "single",
                src: "/images/first-bank-process/journey-map.webp",
                alt: "Journey map table with six stages across the top (Entry, Persona Discovery, Core Details and ID Verification, Document Verification, Submission and Account Generation, and Account Ready) and five rows: Customer Action, Thinking with an illustrative quote, Pain Point before the redesign, Design Response, and a colour-coded Emotion row running from cautiously optimistic through slightly anxious and uncertain to satisfied",
              },
              {
                heading: "What the SDK is actually made of",
                tag: "Information architecture",
                sourcing: "sourced",
                bodyText:
                  "Six branches. Every leaf here is a real screen, and the ones in this section are drawn from it. The structure is the reusable part: this is what gets instantiated whether someone opens an account on the website, in the mobile app, or with an RM sitting next to them at a branch.",
                layout: "single",
                src: "/images/first-bank-process/information-architecture.webp",
                alt: "Information architecture tree with Account Opening SDK at the root branching into six areas (Entry, Persona and Account Selection, Application Form, Document Center, Application Status, and Account Ready), each expanding into real sub-screens including mobile app and web landing, need identification and recommended account type, personal details, identity verification with NIN/BVN and Face ID, additional details, reference request, document upload, save and resume checkpoint, progress tracker, notifications, welcome and onboarding, and account services",
              },
              {
                heading: "The same first step, wherever someone is opening an account from",
                tag: "Get Started: Step 1 of 5",
                bodyText: "A regional selector, not an account-type selector: Nigeria, United Kingdom, Gambia, Ghana, Sierra Leone, DR Congo, Guinea, Senegal, and Diaspora, covering every market First Bank operates in. It sits in front of every account type this SDK supports, so the same checkpoint logic runs regardless of what someone's opening or where they're opening it from.",
                layout: "single",
                src: "/images/account-opening-sdk/img-1.webp",
                alt: "Get Started screen, step 1 of 5, asking what country are you opening an account from, with options for Nigeria, United Kingdom, Gambia, Ghana, Sierra Leone, DR Congo, Guinea, Senegal, and Diaspora",
                device: "browser",
              },
              {
                heading: "A recommendation built from who's answering, not a static list",
                tag: "Before / after: account selection",
                bodyText: "The old hub asked you to already know the answer. Three products behind stock photography, each with a checklist of documents, and account opening tangled together with account management on the same screen. \"Open an account or manage an existing account\" is two jobs in one sentence. Nothing on it helps a person work out which account is theirs. The replacement asks instead: Individual or Corporate/SME, then up to three descriptors: age band, salary earner or student, or managing an account for their kids. Answer those and a specific account surfaces underneath, carrying its own eligibility requirements. Same information, opposite direction of travel.",
                layout: "compare",
                columns: [
                  {
                    label: "Before: pick from a menu",
                    type: "shot",
                    src: "/images/account-opening-sdk/before-account-hub.webp",
                    alt: "The previous account opening hub, headed Open an account or manage an existing account, showing three product cards (Instant Account, Savings Account, and Current Account), each with a stock photograph and a checklist of what you'll need such as photograph, BVN, valid ID card, utility bill, e-signature and references, alongside a Get a Virtual Card panel and a Manage an existing account panel linking to email address update, upgrade account, and download reference form",
                    device: "browser",
                  },
                  {
                    label: "After: answer three questions",
                    type: "shot",
                    src: "/images/account-opening-sdk/img-2.webp",
                    alt: "Lets recommend an account type screen with Individual or Corporate SME selection, descriptor options including Male, Female, Professional, Salary Earner, Student, Manage Account For My Kids, and age bands, surfacing a recommended Savings Account below with its requirements",
                    device: "browser",
                  },
                ],
              },
              {
                heading: "For a Corporate/SME account, verification starts with a real registry lookup",
                tag: "Validate Business Information: Step 2 of 5",
                bodyText: "An RC or BN number goes in, and the system validates it live rather than trusting whatever's typed. Once verified, business name and type come back pre-filled and locked, with a direct link to see exactly which documents that specific business type will need next.",
                layout: "compare",
                columns: [
                  { label: "Submitted, validating", type: "shot", src: "/images/account-opening-sdk/img-3.webp", alt: "Validate Business Information screen with RC Number selected and RC1868804 entered, showing a loading state" },
                  { label: "Validated", type: "shot", src: "/images/account-opening-sdk/img-4.webp", alt: "Validate Business Information screen showing RC1868804 validated, with Business Name auto-filled as Ddota-Asher International Ltd, Business Type as Private Company Limited By Shares, a link to see the documents needed, and fields for nature of business and business description" },
                ],
              },
              {
                heading: "The logic behind that validation, worked out before it shipped",
                tag: "Process",
                bodyText: "Every state the RC number field could land in, mapped out with the actual rule for each: validate only once the final digit is entered, what happens on success, and a note that a SCUMUL certificate is a requirement for certain business types only, not universally. Getting this branching logic right up front is what made the validated state above possible.",
                layout: "single",
                src: "/images/account-opening-sdk/img-5.webp",
                alt: "Annotated flow diagram showing RC Number, RC Number Verified, RC Number Filled, RC Verified for Scumul, and RC Number Failed states, with designer notes about when validation triggers and which business types require a Scumul certificate",
              },
              {
                heading: "Four documents, one screen, nothing left ambiguous",
                tag: "Document Upload (KYC): Step 3 of 5",
                bodyText: "Photo ID, proof of address, signature, and reference each get their own card with a plain-language reason it's needed, rather than a bare checklist. A hard rule sits below all four: original ID photos only, no scans or photocopies, stated once instead of repeated per document.",
                layout: "single",
                src: "/images/account-opening-sdk/img-6.webp",
                alt: "Document Upload KYC screen listing ID Card, Proof of Address, Reference, and Signature, each with a green checkmark and an Update link, plus a note that only original ID photos are accepted",
                device: "browser",
              },
              {
                heading: "Digitizing the one requirement that used to mean showing up in person",
                tag: "Reference request: Corporate and Current accounts",
                bodyText: "Certain account types, corporate accounts and individual current accounts alike, have always required an introductory reference from an existing customer. That used to mean physically tracking someone down. Now the applicant sends a request, the referee gets an email with a direct link, and fills a proper reference form themselves, disclaimer included, with no branch visit for either party.",
                layout: "compare",
                columns: [
                  { label: "The referee's email", type: "shot", src: "/images/account-opening-sdk/img-7.webp", alt: "Gmail inbox showing an email titled Layor G Pan sent you a reference request, with a Proceed To Fill Reference button" },
                  { label: "The reference form itself", type: "shot", src: "/images/account-opening-sdk/img-8.webp", alt: "Reference form titled Layor G Pan is requesting an introduction reference to open a current account, with a disclaimer about introducing individuals not well known, and fields for referee name, address, applicant name, referee's bank, account number, branch address, and signature" },
                ],
              },
              {
                heading: "After submitting, the applicant isn't left wondering",
                tag: "Progress Tracker",
                bodyText: "Account name, number, type, and username up top, then every document broken out individually with its own status: completed, declined with a specific reason and a re-upload action, or still in view. A completion percentage sits above all of it, so there's one honest number for \"how far along am I.\"",
                layout: "single",
                src: "/images/account-opening-sdk/img-9.webp",
                alt: "Progress Tracker screen showing account name, number, type as Diaspora Naira Savings Account, and username, with 4 documents tracked, 25 percent completed reviews, ID Card Validation completed, Signature Upload declined with reason image is not clear enough and a re-upload button, and Notarized Utility Bill in view",
                device: "browser",
              },
            ],
            footerStats: [
              { value: "281 → 50,000+", label: "Website account openings before this redesign versus web and web banking combined by 2025" },
              { value: "No branch visit", label: "Reference requirement digitized end to end, for both corporate and individual current accounts" },
              { value: "Trackable", label: "Every submitted application gets a real progress tracker, document by document, not a black box" },
            ],
          },
        },
        {
          id: "approval-workflows",
          tags: ["enterprise UX", "multi-user workflows", "phone + tablet"],
          highlights: [
            "/images/approval-workflows/img-2.webp",
            "/images/approval-workflows/transfer-form-iterations.webp",
            "/images/approval-workflows/img-10.webp",
            "/images/approval-workflows/img-7.webp",
          ],
          navLabel: "Approval Workflows",
          heading: "Redesigning corporate banking for mobile, from onboarding to approvals",
          problem:
            "FirstDirect2.0 was First Bank's corporate internet banking platform, already live on web. The mobile version needed to carry over the same trust and control corporate customers relied on, but corporate banking is not single-user banking. Every payment, every beneficiary, and every bulk transaction batch needs a second person to approve it before money moves.",
          scope:
            "I redesigned the full FirstDirect2.0 corporate banking mobile experience, well beyond the approval workflow. This included the corporate onboarding flow (a six-step process I reworked from a stack of compliance fields into a guided setup), the single and bulk payment flows, beneficiary management, transaction summaries, account statements, and profile and subsidiary management. The approval workflow was the hardest surface: a corporate user can review and approve up to 50 transactions in a single batch, each checked against beneficiary, amount, and account before a token confirms it. Partway through the project, board members raised a specific request: executives approving long, paginated batches wanted a larger screen than a phone could give them. That pushed the scope into designing specifically for tablet-sized approval review alongside the phone experience for lighter tasks.",
          stat: { value: "50", label: "transactions reviewable in a single approval batch" },
          outcome:
            "Shipped as FirstDirect2.0 Mobile, extending the bank's full corporate banking platform to iOS, Android, and tablet. The approval experience was designed around how executives actually review large batches. The corporate onboarding flow was reduced from a compliance-style form to a guided setup. Payments, beneficiaries, statements, and subsidiary management all shipped as part of the same release.",
          screens: {
            leftLabel: "Phone: single payment approval",
            rightLabel: "Tablet: batch approval for executives",
          },
          showcase: {
            eyebrow: "First Bank Nigeria: FirstDirect2.0 Mobile",
            heroHeading: "Corporate banking, redesigned end to end for mobile, as lead designer on the full app.",
            lede: "As lead designer on FirstDirect2.0 Mobile, the scope covered the full corporate banking app: sign-in through biometrics, a home dashboard built around a float account, transfers across four categories, organization and subsidiary switching, payment insights, liquidity management for treasury teams, and the approval workflow that needed a screen bigger than a phone.",
            stats: [
              { value: "8", label: "Organizations a single user can switch between from one login" },
              { value: "50", label: "Transactions reviewable in a single approval batch" },
              { value: "Full app", label: "Sign-in, home, transfers, subsidiary switching, insights, liquidity management, and approvals, all redesigned as one system" },
            ],
            sections: [
              {
                heading: "Getting in, with an option to skip the password entirely",
                tag: "Sign In",
                bodyText: "Organization Code, Username, and Password, with a biometrics option sitting right below the primary sign-in action rather than buried in settings. Region shows at the top before login even happens, since a corporate user's organization can span more than one country.",
                layout: "compare",
                columns: [
                  { label: "Sign in", type: "shot", src: "/images/approval-workflows/img-1.webp", alt: "FirstDirect2.0 sign in screen with Organization Code, Username, and Password fields, Remember Me checkbox, Forgot password link, a Sign In button, and a Sign in with biometrics option", device: "phone" },
                  { label: "Home", type: "shot", src: "/images/approval-workflows/img-2.webp", alt: "Home screen showing Good Morning Layor, a switch account control showing 8 organizations, float account balance, an Action Approval Center button, a For You section with loan and bulk payment offers, and a recent transactions list", device: "phone" },
                ],
              },
              {
                heading: "Two options, one vote, and the tab that won",
                tag: "Transfer tabs decision",
                sourcing: "sourced",
                bodyText:
                  "Inside the transfer modal, people picked the wrong category. Someone meaning \"Other Bank\" would land on \"Own Account\" and only realise once they were already on the transaction screen. These are the two iterations that went to a vote across the design team and the wider FirstDirect 2.0 session. Look at the top of each. Option A puts the four categories in a tab bar, so a wrong choice costs one tap and keeps everything already typed. The alternative offers a back arrow and nothing else, so a wrong category means leaving the screen and starting the form again, which is exactly the behaviour people were complaining about. Option A won, because tabs turn the error into a correction rather than a restart.",
                layout: "single",
                src: "/images/approval-workflows/transfer-form-iterations.webp",
                alt: "Two transfer form iterations side by side. The left iteration, annotated Option A (With Tabs), carries a tab bar across the top reading Own Account, To Firstbank, To Other Bank, and FX, with To Other Bank selected, above the source account, account number, bank selection, account name, amount with fee and transaction limit, and payment memo fields. The right iteration has no tab bar, just a back arrow and a Transfer title above the same form fields, so the transfer category can only be changed by leaving the screen",
              },
              {
                heading: "Four ways to move money, one entry point",
                tag: "Transfers",
                bodyText: "Tapping Transfers surfaces local transfer options (own account, to First Bank, to other banks) alongside foreign currency transfer options (FX payment, FX sales) in the same sheet, rather than splitting domestic and FX into separate flows a user has to know to look for. The full transfer form carries source account, a saved-contacts shortcut, bank selection, fee and transaction limit shown before submission, and a payment memo.",
                layout: "compare",
                columns: [
                  { label: "Transfer entry sheet", type: "shot", src: "/images/approval-workflows/img-3.webp", alt: "Transfer Money bottom sheet with Local Transfer options for Own Account, To First Bank, To Other Banks, and Foreign Currency Transfer options for First Bank FX Payment, FX Payment, and FX Sales", device: "phone" },
                  { label: "Transfer form", type: "shot", src: "/images/approval-workflows/img-4.webp", alt: "Transfer form set to To Other Bank, with source account, account number field with a contacts shortcut, selected bank Keystone Bank, account name, amount, fee and transaction limit shown, and a payment memo field", device: "phone" },
                ],
              },
              {
                heading: "One login, eight organizations: the subsidiary management surface",
                tag: "More",
                bodyText: "A user managing multiple entities, \"The Sharply Africa\" shown here as one of eight, switches organization from a dedicated control rather than logging out and back in as a different profile. Below that, every added feature (bill payment, bulk transfer, account management, cheque request, virtual accounts, e-invoice) sits in one list, scoped to whichever organization is currently active.",
                layout: "single",
                src: "/images/approval-workflows/img-5.webp",
                alt: "More menu showing The Sharply Africa organization with organization ID and a Switch Organization button, followed by a list of added features including Bill Payment, Bulk Transfer, Account Management, Cheque Request, Loan coming soon, Virtual Accounts, and e-Invoice",
                device: "phone",
              },
              {
                heading: "Where the money's actually going, broken down by payment type",
                tag: "Insights",
                bodyText: "Cash Flow, Failed Payment, and Payment Insight sit as tabs on the same screen, scoped to a selected account and month. The Payment Insight view shown here breaks a month's outflow down by RTGS, Instant Payment, and a third category, each as both a percentage and a naira figure.",
                layout: "single",
                src: "/images/approval-workflows/img-6.webp",
                alt: "Insights screen with Cash Flow, Failed Payment, and Payment Insight tabs, an account and month selector, and a donut chart breaking payments down into RTGS at 28 percent, Instant Payment at 39 percent, and a third category at 28 percent",
                device: "phone",
              },
              {
                heading: "Treasury-grade functionality, still built for a phone",
                tag: "Liquidity Management",
                bodyText: "This is as far from a simple balance check as corporate banking gets: Regional Liquidity Management and Global Cash Pooling structures, each carrying its own sweep instructions with start and end dates, expandable and editable per instruction. A structure with no instructions yet states that plainly instead of showing an empty table.",
                layout: "single",
                src: "/images/approval-workflows/img-7.webp",
                alt: "Liquidity Management screen with a Structures and Instructions tab, showing an Active Regional Liquidity Management Structure with two Sweep instructions each with start and end dates, and an Active Global Cash Pooling Structure with no instructions added yet",
                device: "phone",
              },
              {
                heading: "A list of what's waiting, then the decision itself",
                tag: "Approvals: Phone",
                bodyText: "The Action/Approval Center groups by Single Payment, Bill Payment, and Bulk Payment, each entry showing receiver, narration, method, and amount before a single tap is needed. Tapping through gives the full transaction detail, fees included, with Approve or Decline right there.",
                layout: "compare",
                columns: [
                  { label: "Approval center", type: "shot", src: "/images/approval-workflows/img-8.webp", alt: "Action Approval Center screen on phone showing a list of pending payments grouped by Single Payment, Bill Payment, and Bulk Payment, each with a Take Action button", device: "phone" },
                  { label: "Single payment detail", type: "shot", src: "/images/approval-workflows/img-9.webp", alt: "Transaction Approval screen on phone showing amount, receiver, account number, bank name, fees, narration, and method, with Approve and Decline buttons", device: "phone" },
                ],
              },
              {
                heading: "What the demo day request sounded like, if you unpack it",
                tag: "Empathy map",
                sourcing: "reconstructed",
                bodyText:
                  "One fact here is confirmed: at demo day, executives who had struggled to review batches at phone scale asked for a bigger screen. Everything else on this board is my characterization of the person making that request: a reviewer who won't be rushed on a decision with real financial weight, and who already does this kind of work on a larger screen everywhere else.",
                layout: "single",
                src: "/images/first-bank-process/empathy-map.webp",
                alt: "Empathy map for an executive reviewing approval batches, with Says, Thinks, Does, and Feels columns of sticky notes covering difficulty reviewing on a phone screen, wanting to see more transactions at once, needing to know who else must approve, caution about missing an error, and frustration with pinching and scrolling",
              },
              {
                heading: "The same feedback, clustered into the reason for a tablet",
                tag: "Affinity map",
                sourcing: "reconstructed",
                bodyText:
                  "Four themes come out of it, and only one is about screen size. The others are about review speed, about trust and control over a decision with financial consequences, and about fit with how executives already work. A tablet answers all four; a bigger phone layout answers one.",
                layout: "single",
                src: "/images/first-bank-process/affinity-map.webp",
                alt: "Affinity map clustering demo day feedback into four themes (Screen Size and Legibility, Batch Review Speed, Trust and Control, and Executive Workflow Fit), leading to a decision note reading build a dedicated tablet approval review surface for executives handling large batches",
              },
              {
                heading: "The batch view executives actually asked for",
                tag: "Approvals: Tablet",
                bodyText: "Partway through the project, board members raised a specific request: executives approving long, paginated batches wanted a screen bigger than a phone. Five beneficiaries visible per screen out of fifty total, each with bank, account number, and amount, plus a running approvals-involved tab so an executive can see who else needs to sign off before them.",
                layout: "single",
                src: "/images/approval-workflows/img-10.webp",
                alt: "Transaction Details screen on tablet showing a bulk transfer of 5,129,000 naira awaiting approval, with a beneficiaries list of 5 shown out of 50 results, and Approve All or Decline All buttons",
                device: "tablet",
              },
            ],
            footerStats: [
              { value: "8", label: "Organizations switchable from one login, the core of the subsidiary management story" },
              { value: "50", label: "Transactions per approval batch, reviewed on a screen actually built for the task" },
              { value: "One system", label: "Sign-in, home, transfers, organizations, insights, liquidity management, and approvals, designed as a single coherent app" },
            ],
          },
        },
        {
          id: "diaspora-banking",
          tags: ["evidence-led", "constraint removal", "inclusive design"],
          highlights: [
            "/images/diaspora-banking/before-bvn-dead-end.webp",
            "/images/diaspora-banking/img-3.webp",
            "/images/diaspora-banking/img-1.webp",
            "/images/diaspora-banking/img-4.webp",
          ],
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
          showcase: {
            eyebrow: "First Bank Nigeria: Diaspora Banking",
            heroHeading: "A Bank Verification Number is easy to get in Nigeria. It's genuinely hard to get from abroad.",
            lede: "That single gap was driving a 70% drop-off rate among diaspora applicants, many of whom left Nigeria before BVN existed as a requirement at all. The response starts before someone even opens the app: a dedicated diaspora banking section on the bank's public website, then an account opening flow that treats \"I don't have a BVN\" as a real, planned-for answer rather than a dead end.",
            stats: [
              { value: "70%", label: "Drop-off rate for older diaspora applicants before this redesign" },
              { value: "3", label: "Account categories offered: Naira Accounts, Domiciliary Accounts, Expatriate Account" },
              { value: "2 paths", label: "Both routes are designed for: having a BVN, and not having one" },
            ],
            sections: [
              {
                heading: "The requirement existed. It just didn't survive contact with a real person.",
                tag: "BVN decision trail",
                sourcing: "sourced",
                bodyText:
                  "The BRD already anticipated the applicant without a BVN: a screen was meant to pop up, and \"customers in the diaspora would be advised to visit any of the BVN centers for enrolment\". The document even links the NIBSS list of enrollment centers abroad. So the requirement was real and it was written down. What shipped against it was a button. The analytics said roughly 70% of these applicants never got past that step, and more than a year later the CxO journey review still lists \"difficulty in BVN enrollment\" as an open issue for diaspora customers. Being told to visit a center is not the same as being told which center, where, and when it opens.",
                layout: "steps",
                steps: [
                  {
                    title: "The BRD states the requirement",
                    detail:
                      "\"For customers without BVN, a screen for BVN enrolment pops up… Customers in the diaspora would be advised to visit any of the BVN centers for enrolment.\" The NIBSS enrollment-center list is linked in the document.",
                  },
                  {
                    title: "What shipped: advice with no destination",
                    detail: "A flat \"Register without BVN\" control that told the applicant a fact they already knew.",
                  },
                  {
                    title: "~70% never got past the BVN step",
                    detail:
                      "Concentrated among older applicants who had left Nigeria before BVN existed as a requirement. From analytics reviewed at the time.",
                  },
                  {
                    title: "Still an open issue later",
                    detail:
                      "The CxO journey review lists \"difficulty in BVN enrollment\" under Account Opening, owned by Diaspora Banking, which recommends partnership with vendors and super agents for enrolment.",
                  },
                  {
                    title: "Answer the question the requirement actually asked",
                    detail:
                      "Not \"do you have a BVN\" but \"where do you go, and can you leave and come back?\". That meant a country selector, real centers with addresses and opening hours, and save-and-resume.",
                    kind: "decision",
                  },
                  {
                    title: "Shipped: country-specific center lookup",
                    detail: "Plus a separate path for applicants who have a BVN but don't know the number.",
                    kind: "outcome",
                  },
                ],
              },
              {
                heading: "A dedicated home for diaspora customers, before they ever open the app",
                tag: "firstbanknigeria.com: Diaspora",
                bodyText: "Its own tab in the main site navigation, not a buried subpage. \"Global dreams, local roots\" leads into three account categories (Naira Accounts, Domiciliary Accounts, and an Expatriate Account), each with its own product cards, plus account maintenance services (update, migration, alert setup, document tracking, card requests) and a diaspora-specific FAQ covering BVN enrollment, eligibility, and account migration.",
                layout: "single",
                src: "/images/diaspora-banking/img-1.webp",
                alt: "FirstBank Diaspora Banking website page with a Global dreams local roots hero, Naira Accounts, Domiciliary Accounts, and Expatriate Account sections, each with product cards, an Account Maintenance Services section, and a diaspora-specific FAQ",
              },
              {
                heading: "The first hard requirement, stated plainly, with an out",
                tag: "Open A Diaspora Naira Savings Account",
                bodyText: "Four requirements to open the account, and the fourth one, a BVN, is the one most diaspora applicants can't immediately satisfy. Rather than let that block the flow silently, the requirement carries its own escape hatch right there: \"Don't have a BVN? Click here to locate a center.\"",
                layout: "single",
                src: "/images/diaspora-banking/img-2.webp",
                alt: "Open A Diaspora Naira Savings Account screen listing requirements: be 18+, be a resident of the country you are registering from, have a phone number of the country you reside in, and have a Bank Verification Number, with a link reading don't have a BVN, click here to locate a center",
                device: "browser",
              },
              {
                heading: "This is the button. This is what replaced it.",
                tag: "Before / after: the BVN step",
                sourcing: "sourced",
                bodyText: "Two screens hold the whole case study. On the left, the old step: \"Don't have your BVN? Kindly click on the link below to get started\", and then a button reading Register without BVN. That is the honest end of the road for someone who left Nigeria before BVN existed. It names the problem and hands back the same question. On the right, the same moment redesigned: \"I don't have a BVN\" swaps the input for a country selector and a list of real, physical enrollment centers with addresses and opening hours near where the applicant actually lives, plus Save And Complete Later, because a trip to a center is not something you do between two form fields.",
                layout: "compare",
                columns: [
                  {
                    label: "Before: a button to nowhere",
                    type: "shot",
                    src: "/images/diaspora-banking/before-bvn-dead-end.webp",
                    alt: "The previous BVN step, headed Let us get started, asking Do you have your BVN? with a field to enter your BVN, a Proceed button, and a hint reading Don't remember your BVN? Dial star 565 star 0 hash on your phone to retrieve it. Below it a section headed Don't have your BVN? says Kindly click on the link below to get started above a single button reading Register without BVN",
                    device: "browser",
                  },
                  {
                    label: "After: a country, a center, an address",
                    type: "shot",
                    src: "/images/diaspora-banking/img-3.webp",
                    alt: "Input BVN screen with a choice between I have a BVN and I don't have a BVN. With I don't have a BVN selected, it shows a country selector set to United States and a list of popular BVN centers with addresses and opening hours, plus a Save And Complete Later button",
                    device: "browser",
                  },
                ],
              },
              {
                heading: "Already have a BVN, but don't know it?",
                tag: "Validate Personal Information: Step 2 of 5",
                bodyText: "A different branch for a different problem: applicants who do have a BVN and NIN but don't have the numbers on hand. The old flow already offered the BVN retrieval code as a one-line aside under the input. Here it's given its own room and its own step, and NIN is covered the same way: \"Dial *565*0# on the phone number linked to your BVN. You will receive an SMS containing the BVN,\" and the equivalent USSD path for NIN. The improvement isn't the code, it's that the code stops being a footnote.",
                layout: "single",
                src: "/images/diaspora-banking/img-4.webp",
                alt: "Validate Personal Information screen, step 2 of 5, with fields for BVN and NIN, plus Steps to check BVN via USSD and Steps to check NIN via USSD, each with dial codes and instructions",
                device: "browser",
              },
            ],
            footerStats: [
              { value: "70%", label: "Drop-off rate for older diaspora applicants before this redesign" },
              { value: "Two real paths", label: "Have a BVN and don't know it, or don't have one at all. Each gets its own guidance instead of one generic error state" },
              { value: "Before the app", label: "The journey starts on the public website, where a prospective customer can learn what they need before ever downloading anything" },
            ],
          },
        },
      ],
    },
  },
  {
    slug: "indigoemr",
    featured: true,
    title: "IndigoEMR",
    year: "2022–Present",
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
    heroMedia: { type: "image", src: "/images/indigo-emr-hero.webp" },
    detail: {
      role: "Senior Product Designer",
      timeline: "2022–Present",
      platform: "Web",
      status: "Live",
      platformIntro: {
        eyebrow: "Introducing IndigoEMR",
        heading: "From a bespoke build to a SaaS platform",
        body: "IndigoEMR is a cloud-native hospital management system used across Nigeria and Kenya. It didn't start as a platform. V1 was a bespoke electronic medical record system, built and hand-deployed individually for ophthalmology practices, where every new client meant a custom implementation rather than a product a hospital could simply sign up for. I led the transition from that model to V2: a true multi-tenant SaaS platform, where any hospital, regardless of specialty, can onboard, configure, and run its own clinical workflows without a custom build.",
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
          tags: ["self-serve tooling", "0→1 feature", "eliminating manual work"],
          highlights: [
            "/images/form-builder/img-3.webp",
            "/images/form-builder/img-1.webp",
            "/images/form-builder/img-5.webp",
            "/images/form-builder/img-7.webp",
          ],
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
            eyebrow: "IndigoEMR: Form Builder Workstream",
            heroHeading:
              "From locked, one-size-fits-all workflows to a system hospitals build themselves.",
            heroEmphasis: "build themselves",
            lede: "Every specialty used to need a designer and an engineer, three to five working days, just to add a form. The Form Builder and Data Library replaced that with something hospital staff run on their own.",
            stats: [
              { value: "99%", label: "Reduction in onboarding time, from 1 week to 30 minutes" },
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
                    label: "Before: V2 Test Standards",
                    type: "shot",
                    src: "/images/indigo-before-test-standards.webp",
                    alt: "The V2 Test Standards screen in IndigoEMR, listing system-defined standards (PWR, Height, BC, and DIA), each with a long read-only string of values and a created timestamp, above a search field, with no control to edit or remove any of them",
                    device: "browser",
                    caption: "Values could be added, never edited or removed",
                  },
                  {
                    label: "After: Data Library",
                    type: "shot",
                    src: "/images/form-builder/img-1.webp",
                    alt: "IndigoEMR Data Library showing editable fields including Diagnosis, Country, Symptoms, Allergies, Gender, Patient ID and more",
                    device: "browser",
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
                    device: "browser",
                  },
                  {
                    label: "Components added",
                    type: "shot",
                    src: "/images/form-builder/img-3.webp",
                    alt: "Create A New Form screen with header, short answer, dropdown fields, and a table component added",
                    device: "browser",
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
          tags: ["trust & permissions", "multi-tenant", "inter-org data sharing"],
          highlights: [
            "/images/partnership-feature/img-1.webp",
            "/images/partnership-feature/img-3.webp",
            "/images/partnership-feature/img-4.webp",
            "/images/partnership-feature/img-6.webp",
          ],
          navLabel: "Partnership",
          heading: "Enabling inter-hospital collaboration through the partnership feature",
          problem:
            "Hospitals in Nigeria rarely operate in isolation. A patient seen at one clinic might need a specialist at another, and the referring hospital needs to share records, access inventory, transfer the patient, and keep billing separate. Before this feature, that coordination happened over phone calls, WhatsApp messages, and paper referrals. Nothing was tracked inside the system.",
          scope:
            "I designed the partnership feature, which enables hospitals to share patient records, access each other's inventory, transfer patients between facilities, and maintain billing separation throughout. The hardest design problem was trust: both hospitals need to see the right information without exposing data that should stay internal. I designed role-based access controls that determine what each partner hospital can view, edit, or request, while keeping billing, internal notes, and operational data separated. The feature was piloted with Eye Foundation and iShop as the first two partner hospitals.",
          stat: { value: "2", label: "pilot partners live: Eye Foundation and iShop" },
          outcome:
            "The partnership feature is the active MVP for IndigoEMR's multi-tenant expansion. It replaced an informal, untracked process with a structured system that keeps patient records accurate across facilities while respecting each hospital's data boundaries.",
          showcase: {
            eyebrow: "IndigoEMR: Partnership Workstream",
            heroHeading: "Letting hospitals share what they choose to, and nothing else.",
            lede: "Referrals between hospitals used to happen over phone calls and WhatsApp, with nothing tracked inside the system. The partnership feature replaces that with structured, permissioned access, built around a simple rule: both hospitals see only what the other has explicitly agreed to share.",
            stats: [
              { value: "2", label: "Pilot partners live: Eye Foundation and iShop" },
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
                    device: "browser",
                  },
                  {
                    label: "A live partner network",
                    type: "shot",
                    src: "/images/partnership-feature/img-2.webp",
                    alt: "Hospital Partner Network dashboard showing total partnerships, active count, Indigo versus external partners, and a list of partnerships with statuses including Active, Invite Rejected with a stated rejection reason, and Pending, each with a permission summary for Patient Registration, Patient Records, Stock Transfer, and Stock Visibility",
                    device: "browser",
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
                device: "modal",
              },
              {
                heading: "A shared patient is always clearly marked as one",
                tag: "Patient Details",
                bodyText:
                  "When a patient's record originates from a partner hospital, that's the first thing staff see, not something buried in a metadata field.",
                layout: "single",
                src: "/images/partnership-feature/img-4.webp",
                alt: "Patient Details screen with a banner reading this patient was registered by Eye Shop, shown above the full patient profile",
                device: "browser",
                cropTo: "1512 / 985",
              },
              {
                heading: "What staff can do with a partner patient, and where the line sits",
                tag: "Access boundary",
                bodyText:
                  "A partner patient carries the same action menu as any other record (view records, generate a medical report, book a procedure), plus one specific to the partnership itself: migrating the record. That single action is deliberate. Until a hospital migrates a partner patient, they can view but not edit, so the originating hospital's data stays authoritative.",
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
          tags: ["operational UX", "audit lifecycle", "inventory systems"],
          highlights: [
            "/images/consumables-flow/img-1.webp",
            "/images/consumables-flow/img-3.webp",
            "/images/consumables-flow/img-5.webp",
            "/images/consumables-flow/img-7.webp",
          ],
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
            eyebrow: "IndigoEMR: Consumables Workstream",
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
                device: "modal",
              },
              {
                heading: "Every request tracked through its full status lifecycle",
                tag: "Consumable List",
                bodyText:
                  "Requested, ready for collection, dispensed: each row shows exactly where an item sits, and who requested it, without opening a separate record.",
                layout: "single",
                src: "/images/consumables-flow/img-2.webp",
                alt: "Consumable List table showing IV Cannula requested, Foley Catheter ready for collection, and Wound dressing kit dispensed",
                device: "browser",
              },
              {
                heading: "Once dispensed, the record stays audit-ready",
                tag: "Consumables Details",
                bodyText:
                  "Reference number, who requested it, who received it, and exactly which batch and quantity moved. This is the record a pharmacy team pulls up when something needs to be traced back.",
                layout: "single",
                src: "/images/consumables-flow/img-3.webp",
                alt: "Patient Consumables Details panel showing reference number, dispensed status, requested by, received by, and items transferred with batch ID and expiry",
                device: "modal",
              },
              {
                heading: "The supply side: what the request draws from",
                tag: "Central Inventory",
                bodyText:
                  "Every consumable request pulls against real stock. The inventory view surfaces what matters at a glance (total items, low stock, out of stock, and expired drugs) before a single row is expanded.",
                layout: "single",
                src: "/images/consumables-flow/img-4.webp",
                alt: "Inventory items screen showing total stock, low stocks, out of stocks, and expired drugs counts, with an expandable product table showing batch IDs and expiry dates",
                device: "browser",
                cropTo: "1447 / 880",
              },
              {
                heading: "Adding stock, with only as much complexity as the task needs",
                tag: "Add Stock flow",
                bodyText:
                  "The form starts minimal: batch ID, supplier, quantity, expiry. Branch transfer is opt-in rather than a default field everyone has to skip past. Once filled, a preview table confirms exactly what's about to be added before submission.",
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
          tags: ["systems thinking", "WCAG 2.2", "design→eng handoff"],
          highlights: [
            "/images/design-system/img-1.webp",
            "/images/design-system/img-2.webp",
            "/images/design-system/img-5.webp",
            "/images/design-system/img-6.webp",
          ],
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
            eyebrow: "IndigoEMR: Design System",
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
                  "This is how form states, input patterns, selection controls, and clinical data displays actually show up together on a patient record, in real context rather than as an abstract library.",
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
                alt: "Input component documentation showing every state (default, hover, focus, typing, loading, warning, with hint, success, disabled, filled) across input variants including icon fields, dropdowns, password, text area, and date picker",
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
    slug: "sharply-africa",
    featured: true,
    title: "Sharply Africa",
    year: "2021–2023",
    description:
      "Logistics and marketplace platform operating across African cities, built for low-connectivity devices. I designed the component library that unified the rider, partner, and customer apps into one shared system, working without a research team or a safety net to validate every call. Three products, one design language, shipped faster.",
    cta: "Read case study",
    ctaLink:
      "https://www.notion.so/layor/Sharply-Delivery-Checkout-aea889ef00dc43aeb225d819f3180a3e",
    heroMedia: { type: "image", src: "/images/sharply-hero.webp" },
    media: [
      { type: "video", src: "/videos/sharply-web-preview.mp4" },
      { type: "video", src: "/videos/sharply-rider-mobile.mp4" },
      { type: "video", src: "/videos/sharply-partner.mp4" },
    ],
    detail: {
      role: "Founder & Product Lead",
      timeline: "2021–2023",
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
      showcase: {
        eyebrow: "Sharply Africa: Founder & Product Lead",
        heroHeading: "Three apps, three audiences, one component library holding it together.",
        lede: "Sharply Africa connects businesses, riders, and third-party logistics partners in one delivery network. Each side has a completely different job to do, but they needed to feel like the same product, not three separate builds bolted together. As founder and sole designer, with no design lead above me to validate decisions before they shipped, I built the component library that made that possible.",
        stats: [
          { value: "3", label: "Distinct apps unified under one design language: business, rider, partner" },
          { value: "30%", label: "Reduction in front-end rework across the three products" },
          { value: "1", label: "Designer, with no design lead above to validate decisions before they shipped" },
        ],
        sections: [
          {
            groupHeading: {
              kicker: "App 01",
              heading: "The business dashboard: creating and tracking deliveries at scale",
              body: "This is where a business sees everything at once: live task locations on a map, delivery creation, rider and hub management, and account settings, all filtered by Intrastate, Interstate, or International scope.",
            },
            heading: "Live task tracking, with the day's numbers up front",
            tag: "Dashboard",
            bodyText: "Total, active, and completed task counts sit above a live map showing each task's route and current stage, filterable by task status and by rider without leaving the screen.",
            layout: "single",
            src: "/images/sharply-africa/img-1.webp",
            alt: "Sharply Africa dashboard showing 25 total tasks, 6 active, 19 completed today, a live map with route markers, and a Map View Settings panel filtering by task status and rider",
          },
          {
            heading: "Requesting a delivery, item by item",
            tag: "Request Delivery",
            bodyText: "Delivery area, drop-off details, and package details all live in one form. Items add to a running list with quantity, weight, and price, and the delivery fee updates as soon as enough is filled in to calculate it.",
            layout: "compare",
            columns: [
              { label: "Empty", type: "shot", src: "/images/sharply-africa/img-2.webp", alt: "Request Delivery modal in its empty state with delivery area, drop-off details, and an empty package details table" },
              { label: "Filled", type: "shot", src: "/images/sharply-africa/img-3.webp", alt: "Request Delivery modal with two items added, Glass Cups marked fragile and Ofada Rice, with quantities weights and prices calculated, and a 2500 naira delivery fee shown" },
            ],
          },
          {
            heading: "Managing riders and hubs from the same modal pattern",
            tag: "Riders & Hubs",
            bodyText: "Adding a rider means naming a vehicle type from real fleet categories (bike, van, pick-up, small truck, heavy truck) and an optional SMS fallback for task details. Adding a hub links it to a delivery area and assigns staff by role (owner, rider, dispatcher, admin) directly in the same form.",
            layout: "compare",
            columns: [
              { label: "Add Rider", type: "shot", src: "/images/sharply-africa/img-4.webp", alt: "Add Rider modal with name, number, assigned vehicle type options for bike van pick-up small truck and heavy truck, vehicle number, hubs, and an SMS notification checkbox" },
              { label: "Add Hub", type: "shot", src: "/images/sharply-africa/img-5.webp", alt: "Add Hub modal with hub name, location, an optional attach to delivery area field, and a staff list showing roles owner, rider, dispatcher, and admin" },
            ],
          },
          {
            heading: "Billing, kept out of the way until needed",
            tag: "Settings: Plan",
            bodyText: "Subscription tiers scale by monthly order volume rather than a flat rate, with invoices and payment method sitting on the same screen as the plan itself.",
            layout: "compare",
            columns: [
              { label: "Change Plan", type: "shot", src: "/images/sharply-africa/img-6.webp", alt: "Change Plan modal showing the current Free Forever plan and Starter, Growth, and MAX tiers priced by monthly order volume" },
              { label: "Subscription", type: "shot", src: "/images/sharply-africa/img-7.webp", alt: "Settings screen showing Subscription Management with current Starter plan, next payment date, and a list of paid invoices" },
            ],
          },
          {
            heading: "Branding, down to the fleet's own constraints",
            tag: "Settings: Customization",
            bodyText: "Account Customization goes further than most settings panels: primary color, distance and weight units, working hours, and vehicle size capacities down to the kilogram, since a business's own fleet constraints are part of what the platform needs to respect.",
            layout: "single",
            src: "/images/sharply-africa/img-8.webp",
            alt: "Account Customization settings showing primary color options, distance and weight units, working hours, and vehicle size capacities from bike at 0 to 25kg through flight at 0 to 50000kg",
          },
          {
            groupHeading: {
              kicker: "App 02",
              heading: "The rider app: built for one hand and a moving vehicle",
              body: "A rider isn't sitting at a desk reading a dashboard. Every action here is a swipe, not a tap-and-confirm dialog, because confirming a pickup needs to work without breaking stride.",
            },
            heading: "New, active, and done, swiped through rather than tapped",
            tag: "Rider: Task List",
            bodyText: "A new task requires a deliberate swipe to acknowledge, not an accidental tap. Once accepted, the same swipe pattern carries the task through pickup, with color coding (yellow for new, red for awaiting pickup, purple for awaiting delivery) doing the status communication a rider glances at rather than reads.",
            layout: "single",
            src: "/images/sharply-africa/img-9.webp",
            alt: "Rider app task list with All, New 2, Active 12, and Done tabs, showing a New Task Assigned card with swipe to acknowledge and an Awaiting pickup card with swipe to mark as picked up",
          },
          {
            heading: "Everything needed for one task, map included",
            tag: "Rider: Task Detail",
            bodyText: "Pickup and drop-off contacts are both one tap from a call, the delivery type is tagged plainly, and a direction shortcut sits above the same swipe-to-confirm action from the list view, so a rider never has to leave this screen to navigate.",
            layout: "single",
            maxWidth: "420px",
            center: true,
            src: "/images/sharply-africa/img-10.webp",
            alt: "Rider task detail screen with a map, an Awaiting Pick up status, a Food Delivery tag, pickup and drop off contacts each with a Call button, a Get pick up direction link, and a swipe to mark as picked up action",
          },
          {
            groupHeading: {
              kicker: "App 03",
              heading: "The partner app: logistics companies bidding for the job",
              body: "Not every delivery gets handled by Sharply's own riders. Some go out to third-party logistics companies, who see the request and compete for it directly through a link, no app install required.",
            },
            heading: "Waiting for a dispatch company, honestly",
            tag: "Partner: Waiting state",
            bodyText: "\"It may take 2 to 10 minutes before we can find a dispatch company, keep checking link\" is a real, set-expectations-plainly loading state, not a spinner with no explanation. This matters on the kind of variable mobile connections common across the markets Sharply operates in, where a partner refreshing a link needs to know whether to keep waiting or come back later.",
            layout: "compare",
            columns: [
              { label: "Waiting for a match", type: "shot", src: "/images/sharply-africa/img-11.webp", alt: "Delivery Request Details page showing a Finding dispatch company progress bar and text explaining it may take 2 to 10 minutes, with multiple customer detail sections stacked below" },
              { label: "Competing offers", type: "shot", src: "/images/sharply-africa/img-12.webp", alt: "Delivery Request Details page showing two competing offers from Danfo Logistics at 34,000 naira and NAD Logistics at 33,000 naira, each with an Accept Offer button" },
            ],
          },
          {
            groupHeading: {
              kicker: "The system underneath",
              heading: "The same visual language, doing three different jobs",
              body: "The purple accent, the same modal header pattern, the same button and card shapes: a partner logistics company bidding on a job, a rider swiping through a pickup, and a business owner filtering a live map all recognize it as the same product, even though nothing else about their screens looks alike.",
            },
            heading: "Three surfaces, one component vocabulary",
            tag: "Cross-app consistency",
            layout: "threeCol",
            columns: [
              { src: "/images/sharply-africa/img-13.webp", alt: "Business app modal with the Sharply purple primary button", label: "Business: modal + primary button" },
              { src: "/images/sharply-africa/img-14.webp", alt: "Rider app card pattern with the same purple accent and swipe action", label: "Rider: card + swipe action" },
              { src: "/images/sharply-africa/img-15.webp", alt: "Partner app offer card using the same Sharply logo and visual language", label: "Partner: offer card + branding" },
            ],
          },
        ],
        footerStats: [
          { value: "30%", label: "Reduction in front-end rework, achieved by sharing one component library across business, rider, and partner apps" },
          { value: "3 apps", label: "Business dashboard, rider app, and partner bidding portal, each shaped for a completely different context of use" },
          { value: "Built solo", label: "Every decision above shipped without a design lead to validate it first" },
        ],
      },
    },
  },
  {
    slug: "flavorqueste",
    featured: false,
    title: "FlavorQueste",
    year: "2025–Present",
    description:
      "Restaurant discovery in Lagos and Abuja is largely word of mouth. Review platforms that work in London do not map well onto how Nigerians actually choose where to eat, where trust networks, social proof, and proximity matter differently. FlavorQueste is my attempt to build something designed for that context. I led product design end to end: discovery search, curated editorial picks, table booking, and a comparison flow that helps users decide between shortlisted restaurants. The design challenge was building confidence into the decision without overwhelming the user with data. Currently live across Lagos and Abuja.",
    cta: "Visit FlavorQueste",
    ctaLink: "https://flavorqueste.com",
    previewOnly: true,
    media: [
      { type: "video", src: "/videos/fq-web-preview.mp4" },
      { type: "video", src: "/videos/fq-mobile.mp4" },
      { type: "video", src: "/videos/fq-chat.mp4" },
    ],
    detail: {
      role: "Lead Product Designer",
      timeline: "2025–Present",
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
          description: "Shipped: the discovery and search experience showing editorial curation upfront",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Shipped: the comparison flow showing shortlisted restaurants compared by vibe, proximity, and occasion",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Detail: a restaurant detail page showing the information architecture that builds confidence without overwhelming",
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
    previewOnly: true,
    media: [{ type: "image", src: "/images/kunda-kids-preview.webp" }],
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
            "Before: the original MVP that had not been designed, showing the raw unpolished interface children were using",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Shipped: the redesigned learner journey showing a lesson structured as intro, activity, and outro",
          aspect: "16/9",
          span: "full",
        },
        {
          description: "Shipped: teacher and parent reporting dashboard showing progress tracking",
          aspect: "4/3",
        },
        {
          description:
            "Detail: nudge or timer interaction pattern designed for a child who cannot yet read instructions",
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
    previewOnly: true,
    media: [{ type: "image", src: "/images/propty-preview.webp" }],
    detail: {
      role: "Product Designer, Co-founder",
      timeline: "2024–Present",
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
          heading: "Rebuilt payment communication around clarity, not automation alone",
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
            "Shipped: billing system showing multiple charge frequencies (daily, weekly, monthly, yearly, one-time)",
          aspect: "16/9",
          span: "full",
        },
        {
          description:
            "Shipped: payment status view showing what is owed, paid, and overdue at a glance for property manager and tenant",
          aspect: "16/9",
          span: "full",
        },
        {
          description: "Detail: the property manager dashboard showing unit overview and communication status",
          aspect: "4/3",
        },
      ],
    },
  },
];
