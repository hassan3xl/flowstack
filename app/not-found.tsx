// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background px-4">
      {/* Icon with a subtle background circle */}
      <div className="mb-6 rounded-full bg-muted p-4">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Modern Typography */}
      <h1 className="mb-2 text-3xl font-bold tracking-tight lg:text-5xl">
        404
      </h1>
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-[500px] text-center text-muted-foreground">
        The page you are looking for doesn&apos;t exist or has been moved.
        Please check the URL or head back.
      </p>

      {/* Back Button Logic */}
      <Button
        onClick={() => router.back()}
        variant="default"
        size="lg"
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
}
