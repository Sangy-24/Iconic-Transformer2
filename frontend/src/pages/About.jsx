import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon";

const industries = [
  "Oil & Gas",
  "Renewable Energy",
  "Manufacturing",
  "Telecommunications",
  "Data Centers",
  "Healthcare",
  "Transportation",
  "Mining",
];

const About = () => (
  <div className="bg-surface pb-24 pt-32">
    <div className="container mx-auto max-w-5xl px-6 md:px-8">
      <div className="mb-16 max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-container/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-on-primary-container">
          <MaterialIcon name="history" className="text-sm" />
          Our Story
        </div>
        <h1 className="mb-6 font-headline text-4xl font-extrabold tracking-tighter text-on-background md:text-5xl">
          About Iconic Transformers
        </h1>
        <p className="text-lg leading-relaxed text-secondary">
          Founded over 25 years ago, we evolved from a local manufacturer into a global leader in industrial transformer production and AI-powered operational frameworks.
        </p>
      </div>

      <div className="glass-panel mb-12 rounded-xl border border-white/60 p-8 shadow-industrial md:p-10">
        <h2 className="mb-6 flex items-center font-headline text-2xl font-bold text-on-background md:text-3xl">
          <MaterialIcon name="flag" className="mr-3 text-primary" />
          Company History
        </h2>
        <p className="text-lg leading-relaxed text-secondary">
          Iconic Transformers and Electricals started as a small local manufacturer. Today we integrate the latest AI and machine learning technologies into our products to offer predictive maintenance and smart monitoring across global infrastructure networks.
        </p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-industrial">
          <h2 className="mb-6 flex items-center font-headline text-2xl font-bold">
            <MaterialIcon name="target" className="mr-3 text-primary" />
            Mission
          </h2>
          <p className="leading-relaxed text-secondary">
            To provide the most reliable, efficient, and intelligent transformer solutions that power the future of global industries, while fostering continuous innovation and safety.
          </p>
        </div>
        <div className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-industrial">
          <h2 className="mb-6 flex items-center font-headline text-2xl font-bold">
            <MaterialIcon name="memory" className="mr-3 text-primary" />
            Vision
          </h2>
          <p className="leading-relaxed text-secondary">
            Leading the electrical infrastructure sector by fully integrating artificial intelligence and proactive operational methodologies into every transformer deployed worldwide.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-inverse-surface p-8 shadow-industrial md:p-10">
        <h2 className="mb-8 flex items-center font-headline text-2xl font-bold text-white md:text-3xl">
          <MaterialIcon name="groups" className="mr-3 text-primary-container" />
          Industries Served
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {industries.map((industry) => (
            <div key={industry} className="rounded-lg bg-white/10 p-4 text-center text-sm font-medium text-white backdrop-blur-sm">
              {industry}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="industrial-gradient inline-flex rounded-full px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default About;
