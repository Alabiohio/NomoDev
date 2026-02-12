"use client";

import { useEffect, useState } from "react";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface NavItem {
  label: string;
  href: string;
}

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  href: string;
}

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });



  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      icon: (
        <div className="relative w-8 h-8 flex items-center justify-center rounded-[8px] overflow-hidden bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
      ),
      href: "https://www.instagram.com/n0mo_labs?igsh=MWdmZHBzb2pmeHRqcw==",
    },
    {
      name: "Facebook",
      icon: (
        <div className="flex items-center justify-center w-8 h-8 bg-[#1877F2] rounded-full">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12.073-12-12.073s-12 5.446-12 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      ),
      href: "#facebook",
    },
    {
      name: "X",
      icon: (
        <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
          <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      ),
      href: "https://x.com/NomoSATMr",
    },
    {
      name: "Discord",
      icon: (
        <div className="flex items-center justify-center w-8 h-8 bg-[#5865F2] rounded-full">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.666 4.37a.071.071 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        </div>
      ),
      href: "#discord",
    },
  ];

  useEffect(() => {
    const targetDate = new Date("2026-03-06T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
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
      setMessage("Thanks for subscribing! We'll ocassionally send you updates");
      setEmail("");
    } catch (err: unknown) {
      console.error("Subscription error:", err);
      setStatus("error");
      if (err instanceof Error) {
        setMessage(err.message || "Unexpected error occurred.");
      } else {
        setMessage("Unexpected error occurred.");
      }
    } finally {
      setTimeout(() => {
        setStatus("idle");
        setMessage(null);
      }, 4000);
    }
  };



  const formatTimeUnit = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  const countdownUnits = [
    { value: countdown.days, label: "DAYS" },
    { value: countdown.hours, label: "HOURS" },
    { value: countdown.minutes, label: "MINUTES" },
    { value: countdown.seconds, label: "SECONDS" },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#160e33] overflow-hidden font-rubik">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url(/assets/vector.svg)] bg-cover bg-center">
          <div className="absolute inset-0 bg-[linear-gradient(122deg,rgba(22,14,51,0.4)_42%,rgba(22,14,51,0.1)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(22,14,51,0.5)_0%,rgba(22,14,51,0)_100%)]" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] min-h-screen flex flex-col">
        <header className="w-full h-[100px] flex items-center px-6 md:px-24 relative z-50">
          <a href="/" className="block">
            <div
              className="w-[127px] h-[40px] bg-[url(/assets/logo.png)] bg-contain bg-no-repeat bg-center"
              role="img"
              aria-label="Nomo logo"
            />
          </a>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-[1100px] mx-auto text-center mb-8">
            <h1 className="font-rubik font-semibold text-white text-2xl md:text-5xl lg:text-4xl tracking-tight leading-[1.15]">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#00c4f4] to-[#285AEB] mb-2">SATM:</span>
              <br className="md:hidden" />
              {" "}Adaptive trading intelligence that combines institutional logic, statistical modeling, and real-time market structure analysis across Crypto, Indices, Forex and Commodities.
            </h1>
          </div>

          <p className="font-rubik font-normal text-white font-semibold text-xl md:text-3xl text-center mb-8">
            Coming Soon
          </p>

          <div
            className="w-full max-w-[350px] bg-[#160e33]/50 rounded-[64px] py-4 px-8 mb-12 backdrop-blur-sm border border-white/5"
            role="timer"
            aria-label="Countdown timer"
          >
            <div className="flex justify-between items-center">
              {countdownUnits.map((unit, index) => (
                <div key={unit.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span
                      className="font-rubik font-medium text-[#00c4f4] text-2xl md:text-3xl"
                      aria-label={`${unit.value} ${unit.label.toLowerCase()}`}
                    >
                      {formatTimeUnit(unit.value)}
                    </span>
                    <span className="font-rubik font-normal text-white/60 text-[10px] md:text-[13px]">
                      {unit.label}
                    </span>
                  </div>
                  {index < countdownUnits.length - 1 && (
                    <span className="mx-2 text-white/40 mb-4" aria-hidden="true">:</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-rubik text-white/90 text-x md:text-2xl text-center mb-8 tracking-wide">
            Get early access to SATM predictions, strategy breakdowns, and system updates before launch.
          </h2>

          <form
            className="w-full max-w-[570px] flex flex-col md:flex-row gap-4 mb-12"
            onSubmit={handleSubmit}
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-[60px] bg-white rounded-2xl px-6 font-sans font-normal text-[#4e545f] text-lg focus:outline-none focus:ring-2 focus:ring-[#00c4f4] transition-all shadow-xl"
                aria-label="Email address"
                required
                disabled={status === "loading"}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="h-[60px] px-10 bg-button text-white rounded-2xl font-sans font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-xl disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <div
              aria-live="polite"
              className={`mb-12 flex items-center gap-4 px-8 py-4 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-xl border-2 shadow-2xl ${status === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-300 shadow-green-500/10"
                : "bg-red-500/10 border-red-500/20 text-red-300 shadow-red-500/10"
                }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${status === "success" ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                {status === "success" ? (
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-rubik font-bold text-lg uppercase tracking-wider">
                  {status === "success" ? "Subscribed" : "Hold On"}
                </span>
                <span className="font-rubik font-medium opacity-90">
                  {message}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center gap-6">
            <p className="font-rubik font-medium text-white text-lg tracking-widest">
              FOLLOW US
            </p>

            <nav
              className="flex gap-8"
              role="navigation"
              aria-label="Social media links"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center text-white/80 hover:text-white transition-all group"
                  aria-label={social.name}
                >
                  <div className="transition-all duration-300 transform group-hover:scale-110">
                    {social.icon}
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}
