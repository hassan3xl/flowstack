"use client";

import { useState } from "react";
import { InputField } from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import HeroSection from "@/components/auth/HeroSection";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiService } from "@/services/apiService";
import { handleLogin } from "@/lib/actions";
import {
  useToast,
  handleBackendError,
} from "@/components/providers/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";

type LoginFormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(""); // 👈 added state
  const [password, setPassword] = useState(""); // 👈 added state
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { refreshUser } = useAuth();

  const resetPassword = () => {
    router.push("/auth/forgot-password");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const payload = {
      email,
      password,
      rememberMe: (e.currentTarget.rememberMe as HTMLInputElement).checked,
    };

    try {
      const response = await apiService.postWithoutToken(
        "api/auth/login/",
        payload
      );

      if (response.access) {
        await handleLogin(response.user.id, response.access, response.refresh);
        toast.success("Logged in successfully!");
        await refreshUser();
        router.push("/dashboard");
      } else {
        // backend responded without access (validation errors etc.)
        handleBackendError(response, toast);
        setErrors(response);
      }
    } catch (error: any) {
      handleBackendError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <HeroSection
        title="Welcome Back!"
        subtitle="Sign in to access your account and continue your journey with us"
        image={<User size={80} className="text-white/80" />}
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              field="input"
              icon={Mail}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              error={errors.email}
              required
            />

            <InputField
              field="input"
              icon={Lock}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>

              <button
                type="button"
                onClick={resetPassword}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}

            <Button
              type="submit"
              loading={loading}
              icon={<ArrowRight />}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don’t have an account yet?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
