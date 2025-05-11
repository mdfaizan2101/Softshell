import { useState } from 'react';

function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', type: '', message: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="email" placeholder="Email" required type="email" onChange={handleChange} />
        <input name="company" placeholder="Company" onChange={handleChange} />
        <select name="type" onChange={handleChange}>
          <option value="">License Type</option>
          <option>Enterprise</option>
          <option>Individual</option>
        </select>
        <textarea name="message" placeholder="Message" onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default ContactForm;
