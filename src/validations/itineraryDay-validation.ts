import { z, ZodType } from "zod";

export class ItineraryDayValidation {
  static readonly CREATE: ZodType = z.object({
    day: z.string().min(1), // ISO date string
    start_time: z.string().min(1), // ISO datetime string
    end_time: z.string().min(1),   // ISO datetime string
    activity_description: z.string().min(1).max(200),
    meeting_time: z.string().min(1), // Time string like "08:00:00"
    itineraryId: z.number().int().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().int().positive(),
    day: z.string().min(1).optional(),
    start_time: z.string().min(1).optional(),
    end_time: z.string().min(1).optional(),
    activity_description: z.string().min(1).max(200).optional(),
    meeting_time: z.string().min(1).optional(),
    itineraryId: z.number().int().positive().optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().int().positive(),
  });
}