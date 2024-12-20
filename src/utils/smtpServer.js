// src/utils/smtpServer.js
import { SMTPServer } from "smtp-server";

const server = new SMTPServer({
  secure: false, // Disable TLS for local testing
  authOptional: true, // Disable authentication for local testing
  onData(stream, session, callback) {
    let emailData = "";

    stream.on("data", (chunk) => {
      emailData += chunk.toString();
    });

    stream.on("end", () => {
      console.log("Received email:", emailData); // Log email data for testing
      callback();
    });
  },
});

server.listen(2525, () => {
  console.log("SMTP server running on port 2525");
});
