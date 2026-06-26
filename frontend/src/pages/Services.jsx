import { useState } from "react";
import MarketingNav from "../components/MarketingNav";
import MarketingFooter from "../components/MarketingFooter";
import MaterialIcon from "../components/MaterialIcon";

const categories = [
  "All Services",
  "Predictive Repair",
  "AMC Tiers",
  "Dielectric Testing",
  "Precision Tools",
];

const services = [
  {
    id: 1,
    title: "Predictive Coil Calibration",
    desc: "Advanced algorithmic testing of winding integrity using harmonic resonance analysis.",
    price: "$2,400",
    unit: "/unit",
    label: "Repair",
    labelClass: "bg-primary-container text-on-primary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI5P4xl4wasc2iP-heJwr09hEHcF2Ftp7jzOLcDjg6DyqaL8Av5FJO43SGhGBkiiRES-lhov5bJlI3Z2RhwEaWmB1sHytQqkgdF_j9LH4UxgupzXR3Or34QZEQYDYyX2F4wUjqGbQYY8EuqSBYcYxJ36Dvh28mIc3hsYBBoAXEEV8nj3JqHtFg4qL9siMBZQXVmTgRWs0xHOfoBqmE7cLjDM_Bhpwvfygo9qTLfBaFhctS8xipQj5SYOJ0yFVGBrWig_-0j2ODbVI",
    priceLabel: "Starting at",
    action: "Add",
  },
  {
    id: 2,
    title: "Gold Maintenance Tier",
    desc: "Bi-annual onsite diagnostics with 24/7 remote monitoring and priority response times.",
    price: "Rs12,999",
    unit: "/yr",
    label: "AMC",
    labelClass: "bg-tertiary-container text-on-tertiary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtQtsLfc_u1findz0YAag4tZivia-ucSaxk4EnevhgQs6C-nm47_ht8vJIWW_ygLX3XaYH7MTAttjCRqUmqvMnzmG6QMPDvRf5EcPeyR4wXupruB8P-LFbkkD6x0-4893HwW88tzR0E5lhVP6D13X4QtCw-mdLnNSBTL2u2e8sCcGOr1sOOgnZcwEtgjZkVYm_O-l6x64SRuN8CC1fyk_T5GcTF8wrHDvtFkN9oEop-6Snqk1BOCHsGaF7FNQWA32nHC6O3M65sUc",
    priceLabel: "Annual Fee",
    action: "Quote",
  },
  {
    id: 3,
    title: "Dielectric Fluid Analysis",
    desc: "Full laboratory screening for moisture, acidity, and dissolved gas concentrations.",
    price: "Rs850",
    unit: "/test",
    label: "Testing",
    labelClass: "bg-secondary-container text-on-secondary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_mp4JtgNHPLIsXOotfziuRpfxq3txWY3Wck41o3hOpW00umjQquvRHfZsHxbEHyc-XeGqFJKhQBzBk27JH8ZrWZnzc2ri66kHsEkWAc2-eI5fo50SwTIzx5B26eEc0u-a3VSPvfkjDCGkvL6SyPga8ADBmsZgcij9Ge5eb3DQalvISwkze_naNR8ZEiTeqnJPfw0y-DQho9fOtYTTEY0XlT7unjNs-rUGXop-KStdT_rszr8KSjyQexSEPuL959Zf1MGnZvUYO8A",
    priceLabel: "Per Batch",
    action: "Add",
  },
  {
    id: 4,
    title: "Laser Core Alignment",
    desc: "Nanometer-precision structural alignment for maximum electromagnetic efficiency.",
    price: "Rs4,200",
    unit: "/fix",
    label: "Tools",
    labelClass: "bg-primary-container text-on-primary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-1a0Qdl2exLAyforEfZ-vmmHuIqQYVLphY4pvsgStAqbKRm3WqIo-3dWo5dlbDJhIHzVM7Nusvqi0qug40BgrCVfNeTRQ5D5NQurjYUEx11I6XcmUlX4khybMgIzKBAkcZW3pODo575zBY5tVc7rPwc24sI30nDG3k3ENsqlNB4xO5-ni9jT2gGya-NEAsJFJSS8wsc5-eyau_32SgSnXbP-Il2FlEVb4f5PBUHx4m2wpJKU1O09iiNeDHb2qLPOdxs6sC_p9Bj8",
    priceLabel: "Service Fee",
    action: "Add",
  },
  {
    id: 5,
    title: "Thermal Cooling Overhaul",
    desc: "Complete descaling of heat exchangers and fan motor efficiency optimization.",
    price: "Rs1,750",
    unit: "/unit",
    label: "Repair",
    labelClass: "bg-primary-container text-on-primary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnVpHEilyyxM2BxSCfvOTV6WavfRvgKPrt8JqOtHg9gddlY0OJokRoG8EaItSlB2O5YtsGf3mqzWAbMJB3gHq8Ehx0IGGLo9y552pKkijeMaoI6ui7paw5VlmYoS9r6QIq4-Nc1MtI3l-W8geoWFyW_P0i27C02BySIOG3OLQmAb4J1G41nt0D7kUaC-GHM-JD5N7nH_FzRcRjjKS3rV5srsSzpEZCwyPTe4ZdeIkow0qrn7oroMUp-Lhvqm36zsx7xeFScbqSU-c",
    priceLabel: "Base Rate",
    action: "Add",
  },
  {
    id: 6,
    title: "Neural Fault Predictor",
    desc: "Cloud-based AI subscription that predicts hardware failure 90 days in advance.",
    price: "Rs499",
    unit: "/mo",
    label: "AI Tools",
    labelClass: "bg-primary text-white",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBwxkayPJMp6S7Svaaw1nZ3rkz16ck2tYvivSlRQLGPnHwRJ3UsABVs1aoxug1y9nmxrpWzXZKJLE44oOq8k5hKttHdamOoIpB8K6HposektwuUiUlzTJi9qc0RF63mF5ex_b9DGp89-ujhtmRceYy_JqQRUz5BSTTLHwHxbiGtYmu0gf-5I-R2RbbdilTVWQauDRxBVlll8guaeQpeArTHxyufkU27hy1H4dvpCzW-JwEkgEmdTo9rJ5leE4A7QVb8s2pKSL60yA",
    priceLabel: "SaaS Plan",
    action: "Subscribe",
    primary: true,
  },
];

