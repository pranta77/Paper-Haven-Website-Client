
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function SignUpForm({ className }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Email Registration
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("image");
    const password = formData.get("password");

    // Password Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Registration failed. Please try again.");
        return;
      }

      if (data) {
        router.push("/signIn");
        router.refresh();
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Registration / Login
  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      setError("");

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Google authentication failed.");
        setGoogleLoading(false);
      }
    } catch (err) {
      setError(err.message || "Google authentication failed.");
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

        <CardHeader className="text-center">
          <div className="text-4xl mb-2">📚</div>

          <CardTitle className="text-2xl font-bold text-[#285943]">
            Join Paper Haven
          </CardTitle>

          <CardDescription>
            Create your account and start your reading journey.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>

              {/* Google Button */}
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleSignUp}
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
                Or register with email
              </FieldSeparator>

              {/* Name */}
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </Field>

              {/* Photo URL */}
              <Field>
                <FieldLabel htmlFor="image">Photo URL</FieldLabel>

                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="Enter your photo URL"
                  required
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  minLength={6}
                  required
                />

                <FieldDescription>
                  Password must contain:
                  <br />
                  • At least 6 characters
                  <br />
                  • One uppercase letter (A-Z)
                  <br />
                  • One lowercase letter (a-z)
                </FieldDescription>
              </Field>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              {/* Register Button */}
              <Field>
                <Button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="w-full bg-[#285943] hover:bg-[#1F4533] text-white"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    href="/signIn"
                    className="text-[#285943] font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <p className="text-xs text-center text-gray-500 px-4">
        By creating an account, you agree to use Paper Haven
        responsibly and respect our library community.
      </p>
    </div>
  );
}
