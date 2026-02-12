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
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
            line-height: 1.6; 
            color: #1a1a1a; 
            margin: 0; 
            padding: 0; 
            background-color: #f9f9f9;
        }
        .container { 
            max-width: 600px; 
            margin: 40px auto; 
            padding: 40px; 
            background-color: #ffffff;
            border-radius: 16px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .header { 
            margin-bottom: 32px; 
        }
        .logo { 
            font-size: 24px; 
            font-weight: 800; 
            color: #000; 
            text-decoration: none; 
            letter-spacing: -0.5px;
        }
        .content { 
            font-size: 16px;
        }
        .greeting {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 24px;
            color: #000;
        }
        .list-title {
            font-weight: 600;
            margin-top: 24px;
            margin-bottom: 12px;
        }
        ul {
            padding-left: 20px;
            margin-bottom: 24px;
        }
        li {
            margin-bottom: 8px;
        }
        .footer { 
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid #eee;
            color: #666;
        }
        .sign-off {
            font-weight: 600;
            color: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <span class="logo">NOMOLABS</span>
        </div>
        <div class="content">
            <div class="greeting">You're in.</div>
            <p>You've joined the waitlist for <strong>NOMO AI</strong>, adaptive trading intelligence for BTC, ETH, NAS100, XAUUSD, and EURUSD.</p>
            
            <div class="list-title">What you'll get:</div>
            <ul>
                <li>Weekly system updates</li>
                <li>Early performance data</li>
                <li>First access to beta</li>
            </ul>

            <div class="footer">
                <div class="sign-off">Stay sharp,</div>
                <div>NOMOLABS</div>
            </div>
        </div>
    </div>
</body>
</html>
`;
