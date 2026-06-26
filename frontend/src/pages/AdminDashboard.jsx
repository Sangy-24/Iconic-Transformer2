import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import MaterialIcon from "../components/MaterialIcon";

const chartData = [
  { name: "Jan", orders: 400 },
  { name: "Feb", orders: 300 },
  { name: "Mar", orders: 200 },
  { name: "Apr", orders: 278 },
  { name: "May", orders: 189 },
  { name: "Jun", orders: 239 },
];

const adminTabs = [
  { id: "Overview", icon: "dashboard" },
  { id: "Orders", icon: "receipt_long" },
  { id: "Inventory", icon: "inventory_2" },
  { id: "Customers", icon: "groups" },
  { id: "AI Models", icon: "psychology" },
  { id: "Services", icon: "handyman" },
];

const stats = [
  { title: "Total Orders", value: "1,284", trend: "+12%", positive: true, icon: "shopping_cart" },
  { title: "Pending Orders", value: "32", trend: "-5%", positive: false, icon: "pending_actions" },
  { title: "Completed", value: "1,252", trend: "+14%", positive: true, icon: "task_alt" },
  { title: "Low Inventory", value: "7", trend: "Critical", positive: false, icon: "warning" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj.role !== "admin") {
          navigate("/profile");
        }
      } catch (err) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface pb-28 md:pb-12">
      <header className="glass-panel sticky top-0 z-30 flex h-20 items-center justify-between px-6 shadow-industrial md:px-8">
        <div>
          <nav className="mb-1 flex items-center gap-2 text-sm text-secondary">
            <span>Industrial OS</span>
            <MaterialIcon name="chevron_right" className="text-xs" />
            <span className="font-semibold text-primary">Admin Panel</span>
          </nav>
          <h1 className="font-headline text-xl font-bold tracking-tighter text-slate-900">{activeTab}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
            <input
              type="text"
              placeholder="Search parameters..."
              className="w-64 rounded-full border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-container"
            />
          </div>
          <button type="button" className="rounded-full p-2 transition-colors hover:bg-surface-container-high">
            <MaterialIcon name="notifications" className="text-slate-600" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary-container">
            <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {adminTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-surface-container-low text-secondary hover:text-on-surface"
              }`}
            >
              <MaterialIcon name={tab.icon} className="text-base" />
              {tab.id}
            </button>
          ))}
        </div>

        {activeTab === "Overview" ? (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.title} className="rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-industrial">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-sm font-medium text-secondary">{stat.title}</h3>
                    <MaterialIcon name={stat.icon} className="rounded-lg bg-primary-container/20 p-2 text-primary" />
                  </div>
                  <div className="mb-2 text-3xl font-headline font-extrabold text-on-surface">{stat.value}</div>
                  <span className={`text-xs font-bold ${stat.positive ? "text-primary" : "text-error"}`}>{stat.trend}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="rounded-lg bg-surface-container-lowest p-6 shadow-industrial lg:col-span-2">
                <h3 className="mb-6 font-headline text-lg font-bold text-on-surface">Orders per Month</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E9E9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#535f6e" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#535f6e" }} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 20px 40px rgba(32,44,57,0.06)" }} />
                      <Line type="monotone" dataKey="orders" stroke="#1a6963" strokeWidth={3} dot={{ r: 4, fill: "#1a6963", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-lg bg-surface-container-lowest p-6 shadow-industrial">
                <h3 className="mb-6 flex items-center font-headline text-lg font-bold text-on-surface">
                  <MaterialIcon name="psychology" className="mr-2 text-error" />
                  AI Predictions
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-error-container/30 bg-error-container/10 p-4">
                    <div className="mb-1 text-sm font-bold text-error">Transformer TR-402</div>
                    <div className="mb-2 text-xs text-on-error-container">Critical Failure Risk: 85%</div>
                    <div className="text-xs font-medium text-on-surface">Predicted Failure: 10 Days</div>
                  </div>
                  <div className="rounded-lg border border-tertiary-container/30 bg-tertiary-container/10 p-4">
                    <div className="mb-1 text-sm font-bold text-tertiary">Transformer TR-119</div>
                    <div className="mb-2 text-xs text-on-tertiary-container">Maintenance Required</div>
                    <div className="text-xs font-medium text-on-surface">Reason: Oil Degradation</div>
                  </div>
                </div>
                <button type="button" className="mt-6 w-full rounded-lg bg-inverse-surface py-3 text-sm font-bold text-primary-container transition-colors hover:bg-black">
                  View All AI Alerts
                </button>
              </div>
            </div>

            <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
              {[
                { label: "Active Units", value: "1,204", width: "75%" },
                { label: "Throughput", value: "892 m/s", width: "50%" },
                { label: "Error Rate", value: "0.04%", width: "8%", error: true },
                { label: "Compute Load", value: "62%", width: "62%" },
              ].map((metric) => (
                <div key={metric.label} className="rounded-xl bg-surface-container-low p-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-secondary">{metric.label}</p>
                  <p className={`font-headline text-3xl font-extrabold ${metric.error ? "text-error" : "text-inverse-surface"}`}>
                    {metric.value}
                  </p>
                  <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
                    <div className={`h-full ${metric.error ? "bg-error" : "bg-primary"}`} style={{ width: metric.width }} />
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : (
          <div className="rounded-lg bg-surface-container-lowest p-12 text-center shadow-industrial">
            <MaterialIcon name="construction" className="mx-auto mb-4 text-5xl text-secondary" />
            <h2 className="mb-4 font-headline text-2xl font-bold text-on-surface">{activeTab} Management</h2>
            <p className="text-secondary">This section is currently under construction for {activeTab.toLowerCase()} management.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
