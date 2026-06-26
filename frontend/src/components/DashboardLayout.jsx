import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import MaterialIcon from "./MaterialIcon";

const sidebarLinks = [
  { to: "/profile", label: "Dashboard", icon: "dashboard" },
  { to: "/services", label: "Services", icon: "handyman" },
  { to: "/profile", label: "Orders", icon: "receipt_long", tab: "orders" },
  { to: "/profile", label: "Wishlist", icon: "favorite", tab: "wishlist" },
  { to: "/profile", label: "Profile", icon: "person", tab: "profile" },
  { to: "/ai-tools", label: "AI Tools", icon: "psychology" },
  { to: "/admin", label: "Admin", icon: "admin_panel_settings" },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!token || !storedUser) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredLinks = sidebarLinks.filter((item) => {
    if (item.to === "/admin" && user?.role !== "admin") {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-slate-900 px-4 py-6 shadow-2xl md:flex">
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/20">
              <MaterialIcon name="precision_manufacturing" className="text-teal-400" filled />
            </div>
            <div>
              <h2 className="font-headline text-lg font-bold leading-none text-teal-400">Precision Panel</h2>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">Industrial OS v2.0</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {filteredLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/profile" && !item.tab}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive && (item.to !== "/profile" || !item.tab)
                    ? "border-r-4 border-teal-500 bg-teal-500/10 text-teal-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`
              }
            >
              <MaterialIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-1 border-t border-slate-800/50 pt-6">
          <Link
            to="/contact"
            className="flex items-center gap-3 px-4 py-2 text-xs text-slate-400 transition-colors hover:text-slate-100"
          >
            <MaterialIcon name="help" className="text-sm" />
            <span>Help Center</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2 text-xs text-slate-400 transition-colors hover:text-slate-100 text-left bg-transparent border-0 cursor-pointer"
          >
            <MaterialIcon name="logout" className="text-sm" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="min-h-screen md:pl-64">
        <Outlet />
      </main>

      <nav className="glass-panel fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around px-4 shadow-[0_-4px_20px_rgba(32,44,57,0.1)] md:hidden">
        <NavLink to="/profile" className="flex flex-col items-center gap-1 text-slate-500">
          <MaterialIcon name="dashboard" />
          <span className="text-[10px] font-bold">DASHBOARD</span>
        </NavLink>
        <NavLink to="/ai-tools" className="flex flex-col items-center gap-1 text-teal-600">
          <MaterialIcon name="psychology" filled />
          <span className="text-[10px] font-bold">AI TOOLS</span>
        </NavLink>
        <NavLink to="/profile" className="flex flex-col items-center gap-1 text-slate-500">
          <MaterialIcon name="person" />
          <span className="text-[10px] font-bold">PROFILE</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default DashboardLayout;
