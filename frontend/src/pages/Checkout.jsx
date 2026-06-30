import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import MaterialIcon from "../components/MaterialIcon";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const buyNowId = searchParams.get("buyNow");
  const navigate = useNavigate();

  const { cartItems, totalAmount: cartTotal, clearCart, fetchCart, showToast } = useCart();

  const [buyNowService, setBuyNowService] = useState(null);
  const [loadingService, setLoadingService] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize customer details if user object exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj) {
          setFullName(userObj.name || "");
          setEmail(userObj.email || "");
        }
      } catch (err) {
        console.error("Error parsing stored user details", err);
      }
    }
  }, []);

  // Fetch service if "Buy Now" path
  useEffect(() => {
    if (buyNowId) {
      const fetchSingleService = async () => {
        setLoadingService(true);
        try {
          const response = await fetch("http://localhost:5000/api/services");
          if (!response.ok) throw new Error("Failed to load service");
          const services = await response.json();
          const found = services.find((s) => s._id === buyNowId);
          if (found) {
            setBuyNowService(found);
          } else {
            showToast("Service not found", "error");
          }
        } catch (err) {
          console.error(err);
          showToast("Failed to fetch service detail", "error");
        } finally {
          setLoadingService(false);
        }
      };
      fetchSingleService();
    }
  }, [buyNowId]);

  // Determine items and totals based on cart vs buyNow
  const isBuyNow = !!buyNowId;
  const activeItems = isBuyNow
    ? buyNowService
      ? [{ serviceId: buyNowService, quantity: 1, price: buyNowService.price }]
      : []
    : cartItems;

  const totalAmount = isBuyNow
    ? buyNowService
      ? buyNowService.price
      : 0
    : cartTotal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeItems.length === 0) {
      showToast("No services selected for checkout", "error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Access key required. Please log in.", "error");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderedServices = activeItems.map((item) => ({
        serviceId: isBuyNow ? item.serviceId._id : item.serviceId._id,
        quantity: item.quantity,
      }));

      const payload = {
        orderedServices,
        customerDetails: {
          name: fullName,
          email,
          phone,
          address,
          notes,
        },
        fromCart: !isBuyNow, // Clear cart if this checkout came from Cart page
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      showToast("Order placed successfully! Redirecting...");
      
      // Refresh global cart state since database cart items might have been deleted
      if (!isBuyNow) {
        await fetchCart();
      }

      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingService) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-semibold text-secondary">Loading Order Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-6 pb-28 pt-32 md:px-8 md:pb-20">
      <header className="mb-10 mx-auto max-w-6xl">
        <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tighter text-on-background md:text-4xl">
          Secure <span className="text-primary">Checkout</span>
        </h1>
        <p className="font-medium text-secondary opacity-80">
          Complete details below to schedule transformer maintenance operations.
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <section className="glass-card rounded-lg border border-outline-variant/10 bg-white/70 p-8 shadow-industrial">
            <h2 className="mb-6 font-headline text-xl font-bold tracking-tight text-on-surface">
              Customer Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-widest text-outline">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-sm font-medium text-on-surface focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-outline">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@company.com"
                    className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-sm font-medium text-on-surface focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-outline">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-sm font-medium text-on-surface focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-outline">
                  Delivery Address (Optional)
                </label>
                <textarea
                  id="address"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Facility location where service will be performed"
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-sm font-medium text-on-surface focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="notes" className="text-xs font-bold uppercase tracking-widest text-outline">
                  Special Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any operational scheduling instructions or constraints"
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-sm font-medium text-on-surface focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>

              <button type="submit" className="hidden" /> {/* Hidden button to allow enter key submit */}
            </form>
          </section>
        </div>

        {/* Order Details Panel */}
        <div>
          <section className="glass-panel sticky top-32 rounded-lg border border-outline-variant/10 bg-white/70 p-8 shadow-industrial">
            <h2 className="mb-6 font-headline text-xl font-bold tracking-tight text-on-surface">Order Summary</h2>

            <div className="divide-y divide-outline-variant/10 max-h-60 overflow-y-auto mb-6">
              {activeItems.map((item) => {
                const service = item.serviceId;
                if (!service) return null;
                return (
                  <div key={service._id} className="py-4 flex gap-4 items-center justify-between text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-on-surface truncate">{service.name}</p>
                      <p className="text-xs text-secondary">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-headline font-black text-primary text-right">
                      {service.currency || 'Rs'}{(service.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                );
              })}
              {activeItems.length === 0 && (
                <p className="py-4 text-center text-xs text-slate-400">No items specified</p>
              )}
            </div>

            <div className="space-y-4 border-b border-outline-variant/20 pb-6 text-sm">
              <div className="flex justify-between text-secondary">
                <span>Direct Checkout</span>
                <span className="font-bold text-on-surface">{isBuyNow ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Payment Gateways</span>
                <span className="font-bold text-teal-600 font-headline uppercase text-[10px] tracking-widest bg-teal-500/10 px-2.5 py-1 rounded-full">Direct Place</span>
              </div>
            </div>

            <div className="my-6 flex justify-between">
              <span className="font-headline font-bold text-on-surface">Total Amount</span>
              <span className="font-headline text-2xl font-black text-primary">
                Rs {totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                disabled={isSubmitting || activeItems.length === 0}
                onClick={handleSubmit}
                className="flex w-full items-center justify-center gap-2 rounded-lg py-4 font-headline font-bold text-white kinetic-gradient shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing Order..." : "Place Order"}
                <MaterialIcon name="verified" className="text-sm" />
              </button>
              <Link
                to="/services"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant py-3.5 font-headline text-xs font-bold text-secondary transition-all hover:bg-surface-container-low"
              >
                Cancel & Return
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
