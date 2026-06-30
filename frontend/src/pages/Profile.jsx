import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon";

const Profile = () => {
  const [userName, setUserName] = useState("Operator");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get user name
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

    // 2. Fetch orders
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (err) {
        console.error("Error fetching dashboard orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Compute dynamic stats
  const totalOrders = orders.length;
  const activeServices = orders.reduce((sum, order) => {
    if (order.orderStatus === "Placed" || order.orderStatus === "Processing" || order.orderStatus === "Completed") {
      return sum + order.orderedServices.length;
    }
    return sum;
  }, 0);

  // Next maintenance date calculation: if there's an active order, set it 14 days in future
  let nextMaintenance = "Not Scheduled";
  if (orders.length > 0) {
    const activeOrder = orders.find(o => o.orderStatus === "Placed" || o.orderStatus === "Processing");
    if (activeOrder) {
      const orderDate = new Date(activeOrder.createdAt);
      orderDate.setDate(orderDate.getDate() + 14);
      nextMaintenance = orderDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }

  const wishlistCount = 0; // Placeholder

  const stats = [
    { icon: "bolt", label: "Active Services", value: String(activeServices).padStart(2, "0") },
    { icon: "calendar_today", label: "Next Maintenance", value: nextMaintenance },
    { icon: "shopping_cart", label: "Total Orders", value: String(totalOrders).padStart(2, "0") },
    { icon: "heart_plus", label: "Wishlist Items", value: String(wishlistCount).padStart(2, "0") },
  ];

  // Get active tracking steps for the most recent order
  const latestOrder = orders.length > 0 ? orders[0] : null;

  const getTrackingSteps = (order) => {
    if (!order) return [];
    const status = order.orderStatus;
    return [
      { label: "Booked", active: true, done: true },
      { label: "Scheduled", active: true, done: status !== "Placed" },
      { label: "In-Progress", current: status === "Processing", done: status === "Completed" },
      { label: "Completed", pending: status !== "Completed", done: status === "Completed" },
    ];
  };

  const trackingSteps = getTrackingSteps(latestOrder);

  // Flatten ordered services list for Service History table
  const serviceHistory = [];
  orders.forEach((order) => {
    order.orderedServices.forEach((item) => {
      serviceHistory.push({
        id: item._id || item.serviceId,
        name: item.name,
        orderId: order._id,
        date: new Date(order.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        expert: "Lead Engineer",
        status: order.orderStatus,
      });
    });
  });

  // Limit to latest 5 history rows
  const visibleHistory = serviceHistory.slice(0, 5);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-semibold text-secondary">Loading Dashboard Operations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface p-6 pb-28 md:p-10 md:pb-20">
      <header className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tighter text-on-background md:text-4xl">
            Good Morning, <span className="text-primary">{userName}</span>.
          </h1>
          <p className="font-medium text-secondary opacity-80">
            {totalOrders > 0
              ? `Your systems are fully initialized. You have ${activeServices} active service contracts.`
              : "Welcome to your command console. Explore our industrial services to get started."}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-surface-container-lowest px-4 py-2 shadow-[0_10px_20px_rgba(32,44,57,0.04)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-headline font-bold tracking-tight text-on-surface">
            {totalOrders > 0 ? "SYSTEMS NOMINAL" : "PROVISIONING COMPLETE"}
          </span>
        </div>
      </header>

      {/* Stats Board */}
      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-industrial transition-all duration-300 hover:shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between">
              <MaterialIcon name={stat.icon} className="rounded-lg bg-primary-container/20 p-2 text-primary" />
            </div>
            <p className="mb-1 font-label text-xs uppercase tracking-widest text-secondary">{stat.label}</p>
            <h3 className="font-headline text-2xl font-extrabold text-on-surface md:text-3xl">{stat.value}</h3>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Active Order Tracking */}
          <section className="rounded-lg bg-surface-container-lowest p-8 shadow-industrial">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-headline text-xl font-bold tracking-tight text-on-surface">Active Order Tracking</h2>
              {latestOrder && (
                <span className="text-xs font-mono font-medium text-secondary opacity-60">ID: #{latestOrder._id}</span>
              )}
            </div>

            {latestOrder ? (
              latestOrder.orderStatus === "Cancelled" ? (
                <div className="rounded-lg bg-rose-500/10 p-4 border border-rose-500/20 text-rose-600 text-sm font-semibold flex items-center gap-2">
                  <MaterialIcon name="cancel" />
                  This order was cancelled.
                </div>
              ) : (
                <div className="relative pb-8 pt-4">
                  <div className="absolute left-0 top-8 z-0 h-0.5 w-full bg-surface-container-high" />
                  <div
                    className="absolute left-0 top-8 z-10 h-0.5 bg-primary transition-all duration-500"
                    style={{
                      width:
                        latestOrder.orderStatus === "Completed"
                          ? "100%"
                          : latestOrder.orderStatus === "Processing"
                          ? "66%"
                          : "33%",
                    }}
                  />
                  <div className="relative z-20 flex justify-between">
                    {trackingSteps.map((step) => (
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
              )
            ) : (
              <div className="py-6 text-center text-secondary text-sm">
                <MaterialIcon name="info" className="text-3xl text-slate-300 mb-2" />
                <p>No active orders. Place an order to track its progress here.</p>
              </div>
            )}
          </section>

          {/* Service History */}
          <section className="overflow-hidden rounded-lg bg-surface-container-lowest shadow-industrial">
            <div className="p-8 pb-4">
              <h2 className="font-headline text-xl font-bold tracking-tight text-on-surface">Service History</h2>
            </div>
            {visibleHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-surface-container-low">
                      {["Service Item", "Date", "Assigned Lead", "Status"].map((heading) => (
                        <th key={heading} className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low">
                    {visibleHistory.map((row) => (
                      <tr key={row.id} className="transition-colors hover:bg-surface-container-low/50">
                        <td className="px-8 py-5">
                          <div className="font-headline font-bold text-on-surface">{row.name}</div>
                          <div className="text-[10px] font-mono text-secondary opacity-60">ID: #{row.orderId}</div>
                        </td>
                        <td className="px-8 py-5 text-sm font-medium text-secondary">{row.date}</td>
                        <td className="px-8 py-5 text-sm font-medium text-on-surface">{row.expert}</td>
                        <td className="px-8 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                              row.status === "Cancelled"
                                ? "bg-error-container/40 text-error border border-error/10"
                                : row.status === "Completed"
                                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                : "bg-primary-container/20 text-primary"
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
            ) : (
              <div className="p-12 text-center text-secondary text-sm">
                <p className="mb-4">No order history found.</p>
                <Link to="/services" className="font-bold text-primary hover:underline">
                  Order your first service contract &rarr;
                </Link>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          {/* Action Callout */}
          <section className="glass-panel relative overflow-hidden rounded-lg border border-white/20 p-8 shadow-[0_20px_40px_rgba(32,44,57,0.1)]">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-container/20 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <MaterialIcon name="warning" className="text-primary" />
                <h2 className="font-headline text-lg font-bold tracking-tight text-on-surface">System Status</h2>
              </div>
              <p className="mb-8 text-sm leading-relaxed text-secondary">
                {totalOrders > 0
                  ? "All systems normal. Maintain diagnostic sweeps regularly to preserve transformer cooling health."
                  : "Welcome to Precision Panel. To initialize asset tracking, subscribe to a maintenance tier."}
              </p>
              <Link
                to="/services"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-on-background py-4 font-headline font-bold text-white shadow-lg transition-all hover:bg-slate-800"
              >
                {totalOrders > 0 ? "Inspect Services" : "Get a Service Contract"}
                <MaterialIcon name="arrow_forward" className="text-sm" />
              </Link>
            </div>
          </section>

          {/* AI Insights */}
          <section className="rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-industrial">
            <div className="mb-6 flex items-center gap-3">
              <MaterialIcon name="auto_awesome" className="text-primary" />
              <h2 className="font-headline text-lg font-bold tracking-tight text-on-surface">AI Insights</h2>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg border-l-4 border-primary bg-surface-container-low p-4">
                <h4 className="mb-1 text-xs font-bold uppercase text-on-surface">Predictive Alert</h4>
                <p className="text-xs text-secondary">
                  {totalOrders > 0
                    ? "Based on usage patterns, transformer re-calibration is suggested in 45 days."
                    : "Awaiting system data. Seeding telemetry analysis once service is active."}
                </p>
              </div>
              <div className="rounded-lg bg-surface-container-low p-4">
                <h4 className="mb-1 text-xs font-bold uppercase text-on-surface">Performance Bench</h4>
                <p className="text-xs text-secondary">
                  {totalOrders > 0
                    ? "You are performing in the top 5% of regional commercial accounts for efficiency."
                    : "No baseline benchmarks available yet."}
                </p>
              </div>
              <Link
                to="/ai-tools"
                className="block text-center w-full rounded-lg border border-outline-variant py-3 font-headline text-sm font-bold text-secondary transition-all hover:bg-surface-container-low"
              >
                Inspect AI Tools
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
