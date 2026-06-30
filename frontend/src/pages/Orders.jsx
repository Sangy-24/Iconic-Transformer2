import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon";
import { useCart } from "../context/CartContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { showToast } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("Access key required. Please log in.", "error");
        navigate("/login");
        return;
      }
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to load orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Could not retrieve order history. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate, showToast]);

  const getOrderStatusBadgeClass = (status) => {
    switch (status) {
      case "Placed":
        return "bg-sky-500/10 text-sky-600 border border-sky-500/20";
      case "Processing":
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
      case "Completed":
        return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
      case "Cancelled":
        return "bg-rose-500/10 text-rose-600 border border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border border-slate-500/20";
    }
  };

  const getPaymentStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
      case "Paid":
        return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border border-slate-500/20";
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-semibold text-secondary">Loading Order History...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface p-6 pb-28 md:p-10 md:pb-20">
      <header className="mb-10">
        <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tighter text-on-background md:text-4xl">
          Order <span className="text-primary">History</span>
        </h1>
        <p className="font-medium text-secondary opacity-80">
          Monitor your active service allocations, logs, and dispatch states.
        </p>
      </header>

      {error && (
        <div className="rounded-lg bg-red-500/10 p-6 text-center border border-red-500/20 max-w-4xl mb-6">
          <MaterialIcon name="error" className="text-4xl text-red-500 mb-2" />
          <p className="font-bold text-red-500">{error}</p>
        </div>
      )}

      {orders.length === 0 ? (
        <section className="glass-card flex flex-col items-center justify-center rounded-lg p-16 text-center shadow-industrial border border-outline-variant/10 max-w-4xl">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <MaterialIcon name="receipt_long" className="text-4xl" />
          </div>
          <h2 className="mb-2 font-headline text-2xl font-bold text-on-surface">No Orders Found</h2>
          <p className="mb-8 max-w-md text-secondary">
            You haven't placed any service orders yet. Select one of our diagnostic or AMC packages to get started.
          </p>
          <Link
            to="/services"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-8 py-4 font-headline text-sm font-bold text-white shadow-lg transition-all hover:bg-primary active:scale-95"
          >
            Browse Services
            <MaterialIcon name="arrow_forward" className="text-sm" />
          </Link>
        </section>
      ) : (
        <div className="space-y-8 max-w-4xl">
          {orders.map((order) => (
            <div
              key={order._id}
              className="glass-card rounded-lg border border-outline-variant/10 bg-white/70 shadow-industrial overflow-hidden"
            >
              {/* Order Header Card */}
              <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 leading-none mb-1">Order Hash</p>
                  <p className="text-sm font-mono font-semibold tracking-tight text-teal-400">{order._id}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 leading-none mb-1">Date</p>
                    <p className="text-sm font-semibold">{new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 leading-none mb-1 text-right">Grand Total</p>
                    <p className="text-sm font-bold text-teal-400 text-right">Rs {order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">Order Status:</span>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getOrderStatusBadgeClass(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-4">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">Payment Status:</span>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getPaymentStatusBadgeClass(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="border-t border-outline-variant/10 pt-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Service Details</h3>
                  <div className="space-y-3">
                    {order.orderedServices.map((item) => (
                      <div key={item._id || item.serviceId} className="flex justify-between items-center bg-surface-container-low/30 rounded-lg p-3 border border-outline-variant/5">
                        <div>
                          <p className="text-sm font-bold text-on-surface">{item.name}</p>
                          <p className="text-xs text-secondary">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-headline font-black text-primary">
                          Rs {item.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {order.customerDetails && (
                  <div className="border-t border-outline-variant/10 pt-4 mt-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Allocated Technician Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-secondary">
                      <div>
                        <p><span className="font-bold text-slate-500">Contact Person:</span> {order.customerDetails.name}</p>
                        <p className="mt-1"><span className="font-bold text-slate-500">Email:</span> {order.customerDetails.email}</p>
                        <p className="mt-1"><span className="font-bold text-slate-500">Phone:</span> {order.customerDetails.phone}</p>
                      </div>
                      <div>
                        {order.customerDetails.address && (
                          <p><span className="font-bold text-slate-500">Address:</span> {order.customerDetails.address}</p>
                        )}
                        {order.customerDetails.notes && (
                          <p className="mt-1"><span className="font-bold text-slate-500">Special Notes:</span> {order.customerDetails.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
