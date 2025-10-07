"use client";

import HeroSection from "@/components/auth/HeroSection";
import { InputField } from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Fingerprint,
  Shield,
} from "lucide-react";
import React, { useState } from "react";

interface TwoFactorSetupPageProps {}
const TwoFactorSetupPage: React.FC<TwoFactorSetupPageProps> = () => {
  const [step, setStep] = useState(1);
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes] = useState([
    "A1B2-C3D4-E5F6",
    "G7H8-I9J0-K1L2",
    "M3N4-O5P6-Q7R8",
    "S9T0-U1V2-W3X4",
    "Y5Z6-A7B8-C9D0",
  ]);

  const handleSetupComplete = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {step === 1 && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Enable 2FA
                </h1>
                <p className="text-gray-600">
                  Add an extra layer of security to your account
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <Shield size={24} className="text-blue-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Why enable 2FA?
                      </h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Protects against password theft</li>
                        <li>• Prevents unauthorized access</li>
                        <li>• Industry standard security</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Choose your authenticator app:
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="border border-gray-300 rounded-xl p-4 hover:border-blue-500 cursor-pointer transition-colors">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded mr-3"></div>
                        <div>
                          <p className="font-medium">Google Authenticator</p>
                          <p className="text-sm text-gray-600">
                            Most popular choice
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-300 rounded-xl p-4 hover:border-blue-500 cursor-pointer transition-colors">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded mr-3"></div>
                        <div>
                          <p className="font-medium">Microsoft Authenticator</p>
                          <p className="text-sm text-gray-600">
                            Microsoft's solution
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  icon={<ArrowRight />}
                  className="w-full"
                >
                  Continue Setup
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Scan QR Code
                </h1>
                <p className="text-gray-600">
                  Use your authenticator app to scan this QR code
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white border-2 border-gray-300 rounded-xl p-8 text-center">
                  <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-6xl">📱</div>
                  </div>
                  <p className="text-sm text-gray-600">QR Code for 2FA Setup</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    Can't scan? Enter this code manually:
                  </p>
                  <code className="text-sm font-mono bg-white px-3 py-2 rounded border">
                    JBSWY3DPEHPK3PXP
                  </code>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter verification code from your app:
                  </label>
                  <InputField
                    icon={Fingerprint}
                    placeholder="6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength="6"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => setStep(1)}
                    variant="secondary"
                    // icon={ArrowLeft}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    // onClick={handleSetupComplete}
                    onClick={() => setStep(3)}
                    // icon={CheckCircle}
                    className="flex-1"
                    disabled={verificationCode.length !== 6}
                  >
                    Verify & Enable
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  2FA Enabled!
                </h1>
                <p className="text-gray-600">
                  Save these backup codes in a secure location
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <AlertCircle
                      size={24}
                      className="text-yellow-600 mr-3 mt-1"
                    />
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-2">
                        Important!
                      </h3>
                      <p className="text-sm text-yellow-800">
                        Store these backup codes safely. You can use them to
                        access your account if you lose your authenticator
                        device.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Backup Codes
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {backupCodes.map((code, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg border font-mono text-center"
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => {
                      /* Download codes */
                    }}
                    variant="secondary"
                    // icon={Upload}
                    className="flex-1"
                  >
                    Download
                  </Button>
                  <Button icon={<ArrowRight />} className="flex-1">
                    Continue
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <HeroSection
        title="Secure Your Account"
        subtitle="Two-factor authentication adds an extra layer of protection to keep your data safe"
        image={<Shield size={80} className="text-white/80" />}
      />
    </div>
  );
};

export default TwoFactorSetupPage;
