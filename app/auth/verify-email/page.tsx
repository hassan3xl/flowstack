// "use client";

import React from "react";

const VerifyEmailPage = () => {
  return <div>VerifyEmailPage</div>;
};

export default VerifyEmailPage;

// import HeroSection from "@/components/auth/HeroSection";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, Shield } from "lucide-react";
// import { useEffect, useState, ChangeEvent, FormEvent } from "react";

// // Interface for the component props (if any)
// interface VerifyEmailPageProps {
//   // Add any props here if needed in the future
// }

// // Interface for the verification code input
// interface VerificationCode {
//   [index: number]: string;
// }

// // Interface for the form event
// interface VerificationFormEvent extends FormEvent<HTMLFormElement> {
//   // You can extend this if needed
// }

// const VerifyEmailPage: React.FC<VerifyEmailPageProps> = () => {
//   const [code, setCode] = useState<VerificationCode>(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [timeLeft, setTimeLeft] = useState<number>(60);

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [timeLeft]);

//   const handleCodeChange = (index: number, value: string): void => {
//     if (value.length <= 1) {
//       const newCode = [...code];
//       newCode[index] = value;
//       setCode(newCode);

//       // Auto-focus next input
//       if (value && index < 5) {
//         const nextInput = document.getElementById(`code-${index + 1}`);
//         nextInput?.focus();
//       }
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen flex">
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <div className="mb-8 text-center">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Shield size={32} className="text-slate-600" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Verify Your Email
//             </h1>
//             <p className="text-gray-600">
//               Enter the 6-digit code sent to your email address
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex space-x-3 justify-center">
//               {code.map((digit: string, index: number) => (
//                 <input
//                   key={index}
//                   id={`code-${index}`}
//                   type="text"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                     handleCodeChange(index, e.target.value)
//                   }
//                   className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
//                 />
//               ))}
//             </div>

//             <Button
//               type="submit"
//               loading={loading}
//               className="w-full"
//               disabled={code.some((digit: string) => !digit)}
//             >
//               Verify Email
//             </Button>
//           </form>

//           <div className="mt-8 text-center">
//             <p className="text-gray-600 mb-4">Didn't receive the code?</p>

//             {timeLeft > 0 ? (
//               <p className="text-sm text-gray-500">
//                 Resend in {timeLeft} seconds
//               </p>
//             ) : (
//               <button
//                 onClick={() => setTimeLeft(60)}
//                 className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
//               >
//                 Resend Code
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <HeroSection
//         title="Almost There!"
//         subtitle="Just one more step to verify your email and complete your account setup"
//         image={<CheckCircle size={80} className="text-white/80" />}
//       />
//     </div>
//   );
// };

// export default VerifyEmailPage;
