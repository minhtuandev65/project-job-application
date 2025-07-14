export const notifyNewJobPostTemplate = ({
    displayName,
    companyName,
    positionTitles,
    address,
    category
}) => {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>New Job Opportunity</title>
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
            color: #007bff;
          }
          p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
          }
          .info {
            margin-top: 20px;
            font-size: 15px;
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 6px;
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
          <h2>New Job Opportunity Just For You!</h2>
          <p>Hi ${displayName},</p>
          <p>
            <strong>${companyName}</strong> has posted new job openings for the positions: <strong>${positionTitles}</strong>.

          </p>
          <div class="info">
            <p><strong>📍 Address:</strong> ${address}</p>
            <p><strong>🏢 Category:</strong> ${category}</p>
          </div>
          <p style="margin-top: 20px;">
            Log in to your account now to view more details and apply if you're interested.
          </p>
          <div class="footer">
            <p>Good luck with your job search!</p>
          </div>
        </div>
      </body>
    </html>
  `
}
