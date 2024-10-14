import { z } from "zod";

export const questionSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Ready to traverse? Specify a title with more than 5 characters",
    })
    .max(120),

  questionBody: z.string().min(50, {
    message:
      "Explain your issue properly, be a bit more descriptive. Minimum 50 characters before you get the pass to traverse the DevsDungeon.",
  }),

  tags: z
    .array(z.string().min(1).max(15))
    .min(1, {
      message:
        "You need to specify at least one tag to traverse the DevsDungeon.",
    })
    .max(5, {
      message: "Oh, hold up, you can only specify up to 5 tags."
    })
});

export const AnswerSchema = z.object({
  answer: z.string().min(100, {
    message: "Your answer should be at least 100 characters long.",
  }),
});

export const profileSchema = z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(4).max(20),
  portfolio: z.string().url(),
  location: z.string().max(100),
  bio: z.string().max(1000, {
    message: "Bio should be less than 1000 characters"
  })
})