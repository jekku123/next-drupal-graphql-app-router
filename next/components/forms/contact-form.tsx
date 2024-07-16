"use client";

import { useForm } from "react-hook-form";

import { contactAction } from "@/app/_actions/contact";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";
import { Textarea } from "@/ui/textarea";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
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
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Inputs>();

  const [isSubmitting, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: Inputs) => {
    startTransition(async () => {
      const response = await contactAction(data);
      if (!response.success) {
        if (response.error.type === "ValidationError") {
          setError("name", {
            message: response.formErrors.name,
            type: "server",
          });
          setError("email", {
            message: response.formErrors.email,
            type: "server",
          });
          setError("subject", {
            message: response.formErrors.subject,
            type: "server",
          });
          setError("message", {
            message: response.formErrors.message,
            type: "server",
          });
        }

        if (response.error.type === "AuthorizationError") {
          alert("You are not authorized to submit this form.");
        }

        setIsSuccess(false);
      }

      if (response.success) {
        setIsSuccess(true);
      }
    });
  };

  const onErrors = (errors) => console.error(errors);

  if (isSuccess) {
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
                // required: true,
              })}
            />
            {errors.name && (
              <span className="text-sm text-error">{errors.name.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="email">{t("form-label-email")}</Label>
            <Input
              type="email"
              id="email"
              {...register("email", {
                // required: true,
              })}
            />
            {errors.email && (
              <span className="text-sm text-error">{errors.email.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="subject">{t("form-label-subject")}</Label>
            <Input
              type="text"
              id="subject"
              {...register("subject", {
                // required: true,
              })}
            />
            {errors.subject && (
              <span className="text-sm text-error">
                {errors.subject.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="message">{t("form-label-message")}</Label>
            <Textarea
              id="message"
              {...register("message", {
                // required: true,
              })}
            />
            {errors.message && (
              <span className="text-sm text-error">
                {errors.message.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {t("form-submit")}
          </Button>
        </>
      </AuthGate>
    </form>
  );
}
