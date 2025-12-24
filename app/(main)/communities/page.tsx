"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Sparkles,
  Crown,
  LayoutGrid,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import { useGetCommunities } from "@/lib/hooks/community.hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import AddCommunityModal from "@/components/community/AddCommunityModal";
import CommunityCard from "@/components/community/communityCard";

const CommunitiesPage = () => {
  const { data: communities, isLoading } = useGetCommunities();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "owned">("all");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Premium Check: Only allow 1 community on free tier
  const handleCreateRequest = () => {
    const ownedCount = communities?.filter((c: any) => c.is_owner).length || 0;
    if (ownedCount >= 1) {
      setShowPremiumModal(true);
    } else {
      setOpenAddModal(true);
    }
  };

  const filteredCommunities =
    communities?.filter((comm: any) => {
      const matchesSearch = comm.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "all" ? true : comm.is_owner;
      return matchesSearch && matchesFilter;
    }) || [];

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <Header
        title="Communities"
        subtitle="Connect, share, and grow with others."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/communities/explore">
                <Globe2 className="w-4 h-4 mr-2" /> Explore
              </Link>
            </Button>
            <Button
              onClick={handleCreateRequest}
              className="bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" /> Create Community
            </Button>
          </div>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card border border-border p-3 rounded-2xl shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search your communities..."
            className="pl-10 h-10 bg-muted/50 border-none rounded-xl focus-visible:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-muted/50 rounded-xl w-full md:w-auto">
          <Button
            variant={filter === "all" ? "outline" : "ghost"}
            onClick={() => setFilter("all")}
            size="sm"
            className={`flex-1 md:flex-none rounded-lg ${
              filter === "all" ? "shadow-sm bg-background" : ""
            }`}
          >
            All
          </Button>
          <Button
            variant={filter === "owned" ? "outline" : "ghost"}
            onClick={() => setFilter("owned")}
            size="sm"
            className={`flex-1 md:flex-none rounded-lg ${
              filter === "owned" ? "shadow-sm bg-background" : ""
            }`}
          >
            Owned
          </Button>
          <div className="relative">
            <Button size="sm" variant="ghost" className="flex-1 md:flex-none">
              Invites
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community: any) => (
          <CommunityCard key={community.id} community={community} />
        ))}

        {filteredCommunities.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl bg-muted/20">
            <LayoutGrid className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              No communities found
            </h3>
            <p className="text-sm text-muted-foreground/60">
              Try adjusting your search or create a new one.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddCommunityModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />

      {/* Premium Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="sm:max-w-[400px] border-none shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />
          <DialogHeader className="flex flex-col items-center pt-4">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
              <Crown className="w-10 h-10 text-amber-500" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              Limit Reached
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              Free users can create **1 community**. Upgrade to Pro to build an
              unlimited number of communities and unlock advanced features.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted/50 p-4 rounded-xl space-y-3 my-2">
            <div className="flex items-center gap-3 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Unlimited Community Creation
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Custom Domain Support
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 transition-opacity border-none font-bold text-white">
              Upgrade to Premium
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunitiesPage;
