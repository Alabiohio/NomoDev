"use client";

import React from "react";
import Image from "next/image";
import RocketLaunchFlatline from "@/public/assets/147-rocket-launch-flatline.png";
import group18622 from "@/public/assets/group-18622.png";


export default function Home() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email")?.toString().trim();
    if (!email) return;

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe.");
      }

      setStatus("success");
      setMessage(data.message || "Thanks — you’re subscribed!");
      form.reset();
    } catch (err: unknown) {
      console.error("Subscription error:", err);
      setStatus("error");
      if (err instanceof Error) {
        setMessage(err.message || "Unexpected error occurred.");
      } else if (typeof err === "string") {
        setMessage(err);
      } else {
        setMessage("Unexpected error occurred.");
      }
    } finally {
      window.setTimeout(() => {
        setStatus("idle");
        setMessage(null);
      }, 4000);
    }
  };

  return (
    <div className="bg-white w-full min-h-screen relative overflow-hidden flex items-center justify-center p-6 font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={group18622}
          alt="Background pattern"
          fill
          className="object-cover scale-105 pointer-events-none"
          priority
        />
      </div>

      <main className="relative z-10 w-full max-w-[640px] flex flex-col items-center gap-14 py-12">
        {/* Hero Illustration */}
        <div className="relative w-full aspect-square max-w-[320px] animate-fade-in group">
          <div className="absolute inset-0 bg-button/5 rounded-full blur-3xl group-hover:bg-button/10 transition-premium scale-110" />
          <Image
            className="w-full h-full object-contain animate-float hover:scale-110 transition-premium relative z-10"
            alt="Rocket launch illustration"
            src={RocketLaunchFlatline}
            priority
          />
        </div>

        <header className="flex flex-col gap-4 text-center">
          <h1 className="[font-family:'TT_Hoves-Bold',Helvetica] font-extrabold text-[#181a1e] text-4xl md:text-5xl lg:text-[44px] tracking-tight leading-tight">
            Coming Soon
          </h1>

          <p className="max-w-[500px] [font-family:'TT_Hoves-Regular',Helvetica] font-normal text-grey text-lg tracking-normal leading-relaxed">
            Are you ready to get something new from us? Subscribe to our newsletter to get the latest updates.
          </p>
        </header>

        {/* Subscription Form */}
        <form
          className="w-full flex flex-col md:flex-row gap-4 items-stretch"
          onSubmit={handleSubmit}
          aria-label="Newsletter subscription form"
        >
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-white rounded-2xl border-2 border-[#e5e7eb] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-focus-within:border-button/40 group-focus-within:shadow-[0_8px_30px_rgba(19,49,75,0.08)] transition-premium" />

            <label htmlFor="email-input" className="sr-only">
              Enter your email
            </label>
            <input
              id="email-input"
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
              disabled={status === "loading"}
              className="relative z-10 w-full h-[64px] px-8 font-medium text-dark text-lg bg-transparent outline-none placeholder:text-grey/50"
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
            className="h-[64px] px-10 flex items-center justify-center cursor-pointer bg-button text-white rounded-2xl font-bold text-lg hover:scale-[1.02] hover:shadow-2xl hover:shadow-button/20 active:scale-95 transition-premium whitespace-nowrap z-10 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Subscribe to newsletter"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>

        <div aria-live="polite" className="mt-3 min-h-[1.25rem]">
          {message && (
            <div
              className={
                status === "success"
                  ? "text-green-600 font-medium"
                  : status === "error"
                    ? "text-red-600 font-medium"
                    : "text-grey"
              }
            >
              {message}
            </div>
          )}
        </div>

        {/* Footer info (subtle) */}
        <footer className="text-grey/40 text-sm font-medium animate-fade-in" style={{ animationDelay: '0.6s' }}>
          &copy; 2026 NOMO. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
