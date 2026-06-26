import MaterialIcon from "../components/MaterialIcon";

const Contact = () => (
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
        <div>
          <div className="mb-8 overflow-hidden rounded-xl bg-inverse-surface p-8 text-white shadow-industrial md:p-10">
            <h2 className="mb-8 font-headline text-3xl font-bold">Headquarters</h2>
            <div className="flex flex-col gap-6 text-slate-400">
              <div className="flex items-start gap-4">
                <MaterialIcon name="location_on" className="mt-1 text-primary-container" />
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white">Head Office</h3>
                  <p>Precision Plaza, Ind. Zone 4</p>
                  <p>Zurich, Switzerland CH-8001</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MaterialIcon name="call" className="text-primary-container" />
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white">Phone</h3>
                  <p>+41 44 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MaterialIcon name="alternate_email" className="text-primary-container" />
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white">Email</h3>
                  <p className="text-primary">eng@iconic-transformers.tech</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-64 overflow-hidden rounded-xl shadow-industrial">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3022.2!2d-74.004!3d40.712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Office location map"
            />
          </div>
        </div>

        <div className="glass-panel rounded-xl border border-white/60 p-8 shadow-industrial md:p-10">
          <h2 className="mb-8 font-headline text-3xl font-bold text-on-background">Send a Message</h2>
          <form className="flex flex-col gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-outline">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
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
                  placeholder="+1 (555) 000-0000"
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
                placeholder="How can we help you?"
                className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="group mt-2 flex items-center justify-center gap-2 rounded-lg py-4 font-headline font-bold text-white kinetic-gradient industrial-shadow transition-all hover:scale-[1.02]"
            >
              Send Message
              <MaterialIcon name="send" className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
