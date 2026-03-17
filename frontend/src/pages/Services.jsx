import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, Activity, Wrench, Zap, ShieldCheck } from 'lucide-react';

const mockServices = [
  { id: 1, name: 'AI Predictive Maintenance', category: 'Maintenance', price: '$2,500/yr', desc: 'Continuous AI monitoring of telemetry data to predict failures before they happen.', icon: Activity },
  { id: 2, name: 'Standard Installation', category: 'Installation', price: '$5,000', desc: 'Full installation of industrial transformers by certified professionals.', icon: Wrench },
  { id: 3, name: 'Comprehensive Testing', category: 'Testing', price: '$1,200', desc: 'Deep load and diagnostic testing to ensure safety and efficiency.', icon: Zap },
  { id: 4, name: '24/7 Monitoring Plan', category: 'Monitoring', price: '$1,800/yr', desc: 'Real-time monitoring and support plan for critical electrical infrastructure.', icon: ShieldCheck },
  { id: 5, name: 'Oil Filtration & Replacement', category: 'Maintenance', price: '$800', desc: 'High-quality oil testing, filtering, and replacement for longevity.', icon: Wrench },
];

const categories = ['All', 'Maintenance', 'Testing', 'Installation', 'Monitoring'];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServices = mockServices.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-brand-light min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-5xl font-bold mb-12 text-brand-dark text-center">Our Services</h1>
        
        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-12 flex flex-col md:flex-row gap-6 items-center border border-gray-100">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-grey w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium ${
                  activeCategory === cat 
                    ? 'bg-brand-accent text-white shadow-md' 
                    : 'bg-gray-100 text-brand-grey hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-4 bg-brand-light rounded-2xl group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="bg-brand-dark text-white text-sm font-bold px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-brand-dark">{service.name}</h3>
                <p className="text-brand-grey mb-6 flex-grow">{service.desc}</p>
                <div className="text-3xl font-bold text-brand-accent mb-8">{service.price}</div>
                
                <div className="flex flex-col gap-3 mt-auto">
                  <button className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold hover:bg-black transition-colors flex justify-center items-center">
                    Purchase Now
                  </button>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-brand-light text-brand-dark rounded-xl font-bold hover:bg-gray-200 transition-colors flex justify-center items-center border border-gray-200">
                      <ShoppingCart className="w-5 h-5 mr-2" /> Cart
                    </button>
                    <button className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors flex justify-center items-center border border-red-100">
                      <Heart className="w-5 h-5 mr-2" /> Wishlist
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-brand-grey text-xl">
            No services found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
