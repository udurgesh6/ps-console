import { AttackVector, FilterGroup } from "@/types";
import { availableDomains } from "./available-domains";
import { landingPages } from "./landing-pages";

export const dummyAttackVectors: AttackVector[] = [
  {
    id: "av-1",
    name: "Phishing Email Campaign",
    description:
      "Sophisticated email phishing attack targeting employee credentials with fake login pages",
    category: "social-engineering",
    subCategory: "pretexting",
    type: "click",
    tropicality: "custom",
    startDate: new Date("2024-01-15T00:00:00"),
    endDate: new Date("2024-02-15T23:59:59"),
    status: true,
    emailHtmlTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      .message-box {
        background-color: #f8f9fa;
        border-left: 4px solid #4f46e5;
        border-radius: 8px;
        padding: 24px;
        margin: 20px 0;
      }
      h2 {
        color: #1a1a1a;
        margin: 0 0 16px 0;
        font-size: 24px;
      }
      p {
        color: #4a5568;
        line-height: 1.6;
        margin: 8px 0;
      }
      .signature {
        margin-top: 20px;
        color: #718096;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="message-box">
        <h2>Quick Update 💬</h2>
        <p>Hey team,</p>
        <p>Just wanted to let you know that the design files have been updated. Please review when you get a chance.</p>
        <p class="signature">— Sarah from Design Team</p>
      </div>
    </div>
  </body>
</html>`,
    emailSubject: "Quick Update: Design Files Updated",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[0]],
    courses: [],
  },
  {
    id: "av-2",
    name: "USB Drop Attack",
    description:
      "Physical security test using infected USB drives in parking lots and common areas",
    category: "phishing",
    subCategory: "email",
    type: "click",
    tropicality: "custom",
    startDate: new Date("2024-02-01T00:00:00"),
    endDate: new Date("2024-02-28T23:59:59"),
    emailHtmlTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #fef3c7;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
      }
      .header {
        background-color: #f59e0b;
        color: white;
        padding: 24px;
        text-align: center;
      }
      .content {
        padding: 32px 24px;
      }
      .alert-box {
        background-color: #fef3c7;
        border: 2px solid #f59e0b;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
      }
      .button {
        display: inline-block;
        background-color: #f59e0b;
        color: white;
        padding: 12px 32px;
        text-decoration: none;
        border-radius: 6px;
        margin: 16px 8px;
        font-weight: 600;
      }
      .button.secondary {
        background-color: #6b7280;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin:0;">🔐 Access Request</h1>
      </div>
      <div class="content">
        <div class="alert-box">
          <p style="margin:0;"><strong>John Doe</strong> has requested access to:</p>
          <p style="margin:8px 0 0 0; font-size:18px;">Project Phoenix - Design Files</p>
        </div>
        <p>Review the request and grant or deny access:</p>
        <div style="text-align:center; margin-top:24px;">
          <a href="#" class="button">Approve</a>
          <a href="#" class="button secondary">Deny</a>
        </div>
      </div>
    </div>
  </body>
</html>`,
    emailSubject: "🔐 Access Request: Project Phoenix - Design Files",
    from: `phish-sheriff@${availableDomains[0]}`,
    status: true,
    landingPages: [],
    courses: [],
  },
  {
    id: "av-3",
    name: "Fake Survey Form",
    description:
      "Malicious survey collecting personal information through seemingly legitimate forms",
    category: "malware",
    subCategory: "ransomware",
    type: "submission",
    tropicality: "diwali",
    startDate: undefined,
    endDate: undefined,
    emailHtmlTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      }
      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 24px;
        text-align: center;
        color: white;
      }
      .icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      .content {
        padding: 40px 32px;
      }
      .document-card {
        background-color: #f7fafc;
        border-radius: 12px;
        padding: 24px;
        margin: 24px 0;
        border-left: 4px solid #667eea;
      }
      .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 14px 40px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        margin-top: 20px;
      }
      .footer {
        text-align: center;
        padding: 24px;
        color: #718096;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="icon">📄</div>
        <h1 style="margin:0; font-size:28px;">New Document Shared</h1>
      </div>
      <div class="content">
        <p style="font-size:16px; color:#2d3748;">Hi there,</p>
        <div class="document-card">
          <h3 style="margin:0 0 8px 0; color:#1a202c;">Q4 Marketing Strategy.pdf</h3>
          <p style="margin:0; color:#4a5568; font-size:14px;">Shared by <strong>Mike Johnson</strong> • 2.4 MB</p>
        </div>
        <p style="color:#4a5568; line-height:1.6;">
          A new document has been shared with you. Click below to view and download the file.
        </p>
        <div style="text-align:center;">
          <a href="#" class="cta-button">View Document</a>
        </div>
      </div>
      <div class="footer">
        This is an automated notification from DesignHUB
      </div>
    </div>
  </body>
</html>`,
    emailSubject: "New Document Shared: Q4 Marketing Strategy.pdf",
    from: `phish-sheriff@${availableDomains[0]}`,
    status: false,
    landingPages: [],
    courses: [],
  },
  {
    id: "av-4",
    name: "CEO Impersonation",
    description:
      "Business Email Compromise attack impersonating company executives for wire transfers",
    category: "credential-harvesting",
    subCategory: "keylogger",
    type: "submission",
    tropicality: "appraisal",
    startDate: new Date("2024-03-01T00:00:00"),
    endDate: new Date("2024-04-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f5f7fa;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #333333;
      }
      .email-container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      .header {
        background-color: #0f172a;
        color: #ffffff;
        text-align: center;
        padding: 24px 20px;
        font-size: 22px;
        font-weight: 600;
      }
      .hero {
        text-align: center;
        padding: 32px 20px 20px;
      }
      .hero img {
        width: 72px;
        height: 72px;
        margin-bottom: 16px;
      }
      .content {
        padding: 0 32px 32px;
        font-size: 15px;
        line-height: 1.6;
        color: #444;
      }
      .cta {
        display: inline-block;
        background-color: #2563eb;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-weight: 500;
        margin-top: 12px;
      }
      .divider {
        height: 1px;
        background-color: #e5e7eb;
        margin: 24px 0;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #9ca3af;
        padding: 16px 24px 24px;
      }
      .footer a {
        color: #9ca3af;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">DesignHUB</div>
      <div class="hero">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png"
          alt="Welcome Icon"
        />
        <h2 style="margin: 0; color: #111827;">Welcome to DesignHUB 🎉</h2>
      </div>
      <div class="content">
        <p>Hi <strong>Durgesh</strong>,</p>
        <p>
          We're thrilled to have you join our creative community! You can now
          explore design templates, collaborate with teams, and build your next
          project — all in one place.
        </p>
        <p>
          Click below to get started and personalize your workspace.
        </p>
        <p style="text-align: center;">
          <a href="#" class="cta">Go to Dashboard</a>
        </p>
        <div class="divider"></div>
        <p style="font-size: 13px; color: #6b7280;">
          If you have any questions, feel free to reach out at
          <a href="mailto:support@designhub.com">support@designhub.com</a>.
        </p>
      </div>
      <div class="footer">
        © 2025 DesignHUB, Inc. All rights reserved.<br />
        221B Baker Street, London, UK<br /><br />
        <a href="#">Unsubscribe</a> · <a href="#">Privacy Policy</a>
      </div>
    </div>
  </body>
</html>`,
    emailSubject: "Welcome to DesignHUB 🎉",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [],
    courses: [],
  },
];

