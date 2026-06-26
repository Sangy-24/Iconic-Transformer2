import { Link, NavLink } from "react-router-dom";
import MaterialIcon from "./MaterialIcon";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-teal-700 border-b-2 border-teal-500 pb-1 hover:-translate-y-0.5 transition-all duration-300"
    : "text-slate-600 hover:text-teal-700 hover:-translate-y-0.5 transition-all duration-300";

const MarketingNav = ({ active = "" }) => {
  const getClass = (path) => {
    if (active) {
      return path === active
        ? "text-teal-700 border-b-2 border-teal-500 pb-1 hover:-translate-y-0.5 transition-all duration-300"
        : "text-slate-600 hover:text-teal-700 hover:-translate-y-0.5 transition-all duration-300";
    }
    return navLinkClass;
  };

  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-white/70 px-6 shadow-industrial backdrop-blur-xl md:px-8">
      <Link to="/" className="font-headline text-xl font-bold tracking-tighter text-slate-900">
        Iconic Transformers
      </Link>

      <div className="hidden items-center gap-6 md:flex md:gap-8">
        <NavLink to="/" className={getClass("/")} end>
          Home
        </NavLink>
        <NavLink to="/about" className={getClass("/about")}>
          About
        </NavLink>
        <NavLink to="/services" className={getClass("/services")}>
          Services
        </NavLink>
        <NavLink to="/ai-tools" className={getClass("/ai-tools")}>
          AI Tools
        </NavLink>
        <NavLink to="/contact" className={getClass("/contact")}>
          Contact
        </NavLink>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden items-center gap-4 sm:flex">
          <MaterialIcon name="notifications" className="cursor-pointer text-secondary transition-transform hover:scale-110" />
          <MaterialIcon name="settings" className="cursor-pointer text-secondary transition-transform hover:scale-110" />
        </div>
        <Link
          to="/login"
          className="industrial-gradient rounded-full px-5 py-2.5 text-sm font-bold text-on-primary shadow-lg transition-all hover:scale-105 active:scale-95 md:px-6"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default MarketingNav;
