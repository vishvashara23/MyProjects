import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert("Your message has been sent successfully!");
    setTimeout(() => setAlert(null), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="card w-full max-w-lg bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Get in Touch</h2>
        {alert && <div className="alert alert-success mb-4">{alert}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text text-gray-700">Your Name</span>
            </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="John Doe" 
              className="input input-bordered w-full rounded-lg shadow-md" 
              required 
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-gray-700">Your Email</span>
            </label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="example@mail.com" 
              className="input input-bordered w-full rounded-lg shadow-md" 
              required 
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-gray-700">Your Message</span>
            </label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Type your message here..." 
              className="textarea textarea-bordered w-full rounded-lg shadow-md" 
              rows="4" 
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-full text-lg font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
