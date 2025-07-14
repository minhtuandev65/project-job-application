const candidateProfileIdSuccessTemplate = ({ displayName, companyName }) => {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Candidate Profile Submitted Successfully</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #333333;
          }
          p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
          }
          .footer {
            margin-top: 30px;
            font-size: 13px;
            color: #999999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Candidate Profile Submitted Successfully!</h2>
          <p>Hi ${displayName},</p>
          <p>
            Your application to <strong>${companyName}</strong> has been received.
            Our team and the company will review your profile and get back to you soon.
          </p>
          <p>
            You can track your application status by logging in to your account at any time.
          </p>
          <div class="footer">
            <p>Thank you for using our job application platform.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export default candidateProfileIdSuccessTemplate