export const attackVectorSubCategories: Record<
  string,
  { value: string; label: string }[]
> = {
  phishing: [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "voice", label: "Voice (Vishing)" },
    { value: "web", label: "Web (Fake Sites)" },
  ],
  "social-engineering": [
    { value: "pretexting", label: "Pretexting" },
    { value: "baiting", label: "Baiting" },
    { value: "quid-pro-quo", label: "Quid Pro Quo" },
    { value: "tailgating", label: "Tailgating" },
  ],
  malware: [
    { value: "ransomware", label: "Ransomware" },
    { value: "trojan", label: "Trojan" },
    { value: "spyware", label: "Spyware" },
    { value: "worm", label: "Worm" },
  ],
  "credential-harvesting": [
    { value: "keylogger", label: "Keylogger" },
    { value: "fake-login", label: "Fake Login Page" },
    { value: "session-hijacking", label: "Session Hijacking" },
    { value: "password-spray", label: "Password Spray" },
  ],
};


export const filterGroups: FilterGroup[] = [
  {
    title: "Category",
    key: "category",
    options: [
      { label: "Social Engineering", value: "social-engineering", count: 1 },
      { label: "Phishing", value: "phishing", count: 1 },
      { label: "Malware", value: "malware", count: 1 },
      { label: "Credential Harvesting", value: "credential-harvesting", count: 1 },
    ],
  },
  {
    title: "Type",
    key: "type",
    options: [
      { label: "Click", value: "click", count: 2 },
      { label: "Submission", value: "submission", count: 2 },
    ],
  },
  {
    title: "Status",
    key: "status",
    options: [
      { label: "Active", value: "true", count: 3 },
      { label: "Inactive", value: "false", count: 1 },
    ],
  },
  {
    title: "Tropicality",
    key: "tropicality",
    options: [
      { label: "Custom", value: "custom", count: 2 },
      { label: "Diwali", value: "diwali", count: 1 },
      { label: "Appraisal", value: "appraisal", count: 1 },
    ],
  },
];
