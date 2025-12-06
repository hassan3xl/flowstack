"use client";
import { useState } from "react";
import Link from "next/link";
import { Key, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleLogin } from "@/lib/actions/auth.actions";
import { apiService } from "@/lib/services/apiService";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/input/formInput";
import { useToast } from "@/providers/ToastProvider";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const response = await apiService.postWithoutToken("/auth/signin/", {
        email: data.email,
        password: data.password,
      });

      if (response.access) {
        await handleLogin(response.user, response.access);
        toast.success("Login successful!");

        // Small delay to show the toast before redirect
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error("Login failed!");
      }
    } catch (error: any) {
      console.log("Login error:", error);
      toast.success("Login error!");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-lg border border-border bg-card">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <FormInput
              icon={Mail}
              name="email"
              register={register}
              placeholder="you@example.com"
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <FormInput
              icon={Key}
              name="password"
              register={register}
              label="Password"
              placeholder="Password"
              type="password"
              disabled={isLoading}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isSubmitting}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-border" />
          <span className="px-3 text-sm text-muted-foreground">or</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
