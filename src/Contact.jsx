import Hero from './HeroSection';
import { useState } from 'react';
const ContactAPI = import.meta.env.VITE_ContactAPI;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('Sending...');

    try {
      const response = await fetch(ContactAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message || "Thank you! Your message has been sent. I will get back to you shortly.");
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div>
      <Hero text="Contact Me" />
      <div className="container py-5">
        <p className="lead text-center mb-4">
          Got feedback, questions, or just want to say hi? Use the form below to get in touch.
        </p>

        {status !== 'idle' && (
          <div className={`alert ${status === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} id="contact-form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label"><strong>Name</strong></label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              name="name"
              value={form.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name="email"
              value={form.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label"><strong>Message</strong></label>
            <textarea 
              className="form-control" 
              id="message" 
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
