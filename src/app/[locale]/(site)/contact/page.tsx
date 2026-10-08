"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  ArrowLeft,
  Check,
  Copy,
  External,
  Send,
  Sparkle,
} from "@/components/icons";
import { CreativeFloatingBlobs } from "@/components/motion/CreativeFloatingBlobs";
import { Reveal } from "@/components/motion/Reveal";

export default function DedicatedContactPage() {
  const locale = useLocale();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Mobile App (Flutter)");
  const [timeline, setTimeline] = useState("Within 1 month");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`[Project Inquiry] ${projectType} - ${fullName}`);
    const bodyContent = encodeURIComponent(
      `Hi Lounès,\n\nName: ${fullName}\nEmail: ${email}\nProject Type: ${projectType}\nTimeline: ${timeline}\n\nProject Details:\n${message}\n\n---\nSent from benseba-lounes.pages.dev contact interface`,
    );

    // Trigger direct mail client to Lounes's Gmail
    const mailtoUrl = `mailto:bensebalounes7@gmail.com?subject=${subject}&body=${bodyContent}`;
    window.location.href = mailtoUrl;

    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bensebalounes7@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const isRtl = locale === "ar";

  return (
    <div className="relative min-h-screen overflow-hidden pb-24 pt-[calc(var(--header-h)+1.5rem)]">
      <CreativeFloatingBlobs />

      <div className="container-page">
        {/* Navigation / Back link */}
        <Reveal direction="left" delay={0.05}>
          <div className="mb-6 flex items-center justify-between">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 rounded-full border border-border-interactive/60 bg-surface/80 px-4 py-1.5 text-xs font-semibold text-fg backdrop-blur-md transition-all hover:bg-surface-elevated hover:scale-102"
            >
              <ArrowLeft size={14} />
              <span>
                {isRtl ? "العودة إلى الصفحة الرئيسية" : locale === "fr" ? "Retour à l'accueil" : "Back to Home"}
              </span>
            </Link>

            <span className="rounded-full bg-success-soft border border-success-border px-3 py-1 font-mono text-[11px] font-semibold text-success-text">
              Direct Dispatch to Gmail
            </span>
          </div>
        </Reveal>

        {/* Header */}
        <Reveal direction="up" delay={0.1}>
          <div className="max-w-2xl mb-8">
            <h1 className="font-display text-h1 sm:text-display font-bold tracking-tight text-fg">
              {isRtl
                ? "تواصل معي مباشرة"
                : locale === "fr"
                ? "Discutons de votre projet"
                : "Let's build something exceptional."}
            </h1>
            <p className="mt-3 text-lead text-fg-muted">
              {isRtl
                ? "املأ تفاصيل مشروعك وسيتم إرسال الرسالة مباشرة إلى بريدي الإلكتروني الشخصي (bensebalounes7@gmail.com)."
                : locale === "fr"
                ? "Remplissez vos informations ci-dessous. Le message sera envoyé directement à mon adresse Gmail personnelle."
                : "Fill out the details below. Your inquiry is formatted and dispatched directly to my personal Gmail inbox."}
            </p>
          </div>
        </Reveal>

        {/* Main Grid: Form (Left) & Direct Channels (Right) */}
        <div className="grid gap-stack-lg lg:grid-cols-[1.3fr_0.7fr] items-start">
          {/* Form Card */}
          <Reveal direction="left" delay={0.15}>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-2">
              {isSubmitted ? (
                <div className="space-y-5 text-center py-8">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-success-soft text-success-text border border-success-border shadow-sm">
                    <Check size={32} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-fg">
                    {isRtl ? "تم تجهيز الرسالة بنجاح!" : locale === "fr" ? "Message préparé avec succès !" : "Message Prepared Successfully!"}
                  </h3>
                  <p className="text-xs text-fg-muted max-w-md mx-auto leading-relaxed">
                    {isRtl
                      ? "تم فتح تطبيق البريد الخاص بك للإرسال المباشر إلى bensebalounes7@gmail.com. يمكنك أيضًا الضغط أدناه لفتح واجهة Gmail مباشرة في المتصفح."
                      : locale === "fr"
                      ? "Votre client mail a été ouvert vers bensebalounes7@gmail.com. Vous pouvez aussi ouvrir directement Gmail Web ci-dessous."
                      : "Your email client was triggered to send to bensebalounes7@gmail.com. You can also launch Gmail directly in your browser below."}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=bensebalounes7@gmail.com&su=${encodeURIComponent(`[Project Inquiry] ${projectType} - ${fullName}`)}&body=${encodeURIComponent(`Hi Lounès,\n\nName: ${fullName}\nEmail: ${email}\nProject: ${projectType}\n\n${message}`)}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-control bg-accent px-5 py-2.5 text-xs font-semibold text-accent-fg shadow-1 hover:bg-accent/90 transition-all"
                    >
                      <span>Open Web Gmail Tab</span>
                      <External size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="rounded-control border border-border px-4 py-2 text-xs font-medium text-fg hover:bg-surface-elevated transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block font-mono text-xs font-semibold text-fg-subtle mb-1.5 uppercase">
                        {isRtl ? "الاسم الكامل" : locale === "fr" ? "Nom complet" : "Your Name"} *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ahmed Benali"
                        className="w-full rounded-control border border-border bg-surface-sunken px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:outline-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-mono text-xs font-semibold text-fg-subtle mb-1.5 uppercase">
                        {isRtl ? "البريد الإلكتروني" : locale === "fr" ? "Adresse email" : "Email Address"} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ahmed@example.com"
                        className="w-full rounded-control border border-border bg-surface-sunken px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:outline-accent"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block font-mono text-xs font-semibold text-fg-subtle mb-1.5 uppercase">
                        {isRtl ? "نوع المشروع" : locale === "fr" ? "Type de projet" : "Project Type"}
                      </label>
                      <select
                        id="projectType"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full rounded-control border border-border bg-surface-sunken px-3.5 py-2.5 text-sm text-fg focus:outline-accent"
                      >
                        <option value="Mobile App (Flutter)">Mobile App (Flutter &amp; Dart)</option>
                        <option value="Modern Web Platform (Next.js)">Modern Web Platform (Next.js &amp; React)</option>
                        <option value="Backend & APIs (Python / FastAPI)">Backend &amp; APIs (Python / FastAPI)</option>
                        <option value="Applied AI & Data Science">Applied AI &amp; Data Science</option>
                        <option value="Consulting / Clean Architecture">Consulting / Clean Architecture</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block font-mono text-xs font-semibold text-fg-subtle mb-1.5 uppercase">
                        {isRtl ? "المدة المتوقعة" : locale === "fr" ? "Délai souhaité" : "Target Timeline"}
                      </label>
                      <select
                        id="timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full rounded-control border border-border bg-surface-sunken px-3.5 py-2.5 text-sm text-fg focus:outline-accent"
                      >
                        <option value="Urgent (1–2 weeks)">Urgent (1–2 weeks)</option>
                        <option value="Standard (3–6 weeks)">Standard (3–6 weeks)</option>
                        <option value="Flexible (1–3 months)">Flexible (1–3 months)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-mono text-xs font-semibold text-fg-subtle mb-1.5 uppercase">
                      {isRtl ? "تفاصيل المشروع والرسالة" : locale === "fr" ? "Détails du projet" : "Project Details & Message"} *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        isRtl
                          ? "اشرح فكرة مشروعك، المتطلبات الرئيسية، أو أي استفسار تود طرحه..."
                          : locale === "fr"
                          ? "Décrivez brièvement les fonctionnalités clés et vos objectifs..."
                          : "Describe what you're building, key features, and your target goals..."
                      }
                      className="w-full rounded-control border border-border bg-surface-sunken p-3.5 text-sm text-fg placeholder:text-fg-subtle focus:outline-accent leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-control bg-accent py-3 px-6 text-sm font-semibold text-accent-fg shadow-1 hover:bg-accent/90 transition-all hover:scale-[1.01]"
                  >
                    <span>
                      {isRtl
                        ? "إرسال الرسالة إلى بريدي الإلكتروني"
                        : locale === "fr"
                        ? "Envoyer directement à Gmail"
                        : "Send Directly to My Gmail"}
                    </span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Direct Contact Details Card */}
          <Reveal direction="right" delay={0.2}>
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-1 space-y-4">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-fg-subtle flex items-center gap-2">
                  <Sparkle size={15} className="text-accent" />
                  <span>Direct Contact Info</span>
                </h3>

                <div className="space-y-3 text-caption">
                  {/* Email */}
                  <div className="rounded-xl bg-surface-sunken p-3.5 border border-border-subtle">
                    <span className="font-mono text-[10px] text-fg-subtle uppercase block">Primary Gmail</span>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-fg truncate">
                        bensebalounes7@gmail.com
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="rounded-full bg-surface border border-border p-1.5 text-fg-muted hover:text-fg hover:bg-surface-elevated transition-colors shrink-0"
                        title="Copy email address"
                      >
                        {copiedEmail ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="rounded-xl bg-surface-sunken p-3.5 border border-border-subtle">
                    <span className="font-mono text-[10px] text-fg-subtle uppercase block">Phone / Mobile</span>
                    <p className="mt-1 font-mono text-xs font-semibold text-fg">
                      (+213) 82535427
                    </p>
                  </div>

                  {/* Location */}
                  <div className="rounded-xl bg-surface-sunken p-3.5 border border-border-subtle">
                    <span className="font-mono text-[10px] text-fg-subtle uppercase block">Locations</span>
                    <p className="mt-1 text-xs font-semibold text-fg">
                      15033 Tizi Ouzou &amp; Algiers, Algeria
                    </p>
                    <span className="font-mono text-[10px] text-fg-subtle mt-0.5 block">
                      USTHB University Algiers
                    </span>
                  </div>
                </div>

                <div className="border-t border-border-subtle pt-3">
                  <span className="font-mono text-[10px] text-fg-subtle uppercase block mb-2">
                    Professional Networks
                  </span>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://linkedin.com/in/bensebalounes"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-between rounded-lg bg-surface-sunken px-3 py-2 text-xs font-medium text-fg hover:bg-surface-elevated transition-colors border border-border-subtle"
                    >
                      <span>LinkedIn Profile</span>
                      <External size={12} className="text-fg-subtle" />
                    </a>
                    <a
                      href="https://instagram.com/lounes.7i"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-between rounded-lg bg-surface-sunken px-3 py-2 text-xs font-medium text-fg hover:bg-surface-elevated transition-colors border border-border-subtle"
                    >
                      <span>Instagram (@lounes.7i)</span>
                      <External size={12} className="text-fg-subtle" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-center">
                <span className="font-mono text-[11px] text-accent font-bold">
                  ⚡ Response time: Within 24 hours
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
