import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MarketingNav from "../components/MarketingNav";
import MarketingFooter from "../components/MarketingFooter";
import MaterialIcon from "../components/MaterialIcon";
import { useCart } from "../context/CartContext";

const categories = [
  "All Services",
  "Predictive Repair",
  "AMC Tiers",
  "Dielectric Testing",
  "Precision Tools",
];

const Services = () => {
  const [view, setView] = useState("grid");
  const [selectedCategories, setSelectedCategories] = useState(["All Services"]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, removeFromCart, cartItems, showToast } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error(err);
        setError("Could not load services. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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

  const handleAddToCart = async (service) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please log in to manage your cart", "error");
      navigate("/login");
      return;
    }
    await addToCart(service._id);
  };

  const handleRemoveFromCart = async (service) => {
    await removeFromCart(service._id);
  };

  const handleBuyNow = (service) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please log in to purchase services", "error");
      navigate("/login");
      return;
    }
    navigate(`/checkout?buyNow=${service._id}`);
  };

  const isServiceInCart = (serviceId) => {
    return cartItems.some((item) => (item.serviceId?._id || item.serviceId) === serviceId);
  };

  const filteredServices = services.filter((service) => {
    if (selectedCategories.includes("All Services") || selectedCategories.length === 0) {
      return true;
    }
    return selectedCategories.includes(service.category);
  });

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

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="font-semibold text-secondary">Initializing System Services...</p>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-500/10 p-6 text-center border border-red-500/20">
              <MaterialIcon name="error" className="text-4xl text-red-500 mb-2" />
              <p className="font-bold text-red-500">{error}</p>
            </div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-6"}>
              {filteredServices.map((service) => {
                const inCart = isServiceInCart(service._id);
                return (
                  <div
                    key={service._id}
                    className={`glass-card group relative overflow-hidden rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-industrial-lg ${
                      view === "list" ? "flex flex-col md:flex-row" : ""
                    }`}
                  >
                    <div className={`relative overflow-hidden ${view === "list" ? "h-48 md:h-auto md:w-72" : "h-64"}`}>
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute right-4 top-4">
                        <button type="button" className="rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-all hover:bg-white hover:text-error">
                          <MaterialIcon name="favorite" filled />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${service.labelClass || 'bg-primary-container text-on-primary-container'}`}>
                          {service.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 font-headline text-xl font-bold text-on-surface">{service.name}</h3>
                      <p className="mb-6 line-clamp-2 text-sm text-secondary">{service.description}</p>
                      <div className="mt-auto flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-tighter text-secondary">{service.priceLabel}</span>
                            <p className="text-2xl font-black text-primary">
                              {service.currency || 'Rs'}{service.price?.toLocaleString()}
                              <span className="text-sm font-normal text-secondary">{service.unit}</span>
                            </p>
                          </div>
                        </div>

                        {/* Order Options */}
                        <div className="flex gap-2 w-full mt-2">
                          {inCart ? (
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(service)}
                              className="flex items-center justify-center gap-1.5 rounded-lg border border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex-1"
                            >
                              <MaterialIcon name="remove_shopping_cart" className="text-sm" />
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleAddToCart(service)}
                              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-900 bg-slate-900 text-white hover:bg-primary hover:border-primary px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex-1"
                            >
                              <MaterialIcon name="shopping_cart" className="text-sm" />
                              Add
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleBuyNow(service)}
                            className="flex items-center justify-center gap-1.5 rounded-lg kinetic-gradient text-white hover:scale-105 active:scale-95 px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex-1"
                          >
                            <MaterialIcon name="bolt" className="text-sm" />
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <MarketingFooter compact />
    </div>
  );
};

export default Services;
