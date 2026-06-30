import { useState } from "react";
import MaterialIcon from "../components/MaterialIcon";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // Web3Forms API access key
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      setError("Web3Forms Access Key is not configured. Please add VITE_WEB3FORMS_ACCESS_KEY to your env variables.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          phone,
          message,
          from_name: "Iconic Transformers Contact Form"
        })
      });

      const result = await response.json();
      if (result.success) {
        setSuccess("Message dispatched successfully! Our engineering team will contact you shortly.");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setError(result.message || "Failed to dispatch message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network anomaly detected. Failed to connect to Web3Forms gateway.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface pb-24 pt-32">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-container/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-on-primary-container">
            <MaterialIcon name="mail" className="text-sm" />
            Get In Touch
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-background md:text-5xl">Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="flex-1 overflow-hidden rounded-xl bg-inverse-surface p-8 text-white shadow-industrial md:p-10 flex flex-col justify-center">
              <h2 className="mb-8 font-headline text-3xl font-bold">Headquarters</h2>
              <div className="flex flex-col gap-6 text-slate-400">
                <div className="flex items-start gap-4">
                  <MaterialIcon name="location_on" className="mt-1 text-primary-container" />
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-white">Address</h3>
                    <p>B-19, Gane Khadpoli, Chiplun,</p>
                    <p>Ratnagiri, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MaterialIcon name="call" className="text-primary-container" />
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-white">Phone</h3>
                    <p>+91-7083579959</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MaterialIcon name="alternate_email" className="text-primary-container" />
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-white">Email</h3>
                    <p className="text-primary">iconictransformer@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl border border-white/60 p-8 shadow-industrial md:p-10">
            <h2 className="mb-8 font-headline text-3xl font-bold text-on-background">Send a Message</h2>
            
            {success && (
              <div className="mb-6 rounded-lg bg-emerald-500/10 p-4 border border-emerald-500/20 text-emerald-600 text-sm font-semibold">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-6 rounded-lg bg-red-500/10 p-4 border border-red-500/20 text-red-500 text-sm font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-outline">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-outline">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-outline">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91"
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-outline">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex items-center justify-center gap-2 rounded-lg py-4 font-headline font-bold text-white kinetic-gradient industrial-shadow transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? "Sending Message..." : "Send Message"}
                {!loading && <MaterialIcon name="send" className="transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
