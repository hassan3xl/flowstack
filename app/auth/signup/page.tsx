"use client";

import { useState } from "react";
import { User, Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/auth/HeroSection";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiService } from "@/services/apiService";
import { handleLogin } from "@/lib/actions";
import { InputField } from "@/components/input/InputField";
import { useToast } from "@/components/providers/ToastProvider";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  // handle input changes
  // handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // 1. Destructure necessary properties from the event target
    const { name, value, type, checked } = e.target as HTMLInputElement;

    // 2. Update the state based on the input's name
    setFormData((prevFormData) => ({
      ...prevFormData,
      // If the field is a checkbox, use 'checked' value; otherwise, use 'value'
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password1: formData.password1,
      password2: formData.password2,
    };

    if (formData.password1 !== formData.password2) {
      setErrors({ confirmPassword: "Passwords don't match" });
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setErrors({ general: "You must agree to the terms to continue." });
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.postWithoutToken(
        "api/auth/signup/",
        payload
      );

      if (response.access) {
        handleLogin(response.user.id, response.access, response.refresh);
        router.push("/dashboard");
      } else {
        const tmpErrors: Record<string, string> = {};
        Object.entries(response).forEach(([key, value]) => {
          tmpErrors[key] = String(value);
        });
        setErrors(tmpErrors);
      }
    } catch (err: any) {
      toast.error(err.detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-primaryy">
      {/* Left side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-200">
              Join us today and start your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First & last name */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                icon={User}
                field="input"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                icon={User}
                field="input"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <InputField
              icon={Mail}
              type="email"
              field="input"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password */}
            <InputField
              icon={Lock}
              field="input"
              type="password"
              name="password1"
              placeholder="Password"
              value={formData.password1}
              onChange={handleChange}
              required
            />

            {/* Confirm password */}
            <InputField
              field="input"
              icon={Lock}
              type="password"
              name="password2"
              placeholder="Confirm password"
              value={formData.password2}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            {/* Agree to terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
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

            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}

            {/* Submit button */}
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
