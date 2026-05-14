import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send email)
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-12 text-center">
          GET IN TOUCH
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-pink-500 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-pink-500 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-pink-500 font-bold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-pink-500 font-bold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows="5"
                  className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-pink-500/50 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-8">
              <h3 className="text-2xl font-bold text-pink-500 mb-4">📍 Our Location</h3>
              <p className="text-gray-300 mb-4">
                High Trippy Mind's Drip Headquarters
              </p>
              <p className="text-cyan-400 font-bold">
                Quezon City, Philippines
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-8">
              <h3 className="text-2xl font-bold text-pink-500 mb-4">🕐 Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                <p>Saturday: 11:00 AM - 7:00 PM</p>
                <p>Sunday: 12:00 PM - 6:00 PM</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-8">
              <h3 className="text-2xl font-bold text-pink-500 mb-4">📱 Connect With Us</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: info@trippydrip.com</p>
                <p>Phone: +63 (0)2 1234 5678</p>
                <p>Facebook: @TrippyDripPH</p>
                <p>Instagram: @TrippyDripPH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
