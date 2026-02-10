import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { testEmailTemplate } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const fromEmail = process.env.RESEND_FROM_EMAIL || "notifications@engineblog.live";

        console.log(`Attempting to send test email locally from ${fromEmail} to ${email}`);

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "Test Email from Nomo",
            html: testEmailTemplate(email.split('@')[0]),
        });

        if (error) {
            console.error("Resend API Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
