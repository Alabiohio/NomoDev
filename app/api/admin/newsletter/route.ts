import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('subscribers')
            .select('email, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ subscribers: data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { subject, content, recipientType, specificEmail } = await req.json();

        if (!subject || !content) {
            return NextResponse.json({ error: "Subject and content are required" }, { status: 400 });
        }

        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        let recipients: string[] = [];

        if (recipientType === "all") {
            const { data, error } = await supabase
                .from('subscribers')
                .select('email');

            if (error) throw error;
            recipients = data.map(sub => sub.email);
        } else if (recipientType === "single" && specificEmail) {
            recipients = [specificEmail];
        }

        if (recipients.length === 0) {
            return NextResponse.json({ error: "No recipients selected" }, { status: 400 });
        }

        // Resend batch sending (limit 100 per call, for production we'd chunk this)
        const emailRequest = recipients.map(email => {
            // Dynamic variable replacement
            const personalizedContent = content
                .replace(/{{email}}/g, email)
                .replace(/{{name}}/g, email.split('@')[0]);

            return {
                from: fromEmail,
                to: email,
                subject: subject,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <body style="font-family: sans-serif; line-height: 1.6; color: #333; padding: 20px;">
                        <div style="white-space: pre-wrap;">${personalizedContent}</div>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                        <p style="font-size: 12px; color: #888;">
                            You are receiving this because you subscribed to Nomo updates.
                        </p>
                    </body>
                    </html>
                `
            };
        });

        // For simplicity in this tool, we send them one by one or using batch if supported
        // Using Resend batch API
        const { data, error } = await resend.batch.send(emailRequest);

        if (error) throw error;

        return NextResponse.json({ success: true, count: recipients.length, data });
    } catch (error: any) {
        console.error("Newsletter Send Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
