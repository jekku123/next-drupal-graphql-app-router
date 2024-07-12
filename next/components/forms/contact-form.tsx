import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { AuthGate } from "@/components/auth-gate";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";
import { Textarea } from "@/ui/textarea";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(`/api/contact`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        subject: data.subject,
      }),
      // This will record the submission with the right language:
      headers: {
        "accept-language": router.locale,
      },
    });

    if (!response.ok) {
      alert("Error!");
    }
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

          <Button type="submit">{t("form-submit")}</Button>
        </>
      </AuthGate>
    </form>
  );
}
