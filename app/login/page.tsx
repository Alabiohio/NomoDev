"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/assets/logoDark.png";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsPending(false);
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#13314b] flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#13314b]/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-[420px] z-10">
                <div className="flex justify-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="w-48 h-12 relative">
                        <Image
                            src={logo}
                            alt="Nomo Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="bg-white border border-[#13314b]/10 rounded-3xl p-8 sm:p-10 shadow-xl shadow-[#13314b]/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
                        <p className="text-[#13314b]/40 text-sm mt-2">Please sign in to manage Nomo.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#13314b]/60 ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-5 py-4 bg-[#13314b]/5 border border-[#13314b]/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#13314b]/10 transition-all placeholder:text-[#13314b]/20"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#13314b]/60 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-5 py-4 bg-[#13314b]/5 border border-[#13314b]/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#13314b]/10 transition-all placeholder:text-[#13314b]/20"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium animate-in fade-in zoom-in-95">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#13314b] text-white py-4 rounded-2xl font-bold hover:bg-[#13314b]/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-[#13314b]/20 flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-[10px] text-[#13314b]/20 uppercase tracking-[0.2em] font-bold">
                    &copy; {new Date().getFullYear()} Nomo Labs
                </p>
            </div>
        </div>
    );
}
