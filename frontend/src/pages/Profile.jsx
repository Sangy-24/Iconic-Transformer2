import { useEffect, useState } from "react";
import MaterialIcon from "../components/MaterialIcon";

const stats = [
  { icon: "bolt", label: "Active Services", value: "12", trend: "+2.4%" },
  { icon: "calendar_today", label: "Next Maintenance", value: "Oct 24, 2024" },
  { icon: "shopping_cart", label: "Total Orders", value: "84" },
  { icon: "heart_plus", label: "Wishlist Items", value: "07" },
];

const serviceHistory = [
  { item: "Core Flux Calibrator", protocol: "Maintenance Protocol A-4", date: "Sep 12, 2024", expert: "M. Sadowski", status: "Certified" },
  { item: "Thermal Bypass Link", protocol: "Component Replacement", date: "Aug 28, 2024", expert: "A. Chen", status: "Certified" },
  { item: "Quantum Seal Integrity", protocol: "Annual Inspection", date: "July 04, 2024", expert: "D. Vance", status: "Archived", archived: true },
];

const Profile = () => {
  const [userName, setUserName] = useState("Operator");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj && userObj.name) {
          setUserName(userObj.name);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-surface p-6 pb-28 md:p-10 md:pb-20">
      <header className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tighter text-on-background md:text-4xl">
            Good Morning, <span className="text-primary">{userName}</span>.
          </h1>
          <p className="font-medium text-secondary opacity-80">Your systems are 98.4% efficient.</p>
        </div>
      <div className="flex items-center gap-2 rounded-full bg-surface-container-lowest px-4 py-2 shadow-[0_10px_20px_rgba(32,44,57,0.04)]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        <span className="text-xs font-headline font-bold tracking-tight text-on-surface">SYSTEMS NOMINAL</span>
      </div>
    </header>

    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-industrial transition-all duration-300 hover:shadow-xl"
        >
          <div className="mb-4 flex items-start justify-between">
            <MaterialIcon name={stat.icon} className="rounded-lg bg-primary-container/20 p-2 text-primary" />
            {stat.trend && (
              <span className="rounded-full bg-primary-container/30 px-2 py-1 text-[10px] font-bold text-primary">
                {stat.trend}
              </span>
            )}
          </div>
          <p className="mb-1 font-label text-xs uppercase tracking-widest text-secondary">{stat.label}</p>
          <h3 className="font-headline text-2xl font-extrabold text-on-surface md:text-3xl">{stat.value}</h3>
        </div>
      ))}
    </section>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <section className="rounded-lg bg-surface-container-lowest p-8 shadow-industrial">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-headline text-xl font-bold tracking-tight text-on-surface">Active Order Tracking</h2>
            <span className="text-xs font-medium text-secondary opacity-60">ID: #IT-99201-B</span>
          </div>
          <div className="relative pb-8 pt-4">
            <div className="absolute left-0 top-8 z-0 h-0.5 w-full bg-surface-container-high" />
            <div className="absolute left-0 top-8 z-10 h-0.5 w-2/3 bg-primary" />
            <div className="relative z-20 flex justify-between">
              {[
                { label: "Booked", active: true, done: true },
                { label: "Scheduled", active: true, done: true },
                { label: "In-Progress", current: true },
                { label: "Completed", pending: true },
              ].map((step) => (
                <div key={step.label} className="flex flex-col items-center">
                  <div
                    className={`mb-3 flex items-center justify-center ring-4 ring-surface-container-lowest ${
                      step.current
                        ? "h-10 w-10 -mt-1 rounded-full bg-primary-container text-primary shadow-lg"
                        : step.done
                          ? "h-8 w-8 rounded-full bg-primary text-white"
                          : "h-8 w-8 rounded-full bg-surface-container-high text-secondary"
                    }`}
                  >
                    <MaterialIcon
                      name={step.current ? "sync" : step.done ? "check" : "done_all"}
                      className={step.current ? "animate-spin text-base" : "text-sm"}
                      filled={step.done}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-headline uppercase tracking-tighter ${
                      step.current ? "font-extrabold text-primary" : step.pending ? "font-bold text-secondary/40" : "font-extrabold text-on-surface"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg bg-surface-container-lowest shadow-industrial">
          <div className="p-8 pb-4">
            <h2 className="font-headline text-xl font-bold tracking-tight text-on-surface">Service History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-surface-container-low">
                  {["Service Item", "Date", "Expert", "Status"].map((heading) => (
                    <th key={heading} className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {serviceHistory.map((row) => (
                  <tr key={row.item} className="transition-colors hover:bg-surface-container-low/50">
                    <td className="px-8 py-5">
                      <div className="font-headline font-bold text-on-surface">{row.item}</div>
                      <div className="text-xs text-secondary opacity-60">{row.protocol}</div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-secondary">{row.date}</td>
                    <td className="px-8 py-5 text-sm font-medium text-on-surface">{row.expert}</td>
                    <td className="px-8 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                          row.archived ? "bg-error-container/40 text-error" : "bg-primary-container/20 text-primary"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="space-y-8">
        <section className="glass-panel relative overflow-hidden rounded-lg border border-white/20 p-8 shadow-[0_20px_40px_rgba(32,44,57,0.1)]">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-container/20 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3">
              <MaterialIcon name="warning" className="text-primary" />
              <h2 className="font-headline text-lg font-bold tracking-tight text-on-surface">Critical Window</h2>
            </div>
            <p className="mb-8 text-sm leading-relaxed text-secondary">
              Your <strong>T-400 Transformer</strong> requires a coolant flush within the next 48 hours to maintain peak efficiency.
            </p>
            <div className="mb-8 flex gap-4">
              {[
                { value: "01", label: "Days" },
                { value: "14", label: "Hours" },
                { value: "32", label: "Mins" },
              ].map((item) => (
                <div key={item.label} className="neumorphic-press flex-1 rounded-lg bg-white/40 p-3 text-center">
                  <div className="font-headline text-2xl font-black text-primary">{item.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-secondary">{item.label}</div>
                </div>
              ))}
            </div>
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full bg-on-background py-4 font-headline font-bold text-white shadow-lg transition-all hover:bg-slate-800">
              Confirm Maintenance
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-industrial">
          <div className="mb-6 flex items-center gap-3">
            <MaterialIcon name="auto_awesome" className="text-primary" />
            <h2 className="font-headline text-lg font-bold tracking-tight text-on-surface">AI Insights</h2>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border-l-4 border-primary bg-surface-container-low p-4">
              <h4 className="mb-1 text-xs font-bold uppercase text-on-surface">Predictive Alert</h4>
              <p className="text-xs text-secondary">
                Based on usage patterns, your energy consumption may rise 12% next month. Optimal transformer reconfiguration is suggested.
              </p>
            </div>
            <div className="rounded-lg bg-surface-container-low p-4">
              <h4 className="mb-1 text-xs font-bold uppercase text-on-surface">Performance Bench</h4>
              <p className="text-xs text-secondary">You are performing in the top 5% of regional commercial accounts for efficiency.</p>
            </div>
            <button type="button" className="w-full rounded-lg border border-outline-variant py-3 font-headline text-sm font-bold text-secondary transition-all hover:bg-surface-container-low">
              View Full Analysis
            </button>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Profile;
