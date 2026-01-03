"use client";
import { useState } from "react";
import Link from "next/link";
import { Key, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleLogin } from "@/lib/actions/auth.actions";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/input/formInput";
import { useSignin } from "@/lib/hooks/auth.hook";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { mutateAsync: signin, isPending: loading } = useSignin();
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signin({
        email: data.email,
        password: data.password,
      });

      if (response.access) {
        await handleLogin(response.user, response.access, response.refresh);
        // Allow the cookie to set before redirecting
        setTimeout(() => {
          window.location.href = "/home";
        }, 500);
      }
    } finally {
      reset();
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    // Redirect to your Django Google Auth Endpoint
    // Example: window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login/`;
    console.log("Redirecting to Google...");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="w-full lg:w-[55%] flex flex-col  justify-center  sm:px-12 xl:px-24 py-12">
        <div className="max-w-[440px] w-full mx-auto border border-border p-6 rounded-md bg-card/30 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Main Card */}
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                icon={Mail}
                name="email"
                label="Email"
                register={register}
                placeholder="name@example.com"
                disabled={loading}
                className="bg-background"
              />

              <div className="space-y-1">
                <FormInput
                  icon={Key}
                  name="password"
                  register={register}
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                  disabled={loading}
                  className="bg-background"
                />
                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full font-medium"
                size="lg"
                disabled={loading || isSubmitting}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <Button
              variant="outline"
              className="w-full gap-2 h-11"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
            >
              <GoogleIcon />
              Google
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Hero/Image Section */}
      <div className="hidden lg:flex lg:w-[45%] bg-muted/20 border-l border-border relative">
        <div className="absolute inset-0 bg-zinc-900 text-white flex flex-col items-center justify-center p-12 text-center">
          <Shield size={60} className="mb-6 text-white/80" />
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-white/70 max-w-md">
            Experience a secure, collaborative workspace designed to help your
            team succeed.
          </p>
        </div>
      </div>
    </div>
  );
}

export const GoogleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path
        fill="#4285F4"
        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
      />
      <path
        fill="#34A853"
        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
      />
      <path
        fill="#FBBC05"
        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
      />
      <path
        fill="#EA4335"
        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
      />
    </g>
  </svg>
);
