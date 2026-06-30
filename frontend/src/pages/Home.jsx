import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon";

const features = [
  {
    icon: "precision_manufacturing",
    title: "Industrial Precision",
    desc: "Every component is machined to micron-level tolerances, ensuring maximum thermal efficiency and structural longevity in extreme conditions.",
  },
  {
    icon: "verified_user",
    title: "Certified Safety",
    desc: "Compliant with IEEE and IEC global standards. Our testing protocols exceed industry requirements to guarantee site-wide safety.",
  },
  {
    icon: "eco",
    title: "Eco-Efficiency",
    desc: "Our bio-degradable oil cooling systems reduce environmental impact while maintaining superior dielectric strength for high-voltage systems.",
  },
];

const services = [
  { num: "01", icon: "engineering", title: "Maintenance", desc: "Predictive and corrective maintenance programs tailored for high-voltage assets." },
  { num: "02", icon: "settings_input_component", title: "Spare Parts", desc: "OEM parts supply with rapid deployment logistics for critical downtime reduction." },
  { num: "03", icon: "construction", title: "Installation", desc: "Expert rigging and commissioning services for new grid integration projects." },
  { num: "04", icon: "biotech", title: "Oil Testing", desc: "Advanced dissolved gas analysis (DGA) and dielectric strength verification." },
];

const certifications = [
  { icon: "workspace_premium", label: "ISO 9001:2015" },
  { icon: "shield_with_heart", label: "OSHA Gold Standard" },
  { icon: "security", label: "NERC/CIP Compliant" },
  { icon: "public", label: "Global Reach Network" },
];

