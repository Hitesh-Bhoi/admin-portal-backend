// utils/resetPasswordTemplate.js
function resetPasswordTemplate({ name, appName, resetUrl, expiresIn, logoUrl, appUrl, year, companyName, companyAddress }) {
  return `
    <!doctype html>
    <html>
      <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#fff; padding:24px; border-radius:8px; border:1px solid #e5e7eb;">
          <h2 style="color:#111827;">Reset your password</h2>
          <p>Hi ${name}, we received a request to reset the password for your <b>${appName}</b> account.</p>
          <p>Click the button below to reset your password. This link is valid for <b>${expiresIn}</b>.</p>
          <p style="text-align:center; margin:24px 0;">
            <a href="${resetUrl}" style="background:#2563eb; color:white; padding:12px 20px; border-radius:6px; text-decoration:none; font-weight:600;">
              Reset Password
            </a>
          </p>
          <p>If the button doesn’t work, copy this URL into your browser:</p>
          <p style="word-break:break-all; color:#2563eb;">${resetUrl}</p>
          <hr style="margin:20px 0;"/>
          <p style="font-size:12px; color:#6b7280;">
            Didn’t request this? You can ignore this email.
          </p>
          <p style="font-size:12px; color:#6b7280;">
            © ${year} ${companyName} • ${companyAddress}
          </p>
        </div>
      </body>
    </html>
  `;
}

module.exports = resetPasswordTemplate;
