import React from 'react';
import { Shield, Zap, Wrench, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const facts = [
  { label: 'Years of Experience', value: '25+', icon: FileText },
  { label: 'Transformers Manufactured', value: '50,000+', icon: Zap },
  { label: 'Clients Served', value: '1,500+', icon: Shield },
  { label: 'Manufacturing Capacity', value: '10,000 / Yr', icon: Wrench }
];

const services = [
  { name: 'Transformer Installation', desc: 'Expert installation of commercial and industrial transformers.' },
  { name: 'Transformer Maintenance', desc: 'Predictive and preventative maintenance powered by AI.' },
  { name: 'Transformer Testing', desc: 'Comprehensive testing and diagnostics.' },
  { name: 'Oil Filtration', desc: 'Professional oil testing, filtration, and replacement.' },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-brand-dark text-white py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=2070" 
            alt="Industrial Background" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Powering the Future of <span className="text-brand-accent">Industry</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            Intelligent transformer manufacturing and predictive maintenance solutions.
          </p>
          <div className="flex justify-center space-x-4 mt-8">
            <Link to="/services" className="px-8 py-4 bg-brand-accent hover:bg-blue-600 rounded-lg text-lg font-bold transition-all shadow-lg hover:shadow-brand-accent/50">
              View Our Services
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-brand-dark rounded-lg text-lg font-bold transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">About Iconic Transformers</h2>
            <p className="text-xl text-brand-grey max-w-3xl mx-auto">
              We lead the industry in advanced transformer manufacturing, employing cutting-edge techniques and AI-powered operational frameworks.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="bg-brand-light p-6 rounded-xl text-center shadow-sm w-full md:w-64 border border-gray-100">
              <Shield className="w-12 h-12 text-brand-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">ISO 9001:2015</h3>
              <p className="text-brand-grey text-sm">Certified Manufacturing</p>
            </div>
            <div className="bg-brand-light p-6 rounded-xl text-center shadow-sm w-full md:w-64 border border-gray-100">
              <Zap className="w-12 h-12 text-brand-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Electrical Safety</h3>
              <p className="text-brand-grey text-sm">Global Compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fact Sheet */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facts.map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <div key={idx} className="text-center p-8 border border-gray-800 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <Icon className="w-10 h-10 text-brand-accent mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{fact.value}</div>
                  <div className="text-brand-grey uppercase tracking-wider text-sm">{fact.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">Our Services</h2>
            <p className="text-xl text-brand-grey max-w-3xl mx-auto">
              Comprehensive solutions from installation to AI-driven health monitoring.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">{service.name}</h3>
                <p className="text-brand-grey text-lg mb-6">{service.desc}</p>
                <Link to="/services" className="text-brand-accent font-semibold hover:text-blue-700 flex items-center">
                  Learn More <span className="ml-2">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
