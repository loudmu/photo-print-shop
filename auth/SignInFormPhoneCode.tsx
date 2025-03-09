import { CodeInput } from "@/auth/CodeInput";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useState } from "react";

export function SignInFormPhoneCode() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { phone: string }>("signIn");


  return (
    <div className="max-w-[384px] mx-auto flex flex-col gap-4">
      {step === "signIn" ? (
        <>
          <h2 className="font-semibold text-2xl tracking-tight">
            Sign in or create an account
          </h2>
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              signIn("twilio", formData)
                .then(() => setStep({ phone: formData.get("phone") as string }))
                .catch((error) => {
                  console.error(error);
                  toast.error("Could not send code")
                });
            }}
          >
            <label htmlFor="phone">Phone</label>
            <Input
              name="phone"
              id="phone"
              className="mb-4"
              autoComplete="tel"
            />
            <Button type="submit">Send code</Button>
          </form>
        </>
      ) : (
        <>
          <h2 className="font-semibold text-2xl tracking-tight">
            Check your phone
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter the 6-digit code we sent to your phone number.
          </p>
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              signIn("twilio", formData).catch(() => {
                toast.error("Code could not be verified, try again");
              });
            }}
          >
            <label htmlFor="code">Code</label>
            <CodeInput length={6} />
            <input name="phone" value={step.phone} type="hidden" />
            <Button type="submit">Continue</Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </form>
        </>
      )}
      <Toaster />
    </div>
  );
}
