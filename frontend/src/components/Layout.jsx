import { Link } from 'react-router-dom';
import { Bot, User, LogIn } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-brand-dark text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-brand-accent">Iconic Transformers</span>
          </Link>
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
            <Link to="/about" className="hover:text-brand-accent transition-colors">About</Link>
            <Link to="/services" className="hover:text-brand-accent transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-brand-accent transition-colors">Contact</Link>
          </nav>
          <div className="flex space-x-4">
            <Link to="/profile" className="flex items-center text-sm font-medium hover:text-brand-accent transition-colors">
              <User size={18} className="mr-1" /> Profile
            </Link>
            <Link to="/login" className="flex items-center text-sm font-medium bg-brand-accent px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              <LogIn size={18} className="mr-1" /> Login
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-brand-light">
        {children}
      </main>

      <footer className="bg-brand-dark text-brand-grey py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Iconic Transformers</h3>
            <p className="text-sm">Leading manufacturer and service provider for industrial transformers worldwide.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-accent">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-accent">Our Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Industrial Ave, Tech City, 10001</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Email: info@iconictransformers.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">AI Features</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ai-tools" className="hover:text-brand-accent">Predictive Maintenance</Link></li>
              <li><Link to="/ai-tools" className="hover:text-brand-accent">Demand Forecasting</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          &copy; {new Date().getFullYear()} Iconic Transformers and Electricals. All rights reserved.
        </div>
      </footer>
      
      {/* Floating Chatbot Placeholder */}
      <button className="fixed bottom-6 right-6 p-4 bg-brand-accent text-white rounded-full shadow-lg hover:bg-blue-600 transition-all z-50">
        <Bot size={28} />
      </button>
    </div>
  );
}

export default Layout;
