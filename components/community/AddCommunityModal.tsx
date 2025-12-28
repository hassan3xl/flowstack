"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Users,
  Hash,
  ChevronRight,
  Compass,
  ArrowLeft,
  Layout,
  Globe,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import BaseModal from "@/components/modals/BaseModal";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/input/formInput";
import { toast } from "sonner";
import { useCreateCommuity } from "@/lib/hooks/community.hooks";
import { CategoryType } from "@/lib/types/category.types";

interface AddCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryType[];
}

interface FormData {
  name: string;
  description: string;
  server_type: "public" | "private";
  category_id: string; // Changed from 'category' to 'category_id' for clarity
}

type ViewState = "categories" | "create" | "join";

const AddCommunityModal = ({
  isOpen,
  onClose,
  categories,
}: AddCommunityModalProps) => {
  const [view, setView] = useState<ViewState>("categories");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const { mutateAsync: createCommunity, isPending } = useCreateCommuity();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<FormData>({
    defaultValues: {
      server_type: "public",
      name: "",
      description: "",
    },
  });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setView("categories");
      reset();
      setSelectedCategoryName("");
    }
  }, [isOpen, reset]);

  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    // 1. Set the hidden form value
    setValue("category_id", categoryId);

    // 2. Store name for UI display purposes
    setSelectedCategoryName(categoryName);

    // 3. Move to next step
    setView("create");

    // 4. Focus the name input automatically after a short delay for animation
    setTimeout(() => setFocus("name"), 300);
  };

  const onSubmit = async (data: FormData) => {
    try {
      await createCommunity(data);
      toast.success("Community created successfully!");
      onClose();
    } catch (error) {
      // Error handled by hook or global handler
    }
  };

  /* -------------------------------------------------------------------------- */
  /* VIEW 1: SELECT CATEGORY                                                    */
  /* -------------------------------------------------------------------------- */
  const renderCategoriesView = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-xl font-bold">Create a Community</h2>
        <p className="text-muted-foreground text-sm">
          Select a category to get started. This helps people find your
          community.
        </p>
      </div>

      {/* Categories List */}
      <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {categories?.length > 0 ? (
          categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id, cat.name)}
              className="w-full group p-3 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {/* You can map specific icons here based on cat.name if you want, using Hash as default */}
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm block">
                    {cat.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Create a {cat.name.toLowerCase()} community
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
            </button>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-lg">
            No categories available.
          </div>
        )}
      </div>

      {/* Footer: Option to Join instead */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={() => setView("join")}
        className="w-full"
      >
        Have an invite already? Join a Server
      </Button>
    </div>
  );

  /* -------------------------------------------------------------------------- */
  /* VIEW 2: CREATE FORM (Name, Desc, Privacy)                                  */
  /* -------------------------------------------------------------------------- */
  const renderCreateForm = () => (
    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">Customize your server</h2>
        <p className="text-muted-foreground text-sm">
          You chose{" "}
          <span className="font-medium text-foreground">
            "{selectedCategoryName}"
          </span>
          . Give it a personality.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          <FormInput
            name="name"
            label="Community Name"
            register={register}
            placeholder={`${selectedCategoryName} Community`}
            errors={errors}
            required
            autoFocus
          />

          <FormInput
            name="description"
            label="Description"
            field="textarea"
            register={register}
            placeholder="What is this community about?"
            errors={errors}
            rows={3}
          />

          {/* Privacy Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">
              Visibility
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer relative">
                <input
                  type="radio"
                  value="public"
                  {...register("server_type")}
                  className="peer sr-only"
                />
                <div className="p-3 rounded-lg border border-border peer-checked:border-primary peer-checked:bg-primary/5 transition-all flex flex-col items-center gap-2 hover:bg-accent/50">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Public</span>
                </div>
              </label>

              <label className="cursor-pointer relative">
                <input
                  type="radio"
                  value="private"
                  {...register("server_type")}
                  className="peer sr-only"
                />
                <div className="p-3 rounded-lg border border-border peer-checked:border-primary peer-checked:bg-primary/5 transition-all flex flex-col items-center gap-2 hover:bg-accent/50">
                  <Lock className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Private</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <button
            type="button"
            onClick={() => setView("categories")}
            className="flex items-center gap-1 text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <Button
            type="submit"
            disabled={isPending}
            className="px-8 min-w-[120px]"
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );

  /* -------------------------------------------------------------------------- */
  /* VIEW 3: JOIN (Optional, keeping it simple)                                 */
  /* -------------------------------------------------------------------------- */
  const renderJoinView = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Join a Community</h2>
        <p className="text-muted-foreground text-sm">
          Enter an invite link below.
        </p>
      </div>
      <div className="space-y-2">
        <input
          className="w-full p-3 rounded-md border bg-background"
          placeholder="https://..."
        />
        <Button className="w-full bg-green-600 hover:bg-green-700">Join</Button>
      </div>
      <button
        onClick={() => setView("categories")}
        className="w-full text-center text-sm text-muted-foreground hover:underline"
      >
        Back
      </button>
    </div>
  );

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-1 min-h-[400px]">
        {view === "categories" && renderCategoriesView()}
        {view === "create" && renderCreateForm()}
        {view === "join" && renderJoinView()}
      </div>
    </BaseModal>
  );
};

export default AddCommunityModal;
