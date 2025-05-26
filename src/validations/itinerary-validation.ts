import { z, ZodType } from "zod";

export class ItineraryValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    start_date: z.string().min(1),       
    end_date: z.string().min(1),
    estimate_start: z.string().min(1),
    estimate_end: z.string().min(1),
    total_person: z.number().int().positive(),
    country: z.string().min(1).max(100),
    location: z.string().min(1),
    userId: z.number().int().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1).max(100).optional(),
    start_date: z.string().min(1).optional(),
    end_date: z.string().min(1).optional(),
    estimate_start: z.string().min(1).optional(),
    estimate_end: z.string().min(1).optional(),
    total_person: z.number().int().positive().optional(),
    country: z.string().min(1).max(100).optional(),
    location: z.string().min(1).optional(),
    userId: z.number().int().positive().optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().int().positive(),
  });
}
