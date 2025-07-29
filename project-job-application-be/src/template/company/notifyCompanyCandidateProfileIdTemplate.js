const notifyCompanyCandidateProfileIdTemplate = ({
    companyName,
    displayName,
    positionTitle
}) => {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>New Candidate Profile Received</title>
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
          <h2>New Candidate Profile Received</h2>
          <p>Dear ${companyName},</p>
          <p>
            A new candidate <strong>${displayName}</strong> has just applied for the position of
            <strong>${positionTitle}</strong> at your company.
          </p>
          <p>
            You can review their profile and CV by logging into your company dashboard.
          </p>
          <div class="footer">
            <p>Thank you for using our job application platform.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export default notifyCompanyCandidateProfileIdTemplate
