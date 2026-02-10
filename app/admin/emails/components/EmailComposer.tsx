"use client";

import { useState, useEffect } from "react";

interface EmailComposerProps {
    onSuccess: (count: number) => void;
}

export function EmailComposer({ onSuccess }: EmailComposerProps) {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [recipientType, setRecipientType] = useState<"all" | "single">("all");
    const [specificEmail, setSpecificEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [subscribers, setSubscribers] = useState<string[]>([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const res = await fetch("/api/admin/newsletter");
                const data = await res.json();
                if (data.subscribers) {
                    setSubscribers(data.subscribers.map((s: { email: string }) => s.email));
                }
            } catch (err) {
                console.error("Failed to fetch subscribers for suggestions", err);
            }
        };
        fetchSubscribers();
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/admin/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    subject,
                    content,
                    recipientType,
                    specificEmail,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage(`Successfully sent email to ${data.count} recipients.`);
                onSuccess(data.count);
                setSubject("");
                setContent("");
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to send emails.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An unexpected error occurred.");
        }
    };

    return (
        <div className="bg-white border border-[#13314b]/10 rounded-2xl p-4 sm:p-8 shadow-2xl relative overflow-hidden text-[#13314b]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#13314b]/5 blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Email Composer</h1>
                    <p className="text-gray-500 text-sm mt-1">Design and dispatch personalized updates to your users.</p>
                </div>
            </div>

            <form onSubmit={handleSend} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Recipient Group</label>
                        <select
                            value={recipientType}
                            onChange={(e) => setRecipientType(e.target.value as any)}
                            className="w-full bg-[#13314b]/5 border border-[#13314b]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#13314b]/20 hover:border-[#13314b]/20 transition-all appearance-none cursor-pointer text-[#13314b]"
                        >
                            <option value="all">Broadcast to All</option>
                            <option value="single">Single Target</option>
                        </select>
                    </div>
                    {recipientType === "single" && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-left-2 duration-300">
                            <label className="text-[11px] font-bold text-[#13314b]/40 uppercase tracking-widest ml-1">Target Email</label>
                            <input
                                type="email"
                                required
                                value={specificEmail}
                                onChange={(e) => setSpecificEmail(e.target.value)}
                                placeholder="user@example.com"
                                list="subscriber-suggestions"
                                className="w-full bg-[#13314b]/5 border border-[#13314b]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#13314b]/20 transition-all text-[#13314b]"
                            />
                            <datalist id="subscriber-suggestions">
                                {subscribers.map((email) => (
                                    <option key={email} value={email} />
                                ))}
                            </datalist>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#13314b]/40 uppercase tracking-widest ml-1">Subject Line</label>
                    <input
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="The update you've been waiting for..."
                        className="w-full bg-[#13314b]/5 border border-[#13314b]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#13314b]/20 transition-all text-[#13314b]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#13314b]/40 uppercase tracking-widest ml-1">Email Content</label>
                    <textarea
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Hello {{name}}!&#10;&#10;Welcome to our new update. Check it out at <a href='https://nomo.dev'>nomo.dev</a>"
                        className="w-full h-80 bg-[#13314b]/5 border border-[#13314b]/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#13314b]/20 text-sm font-medium leading-relaxed custom-scrollbar text-[#13314b]"
                    />
                    <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-[#13314b]/40 px-1 font-bold">
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#13314b]"></span> Variables: <code className="text-[#13314b] bg-[#13314b]/10 px-1 rounded">{"{{email}}"}</code>, <code className="text-[#13314b] bg-[#13314b]/10 px-1 rounded">{"{{name}}"}</code></span>
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> HTML Supported: <code>&lt;a&gt;</code>, <code>&lt;b&gt;</code>, <code>&lt;h1&gt;</code></span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`w-full py-4 rounded-xl font-bold transition-all transform active:scale-[0.99] flex items-center justify-center gap-3 ${status === "loading"
                        ? "bg-[#13314b]/10 text-[#13314b]/40"
                        : "bg-[#13314b] text-white hover:bg-[#13314b]/95 shadow-xl shadow-[#13314b]/10"
                        }`}
                >
                    {status === "loading" ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Dispatching...
                        </>
                    ) : "Broadcast Email"}
                </button>
            </form>

            {message && (
                <div className={`mt-6 p-4 rounded-xl border text-sm text-center animate-in zoom-in duration-300 ${status === "success"
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>
                    {message}
                </div>
            )}
        </div>
    );
}
