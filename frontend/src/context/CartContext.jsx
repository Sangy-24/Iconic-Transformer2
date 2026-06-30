import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const token = localStorage.getItem("token");

  // Show premium auto-dismissing toast
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const fetchCart = async () => {
    const activeToken = localStorage.getItem("token");
    if (!activeToken) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (serviceId) => {
    const activeToken = localStorage.getItem("token");
    if (!activeToken) {
      showToast("Please log in to add items to cart", "error");
      return false;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ serviceId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add service to cart");
      }
      showToast("Service added to cart!");
      await fetchCart();
      return true;
    } catch (err) {
      showToast(err.message, "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (serviceId) => {
    const activeToken = localStorage.getItem("token");
    if (!activeToken) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${serviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to remove item");
      }
      showToast("Service removed from cart");
      await fetchCart();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    const activeToken = localStorage.getItem("token");
    if (!activeToken) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/cart/clear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }
      setCartItems([]);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch cart when token changes (e.g. login/logout)
  useEffect(() => {
    fetchCart();
  }, [token]);

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalAmount = cartItems.reduce((acc, item) => {
    const itemPrice = item.serviceId?.price || item.price || 0;
    return acc + itemPrice * (item.quantity || 1);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        totalAmount,
        loading,
        error,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
        showToast,
      }}
    >
      {children}

      {/* Floating Toast Notification */}
      {notification && (
        <div className="fixed right-6 top-24 z-50 animate-bounce duration-500">
          <div
            className={`glass-panel flex items-center gap-3 rounded-lg px-6 py-4 shadow-2xl border-l-4 ${
              notification.type === "error"
                ? "border-red-500 bg-white/90 text-slate-800"
                : "border-teal-500 bg-white/90 text-slate-800"
            }`}
          >
            <span
              className={`material-symbols-filled text-2xl ${
                notification.type === "error" ? "text-red-500" : "text-teal-600"
              }`}
            >
              {notification.type === "error" ? "error" : "check_circle"}
            </span>
            <p className="text-sm font-semibold tracking-tight">{notification.message}</p>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
