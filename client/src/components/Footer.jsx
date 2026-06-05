import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  LucideHeartHandshake,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Container from "./ui/Container";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
  { to: "/about", label: "About us" },
];

const contactItems = [
  { icon: Mail, label: "contact.ahamedstudio@gmail.com" },
  { icon: Phone, label: "+91 90000 00000" },
  { icon: MapPin, label: "India" },
];

const socialItems = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-800 text-slate-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(47,143,245,0.22),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(17,185,129,0.16),transparent_28%)]" />

      <Container size="wide" className="relative py-14 md:py-16">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-inset backdrop-blur md:grid-cols-[1.25fr_0.8fr_1fr] md:p-8 lg:gap-14">
          <div>
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sheen text-white shadow-glow transition duration-200 ease-premium group-hover:-translate-y-0.5">
                <LucideHeartHandshake size={25} />
              </span>
              <span className="text-xl font-semibold text-white">
                Learnify Academy
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A modern online learning platform for academic and skill-based
              education, built around clarity, progress, and flexible access.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socialItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/8 text-slate-300 transition duration-200 ease-premium hover:-translate-y-0.5 hover:border-brand-300/40 hover:bg-white/12 hover:text-white"
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 transition duration-200 ease-premium hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <div className="mt-5 space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-slate-300"
                  >
                    <Icon size={17} className="shrink-0 text-brand-300" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Learnify Academy. All rights reserved.
          </p>
          <p>Premium learning experiences for modern students.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
