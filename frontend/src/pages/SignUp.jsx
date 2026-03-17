import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight, Briefcase } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup attempt', formData);
  };

  return (
    <div className="bg-brand-light min-h-screen py-24 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-brand-accent" />
          </div>
          <h1 className="text-3xl font-bold text-brand-dark mb-2">Create Account</h1>
          <p className="text-brand-grey">Join our intelligent workflow platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Account Type</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select name="role" value={formData.role} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all appearance-none cursor-pointer">
                <option value="customer">Customer</option>
                <option value="admin">Admin / Staff</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors flex justify-center items-center shadow-lg hover:shadow-xl">
            Register <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </form>

        <p className="text-center mt-8 text-brand-grey text-sm">
          Already have an account? <Link to="/login" className="text-brand-accent font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
