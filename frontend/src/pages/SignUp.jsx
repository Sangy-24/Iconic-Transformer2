import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon";
import { signupUser } from "../api/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "customer" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await signupUser(formData);
      setSuccess("Operator credentials created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create credentials. Please try again.");
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
        <div className="relative z-10 max-w-xl p-16">
          <div className="mb-12 flex items-center gap-3">
            <MaterialIcon name="bolt" className="text-4xl text-primary-container" filled />
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-white">Iconic Transformers</h1>
          </div>
          <h2 className="mb-6 font-headline text-5xl font-bold leading-tight text-white">
            Join the <span className="text-primary-container">Industrial OS</span>
          </h2>
          <p className="text-lg leading-relaxed text-secondary-fixed-dim">
            Create your operator credentials to access predictive maintenance, demand forecasting, and fleet diagnostics.
          </p>
        </div>
      </section>

      <section className="flex w-full items-center justify-center bg-surface-bright p-6 md:p-12 lg:w-1/2 lg:p-24">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <MaterialIcon name="bolt" className="text-3xl text-primary" filled />
            <span className="font-headline text-xl font-bold tracking-tighter">Iconic Transformers</span>
          </div>

          <div className="mb-12">
            <h3 className="mb-2 font-headline text-3xl font-bold tracking-tight">Request Access</h3>
            <p className="font-medium text-secondary">Register for precision operations platform access.</p>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { id: "name", label: "Full Name", icon: "person", type: "text", placeholder: "John Doe" },
              { id: "email", label: "Operation Email", icon: "mail", type: "email", placeholder: "name@precision.com" },
              { id: "password", label: "Access Key", icon: "lock", type: "password", placeholder: "••••••••••••" },
            ].map((field) => (
              <div key={field.id} className="space-y-1.5">
                <label htmlFor={field.id} className="text-xs font-bold uppercase tracking-widest text-outline">
                  {field.label}
                </label>
                <div className="group relative">
                  <MaterialIcon
                    name={field.icon}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-xl text-outline transition-colors group-focus-within:text-primary"
                  />
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full border-0 border-b-2 border-outline-variant/40 bg-transparent py-3 pl-8 pr-4 font-medium transition-all focus:border-primary focus:ring-0"
                  />
                </div>
              </div>
            ))}

            <div className="space-y-1.5">
              <label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-outline">
                Account Type
              </label>
              <div className="group relative">
                <MaterialIcon
                  name="badge"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-xl text-outline transition-colors group-focus-within:text-primary"
                />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full appearance-none border-0 border-b-2 border-outline-variant/40 bg-transparent py-3 pl-8 pr-4 font-medium transition-all focus:border-primary focus:ring-0"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin / Staff</option>
                </select>
              </div>
            </div>

             <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg py-4 font-headline font-bold text-white kinetic-gradient industrial-shadow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating Credentials..." : "Create Credentials"}
              {!loading && <MaterialIcon name="arrow_forward" className="text-xl transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-secondary">
              Already registered?{" "}
              <Link to="/login" className="font-bold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
