export const notifyCandidateProfileStatusTemplate = ({
    displayName,
    companyName,
    status
}) => {
    const isAccepted = status === 'ACCEPTED'
    const resultMessage = isAccepted
        ? `🎉 Congratulations! Your Candidate Profile has been <strong>accepted</strong> by <strong>${companyName}</strong>.`
        : `❌ We regret to inform you that your Candidate Profile has been <strong>rejected</strong> by <strong>${companyName}</strong>.`

    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Notify about Candidate Profile</title>
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
            color: ${isAccepted ? '#28a745' : '#dc3545'};
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
          <h2>Candidate Profile ${isAccepted ? 'Accepted 🎉' : 'Rejected ❌'}</h2>
          <p>Hi ${displayName},</p>
          <p>${resultMessage}</p>
          <p>Thank you for applying and we encourage you to keep exploring new opportunities on our platform.</p>
          <div class="footer">
            <p>Best regards,<br/>The Recruitment Team</p>
          </div>
        </div>
      </body>
    </html>
  `
}
