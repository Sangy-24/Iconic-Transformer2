import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, User, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth
    console.log('Login attempt', { email, password });
  };

  return (
    <div className="bg-brand-light min-h-screen py-24 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-brand-accent" />
          </div>
          <h1 className="text-3xl font-bold text-brand-dark mb-2">Welcome Back</h1>
          <p className="text-brand-grey">Login to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Email Address</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-brand-grey cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-gray-300 text-brand-accent focus:ring-brand-accent" />
              Remember me
            </label>
            <a href="#" className="text-brand-accent font-bold hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors flex justify-center items-center shadow-lg hover:shadow-xl">
            Sign In <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </form>

        <p className="text-center mt-8 text-brand-grey text-sm">
          Don't have an account? <Link to="/signup" className="text-brand-accent font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
