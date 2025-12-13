"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { User, LogOut, ShoppingBag, User2, Settings2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function AccountDropdown() {
  const { user, loading } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/logout", { method: "POST" });
    toast.success("You have been logged out.");
    window.location.href = "/";
  };

  return (
    <div>
      {!loading && (
        <>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.username || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href="/account"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Account
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/account/settings"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <Settings2 className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 border border-border p-2 rounded-full"
            >
              <User2 />
            </Link>
          )}
        </>
      )}
      {loading && (
        <div className="h-10 w-24 bg-accent/50 rounded-md animate-pulse" />
      )}
    </div>
  );
}
