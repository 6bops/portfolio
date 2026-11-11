export const CONTACT_EMAIL = "salamilayor@gmail.com";

/** Mail link for asking about a case study; the subject carries the project title. */
export const caseStudyMailto = (title: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${title} case study`)}`;
