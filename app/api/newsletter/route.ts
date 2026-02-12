import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { newsletterWelcomeTemplate } from "@/lib/email-templates";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // 1. Store in Supabase
        const { error: supabaseError } = await supabase
            .from('subscribers')
            .upsert({ email: email }, { onConflict: 'email' });

        if (supabaseError) {
            console.error("Supabase Error Full:", supabaseError);
            return NextResponse.json(
                { error: `Database Error: ${supabaseError.message}`, details: supabaseError },
                { status: 500 }
            );
        }

        // 2. Send Welcome Email
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "You're in — NOMOLABS",
            html: newsletterWelcomeTemplate(email),
        });

        return NextResponse.json(
            { success: true, message: "Subscribed and welcome email sent!" },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Resend API Error:", error);
        return NextResponse.json(
            { error: "Failed to process subscription", details: error.message },
            { status: 500 }
        );
    }
}
