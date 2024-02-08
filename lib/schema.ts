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
    .max(5),
});
