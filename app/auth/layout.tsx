// app/auth/layout.tsx
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="">{children} </div>
    </div>
  );
}
