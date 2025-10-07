"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useEffect } from "react";

interface PasswordUpdateSuccessModalProps {
  timer: number;
  onContinue: () => void;
}
// Password Success Page
const PasswordUpdateSuccessModal: React.FC<
  PasswordUpdateSuccessModalProps
> = () => {
  useEffect(() => {
    const timer = setTimeout(() => {}, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Password Updated!
          </h1>
          <p className="text-gray-600 mb-8">
            Your password has been successfully updated. You can now sign in
            with your new password.
          </p>

          <Button icon={<ArrowRight />} className="w-full">
            Continue to Sign In
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            Redirecting automatically in 3 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdateSuccessModal;
