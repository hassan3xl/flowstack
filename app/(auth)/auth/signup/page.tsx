"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail, User, Shield } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import HeroSection from "@/components/auth/HeroSection";
import { apiService } from "@/lib/services/apiService";
import { useToast } from "@/providers/ToastProvider";
import { handleLogin } from "@/lib/actions/auth.actions";
import { FormInput } from "@/components/input/formInput";
import { useState } from "react";

type SignupForm = {
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;
  agreeToTerms: boolean;
};

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupForm>();

  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const password1 = watch("password1");

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);

    if (!data.agreeToTerms) {
      toast.error("You must agree to the terms to continue.");
      setLoading(false);
      return;
    }

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password1: data.password1,
      password2: data.password2,
    };

    try {
      const response = await apiService.postWithoutToken(
        "/auth/signup/",
        payload
      );

      if (response.access) {
        handleLogin(response.user.id, response.access);
        toast.success("User profile created successfully");
        router.push("/home");
      } else {
        toast.error("Registration failed");
      }
    } catch (err: any) {
      toast.error(err?.email || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left side form */}
      <div className="w-auto mx-auto lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-200">
              Join us today and start your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First & last name */}
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                icon={User}
                name="first_name"
                placeholder="First name"
                register={register}
                rules={{ required: "First name is required" }}
                error={errors.first_name?.message}
              />

              <FormInput
                icon={User}
                name="last_name"
                placeholder="Last name"
                register={register}
                rules={{ required: "Last name is required" }}
                error={errors.last_name?.message}
              />
            </div>

            {/* Email */}
            <FormInput
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email address"
              register={register}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              }}
              error={errors.email?.message}
            />

            {/* Password */}
            <FormInput
              icon={Lock}
              type="password"
              name="password1"
              placeholder="Password"
              register={register}
              rules={{ required: "Password is required" }}
              error={errors.password1?.message}
            />

            {/* Confirm Password */}
            <FormInput
              icon={Lock}
              type="password"
              name="password2"
              placeholder="Confirm password"
              register={register}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password1 || "Passwords do not match",
              }}
              error={errors.password2?.message}
            />

            {/* Agree to terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                {...register("agreeToTerms")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  Privacy Policy
                </button>
              </span>
            </div>

            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">
                {errors.agreeToTerms.message as string}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              loading={loading}
              icon={<ArrowRight />}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Switch to login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side hero */}
      <HeroSection
        title="Join Our Community"
        subtitle="Create your account and unlock amazing features tailored just for you"
        image={<Shield size={80} className="text-white/80" />}
      />
    </div>
  );
};

export default SignupPage;
