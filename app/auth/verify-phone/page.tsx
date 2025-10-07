"use client";

import HeroSection from "@/components/auth/HeroSection";
import { InputField } from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PhoneVerificationPageProps {}

const PhoneVerificationPage: React.FC<PhoneVerificationPageProps> = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: any) => {
    // e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  const handleVerifyCode = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {step === 1 ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Verify Phone Number
                </h1>
                <p className="text-gray-600">
                  We'll send you a verification code via SMS
                </p>
              </div>

              <form onSubmit={handleSendCode} className="space-y-6">
                <InputField
                  icon={Phone}
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  loading={loading}
                  icon={<ArrowRight />}
                  className="w-full"
                >
                  Send Verification Code
                </Button>
              </form>

              <div className="mt-8 text-center">
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  <button>Skip for now</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Enter Verification Code
                </h1>
                <p className="text-gray-600">We sent a code to {phoneNumber}</p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-6">
                <InputField
                  icon={Shield}
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength="6"
                  required
                />

                <Button
                  type="submit"
                  loading={loading}
                  //   icon={CheckCircle}
                  className="w-full"
                  disabled={verificationCode.length !== 6}
                >
                  Verify Phone Number
                </Button>
              </form>

              <div className="mt-8 text-center space-y-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                >
                  Change phone number
                </button>
                <br />
                <button
                  onClick={() => {
                    /* Resend code logic */
                  }}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <HeroSection
        title="Verify Your Identity"
        subtitle="Phone verification helps us ensure the security of your account and enable important features"
        image={<Phone size={80} className="text-white/80" />}
      />
    </div>
  );
};

export default PhoneVerificationPage;
