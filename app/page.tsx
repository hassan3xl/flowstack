"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Check,
  Zap,
  Users,
  FolderKanban,
  MessageSquare,
  Calendar,
  FileText,
  BarChart3,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const navigate = () => {
    if (user) {
      router.push("/home");
    } else {
      router.push("/auth/signin");
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant={"ghost"}
              onClick={navigate}
              className="flex items-center space-x-2"
            >
              <Image
                src="/logo.png"
                height={200}
                width={200}
                alt="logo"
                className="h-8 w-auto sm:h-12"
              />
            </Button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition"
              >
                How it Works
              </a>

              {user ? (
                <Link
                  href="/home"
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
                >
                  Proceed
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="px-4 py-2 text-sm border rounded-md hover:bg-accent transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block py-2 text-muted-foreground hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block py-2 text-muted-foreground hover:text-foreground"
              >
                How it Works
              </a>

              {user ? (
                <Link
                  href="/home"
                  className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Proceed
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="w-full px-4 py-2 text-sm border rounded-md hover:bg-accent"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>Powerful Team Collaboration Platform</span>
            </div>

            <h1 className="text-2xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Where Teams
              <span className="text-primary"> Connect</span>,
              <br />
              <span className="text-primary">Collaborate</span> & Create
            </h1>

            <p className="text-md sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              The all-in-one workspace that combines chat, project management,
              and documentation. Built for modern teams who move fast.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {user ? (
                <button
                  onClick={() => router.push("/home")}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Proceed
                </button>
              ) : (
                <button
                  onClick={() => router.push("/auth/signin")}
                  className="w-full sm:w-auto px-8 py-4 border rounded-lg font-semibold hover:bg-accent transition"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything your team needs
            </h2>
            <p className="text-xl text-muted-foreground">
              A complete workspace that grows with your team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Team Channels"
              description="Organize conversations by topic, department, or project. Keep everyone in sync."
            />
            <FeatureCard
              icon={<FolderKanban className="w-8 h-8" />}
              title="Project Management"
              description="Manage multiple projects with Kanban boards, timelines, and custom workflows."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Smart Collaboration"
              description="Invite teammates, assign tasks, and track progress in real-time."
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Document Hub"
              description="Centralize your knowledge with docs, wikis, and file sharing in one place."
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8" />}
              title="Unified Calendar"
              description="Schedule meetings, set deadlines, and sync with your favorite calendar apps."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Analytics & Reports"
              description="Track team productivity, project progress, and identify bottlenecks."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How flowstack Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get your team up and running in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create Your Server"
              description="Set up your workspace in seconds. Choose between public or private servers for your team."
            />
            <StepCard
              number="2"
              title="Invite Your Team"
              description="Send invitations via email or shareable links. Team members can accept and join instantly."
            />
            <StepCard
              number="3"
              title="Start Collaborating"
              description="Create projects, organize tasks, chat in channels, and watch your team's productivity soar."
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by teams worldwide
            </h2>
            <p className="text-muted-foreground">
              Join thousands of teams already using flowstack
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Teams</div>
            </div>
            <div className="p-8">
              <div className="text-5xl font-bold text-primary mb-2">500K+</div>
              <div className="text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="p-8">
              <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">flowstack</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The complete workspace for modern teams
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 flowstack. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { [key: string]: any }) {
  return (
    <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition group">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { [key: string]: any }) {
  return (
    <div className="relative">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
          {number}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
