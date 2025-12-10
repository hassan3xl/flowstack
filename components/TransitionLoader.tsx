"use client";
import {
  Server,
  Database,
  Activity,
  Settings,
  Home,
  Menu,
  Bell,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface TransitionLoaderProps {
  isActive: boolean;
  onComplete: () => void;
}

export const TransitionLoader = ({
  isActive,
  onComplete,
}: TransitionLoaderProps) => {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(onComplete, 5000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div
            className="absolute inset-0 border-4 border-white/30 rounded-full animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>
          <div className="absolute inset-2 border-4 border-white/50 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Server className="w-12 h-12 text-white animate-bounce" />
              <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Switching to Server
        </h2>
        <p className="text-white/80 text-lg">Preparing your workspace...</p>
        <div className="w-64 h-2 bg-white/20 rounded-full mx-auto mt-6 overflow-hidden">
          <div className="h-full bg-white rounded-full animate-[loading_2s_ease-in-out]"></div>
        </div>
      </div>
      <style>{`@keyframes loading { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );
};
