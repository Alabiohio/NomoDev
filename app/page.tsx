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

  const navItems: NavItem[] = [
    { label: "FEATURES", href: "#features" },
    { label: "TECHNOLOGY", href: "#technology" },
    { label: "WAITLIST", href: "#waitlist" },
    { label: "RESOURCES", href: "#resources" },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      icon: (
        <div className="relative w-5 h-5 flex items-center justify-center rounded-[6px] overflow-hidden bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
      ),
      href: "#instagram",
    },
    {
      name: "Facebook",
      icon: (
        <div className="flex items-center justify-center w-5 h-5 bg-[#1877F2] rounded-full">
          <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12.073-12-12.073s-12 5.446-12 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      ),
      href: "#facebook",
    },
    {
      name: "Twitter",
      icon: (
        <div className="flex items-center justify-center w-5 h-5 bg-[#1DA1F2] rounded-full">
          <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </div>
      ),
      href: "#twitter",
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <header className="w-full h-[100px] border-b border-white/10 flex items-center justify-between px-6 md:px-24 relative z-50">
          <a href="/" className="block">
            <div
              className="w-[127px] h-[40px] bg-[url(/assets/logo.png)] bg-contain bg-no-repeat bg-center"
              role="img"
              aria-label="Nomo logo"
            />
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-[30px]"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="font-normal text-white text-base hover:text-[#00c4f4] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#00c4f4] transition-colors z-50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>

          {/* Mobile Nav Drawer */}
          <div
            className={`md:hidden fixed inset-0 bg-[#160e33] transition-all duration-300 ease-in-out z-40 flex flex-col items-center justify-center gap-8 ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
              }`}
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-2xl font-medium tracking-widest hover:text-[#00c4f4] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-6 mt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 transform active:scale-95 group"
                  aria-label={social.name}
                >
                  <div className="scale-125 transition-all duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <h1 className="font-rubik font-bold text-white text-4xl md:text-6xl lg:text-[80px] text-center tracking-tight leading-tight mb-4">
            Trade smarter while
            <br />
            Nomo does the work
          </h1>

          <p className="font-rubik font-normal text-white text-xl md:text-3xl text-center mb-8">
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

          <h2 className="font-rubik font-semibold text-white/90 text-xl md:text-2xl text-center mb-8 tracking-wide">
            Subscribe to our newsletter to receive updates
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
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-all group"
                  aria-label={social.name}
                >
                  <div className="transition-all duration-300 transform group-hover:scale-110">
                    {social.icon}
                  </div>
                  <span className="font-rubik font-normal text-lg md:text-xl">
                    {social.name}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}
