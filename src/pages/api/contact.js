// src/pages/api/contact.js
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    // Create the transport using your SMTP provider credentials from environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail", // Example: You can use Gmail as an SMTP service, adjust based on your provider
      auth: {
        user: process.env.SMTP_USER, // Your email (set in .env)
        pass: process.env.SMTP_PASS, // Your email password or app-specific password (set in .env)
      },
    });

    try {
      // Read the HTML template from the public folder
      const htmlFilePath = path.join(
        process.cwd(),
        "public",
        "email-template.html"
      );
      const emailHtml = fs.readFileSync(htmlFilePath, "utf-8");

      // Replace placeholders with the form data
      const finalHtml = emailHtml
        .replace("{{name}}", name)
        .replace("{{email}}", email)
        .replace("{{message}}", message)
        .replace("{{subject}}", subject);

      // Send the email
      await transporter.sendMail({
        from: process.env.SMTP_USER, // Sender's email (your email)
        to: email, // Recipient's email (from form input)
        subject: "Contact Us Form Submission",
        html: finalHtml, // Use the processed HTML as the email body
      });

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
