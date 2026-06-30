import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import MaterialIcon from "../components/MaterialIcon";

const Cart = () => {
  const { cartItems, removeFromCart, totalAmount, cartCount, loading } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading && cartItems.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-semibold text-secondary">Loading Cart Items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface p-6 pb-28 md:p-10 md:pb-20">
      <header className="mb-8">
        <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tighter text-on-background md:text-4xl">
          Operation <span className="text-primary">Cart</span>
        </h1>
        <p className="font-medium text-secondary opacity-80">
          Review your scheduled industrial services before proceeding to checkout.
        </p>
      </header>

      {cartItems.length === 0 ? (
        <section className="glass-card flex flex-col items-center justify-center rounded-lg p-16 text-center shadow-industrial border border-outline-variant/10">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <MaterialIcon name="shopping_cart" className="text-4xl" />
          </div>
          <h2 className="mb-2 font-headline text-2xl font-bold text-on-surface">Your Cart is Empty</h2>
          <p className="mb-8 max-w-md text-secondary">
            No services currently added. Explore our high-precision maintenance modules and AI diagnostic systems.
          </p>
          <Link
            to="/services"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-8 py-4 font-headline text-sm font-bold text-white shadow-lg transition-all hover:bg-primary active:scale-95"
          >
            Explore Services
            <MaterialIcon name="arrow_forward" className="text-sm" />
          </Link>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {cartItems.map((item) => {
              const service = item.serviceId;
              if (!service) return null;
              return (
                <div
                  key={item._id}
                  className="group flex flex-col sm:flex-row gap-6 rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-industrial transition-all duration-300 hover:shadow-xl"
                >
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="h-24 w-full sm:w-36 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          {service.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeFromCart(service._id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <MaterialIcon name="delete" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-secondary line-clamp-2 max-w-xl">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <span>Quantity: {item.quantity}</span>
                      </div>
                      <p className="font-headline text-lg font-black text-primary">
                        {service.currency || 'Rs'}{(service.price * item.quantity).toLocaleString()}
                        <span className="text-xs font-normal text-secondary">{service.unit}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <section className="glass-panel sticky top-32 rounded-lg border border-outline-variant/10 bg-white/70 p-8 shadow-industrial">
              <h2 className="mb-6 font-headline text-xl font-bold tracking-tight text-on-surface">Order Summary</h2>
              
              <div className="space-y-4 border-b border-outline-variant/20 pb-6 text-sm">
                <div className="flex justify-between text-secondary">
                  <span>Total Services</span>
                  <span className="font-bold text-on-surface">{cartCount}</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Activation Protocol</span>
                  <span className="font-bold text-on-surface text-emerald-600">Free</span>
                </div>
              </div>

              <div className="my-6 flex justify-between">
                <span className="font-headline font-bold text-on-surface">Estimated Price</span>
                <span className="font-headline text-2xl font-black text-primary">
                  Rs {totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg py-4 font-headline font-bold text-white kinetic-gradient shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Proceed to Checkout
                  <MaterialIcon name="arrow_forward" className="text-sm" />
                </button>
                <Link
                  to="/services"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant py-3.5 font-headline text-xs font-bold text-secondary transition-all hover:bg-surface-container-low"
                >
                  Continue Shopping
                </Link>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
