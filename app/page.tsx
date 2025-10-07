"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Page = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-primary flex flex-col items-center justify-center text-center text-white px-6 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="z-10 max-w-3xl"
      >
        {/* Logo and Title */}
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          FlowStack
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Collaborate, organize, and manage your projects with ease. Build
          tasks, invite teammates, and keep your workflow in sync — all in one
          dark, modern space.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            <Link
              prefetch
              href="/dashboard"
              className="px-8 py-3 rounded-2xl text-lg font-semibold border border-tertiary hover:opacity-90 transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                prefetch
                href="/auth/signup"
                className="px-8 py-3 rounded-2xl text-lg font-semibold border border-tertiary hover:opacity-90 transition"
              >
                Get Started
              </Link>
              <Link
                prefetch
                href="/auth/login"
                className="px-8 py-3 rounded-2xl text-lg font-semibold border order border-tertiary text-gray-300 hover:bg-gray-800 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Subtle footer */}
      <footer className="absolute bottom-6 text-sm text-gray-500">
        © {new Date().getFullYear()} FlowStack — built for teams who build.
      </footer>
    </main>
  );
};

export default Page;
