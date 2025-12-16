"use client";

import React, { useState } from "react";
import {
  X,
  Users,
  Hash,
  Link as LinkIcon,
  Globe,
  ChevronRight,
  Gamepad2,
  GraduationCap,
  Coffee,
  Briefcase,
  ArrowLeft,
  Upload,
  Compass,
} from "lucide-react";

import { Button } from "../ui/button";
import BaseModal from "../modals/BaseModal";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormInput } from "../input/formInput";
import { useCreateServer } from "@/lib/hooks/server.hooks";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  server_type: "public" | "private";
}

// Templates for the Category Selection Step
const SERVER_TEMPLATES = [
  {
    id: "custom",
    label: "Create My Own",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "school",
    label: "School Club",
    icon: GraduationCap,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "study",
    label: "Study Group",
    icon: Coffee,
    color: "bg-green-100 text-green-600",
  },
];

type ViewState = "landing" | "join" | "categories" | "customize";

const AddServerModal = ({ isOpen, onClose }: AddServerModalProps) => {
  const [view, setView] = useState<ViewState>("landing");
  const [inviteLink, setInviteLink] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("custom");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      server_type: "private",
    },
  });

  const { mutateAsync: createServer, isPending } = useCreateServer();

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setView("landing");
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createServer(data);
      toast.success("Server created successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to create server");
    }
  };

  const handleTemplateSelect = (templateId: string, templateLabel: string) => {
    setSelectedTemplate(templateId);
    // Pre-fill name based on template to be helpful
    const suffix = "'s Server";
    if (templateId !== "custom") {
      setValue("name", `${templateLabel} ${suffix}`);
    }
    setView("customize");
  };

  const handleJoinServer = () => {
    if (!inviteLink.trim()) return;
    console.log("Joining server:", inviteLink);
    // Implement actual join logic here
  };

  /* -------------------------------------------------------------------------- */
  /* VIEW RENDERS                                */
  /* -------------------------------------------------------------------------- */

  // 1. LANDING VIEW (The Fork)
  const renderLandingView = () => (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold">Create a server</h2>
        <p className="text-muted-foreground text-sm">
          Your server is where you and your friends hang out. Make yours and
          start talking.
        </p>
      </div>

      <button
        onClick={() => setView("categories")}
        className="w-full group p-4 rounded-xl border border-border hover:bg-accent hover:border-blue-500/50 transition-all flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold">Create My Own</h3>
            <p className="text-xs text-muted-foreground">Start from scratch</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3 text-center">
          Already have an invite?
        </h3>
        <Button
          onClick={() => setView("join")}
          variant="secondary"
          className="w-full h-12 text-base font-medium"
        >
          Join a Server
        </Button>
      </div>
    </div>
  );

  // 2. CATEGORIES VIEW (The "Swipe" Step)
  const renderCategoriesView = () => (
    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-xl font-bold">Tell us more about your server</h2>
        <p className="text-muted-foreground text-sm">
          In order to help you with your setup, is your new server for a few
          friends or a larger community?
        </p>
      </div>

      <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {SERVER_TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTemplateSelect(t.id, t.label)}
            className="w-full group p-3 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${t.color
                  .replace("text-", "bg-")
                  .replace("100", "500/10")} `}
              >
                {/* Dynamic color application logic simplified for demo */}
                <t.icon
                  className={`w-5 h-5 ${
                    t.id === "custom" ? "text-blue-500" : "text-foreground"
                  }`}
                />
              </div>
              <span className="font-semibold text-sm">{t.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-border mt-4">
        <button
          onClick={() => setView("landing")}
          className="text-sm text-muted-foreground hover:underline"
        >
          Back
        </button>
      </div>
    </div>
  );

  // 3. CUSTOMIZE VIEW (The Form)
  const renderCustomizeView = () => (
    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">Customize your server</h2>
        <p className="text-muted-foreground text-sm">
          Give your new server a personality with a name and an icon. You can
          always change it later.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Mock Upload UI */}
        <div className="flex justify-center">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center bg-accent/20 hover:bg-accent/40 transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground mb-1" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">
                Upload
              </span>
            </div>
            <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1 shadow-sm">
              <PlusIconMini />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <FormInput
            name="name"
            label="SERVER NAME"
            register={register}
            placeholder="My Super Cool Server"
            errors={errors}
            className="bg-accent/50 border-0 focus:ring-2 ring-primary/50"
          />

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">
              Privacy Setting
            </label>
            <div className="grid grid-cols-2 gap-2 bg-accent/30 p-1 rounded-lg">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="private"
                  {...register("server_type")}
                  className="peer sr-only"
                />
                <div className="text-center py-2 text-sm rounded-md peer-checked:bg-background peer-checked:shadow-sm peer-checked:text-primary transition-all text-muted-foreground hover:text-foreground">
                  Private
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="public"
                  {...register("server_type")}
                  className="peer sr-only"
                />
                <div className="text-center py-2 text-sm rounded-md peer-checked:bg-background peer-checked:shadow-sm peer-checked:text-primary transition-all text-muted-foreground hover:text-foreground">
                  Public
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => setView("categories")}
            className="text-sm hover:underline text-muted-foreground"
          >
            Back
          </button>
          <Button type="submit" disabled={isPending} className="px-8">
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );

  // 4. JOIN VIEW
  const renderJoinView = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
          Join a Server
        </h2>
        <p className="text-muted-foreground text-sm">
          Enter an invite below to join an existing server.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase">
            Invite Link
          </label>
          <input
            autoFocus
            type="text"
            placeholder="https://discord.gg/hTKzmak"
            value={inviteLink}
            onChange={(e) => setInviteLink(e.target.value)}
            className="w-full bg-accent/50 border-none rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder:text-muted-foreground/50"
          />
          <div className="text-xs text-muted-foreground">
            INVITES SHOULD LOOK LIKE
            <div className="mt-1 flex gap-2 opacity-70">
              <code>hTKzmak</code>
              <code>https://discord.gg/hTKzmak</code>
            </div>
          </div>
        </div>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or find a community
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            onClose();
            router.push("/communities/explore/");
          }}
          className="w-full h-12 flex items-center gap-2 bg-accent/20 hover:bg-accent/40 border-dashed"
        >
          <Compass className="w-5 h-5 text-green-500" />
          Explore Public Servers
        </Button>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setView("landing")}
          className="text-sm hover:underline text-muted-foreground"
        >
          Back
        </button>
        <Button
          onClick={handleJoinServer}
          disabled={!inviteLink.trim()}
          className="bg-green-600 hover:bg-green-700 text-white px-8"
        >
          Join Server
        </Button>
      </div>
    </div>
  );

  /* -------------------------------------------------------------------------- */
  /* MAIN RENDER                                */
  /* -------------------------------------------------------------------------- */
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      // We hide the default title because we are customizing headers per view for maximum control
      // But we pass aria labels for accessibility
      size="md"
    >
      {/* We wrap content in a consistent height container to prevent jumping */}
      <div className="p-1">
        {view === "landing" && renderLandingView()}
        {view === "categories" && renderCategoriesView()}
        {view === "customize" && renderCustomizeView()}
        {view === "join" && renderJoinView()}
      </div>
    </BaseModal>
  );
};

// Tiny helper for the plus icon overlay
const PlusIconMini = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default AddServerModal;
