import './ContactScreen.css'
import React from 'react';

function ContactScreen() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('We will be in contact with you soon.');
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us at <strong>support@arttocart.com</strong>.</p>
      <p>Phone: +91 98765 43210</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ContactScreen;