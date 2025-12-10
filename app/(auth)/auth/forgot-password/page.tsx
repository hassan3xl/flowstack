"use client";

import HeroSection from "@/components/auth/HeroSection";
import { InputField } from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

// Forgot Password Page
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const router = useRouter();

  const backToLogin = () => {
    router.push("/auth/login");
  };

  const handleSubmit = () => {
    // e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 2000);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-blue-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Check Your Email
            </h1>
            <p className="text-gray-600 mb-8">
              We've sent password reset instructions to{" "}
              <span className="font-semibold text-gray-900">{email}</span>
            </p>

            <div className="space-y-4">
              <Button
                // onClick=""
                // icon={ArrowLeft}
                className="w-full"
              >
                Back to Sign In
              </Button>

              <button
                onClick={() => setSent(false)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <HeroSection
        title="Forgot Password?"
        subtitle="No worries! We'll help you reset your password and get back into your account"
        image={<Lock size={80} className="text-white/80" />}
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600">
              Enter your email and we'll send you reset instructions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" className="w-full">
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={backToLogin}
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline flex items-center justify-center"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
