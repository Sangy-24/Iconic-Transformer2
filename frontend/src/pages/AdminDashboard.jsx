import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, Users, ShoppingBag, Box, Activity, Settings, Bell, Search } from 'lucide-react';

const data = [
  { name: 'Jan', orders: 400, revenue: 2400 },
  { name: 'Feb', orders: 300, revenue: 1398 },
  { name: 'Mar', orders: 200, revenue: 9800 },
  { name: 'Apr', orders: 278, revenue: 3908 },
  { name: 'May', orders: 189, revenue: 4800 },
  { name: 'Jun', orders: 239, revenue: 3800 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex bg-brand-light min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white shadow-xl flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-brand-accent tracking-wider">Admin<span className="text-white">Panel</span></h2>
        </div>
        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            {[
              { id: 'Overview', icon: LayoutDashboard },
              { id: 'Orders', icon: ShoppingBag },
              { id: 'Inventory', icon: Box },
              { id: 'Customers', icon: Users },
              { id: 'AI Models', icon: Activity },
              { id: 'Services', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-6 py-4 text-left font-medium transition-colors ${
                      activeTab === item.id 
                        ? 'bg-brand-accent text-white border-l-4 border-white' 
                        : 'text-brand-grey hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-4" />
                    {item.id}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white px-8 py-5 shadow-sm border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand-dark">{activeTab}</h1>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-grey" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent w-64 text-sm" />
            </div>
            <button className="relative text-brand-grey hover:text-brand-dark transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3">
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-10 h-10 rounded-full border-2 border-brand-accent" />
              <span className="font-medium text-brand-dark text-sm">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-light p-8">
          {activeTab === 'Overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { title: 'Total Orders', value: '1,284', trend: '+12%', color: 'text-green-500', icon: ShoppingBag },
                  { title: 'Pending Orders', value: '32', trend: '-5%', color: 'text-red-500', icon: LayoutDashboard },
                  { title: 'Completed', value: '1,252', trend: '+14%', color: 'text-green-500', icon: CheckCircle },
                  { title: 'Low Inventory', value: '7', trend: 'Critical', color: 'text-orange-500', icon: Box },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-brand-grey font-medium text-sm">{stat.title}</h3>
                        <div className={`p-2 bg-gray-50 rounded-lg text-brand-dark`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-brand-dark mb-2">{stat.value}</div>
                      <span className={`text-xs font-bold ${stat.color}`}>{stat.trend}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chart & AI Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-brand-dark mb-6">Orders per Month</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="orders" stroke="#0EA5E9" strokeWidth={3} dot={{r: 4, fill: '#0EA5E9', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-brand-dark mb-6 flex items-center">
                    <Activity className="w-5 h-5 text-red-500 mr-2" /> AI Predictions
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                      <div className="font-bold text-red-700 text-sm mb-1">Transformer TR-402</div>
                      <div className="text-red-600 text-xs mb-2">Critical Failure Risk: 85%</div>
                      <div className="text-brand-dark text-xs font-medium">Predicted Failure: 10 Days</div>
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                      <div className="font-bold text-orange-700 text-sm mb-1">Transformer TR-119</div>
                      <div className="text-orange-600 text-xs mb-2">Maintenance Required</div>
                      <div className="text-brand-dark text-xs font-medium">Reason: Oil Degradation</div>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 bg-brand-dark text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">
                    View All AI Alerts
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'Overview' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">{activeTab} Management Dashboard</h2>
              <p className="text-brand-grey">This section is currently under construction for {activeTab.toLowerCase()} specifically.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Dummy check circle icon for stats block
const CheckCircle = ({className}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default AdminDashboard;