const Services = () => {
  const [view, setView] = useState("grid");
  const [selectedCategories, setSelectedCategories] = useState(["All Services"]);

  const toggleCategory = (category) => {
    if (category === "All Services") {
      setSelectedCategories(["All Services"]);
      return;
    }
    setSelectedCategories((prev) => {
      const withoutAll = prev.filter((item) => item !== "All Services");
      if (withoutAll.includes(category)) {
        const next = withoutAll.filter((item) => item !== category);
        return next.length ? next : ["All Services"];
      }
      return [...withoutAll, category];
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      <MarketingNav active="/services" />

      <main className="mx-auto flex max-w-screen-2xl gap-10 px-6 pb-20 pt-32 md:px-8">
        <aside className="hidden w-72 flex-shrink-0 lg:block">
          <div className="sticky top-32 space-y-8">
            <div>
              <h3 className="mb-6 font-headline text-lg font-bold text-on-surface">Service Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-surface-container-low"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-secondary group-hover:text-on-surface">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-inverse-surface p-6 text-white">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary-container">Premium Support</p>
              <h4 className="mb-4 text-xl font-bold">Industrial OS v2.0</h4>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Upgrade to enterprise-grade monitoring for real-time asset health analytics.
              </p>
              <button type="button" className="w-full rounded-lg bg-primary-container py-3 text-sm font-bold text-on-primary-container transition-all hover:brightness-110">
                Upgrade Now
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="mb-2 font-headline text-4xl font-extrabold tracking-tight">Industrial Services</h1>
              <p className="max-w-xl text-secondary">
                High-precision engineering maintenance and AI-driven diagnostics for global transformer networks.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-surface-container-low p-1">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`rounded-full px-6 py-2 text-sm font-bold transition-colors ${
                  view === "grid" ? "bg-white text-primary shadow-sm" : "text-secondary hover:text-on-surface"
                }`}
              >
                Grid View
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  view === "list" ? "bg-white text-primary shadow-sm" : "text-secondary hover:text-on-surface"
                }`}
              >
                List View
              </button>
            </div>
          </div>

          <div className={view === "grid" ? "grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-6"}>
            {services.map((service) => (
              <div
                key={service.id}
                className={`glass-card group relative overflow-hidden rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-industrial-lg ${
                  view === "list" ? "flex flex-col md:flex-row" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${view === "list" ? "h-48 md:h-auto md:w-72" : "h-64"}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute right-4 top-4">
                    <button type="button" className="rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-all hover:bg-white hover:text-error">
                      <MaterialIcon name="favorite" filled />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${service.labelClass}`}>
                      {service.label}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-headline text-xl font-bold text-on-surface">{service.title}</h3>
                  <p className="mb-6 line-clamp-2 text-sm text-secondary">{service.desc}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-tighter text-secondary">{service.priceLabel}</span>
                      <p className="text-2xl font-black text-primary">
                        {service.price}
                        <span className="text-sm font-normal text-secondary">{service.unit}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`flex items-center gap-2 rounded-lg p-3 transition-colors ${
                        service.primary
                          ? "bg-primary text-white shadow-lg shadow-primary/30 hover:brightness-110"
                          : "bg-slate-900 text-white hover:bg-primary"
                      }`}
                    >
                      <MaterialIcon name={service.primary ? "bolt" : "shopping_cart"} className="text-lg" />
                      <span className="text-xs font-bold uppercase tracking-widest">{service.action}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MarketingFooter compact />
    </div>
  );
};

export default Services;
