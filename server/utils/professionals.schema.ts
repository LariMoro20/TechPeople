import { z } from "zod";

export const professionalSchema = z.object({
  id: z.string(),
  name: z.string(),
  profession: z.string(),
  avatar: z.string().url(),
  servicePrice: z.number().nonnegative(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
  city: z.string(),
  distance: z.number().nonnegative().optional(),
  bio: z.string(),
  tags: z.array(z.string()),
  available: z.boolean(),
});

const emptyToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

const optionalNumber = z
  .preprocess(emptyToUndefined, z.coerce.number().finite().optional())
  .catch(undefined);

const optionalBoolean = z.preprocess((value) => {
  if (value === "true" || value === true) return true;
  if (value === "false" || value === false) return false;
  return undefined;
}, z.boolean().optional());

const professionsList = z
  .preprocess((value) => {
    if (Array.isArray(value)) return value.map(String);
    if (typeof value === "string") return value.split(",");
    return [];
  }, z.array(z.string()))
  .transform((items) => items.map((item) => item.trim()).filter(Boolean))
  .catch([]);

export const professionalsQuerySchema = z.object({
  search: z
    .preprocess((v) => (typeof v === "string" ? v.trim() : ""), z.string())
    .catch(""),
  professions: professionsList,
  minPrice: optionalNumber,
  maxPrice: optionalNumber,
  minRating: optionalNumber,
  city: z
    .preprocess(
      (v) => (typeof v === "string" && v.trim() ? v.trim() : undefined),
      z.string().optional(),
    )
    .catch(undefined),
  available: optionalBoolean,
  sortField: z
    .enum(["name", "servicePrice", "rating", "distance"])
    .catch("name"),
  sortDirection: z.enum(["asc", "desc"]).catch("asc"),
  page: z.coerce.number().int().min(1).catch(1),
  perPage: z.coerce.number().int().min(1).max(60).catch(12),
});
