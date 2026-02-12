"use client";

interface Subscriber {
    email: string;
    created_at: string;
}

interface SubscriberListProps {
    subscribers: Subscriber[];
    onDelete?: (email: string) => void;
}

export function SubscriberList({ subscribers, onDelete }: SubscriberListProps) {
    const handleDelete = async (email: string) => {
        if (window.confirm(`Are you sure you want to delete ${email}?`)) {
            try {
                const res = await fetch("/api/admin/newsletter", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });
                if (res.ok) {
                    onDelete?.(email);
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
                        className="p-3 bg-[#13314b]/[0.02] border border-[#13314b]/5 rounded-xl text-sm hover:bg-[#13314b]/[0.04] hover:border-[#13314b]/10 transition-all group relative"
                    >
                        <div className="flex justify-between items-start gap-2">
                            <div className="font-semibold truncate text-[#13314b]/80 group-hover:text-[#13314b]">{sub.email}</div>
                            <button
                                onClick={() => handleDelete(sub.email)}
                                className="md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded text-red-500"
                                title="Delete Subscriber"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-[#13314b]/40 text-[10px] mt-1 flex items-center justify-between font-bold">
                            <span>Added {new Date(sub.created_at).toLocaleDateString()}</span>
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
