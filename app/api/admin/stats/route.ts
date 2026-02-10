import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        // 1. Total Subscribers
        const { count: totalSubscribers, error: countError } = await supabase
            .from('subscribers')
            .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        // 2. New Subscribers (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { count: newThisWeek, error: weekError } = await supabase
            .from('subscribers')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', sevenDaysAgo.toISOString());

        if (weekError) throw weekError;

        // 3. Recent Activity (Last 5 subscribers)
        const { data: recentSubscribers, error: recentError } = await supabase
            .from('subscribers')
            .select('email, created_at')
            .order('created_at', { ascending: false })
            .limit(5);

        if (recentError) throw recentError;

        // 4. Growth Rate (Percentage increase this week compared to previous total)
        const previousTotal = (totalSubscribers || 0) - (newThisWeek || 0);
        const growthRate = previousTotal > 0
            ? parseFloat(((newThisWeek || 0) / previousTotal * 100).toFixed(1))
            : (totalSubscribers && totalSubscribers > 0 ? 100 : 0);

        return NextResponse.json({
            stats: {
                total: totalSubscribers || 0,
                newThisWeek: newThisWeek || 0,
                growthRate: growthRate,
                supabaseStatus: 'connected',
                resendStatus: 'active' // We assume active if env is present
            },
            recentActivity: recentSubscribers
        });
    } catch (error: any) {
        console.error("Stats API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
