"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a standard cn utility

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string; // Added description for better UX
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
}) => {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!mounted) return null;

  // We keep the portal rendered but hide via CSS/State for exit animations if using a library like Framer Motion.
  // For pure React/Tailwind, conditional rendering is fine.
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* 1. Backdrop with blur */}
      <div
        ref={overlayRef}
        onMouseDown={handleOverlayClick}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* 2. The Modal Content */}
      <div
        className={cn(
          `relative w-full ${sizeClasses[size]} 
           bg-card text-card-foreground 
           border border-border/50 
           rounded-xl shadow-2xl 
           transform transition-all 
           animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200
           overflow-hidden flex flex-col max-h-[90vh]`
        )}
      >
        {/* Glow Effect Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

        {/* Header */}
        {(title || description) && (
          <div className="flex flex-col space-y-1.5 p-6 pb-4 border-b border-border/40">
            <div className="flex justify-between items-start">
              {title && (
                <h2 className="font-semibold text-xl tracking-tight leading-none">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BaseModal;
