// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-primary">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-gray-400 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link href="/" className="gap-3">
        <Button className="">Go Back Home</Button>
      </Link>
      <br />
      <p>testing custom buttons</p>
      <div className="gap-3 space-x-4 mt-4 ">
        <Button variant="default" className="">
          default
        </Button>
        <Button variant="outline" className="">
          outline
        </Button>
        <Button variant="destructive" className="">
          destructive
        </Button>
        <Button variant="secondary" className="">
          secondary
        </Button>
      </div>
    </div>
  );
}
