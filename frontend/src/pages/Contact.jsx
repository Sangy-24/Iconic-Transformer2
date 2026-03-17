import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-brand-light min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-5xl font-bold mb-12 text-brand-dark text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details & Map */}
          <div>
            <div className="bg-brand-dark text-white rounded-3xl p-10 shadow-xl mb-8">
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <div className="flex flex-col gap-6 text-brand-grey">
                <div className="flex items-start">
                  <MapPin className="w-8 h-8 text-brand-accent mr-4 mt-1" />
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Head Office</h3>
                    <p>123 Industrial Avenue, Tech District</p>
                    <p>Innovation City, IN 10001</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-8 h-8 text-brand-accent mr-4" />
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Phone Number</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-8 h-8 text-brand-accent mr-4" />
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Email Address</h3>
                    <p>support@iconictransformers.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 rounded-3xl overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3022.2!2d-74.004!3d40.712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sus!4v1" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-brand-dark">Send a Message</h2>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-brand-dark" htmlFor="email">Email</label>
                  <input type="email" id="email" className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="john@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-brand-dark" htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark" htmlFor="message">Message</label>
                <textarea id="message" rows="5" className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="mt-4 bg-brand-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors flex justify-center items-center shadow-lg shadow-brand-accent/30">
                <Send className="w-5 h-5 mr-2" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
