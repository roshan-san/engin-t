import { z } from "zod";

export const OnboardingDataSchema = z.object({
  username: z.string().optional(),
  location: z.string().optional(),
  github_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  user_type: z.string().optional(),
  work_type: z.string().optional(),
});

export type OnboardingDataType = z.infer<typeof OnboardingDataSchema>;