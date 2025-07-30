// src/components/EmailSender.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";

const EmailSender = () => {
  const [toName, setToName] = useState("");
  const [fromName, setFromName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_name: toName,
      from_name: fromName,
      message: message,
      reply_to: replyTo,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams,
        "YOUR_USER_ID" // Replace with your EmailJS public key (formerly user ID)
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email sent successfully!");
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Failed to send email.");
        }
      );
  };

  return (
    <div>
      <h2>Send Email</h2>
      <form onSubmit={sendEmail}>
        <input
          type="text"
          placeholder="To Name"
          value={toName}
          onChange={(e) => setToName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Your Name"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={replyTo}
          onChange={(e) => setReplyTo(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default EmailSender;
// https://www.emailjs.com
