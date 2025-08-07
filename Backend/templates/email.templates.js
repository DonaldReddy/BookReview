class EmailTemplates {
    passwordResetEmailTemplate(userName, resetUrl) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Password Reset</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: white;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              color: #333;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #3b82f6;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📚 BookReview</h1>
              <h2>Password Reset Request</h2>
            </div>
            
            <p>Hello ${userName},</p>
            
            <p>We received a request to reset your password for your BookReview account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #3b82f6;">${resetUrl}</p>
            
            <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
            
            <p>If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.</p>
            
            <div class="footer">
              <p>Best regards,<br>The BookReview Team</p>
              <p style="font-size: 12px;">This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    verificationEmailTemplate(userName, verificationUrl) {
        return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Verify Your Email</title>
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background-color: #4f46e5; color: white; padding: 20px; text-align: center; }
					.content { padding: 20px; background-color: #f9f9f9; }
					.button { 
						display: inline-block; 
						padding: 12px 30px; 
						background-color: #4f46e5; 
						color: white; 
						text-decoration: none; 
						border-radius: 5px; 
						margin: 20px 0;
					}
					.footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Welcome to BookReview!</h1>
					</div>
					<div class="content">
						<h2>Hi ${userName}!</h2>
						<p>Thank you for signing up to BookReview. To complete your registration, please verify your email address by clicking the button below:</p>
						<div style="text-align: center;">
							<a href="${verificationUrl}" class="button">Verify Email Address</a>
						</div>
						<p>This verification link will expire in 24 hours.</p>
						<p>If you didn't create an account with us, please ignore this email.</p>
						<p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
						<p style="word-break: break-all; color: #4f46e5;">${verificationUrl}</p>
					</div>
					<div class="footer">
						<p>&copy; 2025 BookReview. All rights reserved.</p>
					</div>
				</div>
			</body>
			</html>
		`;
    }
}

export const emailTemplates = new EmailTemplates();
