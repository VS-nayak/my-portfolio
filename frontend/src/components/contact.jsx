import { useState } from 'react';

function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      alert('Message sent successfully!');

      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong: ' + error.message);
    }
  }

  return (
    <section className="contact" id="contact">

      <h1 className="section-title">Contact Me</h1>

      <p className="contact-description">
        Have a project or opportunity? Feel free to contact me.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Enter Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>

        <button type="submit">Send Message</button>

      </form>

    </section>
  );
}

export default Contact;