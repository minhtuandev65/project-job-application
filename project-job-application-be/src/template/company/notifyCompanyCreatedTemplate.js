const companyCreatedTemplate = ({ email, companyName }) => {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Company Registration Successful</title>
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
          <h2>Your Company Has Been Registered Successfully!</h2>
          <p>Hi ${email},</p>
          <p>
            We’ve received your registration for the company <strong>${companyName}</strong>.
          </p>
          <p>
            Our team will review your submission shortly. Once approved, you'll be able to manage your company profile and start posting job positions.
          </p>
          <p>
            If you have any questions or need assistance, feel free to contact our support team.
          </p>
          <div class="footer">
            <p>Thank you for using our platform.<br/>— The Job Application Team</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export default companyCreatedTemplate
