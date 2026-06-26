import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon";
import { loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const data = await loginUser({ email, password, loginType });
      setSuccess("Authentication approved. Access granted!");
      
      // Save details to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      }, 1500);
    } catch (err) {
      setError(err.message || "Authentication failed. Invalid email or access key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full overflow-hidden bg-surface font-body text-on-surface antialiased">
      <section className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-inverse-surface lg:flex">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-primary-container blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] h-[400px] w-[400px] rounded-full bg-primary blur-[100px]" />
        </div>
        <div className="relative z-10 flex max-w-2xl flex-col items-start p-16">
          <div className="mb-12 flex items-center gap-3">
            <MaterialIcon name="bolt" className="text-4xl text-primary-container" filled />
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-white">Iconic Transformers</h1>
          </div>
          <div className="mb-10 rounded-lg border border-white/10 bg-white/5 p-1">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqPuZX6hZKPopvdOnvM1sXQjBAAWNJe1Q-DwPgD3bBta5So7Yn3bGSD8YfQRwRT7mISGziJfP-7kNmUODX5XMUGXTM8qowMFwKulorixRmSpNoBEvzZFQgALtMnrNbE3sNMeFHen7Q-PszBY8p-jvb15htV-JTt3CxbUr9W8oal32BB2DF3U4C7lwwf7ROJVQnwvVxHYdRfMdjL2URjFcFbOSNufknUgvLfJbrfK50aMVUruOQgOu26ulEC8nngOd0FAwshNB2P-8"
              alt="Industrial transformer schematic"
              className="rounded-md opacity-80 mix-blend-screen brightness-110 filter"
            />
          </div>
          <h2 className="mb-6 font-headline text-5xl font-bold leading-tight tracking-tight text-white">
            Engineering <span className="text-primary-container">Excellence</span> at Scale.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-secondary-fixed-dim">
            Access the Industrial OS v2.0 for precision monitoring, real-time analytics, and AI-driven load balancing.
          </p>
          <div className="mt-12 flex gap-8">
            <div className="flex flex-col">
              <span className="font-headline text-2xl font-bold text-primary-container">99.9%</span>
              <span className="text-xs font-medium uppercase tracking-widest text-outline-variant">Uptime Protocol</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-2xl font-bold text-primary-container">0.02ms</span>
              <span className="text-xs font-medium uppercase tracking-widest text-outline-variant">Network Latency</span>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </section>

      <section className="relative flex w-full items-center justify-center bg-surface-bright p-6 md:p-12 lg:w-1/2 lg:p-24">
        <div className="absolute right-0 top-0 p-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Server Status: Optimized</span>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <MaterialIcon name="bolt" className="text-3xl text-primary" filled />
            <span className="font-headline text-xl font-bold tracking-tighter text-on-surface">Iconic Transformers</span>
          </div>

          <div className="mb-12">
            <h3 className="mb-2 font-headline text-3xl font-bold tracking-tight text-on-surface">Welcome Back</h3>
            <p className="font-medium text-secondary">Secure authentication for precision operations.</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-500/10 p-4 border border-red-500/20 text-red-500 text-sm font-semibold">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 rounded-lg bg-emerald-500/10 p-4 border border-emerald-500/20 text-emerald-500 text-sm font-semibold">
              {success}
            </div>
          )}

          <div className="mb-10 flex rounded-lg bg-surface-container-low p-1.5 industrial-shadow">
            <button
              type="button"
              onClick={() => setLoginType("customer")}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                loginType === "customer"
                  ? "bg-surface-container-lowest text-primary shadow-sm"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              Customer Login
            </button>
            <button
              type="button"
              onClick={() => setLoginType("admin")}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                loginType === "admin"
                  ? "bg-surface-container-lowest text-primary shadow-sm"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              Admin Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-outline">
                Operation Email
              </label>
              <div className="group relative">
                <MaterialIcon
                  name="mail"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-xl text-outline transition-colors group-focus-within:text-primary"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@precision.com"
                  required
                  className="w-full border-0 border-b-2 border-outline-variant/40 bg-transparent py-3 pl-8 pr-4 font-medium text-on-surface placeholder:text-outline/50 transition-all focus:border-primary focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-outline">
                  Access Key
                </label>
                <span className="cursor-pointer text-xs font-semibold text-primary hover:underline">Reset Key?</span>
              </div>
              <div className="group relative">
                <MaterialIcon
                  name="lock"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-xl text-outline transition-colors group-focus-within:text-primary"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full border-0 border-b-2 border-outline-variant/40 bg-transparent py-3 pl-8 pr-4 font-medium text-on-surface placeholder:text-outline/50 transition-all focus:border-primary focus:ring-0"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input id="remember" type="checkbox" className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20" />
              <label htmlFor="remember" className="text-sm font-medium text-secondary">
                Authorize this terminal for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg py-4 font-headline font-bold text-white kinetic-gradient industrial-shadow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying Credentials..." : "Enter Command Center"}
              {!loading && <MaterialIcon name="arrow_forward" className="text-xl transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20" />
            </div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-[0.2em]">
              <span className="bg-surface-bright px-4 text-outline/60">External Auth Protocols</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="ghost-border flex items-center justify-center gap-3 rounded-lg bg-surface-container-lowest px-4 py-3 industrial-shadow transition-all hover:bg-surface-container-low">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo84J8e2evUfwJcsnOdsTBoF9J_klTrCS5Eo4IDHjP0yoo7eAZVWS8y1wy1SNiXFYN348OgnUIUt0rNPsXrB61-W7YcGzNA6I5gxxgU-l4x5ftUHE-DvUv4MaD2YfwXqrP0VP_xZmDbfwKV2Mpyf5ZPGCb7xpZS10Z5exv0BcfhUQAvqh2Em4DPj1Nt-ipKZaZRkofw2nMu6q_v-XYhvlMWs9PFJq3uhOdra9-bTeWiWNtA8DzvWfNw1ekpHYDQUVsZb0z8hZ1rQo"
                alt="Google"
                className="h-5 w-5 opacity-80"
              />
              <span className="text-sm font-semibold text-secondary">Google</span>
            </button>
            <button type="button" className="ghost-border flex items-center justify-center gap-3 rounded-lg bg-surface-container-lowest px-4 py-3 industrial-shadow transition-all hover:bg-surface-container-low">
              <MaterialIcon name="cloud" className="text-blue-600" filled />
              <span className="text-sm font-semibold text-secondary">Azure</span>
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-secondary">
              New Operator?{" "}
              <Link to="/signup" className="font-bold text-primary hover:underline">
                Request Access Credentials
              </Link>
            </p>
          </div>
        </div>
      </section>

      <footer className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0">
        <p className="font-label text-[10px] font-black uppercase tracking-[0.3em] text-outline/40">
          © {new Date().getFullYear()} Iconic Transformers. Engineering Excellence.
        </p>
      </footer>
    </main>
  );
};

export default Login;
