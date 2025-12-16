import {
  Search,
  Compass,
  Music,
  Gamepad2,
  Code,
  Shield,
  Users,
  Globe,
} from "lucide-react";

// 1. Mock Data
export const CATEGORIES = [
  { id: "home", name: "Home", icon: Compass },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "music", name: "Music", icon: Music },
  { id: "tech", name: "Technology", icon: Code },
  { id: "education", name: "Education", icon: Globe },
];

export const COMMUNITIES = [
  {
    id: 1,
    name: "Midjourney",
    description:
      "The official server for Midjourney, a text-to-image AI where your imagination is the only limit.",
    members: "1,400,000",
    online: "145,000",
    category: "tech",
    bannerColor: "bg-indigo-600", // Replacing image with color for demo
    iconColor: "bg-white",
    verified: true,
  },
  {
    id: 2,
    name: "Valorant",
    description:
      "The official VALORANT Discord server. Find games, discuss strategy, and keep up with news.",
    members: "850,000",
    online: "210,000",
    category: "gaming",
    bannerColor: "bg-red-500",
    iconColor: "bg-red-100",
    verified: true,
  },
  {
    id: 3,
    name: "Lofi Girl",
    description:
      "The friendliest community on Discord. Join us to study, relax, and chat about music.",
    members: "600,000",
    online: "45,000",
    category: "music",
    bannerColor: "bg-orange-400",
    iconColor: "bg-orange-100",
    verified: false,
  },
  {
    id: 4,
    name: "Python Developers",
    description:
      "A community for Python enthusiasts to discuss code, frameworks like Django, and help beginners.",
    members: "320,000",
    online: "55,000",
    category: "tech",
    bannerColor: "bg-yellow-500",
    iconColor: "bg-blue-800",
    verified: false,
  },
];
