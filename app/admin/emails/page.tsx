"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/assets/logoDark.png";
import { SubscriberList } from "./components/SubscriberList";
import { EmailComposer } from "./components/EmailComposer";

interface Subscriber {
    email: string;
    created_at: string;
}

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubscribersOpen, setIsSubscribersOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/newsletter");
            const data = await res.json();
            if (data.subscribers) setSubscribers(data.subscribers);
        } catch (err) {
            console.error("Failed to fetch subscribers", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendSuccess = (count: number) => {
        console.log(`Successfully sent to ${count} users`);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#13314b] selection:bg-[#13314b]/10 overflow-x-hidden">
            {/* Global Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#13314b]/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full"></div>
            </div>

            {/* Side Drawer for Subscribers */}
            <div
                className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-white border-l border-[#13314b]/10 z-[70] transform transition-transform duration-500 ease-in-out shadow-2xl ${isSubscribersOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#13314b] rounded-full"></span>
                            Users
                        </h2>
                        <button
                            onClick={() => setIsSubscribersOpen(false)}
                            className="p-2 hover:bg-[#13314b]/5 rounded-lg transition-colors text-[#13314b]/40 hover:text-[#13314b]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <SubscriberList subscribers={subscribers} />
                </div>
            </div>

            {/* Backdrop for Drawer */}
            {isSubscribersOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] animate-in fade-in duration-300"
                    onClick={() => setIsSubscribersOpen(false)}
                />
            )}

            {/* Navigation Header */}
            <header className="sticky top-0 z-50 border-b border-[#13314b]/10 bg-white/80 backdrop-blur-md">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-44 h-10 relative">
                            <Image
                                src={logo}
                                alt="Nomo Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-[#13314b]/60">
                        <a href="/admin" className="px-5 py-2 rounded-full hover:bg-[#13314b]/5 hover:text-[#13314b] transition-all">Overview</a>
                        <a href="/admin/emails" className="px-5 py-2 rounded-full bg-[#13314b]/5 text-[#13314b] border border-[#13314b]/10 transition-all font-bold">Emails</a>
                        <div className="h-4 w-[1px] bg-[#13314b]/10 mx-2"></div>
                        <button
                            onClick={() => setIsSubscribersOpen(true)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all border ${isSubscribersOpen ? "bg-[#13314b]/5 border-[#13314b]/10 text-[#13314b]" : "border-transparent hover:text-[#13314b] hover:bg-[#13314b]/5"
                                }`}
                        >
                            <span>Subscribers</span>
                            <span className="bg-[#13314b] text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                                {subscribers.length}
                            </span>
                        </button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setIsSubscribersOpen(true)}
                            className="bg-[#13314b]/10 text-[#13314b] text-[10px] px-2 py-1 rounded-md font-bold border border-[#13314b]/20"
                        >
                            {subscribers.length} USERS
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-[#13314b]/60 hover:text-[#13314b] transition-colors"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav Drawer */}
                <div className={`md:hidden absolute top-20 inset-x-0 bg-white border-b border-[#13314b]/10 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
                    <nav className="flex flex-col p-4 gap-2 text-sm">
                        <a href="/admin" className="px-4 py-3 rounded-xl hover:bg-[#13314b]/5 text-[#13314b]/60 hover:text-[#13314b] transition-all font-medium">Overview</a>
                        <a href="/admin/emails" className="px-4 py-3 rounded-xl bg-[#13314b]/5 text-[#13314b] border border-[#13314b]/10 transition-all font-bold">Emails</a>
                        <button
                            onClick={() => {
                                setIsSubscribersOpen(true);
                                setIsMenuOpen(false);
                            }}
                            className="px-4 py-3 rounded-xl hover:bg-[#13314b]/5 text-[#13314b]/60 hover:text-[#13314b] transition-all font-medium text-left flex justify-between items-center"
                        >
                            View Subscribers
                            <span className="bg-[#13314b] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                {subscribers.length}
                            </span>
                        </button>
                    </nav>
                </div>
            </header>

            <main className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-2 py-16">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <EmailComposer onSuccess={handleSendSuccess} />
                </div>
            </main>

            <footer className="mt-20 py-12 border-t border-white/5 text-center text-gray-600 text-[10px] uppercase tracking-[0.3em] font-bold">
                &copy; {new Date().getFullYear()} Nomo Engine &bull; Communications Module v1.0
            </footer>
        </div>
    );
}
