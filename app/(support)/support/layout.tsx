// app/support/layout.tsx
import React from "react";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-blue-50">
      <header className="p-4 bg-blue-600 text-white">Support Center</header>
      <main className="p-6">{children}</main>
    </div>
  );
}
