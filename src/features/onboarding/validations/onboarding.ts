import { z } from "zod";

export const usernameSchema = z.object({
    username: z.string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
      // .refine(
      //   async (username) => {
      //     const isTaken = await checkUsernameExists(username);
      //     return !isTaken;
      //   },
      //   "This username is already taken"
      // )
});

export const userTypeSchema = z.object({
  user_type: z.enum(['Creator/Collaborator', 'Mentor', 'Investor'])
});

export const workTypeSchema = z.object({
  work_type: z.enum(['Full-Time', 'Part-Time', 'Contract'])
});

export const locationSchema = z.object({
  location: z.string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
});

export const skillsSchema = z.object({
  skills: z.array(z.string())
    .min(1, "At least one skill is required")
    .max(10, "Maximum 10 skills allowed")
});

export const interestsSchema = z.object({
  interests: z.array(z.string())
    .max(10, "Maximum 10 interests allowed")
});

export const contactSchema = z.object({
  github_url: z.string().url("Please enter a valid GitHub URL.").optional().or(z.literal('')),
  linkedin_url: z.string().url("Please enter a valid LinkedIn URL.").optional().or(z.literal(''))
});



