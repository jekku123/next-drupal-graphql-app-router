"use client";

import { useForm } from "react-hook-form";

import { contactAction } from "@/lib/drupal/actions/contact";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";
import { Textarea } from "@/ui/textarea";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { AuthGate } from "../auth-gate";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const [isSubmitting, startTransition] = useTransition();

  const onSubmit = async (data: Inputs) => {
    startTransition(async () => {
      const response = await contactAction(data);
      if (response.error) {
        alert("Error!");
      }
    });
  };

  const onErrors = (errors) => console.error(errors);

  if (isSubmitSuccessful) {
    return (
      <StatusMessage level="success" className="w-full max-w-3xl mx-auto">
        <p className="mb-4">{t("form-thank-you-message")}</p>
        <Button type="button" onClick={() => reset()}>
          {t("form-send-another-message")}
        </Button>
      </StatusMessage>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="flex flex-col max-w-3xl gap-5 p-4 mx-auto mb-4 transition-all bg-white border rounded shadow-md border-finnishwinter hover:shadow-md"
    >
      <h2 className="font-bold text-heading-sm md:text-heading-md">
        {t("form-title")}
      </h2>
      <AuthGate text={t("login-to-fill-form")}>
        <>
          <p>{t("form-description")}</p>
          <div>
            <Label htmlFor="name">{t("form-label-name")}</Label>
            <Input
              type="text"
              id="name"
              {...register("name", {
                required: true,
              })}
            />
          </div>
          <div>
            <Label htmlFor="email">{t("form-label-email")}</Label>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <div>
            <Label htmlFor="subject">{t("form-label-subject")}</Label>
            <Input
              type="text"
              id="subject"
              {...register("subject", {
                required: true,
              })}
            />
          </div>
          <div>
            <Label htmlFor="message">{t("form-label-message")}</Label>
            <Textarea
              id="message"
              {...register("message", {
                required: true,
              })}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {t("form-submit")}
          </Button>
        </>
      </AuthGate>
    </form>
  );
}
