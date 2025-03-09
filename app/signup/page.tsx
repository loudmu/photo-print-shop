"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignInWithGitHub } from "@/auth/oauth/SignInWithGitHub";
import { LoginForm } from "@/components/login-form";

export default function SignUp() {
  const { signIn } = useAuthActions();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const flow = formData.get("flow") as "signIn" | "signUp";
    
    try {
        if (flow === "signIn") {
          await signIn("password", { email, password });
        } else {
          // Change this line - use signIn instead of signUp
          await signIn("password", { email, password });
        }
        router.push("/dashboard");
      } catch (error) {
        setError((error as Error).message);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {error && (
          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2 mb-4">
            <p className="text-foreground font-mono text-xs">
              Error: {error}
            </p>
          </div>
        )}
        
        <LoginForm 
          className="w-full" 
          onSubmit={handleSubmit}
          defaultFlow="signUp"
        />
        
        <div className="mt-4 flex justify-center">
          <SignInWithGitHub />
        </div>
      </div>
    </div>
  );
}