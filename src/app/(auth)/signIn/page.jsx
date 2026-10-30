
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

export default function SignInForm({ className }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Email Login
  const handleEmailSignin = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (error) {
        setError(
          error.message || "Invalid email or password. Please try again."
        );
        return;
      }

      if (data) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleSignin = async () => {
    try {
      setGoogleLoading(true);
      setError("");

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });

      if (error) {
        setError(error.message || "Google login failed. Please try again.");
        setGoogleLoading(false);
      }
    } catch (err) {
      setError(err.message || "Google login failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 max-w-md mx-auto my-10 px-4",
        className
      )}
    >
      <Card className="border-[#E8E1D2] shadow-lg">

        {/* Header */}
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">📚</div>

          <CardTitle className="text-2xl font-bold text-[#285943]">
            Welcome Back!
          </CardTitle>

          <CardDescription>
            Login to your Paper Haven account and continue reading.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleEmailSignin}>
            <FieldGroup>

              {/* Google Login */}
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleSignin}
                  disabled={googleLoading || loading}
                  className="w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-5"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>

                  {googleLoading ? "Connecting..." : "Continue with Google"}
                </Button>
              </Field>

              <FieldSeparator>
                Or continue with email
              </FieldSeparator>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">
                  Email Address
                </FieldLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <span className="text-xs text-gray-400">
                    Enter your account password
                  </span>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </Field>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm"
                >
                  {error}
                </div>
              )}

              {/* Login Button */}
              <Field>
                <Button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="w-full bg-[#285943] hover:bg-[#1F4533] text-white"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signUp"
                    className="text-[#285943] font-semibold hover:underline"
                  >
                    SignUp
                  </Link>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <p className="text-xs text-center text-gray-500 px-4">
        Welcome to Paper Haven — your little corner of books and stories.
      </p>
    </div>
  );
}
