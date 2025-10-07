import { useAuth } from "@/contexts/AuthContext";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Loader from "../Loader";
import { resetAuthCookies } from "@/lib/actions";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserNav: React.FC = () => {
  const { user, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2">
        <Loader variant="ring" color="white" size={16} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/auth/login"
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-accent-hover transition-colors duration-200 hover:bg-gray-700 rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    await resetAuthCookies();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary transition-colors duration-200 focus:outline-none"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-500">
          <Image
            src={user.profile.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>

        {/* Name/Email */}
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium text-gray-200 truncate max-w-32">
            {user.fullname || user.email}
          </p>
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-secondary border border-tertiary rounded-lg shadow-lg z-50 py-1">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="text-sm font-medium text-gray-200 truncate">
              {user.email}
            </p>
          </div>

          <div className="py-1">
            {[
              ["dashboard", "/dashboard"],
              ["profile", "/profile"],
              ["archives", "/archives"],
              ["settings", "/settings"],
            ].map(([label, link]) => (
              <Link
                key={link}
                href={link}
                className="block px-4 py-2 text-sm hover:bg-accent-hover capitalize"
              >
                {label}
              </Link>
            ))}
            <Button
              onClick={handleLogout}
              className="w-full border bg-red-800 hover:bg-red-700 mt-2"
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNav;
