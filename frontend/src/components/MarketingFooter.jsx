import { Link } from "react-router-dom";
import MaterialIcon from "./MaterialIcon";

const MarketingFooter = ({ compact = false }) => {
  if (compact) {
    return (
      <footer className="grid w-full grid-cols-1 gap-8 bg-slate-900 px-8 py-12 text-white md:grid-cols-3">
        <div>
          <span className="mb-4 block font-headline text-lg font-black text-white">Iconic Transformers</span>
          <p className="font-body text-xs uppercase tracking-widest leading-relaxed text-slate-500">
            © {new Date().getFullYear()} Iconic Transformers. Engineering Excellence.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/contact" className="font-body text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-white">
            Contact
          </Link>
          <Link to="/about" className="font-body text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-white">
            About
          </Link>
          <span className="font-body text-xs uppercase tracking-widest text-slate-500">Privacy Policy</span>
          <span className="font-body text-xs uppercase tracking-widest text-slate-500">Terms of Service</span>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <p className="mb-4 font-body text-xs uppercase tracking-widest text-teal-400">Newsletter</p>
          <div className="flex w-full max-w-xs">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-l-lg border-none bg-slate-800 p-2 text-xs focus:ring-1 focus:ring-primary-container"
            />
            <button type="button" className="rounded-r-lg bg-primary px-4 py-2 text-xs font-bold text-white">
              JOIN
            </button>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-900 px-6 pb-12 pt-24 text-slate-400 md:px-8">
      <div className="container mx-auto">
        <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-4">
          <div>
            <div className="mb-6 text-2xl font-black text-white">Iconic Transformers.</div>
            <p className="mb-8 text-sm leading-relaxed">
              Precision engineering for the global energy transition. Leading the industry in transformer reliability and diagnostic intelligence.
            </p>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 transition-colors hover:bg-primary hover:text-white">
                <MaterialIcon name="share" className="text-xl" />
              </div>
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 transition-colors hover:bg-primary hover:text-white">
                <MaterialIcon name="language" className="text-xl" />
              </div>
            </div>
          </div>
          <div>
            <h5 className="mb-8 text-xs font-bold uppercase tracking-widest text-white">Core Services</h5>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/services" className="transition-colors hover:text-primary">On-Site Maintenance</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-primary">Oil Purification</Link></li>
              <li><Link to="/ai-tools" className="transition-colors hover:text-primary">Asset Monitoring</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-primary">Emergency Repair</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-8 text-xs font-bold uppercase tracking-widest text-white">Corporate</h5>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="transition-colors hover:text-primary">About Us</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-primary">Project Portfolio</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-primary">Careers</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-8 text-xs font-bold uppercase tracking-widest text-white">Headquarters</h5>
            <p className="mb-4 text-sm">
              Precision Plaza, Ind. Zone 4
              <br />
              Zurich, Switzerland CH-8001
            </p>
            <p className="mb-2 text-sm font-bold text-white">+41 44 123 4567</p>
            <p className="text-sm text-primary">eng@iconic-transformers.tech</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 text-center text-[10px] font-black uppercase tracking-[0.3em] md:flex-row">
          <div>© {new Date().getFullYear()} Iconic Transformers. Engineering Excellence.</div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <span className="cursor-pointer transition-colors hover:text-white">Legal</span>
            <span className="cursor-pointer transition-colors hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer transition-colors hover:text-white">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
