"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/assets/logoDark.png";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

interface Stats {
    total: number;
    newThisWeek: number;
    growthRate: number;
    supabaseStatus: string;
    resendStatus: string;
}

interface Activity {
    email: string;
    created_at: string;
}

export default function AdminOverviewPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [activity, setActivity] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const supabaseClient = createClient();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/stats");
            const data = await res.json();
            if (data.stats) setStats(data.stats);
            if (data.recentActivity) setActivity(data.recentActivity);
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabaseClient.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const handleExportCSV = async () => {
        try {
            const res = await fetch("/api/admin/newsletter");
            const data = await res.json();
            if (data.subscribers) {
                const header = "Email,Joined Date\n";
                const csvRows = data.subscribers.map((s: Activity) =>
                    `${s.email},"${new Date(s.created_at).toLocaleString().replace(/"/g, '""')}"`
                );

                const csvContent = header + csvRows.join("\n");
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `nomo_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error("Failed to export CSV", err);
            alert("Failed to export subscribers. Please try again.");
        }
    };

    const handleDeleteSubscriber = async (email: string) => {
        if (window.confirm(`Are you sure you want to delete ${email}?`)) {
            try {
                const res = await fetch("/api/admin/newsletter", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });
                if (res.ok) {
                    fetchDashboardData();
                } else {
                    alert("Failed to delete subscriber");
                }
            } catch (err) {
                console.error("Delete error:", err);
                alert("An error occurred while deleting");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#13314b] selection:bg-[#13314b]/10">
            {/* Global Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#13314b]/5 blur-[140px] rounded-full"></div>
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[140px] rounded-full"></div>
            </div>

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
                        <a href="/admin" className="px-5 py-2 rounded-full bg-[#13314b]/5 text-[#13314b] border border-[#13314b]/10 transition-all font-bold">Overview</a>
                        <a href="/admin/emails" className="px-5 py-2 rounded-full hover:text-[#13314b] hover:bg-[#13314b]/5 transition-all">Emails</a>
                        <div className="h-4 w-[1px] bg-[#13314b]/10 mx-2"></div>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 rounded-full hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                            Logout
                        </button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Nav Drawer */}
                <div className={`md:hidden absolute top-20 inset-x-0 bg-white border-b border-[#13314b]/10 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                    <nav className="flex flex-col p-4 gap-2">
                        <a href="/admin" className="px-4 py-3 rounded-xl bg-[#13314b]/5 text-[#13314b] border border-[#13314b]/10 transition-all font-bold">Overview</a>
                        <a href="/admin/emails" className="px-4 py-3 rounded-xl hover:bg-[#13314b]/5 text-[#13314b]/60 hover:text-[#13314b] transition-all font-medium">Emails</a>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all font-medium text-left"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </header>

            <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-12">
                {/* Welcome Section */}
                <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl font-bold tracking-tight">System Overview</h1>
                    <p className="text-gray-500 mt-2">Welcome back. Here's what's happening with Nomo right now.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    <div className="bg-white border border-[#13314b]/10 rounded-2xl p-8 hover:border-[#13314b]/20 transition-all group shadow-sm shadow-[#13314b]/5">
                        <div className="text-xs font-bold text-[#13314b]/40 uppercase tracking-widest mb-4">Total Subscribers</div>
                        <div className="text-5xl font-black tracking-tighter group-hover:text-blue-600 transition-colors">
                            {isLoading ? "..." : stats?.total}
                        </div>
                    </div>

                    <div className="bg-white border border-[#13314b]/10 rounded-2xl p-8 hover:border-[#13314b]/20 transition-all group shadow-sm shadow-[#13314b]/5">
                        <div className="text-xs font-bold text-[#13314b]/40 uppercase tracking-widest mb-4">New This Week</div>
                        <div className="text-5xl font-black tracking-tighter group-hover:text-purple-600 transition-colors">
                            {isLoading ? "..." : stats?.newThisWeek}
                        </div>
                        <div className="mt-4 text-xs font-medium text-[#13314b]/40">Active signups in last 7 days</div>
                        {!isLoading && stats && (
                            <div className={`mt-4 flex items-center gap-2 text-xs font-bold ${stats.growthRate > 0 ? 'text-green-600' : 'text-[#13314b]/40'}`}>
                                <span className={`flex items-center justify-center w-4 h-4 rounded-full ${stats.growthRate > 0 ? 'bg-green-600/10' : 'bg-[#13314b]/5'}`}>
                                    {stats.growthRate > 0 ? '↑' : '→'}
                                </span>
                                {stats.growthRate > 0 ? `+${stats.growthRate}` : stats.growthRate}% growth this week
                            </div>
                        )}
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Activity Feed */}
                    <div className="lg:col-span-8 bg-white border border-[#13314b]/10 rounded-2xl p-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-200 shadow-sm shadow-[#13314b]/5">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">Recent Activity</h2>
                            <button onClick={fetchDashboardData} className="text-xs text-blue-600 font-bold hover:underline">Refresh Feed</button>
                        </div>
                        <div className="space-y-4">
                            {activity.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-[#13314b]/[0.02] border border-[#13314b]/5 rounded-xl hover:bg-[#13314b]/[0.04] transition-all">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#13314b] to-blue-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                                            {item.email[0].toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-medium truncate">{item.email}</div>
                                            <div className="text-[10px] text-[#13314b]/40 uppercase font-bold tracking-widest mt-0.5">New Subscriber</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-[#13314b]/40 shrink-0 whitespace-nowrap ml-4 flex items-center gap-4">
                                        {new Date(item.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        <button
                                            onClick={() => handleDeleteSubscriber(item.email)}
                                            className="md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg text-red-500"
                                            title="Delete Subscriber"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {!isLoading && activity.length === 0 && (
                                <div className="text-center py-20 text-[#13314b]/20 italic">No recent activity found.</div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="lg:col-span-4 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
                        <div className="bg-[#13314b] rounded-2xl p-8 shadow-2xl shadow-[#13314b]/10 relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-xl font-bold mb-2 text-white">Ready to broadcast?</h3>
                            <p className="text-blue-100/70 text-sm mb-6">Send an update to all your subscribers in seconds.</p>
                            <a href="/admin/emails" className="inline-block bg-white text-[#13314b] px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all active:scale-95">
                                Create Email
                            </a>
                        </div>

                        <div className="bg-white border border-[#13314b]/10 rounded-2xl p-6 shadow-sm shadow-[#13314b]/5">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#13314b]/40 mb-6">Internal Tools</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={handleExportCSV}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#13314b]/5 text-[#13314b] transition-all text-sm font-semibold flex items-center justify-between group"
                                >
                                    Export Subscribers (CSV)
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-20 py-12 border-t border-white/5 text-center text-gray-600 text-[10px] uppercase tracking-[0.3em] font-bold">
                &copy; {new Date().getFullYear()} Nomo Labs
            </footer>
        </div>
    );
}
