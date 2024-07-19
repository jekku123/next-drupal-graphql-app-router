import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters long",
  }),
  message: z.string().min(8, {
    message: "Message must be at least 8 characters long",
  }),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;
