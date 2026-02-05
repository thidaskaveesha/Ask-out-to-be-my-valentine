export const CATEGORIES = {
  doctor: {
    label: "Doctor",
    slug: "doctor",
  },
  "electronic-engineer": {
    label: "Electronic Engineer",
    slug: "electronic-engineer",
  },
} as const;

export const GENDERS = {
  boy: { label: "Boy", slug: "boy" },
  girl: { label: "Girl", slug: "girl" },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
export type GenderSlug = keyof typeof GENDERS;

// Map to available images per category/gender
export const IMAGE_MAP: Record<CategorySlug, Record<GenderSlug, string[]>> = {
  doctor: {
    boy: ["/sources/doctor/boy/boy-doc.png", "/sources/doctor/boy/boy-doc1.png"],
    girl: ["/sources/doctor/girl/girl-doc.png"],
  },
  "electronic-engineer": {
    boy: ["/sources/electronic-engineer/boy/boy-ee.png", "/sources/electronic-engineer/boy/boy-ee1.png"],
    girl: ["/sources/electronic-engineer/girl/girl-ee.png"],
  },
};
