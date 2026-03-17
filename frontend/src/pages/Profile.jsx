import React, { useState } from 'react';
import { User, Mail, Settings, ShoppingCart, Heart, Clock, Box, ShieldCheck, ChevronRight } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  // Mock user data
  const user = {
    name: "Alex Sterling",
    email: "alex.sterling@example.com",
    avatar: "https://i.pravatar.cc/150?img=33",
    role: "Premium Partner"
  };

  const menuItems = [
    { id: 'Overview', icon: User },
    { id: 'Purchases & Orders', icon: Box },
    { id: 'Wishlist', icon: Heart },
    { id: 'My Cart', icon: ShoppingCart },
    { id: 'Settings', icon: Settings }
  ];

  return (
    <div className="bg-brand-light min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-brand-dark">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <h2 className="text-xl font-bold text-brand-dark">{user.name}</h2>
                <div className="flex items-center text-brand-grey text-sm mt-1 mb-4">
                  <Mail className="w-4 h-4 mr-2" /> {user.email}
                </div>
                <span className="bg-blue-50 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold border border-blue-100 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1" /> {user.role}
                </span>
              </div>
            </div>

            <nav className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="py-2">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button 
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${
                          activeTab === item.id 
                            ? 'bg-brand-accent/5 text-brand-accent border-r-4 border-brand-accent' 
                            : 'text-brand-dark hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center font-medium">
                          <Icon className={`w-5 h-5 mr-4 ${activeTab === item.id ? 'text-brand-accent' : 'text-brand-grey'}`} />
                          {item.id}
                        </div>
                        {activeTab === item.id && <ChevronRight className="w-5 h-5 text-brand-accent" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[600px]">
              {activeTab === 'Overview' && (
                <div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-6">Account Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="p-6 bg-brand-light rounded-2xl flex items-center">
                      <div className="bg-blue-100 p-3 rounded-xl mr-4"><ShoppingCart className="w-6 h-6 text-brand-accent" /></div>
                      <div>
                        <div className="text-2xl font-bold text-brand-dark">2</div>
                        <div className="text-sm font-medium text-brand-grey">Items in Cart</div>
                      </div>
                    </div>
                    <div className="p-6 bg-brand-light rounded-2xl flex items-center">
                      <div className="bg-red-100 p-3 rounded-xl mr-4"><Heart className="w-6 h-6 text-red-500" /></div>
                      <div>
                        <div className="text-2xl font-bold text-brand-dark">5</div>
                        <div className="text-sm font-medium text-brand-grey">Wishlist Items</div>
                      </div>
                    </div>
                    <div className="p-6 bg-brand-light rounded-2xl flex items-center">
                      <div className="bg-green-100 p-3 rounded-xl mr-4"><Box className="w-6 h-6 text-green-600" /></div>
                      <div>
                        <div className="text-2xl font-bold text-brand-dark">12</div>
                        <div className="text-sm font-medium text-brand-grey">Total Orders</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Order Placed: Standard Installation', date: 'Oct 24, 2025' },
                      { action: 'Added AI Maintenance to Wishlist', date: 'Oct 22, 2025' },
                      { action: 'Completed Service: Oil Filtration', date: 'Sep 15, 2025' }
                    ].map((act, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-brand-grey mr-4" />
                          <span className="font-medium text-brand-dark">{act.action}</span>
                        </div>
                        <span className="text-sm text-brand-grey">{act.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab !== 'Overview' && (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    {menuItems.find(m => m.id === activeTab)?.icon({ className: "w-10 h-10 text-brand-grey" })}
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">{activeTab} Details</h3>
                  <p className="text-brand-grey max-w-sm">This section integrates with our backend API to display your complete {activeTab.toLowerCase()} history.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
