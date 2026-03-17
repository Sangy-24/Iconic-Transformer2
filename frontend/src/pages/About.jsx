import React from 'react';
import { Target, Flag, Users, Cpu } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-brand-light min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-5xl font-bold mb-8 text-brand-dark">About Iconic Transformers</h1>
        
        <div className="bg-white rounded-2xl p-10 shadow-lg mb-12">
          <h2 className="text-3xl font-bold mb-6 text-brand-dark flex items-center">
            <Flag className="w-8 h-8 mr-3 text-brand-accent" /> Company History
          </h2>
          <p className="text-lg text-brand-grey mb-6 leading-relaxed">
            Founded over 25 years ago, Iconic Transformers and Electricals started as a small local manufacturer. 
            Today, we are a global leader in industrial transformer production and cutting-edge operational frameworks. 
            We have constantly evolved, integrating the latest AI and Machine Learning technologies into our products 
            to offer predictive maintenance and smart monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-brand-dark flex items-center">
              <Target className="w-8 h-8 mr-3 text-brand-accent" /> Mission
            </h2>
            <p className="text-lg text-brand-grey leading-relaxed">
              To provide the most reliable, efficient, and intelligent transformer solutions that power the future of global industries, while fostering an environment of continuous innovation and safety.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-brand-dark flex items-center">
              <Cpu className="w-8 h-8 mr-3 text-brand-accent" /> Vision
            </h2>
            <p className="text-lg text-brand-grey leading-relaxed">
              Leading the electrical infrastructure sector by fully integrating artificial intelligence and proactive operational methodologies into every transformer deployed worldwide.
            </p>
          </div>
        </div>

        <div className="bg-brand-dark rounded-2xl p-10 shadow-xl text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Users className="w-8 h-8 mr-3 text-brand-accent" /> Industries Served
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-white/10 rounded-xl text-center backdrop-blur-sm">Oil & Gas</div>
            <div className="p-4 bg-white/10 rounded-xl text-center backdrop-blur-sm">Renewable Energy</div>
            <div className="p-4 bg-white/10 rounded-xl text-center backdrop-blur-sm">Manufacturing</div>
            <div className="p-4 bg-white/10 rounded-xl text-center backdrop-blur-sm">Telecommunications</div>
            <div className="p-4 bg-white/10 rounded-xl text-center backdrop-blur-sm">Data Centers</div>
            <div className="p-4 bg-white/10 rounded-xl text-center backdrop-blur-sm">Healthcare</div>
            <div className="p-4 bg-white/10 rounded-xl text-center backdrop-blur-sm">Transportation</div>
            <div className="p-4 bg-white/10 rounded-xl text-center backdrop-blur-sm">Mining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
