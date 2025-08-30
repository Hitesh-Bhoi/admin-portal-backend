function resetPasswordTemplate({ userInfo, token, expiresIn }) {
  return `
    <!doctype html>
    <html>
      <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px; text-align: center;">
        <div style="max-width:600px; margin:auto; background:#fff; padding:24px; border-radius:8px; border:1px solid #e5e7eb;">
          <img src="https://admin-portal-topaz.vercel.app/icons/brand/gn.png" 
          alt="Brand Logo" 
          width="150" 
          style="display:block; margin:auto;" />
          <h2 style="color:#111827;">Reset your password</h2>
          <h3 style="color:#111827;">Hi ${userInfo.fullname}</h3>
          <p style="color:#111827; font-size:14px; line-height:20px;">
          we received a request to reset the password for your account.
        </p>
        <p style="color:#111827; font-size:14px; line-height:20px;">
        Click the button below to reset your password, This link is valid for 
        <b>${expiresIn}</b>.
        </p>
          <p style="text-align:center; margin:24px 0;">
            <a href="http://localhost:3000/reset-password?token=${token}" style="background:#2563eb; color:white; padding:12px 20px; border-radius:6px; text-decoration:none; font-weight:600;">
              Reset Password
            </a>
          </p>
        </div>
      </body>
    </html>
  `;
}

module.exports = resetPasswordTemplate;
