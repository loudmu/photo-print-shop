"use client";


import { SignInWithGitHub } from "@/auth/oauth/SignInWithGitHub";
import { LoginForm } from "@/components/login-form";

export default function SignIn() {
  return (
    <div className="flex flex-col gap-8 w-96 mx-auto h-screen justify-center items-center">
      <p>Log in to see the numbers</p>
      <LoginForm />
      <SignInWithGitHub />
    </div>
  );
}
