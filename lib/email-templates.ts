export const testEmailTemplate = (name: string = "User") => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nomo Test Email</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; padding: 40px; border: 1px solid #eee; border-radius: 12px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #000; text-decoration: none; }
        .content { margin-bottom: 30px; }
        .footer { font-size: 12px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 500; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="#" class="logo">NOMO</a>
        </div>
        <div class="content">
            <h1>Email Configuration Verified</h1>
            <p>Hello ${name},</p>
            <p>This is a test email from your Nomo application. If you are reading this, it means your <strong>Resend</strong> integration is working perfectly!</p>
            <p>You can now use this setup to send newsletters, onboarding emails, and more.</p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="https://resend.com" class="button">Visit Resend Dashboard</a>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Nomo. All rights reserved.</p>
            <p>Sent via Resend.</p>
        </div>
    </div>
</body>
</html>
`;

export const newsletterWelcomeTemplate = (email: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: sans-serif; padding: 20px; color: #333; }
        .box { border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px; max-width: 500px; margin: auto; }
        h1 { color: #111; font-size: 24px; }
        p { line-height: 1.5; }
    </style>
</head>
<body>
    <div class="box">
        <h1>Welcome to the Newsletter!</h1>
        <p>Thanks for signing up with <strong>${email}</strong>.</p>
        <p>We'll keep you updated with the latest news and features from Nomo.</p>
        <p>Stay tuned!</p>
        <br>
        <p>Best,<br>The Nomo Team</p>
    </div>
</body>
</html>
`;
