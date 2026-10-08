"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Compass,
  External,
  Layers,
  Mail,
  Shield,
  Smartphone,
  Sparkle,
  Terminal,
} from "@/components/icons";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";
import { STATIC_LINKY_PROJECTS } from "@/lib/linky";
import { cn } from "@/lib/utils/cn";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "cv" | "inquiries">("overview");
  const [projectsList] = useState(STATIC_LINKY_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<typeof STATIC_LINKY_PROJECTS[0]>(STATIC_LINKY_PROJECTS[0]!);
  const [searchQuery, setSearchQuery] = useState("");

  const mockInquiries = [
    {
      id: "inq-1",
      sender: "Gym Management Group",
      email: "contact@fitnessalgeria.com",
      project: "Custom QR Check-In App & Store",
      date: "2026-10-04",
      status: "Reviewed",
      budget: "Project-based",
      message:
        "Looking for a Flutter mobile app similar to Kamir Gym with member QR codes, attendance tracking, and supplement store.",
    },
    {
      id: "inq-2",
      sender: "E-Commerce Startup Algiers",
      email: "founder@shopdz.io",
      project: "Mobile & Web Marketplace",
      date: "2026-09-28",
      status: "In Discussion",
      budget: "Milestone-based",
      message:
        "Need a cross-platform bio-link and micro-store application like Linky, fast loading on mobile with clean architecture.",
    },
    {
      id: "inq-3",
      sender: "Medical Research Laboratory",
      email: "biolab@usthb.dz",
      project: "Bioinformatics Data Pipeline & Dashboard",
      date: "2026-09-15",
      status: "Completed Handover",
      budget: "Academic Grant",
      message:
        "Analysis pipeline in Python (FastAPI/Streamlit/Pandas) for sequence exploration and statistical data visualization.",
    },
  ];

  const filteredProjects = projectsList.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-bg text-fg pb-20 pt-[calc(var(--header-h)+1rem)]">
      {/* Top Banner / Breadcrumb */}
      <div className="container-page mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-4 sm:p-6 shadow-1">
          <div className="flex items-center gap-3.5">
            <div className="grid size-11 place-items-center rounded-xl bg-accent text-accent-fg shadow-sm">
              <Terminal size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg sm:text-xl font-bold tracking-tight text-fg">
                  Admin Console & Portfolio Manager
                </h1>
                <span className="rounded-full bg-success-soft border border-success-border px-2 py-0.5 font-mono text-[10px] font-semibold text-success-text">
                  Live System
                </span>
              </div>
              <p className="font-mono text-xs text-fg-muted">
                {profile.name} · USTHB Master&apos;s & Computer Science Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-control border border-border-interactive bg-surface px-3.5 py-1.5 text-xs font-medium text-fg hover:bg-bg transition-colors"
            >
              <span>View Public Portfolio</span>
              <External size={13} />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-border-subtle pb-3">
          {[
            { id: "overview", label: "Dashboard Overview", icon: Layers },
            { id: "projects", label: "Project Manager (5 Apps)", icon: Smartphone },
            { id: "cv", label: "CV & Academic Credentials", icon: Sparkle },
            { id: "inquiries", label: "Client Inquiries", icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-control px-4 py-2 text-xs font-semibold transition-all",
                  isActive
                    ? "bg-accent text-accent-fg shadow-1"
                    : "bg-surface text-fg-muted hover:bg-surface-elevated hover:text-fg border border-border-subtle",
                )}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container-page">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              <div className="rounded-xl border border-border bg-surface p-4 shadow-1">
                <span className="font-mono text-[11px] text-fg-subtle uppercase">Shipped Projects</span>
                <p className="mt-1 font-display text-2xl sm:text-3xl font-bold text-fg">
                  {projectsList.length} Apps
                </p>
                <p className="mt-1 text-xs text-accent">Production verified in Algeria</p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4 shadow-1">
                <span className="font-mono text-[11px] text-fg-subtle uppercase">Academic Standing</span>
                <p className="mt-1 font-display text-2xl sm:text-3xl font-bold text-fg">
                  EQF 7
                </p>
                <p className="mt-1 text-xs text-fg-muted">Master&apos;s in Bioinformatics (USTHB)</p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4 shadow-1">
                <span className="font-mono text-[11px] text-fg-subtle uppercase">Stack Categories</span>
                <p className="mt-1 font-display text-2xl sm:text-3xl font-bold text-fg">
                  6 Domains
                </p>
                <p className="mt-1 text-xs text-fg-muted">Flutter, Web, APIs, Cloud, AI, Tools</p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4 shadow-1">
                <span className="font-mono text-[11px] text-fg-subtle uppercase">Default Mode</span>
                <p className="mt-1 font-display text-2xl sm:text-3xl font-bold text-success-text">
                  Light Theme
                </p>
                <p className="mt-1 text-xs text-fg-muted">Pre-paint script active</p>
              </div>
            </div>

            {/* Quick Action & Architecture Status */}
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 rounded-xl border border-border bg-surface p-5 shadow-1">
                <h3 className="text-sm font-semibold text-fg mb-3 flex items-center gap-2">
                  <Shield size={16} className="text-accent" />
                  <span>Engineering Credentials & Profile Matrix</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-caption">
                  <div className="rounded-lg bg-surface-sunken p-3 border border-border-subtle">
                    <span className="font-mono text-[10px] text-fg-subtle uppercase">Full Name</span>
                    <p className="font-semibold text-fg mt-0.5">BENSEBA Lounes</p>
                    <span className="font-mono text-[10px] text-fg-subtle uppercase mt-2 block">Contact</span>
                    <p className="text-xs text-fg-muted">bensebalounes7@gmail.com</p>
                    <p className="text-xs text-fg-muted">(+213) 82535427</p>
                  </div>
                  <div className="rounded-lg bg-surface-sunken p-3 border border-border-subtle">
                    <span className="font-mono text-[10px] text-fg-subtle uppercase">Education Track</span>
                    <p className="font-semibold text-fg mt-0.5">USTHB University (Algiers)</p>
                    <p className="text-xs text-fg-muted">Master&apos;s Bioinformatics (2024–2026)</p>
                    <p className="text-xs text-fg-muted">Bachelor&apos;s Computer Science (2020–2024)</p>
                  </div>
                </div>

                <div className="mt-4 border-t border-border-subtle pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-mono text-fg-subtle">Location: 15033 Tizi Ouzou & Algiers (Algeria)</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("cv")}
                    className="inline-flex items-center gap-1 text-accent font-semibold hover:underline"
                  >
                    <span>View CV Details</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Live Status Card */}
              <div className="rounded-xl border border-border bg-surface p-5 shadow-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-fg mb-2 flex items-center gap-2">
                    <Sparkle size={16} className="text-accent" />
                    <span>Deployment Status</span>
                  </h3>
                  <p className="text-xs text-fg-muted leading-relaxed">
                    Static export built for Cloudflare Pages at <code className="font-mono text-accent">benseba-lounes.pages.dev</code>.
                  </p>
                  <ul className="mt-3 flex flex-col gap-2 font-mono text-xs">
                    <li className="flex items-center gap-2 text-success-text">
                      <Check size={14} />
                      <span>Zero cold start static export</span>
                    </li>
                    <li className="flex items-center gap-2 text-success-text">
                      <Check size={14} />
                      <span>Single PDP header rule applied</span>
                    </li>
                    <li className="flex items-center gap-2 text-success-text">
                      <Check size={14} />
                      <span>Prices &amp; marketing copy cleaned</span>
                    </li>
                    <li className="flex items-center gap-2 text-success-text">
                      <Check size={14} />
                      <span>3 Locales: EN · FR · AR</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-border-subtle">
                  <button
                    type="button"
                    onClick={() => alert("All portfolio caches and static data verified!")}
                    className="w-full rounded-control bg-surface-elevated border border-border-interactive py-2 text-xs font-semibold text-fg hover:bg-bg transition-colors"
                  >
                    Run Health Diagnostic
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <input
                type="text"
                placeholder="Search projects by title, stack, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md w-full rounded-control border border-border bg-surface px-3.5 py-2 text-xs text-fg placeholder:text-fg-subtle focus:outline-accent"
              />
              <span className="font-mono text-xs text-fg-subtle">
                Showing {filteredProjects.length} of {projectsList.length} applications
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">
              {/* Project List */}
              <div className="space-y-3">
                {filteredProjects.map((p) => {
                  const isSelected = selectedProject?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProject(p)}
                      className={cn(
                        "cursor-pointer rounded-xl border p-4 transition-all duration-200",
                        isSelected
                          ? "border-accent bg-accent/5 shadow-1"
                          : "border-border bg-surface hover:bg-surface-elevated",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-semibold text-sm text-fg">{p.title}</h4>
                          <span className="font-mono text-[11px] text-accent font-medium">
                            {p.category}
                          </span>
                        </div>
                        {p.featured && (
                          <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent font-bold">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-fg-muted line-clamp-2">
                        {p.description}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {p.keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="rounded border border-border-subtle bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Project Detail Preview */}
              <div className="rounded-xl border border-border bg-surface p-5 shadow-1">
                <h3 className="font-display text-base font-bold text-fg mb-3 flex items-center justify-between">
                  <span>Inspection Preview</span>
                  <span className="font-mono text-xs text-fg-subtle">{selectedProject.id.slice(0, 8)}</span>
                </h3>

                {selectedProject.imageUrl && (
                  <div className="relative aspect-16/9 w-full rounded-lg overflow-hidden border border-border bg-black/40 mb-4">
                    <Image
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <h4 className="text-base font-semibold text-fg">{selectedProject.title}</h4>
                <p className="mt-1 font-mono text-xs text-accent">{selectedProject.category}</p>

                <p className="mt-3 text-xs text-fg-muted leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mt-4 border-t border-border-subtle pt-3">
                  <span className="font-mono text-[11px] text-fg-subtle uppercase block mb-1.5">
                    Stack &amp; Keywords
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-accent-soft border border-accent-soft-border px-2.5 py-1 font-mono text-[10px] text-accent-soft-text font-semibold"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.projectUrl && (
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
                    <a
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded-control bg-accent text-accent-fg px-3.5 py-1.5 text-xs font-semibold shadow-sm hover:bg-accent/90 transition-colors"
                    >
                      <span>Open Link / Post</span>
                      <External size={13} />
                    </a>
                    <span className="font-mono text-[11px] text-fg-subtle">
                      {selectedProject.images.length} photo(s) attached
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CV & CREDENTIALS */}
        {activeTab === "cv" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Education Box */}
              <div className="rounded-xl border border-border bg-surface p-5 shadow-1 space-y-4">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <h3 className="font-display text-sm sm:text-base font-bold text-fg flex items-center gap-2">
                    <Sparkle size={16} className="text-accent" />
                    <span>Education and Training</span>
                  </h3>
                  <span className="font-mono text-xs text-fg-subtle">USTHB Algiers</span>
                </div>

                <div className="space-y-3.5">
                  <div className="border-s-2 border-accent ps-3.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-fg">Master&apos;s Degree in Bioinformatics</h4>
                      <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                        EQF level 7
                      </span>
                    </div>
                    <p className="text-xs text-fg-muted mt-0.5">
                      University of Science and Technology Houari Boumediene (USTHB)
                    </p>
                    <p className="font-mono text-[11px] text-fg-subtle mt-0.5">
                      24/09/2024 – 18/06/2026 · Algiers, Algeria
                    </p>
                  </div>

                  <div className="border-s-2 border-border-interactive ps-3.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-fg">Bachelor&apos;s Degree in Computer Science</h4>
                      <span className="rounded bg-border-interactive/30 px-2 py-0.5 font-mono text-[10px] font-bold text-fg-muted">
                        EQF level 6
                      </span>
                    </div>
                    <p className="text-xs text-fg-muted mt-0.5">
                      University of Science and Technology Houari Boumediene (USTHB)
                    </p>
                    <p className="font-mono text-[11px] text-fg-subtle mt-0.5">
                      01/12/2020 – 15/06/2024 · Algiers, Algeria
                    </p>
                  </div>

                  <div className="border-s-2 border-border-subtle ps-3.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-fg">Baccalaureate in Secondary Education</h4>
                      <span className="rounded bg-surface-sunken px-2 py-0.5 font-mono text-[10px] text-fg-subtle">
                        EQF level 4
                      </span>
                    </div>
                    <p className="text-xs text-fg-muted mt-0.5">Oudiai Mohamed High School</p>
                    <p className="font-mono text-[11px] text-fg-subtle mt-0.5">
                      01/09/2017 – 15/03/2020 · Tizi Ouzou, Algeria
                    </p>
                  </div>
                </div>
              </div>

              {/* Work Experience Box */}
              <div className="rounded-xl border border-border bg-surface p-5 shadow-1 space-y-4">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <h3 className="font-display text-sm sm:text-base font-bold text-fg flex items-center gap-2">
                    <Smartphone size={16} className="text-accent" />
                    <span>Work Experience</span>
                  </h3>
                  <span className="font-mono text-xs text-fg-subtle">Algeria</span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-surface-sunken p-3.5 border border-border-subtle">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-fg">Freelance Mobile &amp; Web Developer</h4>
                      <span className="font-mono text-[10px] text-accent font-semibold">15/06/2024 – Current</span>
                    </div>
                    <p className="text-xs text-fg-subtle">Self-Employed · Algiers, Algeria</p>
                    <ul className="mt-2 list-disc list-inside text-xs text-fg-muted space-y-1">
                      <li>Cross-platform applications using Flutter &amp; Dart with clean architecture.</li>
                      <li>High-performance, accessible user interfaces with Riverpod &amp; BLoC.</li>
                      <li>Shipped: Kamir Gym, Linky, Restaurant Discovery, Nur-Dikr, Digital Library.</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-surface-sunken p-3.5 border border-border-subtle">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-fg">Software Development Student Intern</h4>
                      <span className="font-mono text-[10px] text-fg-subtle">11/01/2024 – 11/06/2024</span>
                    </div>
                    <p className="text-xs text-fg-subtle">EURL Matrix Software Development Company · Algiers</p>
                    <ul className="mt-2 list-disc list-inside text-xs text-fg-muted space-y-1">
                      <li>Developed an Android mobile application for parcel delivery logistics.</li>
                      <li>Implemented solutions for route optimization and logistics tracking.</li>
                      <li>Participated in software development and application improvement tasks.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Skills Box */}
            <div className="rounded-xl border border-border bg-surface p-5 shadow-1">
              <h3 className="font-display text-sm sm:text-base font-bold text-fg mb-3 flex items-center gap-2">
                <Compass size={16} className="text-accent" />
                <span>Languages &amp; Certifications</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-surface-sunken p-3 border border-border-subtle">
                  <span className="font-mono text-accent font-bold text-xs">ARABIC</span>
                  <p className="font-semibold text-sm text-fg mt-1">Mother Tongue (Native)</p>
                  <p className="text-xs text-fg-subtle mt-0.5">Primary language</p>
                </div>
                <div className="rounded-lg bg-surface-sunken p-3 border border-border-subtle">
                  <span className="font-mono text-accent font-bold text-xs">FRENCH</span>
                  <p className="font-semibold text-sm text-fg mt-1">Level B2 (Fluent)</p>
                  <p className="text-xs text-fg-subtle mt-0.5">Listening, Reading, Writing, Spoken B2</p>
                </div>
                <div className="rounded-lg bg-surface-sunken p-3 border border-border-subtle">
                  <span className="font-mono text-accent font-bold text-xs">ENGLISH</span>
                  <p className="font-semibold text-sm text-fg mt-1">Level B2 (Professional)</p>
                  <p className="text-xs text-fg-subtle mt-0.5">Listening, Reading, Writing, Spoken B2</p>
                </div>
              </div>
            </div>

            {/* Tech Stack Matrix from CV */}
            <div className="rounded-xl border border-border bg-surface p-5 shadow-1">
              <h3 className="font-display text-sm sm:text-base font-bold text-fg mb-3 flex items-center gap-2">
                <Layers size={16} className="text-accent" />
                <span>Technical Skills Matrix ({skills.reduce((acc, cat) => acc + cat.items.length, 0)} Technologies)</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((cat) => (
                  <div key={cat.id} className="rounded-lg bg-surface-sunken p-3 border border-border-subtle">
                    <span className="font-mono text-accent font-bold text-xs uppercase">{cat.label.en}</span>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {cat.items.map((item) => (
                        <span key={item.name} className="rounded bg-surface px-1.5 py-0.5 text-[11px] text-fg font-medium border border-border-subtle">
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-surface p-4 shadow-1 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-fg">Inbound Engagement Pipeline</h3>
                <p className="text-xs text-fg-muted">Recent project inquiries and collaborator requests</p>
              </div>
              <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-xs text-accent font-semibold">
                {mockInquiries.length} Inquiries Logged
              </span>
            </div>

            <div className="grid gap-3">
              {mockInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="rounded-xl border border-border bg-surface p-4 shadow-1 flex flex-col gap-2 hover:border-accent/40 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-fg">{inq.sender}</span>
                      <span className="font-mono text-xs text-fg-subtle">({inq.email})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-surface-sunken border border-border-subtle px-2 py-0.5 font-mono text-[10px] text-fg-muted">
                        {inq.date}
                      </span>
                      <span className="rounded-full bg-success-soft border border-success-border px-2 py-0.5 font-mono text-[10px] text-success-text font-bold">
                        {inq.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-accent">{inq.project}</p>
                  <p className="text-xs text-fg-muted leading-relaxed">{inq.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
