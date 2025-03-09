import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { SignInWithGoogle } from "@/auth/oauth/SignInWithGoogle"
import { SignInWithApple } from "@/auth/oauth/SignInWithApple"
import { SignInMethodDivider } from "@/auth/SignInMethodDivider"
import { SignInWithGitHub } from "@/auth/oauth/SignInWithGitHub"

interface LoginFormProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  defaultFlow?: "signIn" | "signUp"
}

export function LoginForm({
  className,
  onSubmit,
  defaultFlow = "signIn",
  ...props
}: LoginFormProps) {

  const [flow, setFlow] = useState<"signIn" | "signUp">(defaultFlow)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {flow === "signIn" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {flow === "signIn"
              ? "Login to access your photo printing dashboard"
              : "Sign up to start printing your photos"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <SignInWithApple />
                <SignInWithGoogle />
                <SignInWithGitHub />
              </div>

              <SignInMethodDivider />

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {flow === "signIn" && (
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    )}
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
                <input type="hidden" name="flow" value={flow} />
                <Button type="submit" className="w-full">
                  {flow === "signIn" ? "Login" : "Sign Up"}
                </Button>
              </div>
              <div className="text-center text-sm">
                {flow === "signIn" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setFlow("signUp")}
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setFlow("signIn")}
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>


      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}