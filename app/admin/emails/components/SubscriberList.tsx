"use client";

interface Subscriber {
    email: string;
    created_at: string;
}

interface SubscriberListProps {
    subscribers: Subscriber[];
}

export function SubscriberList({ subscribers }: SubscriberListProps) {
    return (
        <div className="bg-white border border-[#13314b]/10 rounded-2xl p-6 h-fit sticky top-8 text-[#13314b]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#13314b] rounded-full animate-pulse"></span>
                    Subscribers
                </h2>
                <span className="text-[10px] font-bold bg-[#13314b]/5 border border-[#13314b]/10 px-2 py-1 rounded-full text-[#13314b]/40">
                    {subscribers.length} TOTAL
                </span>
            </div>

            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {subscribers.map((sub) => (
                    <div
                        key={sub.email}
                        className="p-3 bg-[#13314b]/[0.02] border border-[#13314b]/5 rounded-xl text-sm hover:bg-[#13314b]/[0.04] hover:border-[#13314b]/10 transition-all group"
                    >
                        <div className="font-semibold truncate text-[#13314b]/80 group-hover:text-[#13314b]">{sub.email}</div>
                        <div className="text-[#13314b]/40 text-[10px] mt-1 flex items-center justify-between font-bold">
                            <span>Added {new Date(sub.created_at).toLocaleDateString()}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-[#13314b]">Active</span>
                        </div>
                    </div>
                ))}
                {subscribers.length === 0 && (
                    <div className="text-center py-10">
                        <div className="text-[#13314b]/20 mb-2">∅</div>
                        <p className="text-[#13314b]/40 text-xs italic">No subscribers yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
