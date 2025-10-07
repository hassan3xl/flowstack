// src/config/navigation.ts
import {
  Home,
  BarChart3,
  Users,
  FileText,
  Calendar,
  Mail,
  CreditCard,
  Settings,
  HelpCircle,
} from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  children?: NavigationItem[];
  permission?: string;
}

export const navigationConfig: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    icon: FileText,
    badge: "12",
    children: [
      {
        id: "active",
        label: "Active Projects",
        href: "/projects/active",
        icon: FileText,
      },
      {
        id: "completed",
        label: "Completed",
        href: "/projects/completed",
        icon: FileText,
      },
      {
        id: "archived",
        label: "Archived",
        href: "/projects/archived",
        icon: FileText,
      },
    ],
  },
  {
    id: "team",
    label: "Team",
    href: "/team",
    icon: Users,
    permission: "manage_team",
  },
  {
    id: "calendar",
    label: "Calendar",
    href: "/calendar",
    icon: Calendar,
    badge: "3",
  },
  {
    id: "messages",
    label: "Messages",
    href: "/messages",
    icon: Mail,
    badge: "5",
  },
];

export const bottomNavigationConfig: NavigationItem[] = [
  {
    id: "billing",
    label: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    id: "help",
    label: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
];