const Home = () => (
  <div>
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4O7phXFyeamS8zI5EctWYFiJlnqDr1dgL1wL2VfoYLnHQ3iTlVRU3XmprX5C5i4ZK_Os31btZOq8B9J5auqyG5h0K4aVrtWDYn3w6wrbsvFQtSdKjRGSnXZM-GWvmS3S9bvm6FAlwl86dOmZc3HVTgGlQq2UEZX2_HaoWewiXrgef9FRlfaItxk8jCSiZxWX1jWL7KeRiVLqm8-XUYMg461cZq8DY4uf90RSrKmjwlJK4eVOh-BkZOSECN4AOhGPz-A9eXMiPfjY"
          alt="Industrial transformer infrastructure"
          className="h-full w-full object-cover opacity-15 grayscale mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto grid items-center gap-12 px-6 md:grid-cols-2 md:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-container/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-on-primary-container">
            <MaterialIcon name="bolt" className="text-sm" />
            Next-Gen Infrastructure
          </div>
          <h1 className="mb-8 font-headline text-5xl font-extrabold leading-[0.9] tracking-tighter text-on-background md:text-7xl lg:text-8xl">
            Powering <br />
            <span className="italic text-primary">Reliability</span>
          </h1>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-secondary">
            Engineered for the future of the global power grid. High-precision transformers meeting the world&apos;s most demanding industrial standards.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="industrial-gradient rounded-full px-8 py-4 text-lg font-bold text-on-primary shadow-2xl transition-all duration-300 hover:-translate-y-1 md:px-10 md:py-5"
            >
              Explore Services
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-outline-variant/30 bg-white/50 px-8 py-4 text-lg font-bold backdrop-blur transition-all hover:bg-white md:px-10 md:py-5"
            >
              Technical Specs
            </Link>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-container/20 blur-[120px]" />
          <div className="glass-panel group relative overflow-hidden rounded-xl border border-white/40 p-8 shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnml88QyMk3yDWtyoI9xmYoQsC56CkZ1XRdQNJ5Muh5zfH5Z9FxCNUr0odxsuJEW2uU6i_9ZnwnqaA2Qrk1c9CJv_ErICHOJYlhLvYJUChsXEriE6g49XSi9mwb8FZvlrUArVi2TzKx3-QRPS7reXKS3lXD_zSyt-ef4mGXxpRY_Jz7865VAdt2TaMgCTJZpz224J1bzB5OcXB4-K-n_Vcl_KTft1vp18gabzVdiw5mMcXswBk_OGnZTV_zIXwkBD-PJ4IIGqSpbY"
              alt="High precision transformer"
              className="rounded-lg shadow-inner grayscale transition-all duration-700 group-hover:grayscale-0"
            />
            <div className="mt-6 flex items-end justify-between">
              <div>
                <div className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">Model IT-9000</div>
                <div className="text-2xl font-bold">Structural Integrity</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-on-surface-variant">99.9%</div>
                <div className="text-[10px] font-bold uppercase text-secondary">Uptime Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-surface-container-low/50 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid gap-16 md:grid-cols-3">
          {features.map((item) => (
            <div key={item.title} className="group space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-xl transition-all duration-500 group-hover:industrial-gradient group-hover:text-white">
                <MaterialIcon name={item.icon} className="text-4xl" />
              </div>
              <h3 className="font-headline text-3xl font-bold text-on-background">{item.title}</h3>
              <p className="leading-relaxed text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-surface py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-xl">
            <h2 className="mb-6 font-headline text-4xl font-extrabold tracking-tighter md:text-5xl">Engineered Solutions</h2>
            <p className="text-lg text-secondary">
              Full-lifecycle support for your critical power infrastructure, from initial design to end-of-life testing.
            </p>
          </div>
          <Link to="/services" className="flex items-center gap-2 font-bold text-primary transition-all hover:gap-4">
            View Full Catalog <MaterialIcon name="arrow_forward" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.num}
              to="/services"
              className="glass-panel group relative rounded-lg border border-white/60 p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute right-0 top-0 p-6 opacity-10 transition-opacity group-hover:opacity-20">
                <MaterialIcon name={service.icon} className="text-6xl" />
              </div>
              <div className="mb-6 text-4xl font-black text-primary-container">{service.num}</div>
              <h4 className="mb-4 text-2xl font-bold">{service.title}</h4>
              <p className="mb-8 text-sm leading-relaxed text-secondary">{service.desc}</p>
              <MaterialIcon name="arrow_outward" className="text-secondary transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-outline-variant/10 py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-secondary">Trusted by Industry Leaders</div>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale transition-all hover:grayscale-0 md:gap-24">
            {["TRANSCON", "KPEL", "MAHAVITARAN", "MAHAGENCO", "Vikas Transformers"].map((brand) => (
              <span key={brand} className="text-2xl font-bold text-on-surface">
                {brand}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 rounded-xl bg-surface-container-low px-6 py-12 md:grid-cols-4 md:px-12">
          {certifications.map((cert) => (
            <div key={cert.label} className="flex flex-col items-center gap-4 text-secondary">
              <MaterialIcon name={cert.icon} className="text-4xl" />
              <span className="text-center text-[10px] font-bold uppercase tracking-widest">{cert.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="overflow-hidden py-24 md:py-32">
      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <div className="group relative overflow-hidden rounded-xl bg-inverse-surface p-10 md:p-16 lg:p-24">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwiOXWqwFYzJEu6TWhaNJlbOISMahNL-qiv1Munxw1-HiSxmDuFiMh3rYsrmJphsc4AoZWPFt3TcNwBvOOWIo9ezidANDz55Tye-IpZYDIuzKmzO-JnKHnEW4UrESS3dQb_LvymTyPprWNJZeJ0nfH1YuVwIERSPWxOPJyDTHy0ygKOXj8yNFy4IGrr7wHSuvkEBClCHvNDliu37_onb1LOsa-iDSR7dxfKpn7eourYKUEm9YJXsMNroQPp5XOiIxWk_AVEMtwr-U"
              alt="Technical infrastructure"
              className="h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
            />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="mb-8 font-headline text-4xl font-extrabold tracking-tighter text-white md:text-5xl lg:text-7xl">
              Secure Your Infrastructure
            </h2>
            <p className="mb-12 text-xl leading-relaxed text-slate-400">
              Ready to upgrade your power assets? Consult with our engineering team to design a reliability program that matches your operational scale.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/contact"
                className="industrial-gradient rounded-full px-10 py-4 text-lg font-bold text-on-primary shadow-xl transition-all hover:-translate-y-1 hover:shadow-primary/20 md:px-12 md:py-5"
              >
                Request Audit
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/20 px-10 py-4 text-lg font-bold text-white transition-all hover:bg-white/10 md:px-12 md:py-5"
              >
                Technical Inquiries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
