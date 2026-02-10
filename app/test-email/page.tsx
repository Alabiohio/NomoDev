"use client";

import { useState } from "react";

export default function TestEmailPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleTestSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/test-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage("Test email sent successfully! Check your inbox.");
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to send test email.");
            }
        } catch (error) {
            console.error("Test send error:", error);
            setStatus("error");
            setMessage("An unexpected error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Decorative Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                            Email Tester
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Send a simple test template to verify your configuration.
                        </p>
                    </div>

                    <form onSubmit={handleTestSend} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                                Recipients Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform active:scale-[0.98] ${status === "loading"
                                    ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-black hover:bg-gray-100 flex items-center justify-center gap-2"
                                }`}
                        >
                            {status === "loading" ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                "Send Test Email"
                            )}
                        </button>
                    </form>

                    {message && (
                        <div
                            className={`mt-6 p-4 rounded-xl border text-sm text-center animate-in fade-in slide-in-from-top-2 duration-300 ${status === "success"
                                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                                    : "bg-red-500/10 border-red-500/20 text-red-400"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Developer Notes
                        </h3>
                        <ul className="text-xs text-gray-500 space-y-2 list-disc ml-4">
                            <li>Using Resend API via <code>/api/test-email</code></li>
                            <li>Sender: <code>{process.env.NEXT_PUBLIC_SENDER_EMAIL || "onboarding@resend.dev"}</code></li>
                            <li>Resend free tier only sends to your verified domain or account email.</li>
                        </ul>
                    </div>
                </div>

                <p className="mt-6 text-center text-gray-600 text-xs">
                    &copy; {new Date().getFullYear()} Nomo Dev Tool
                </p>
            </div>
        </div>
    );
}
