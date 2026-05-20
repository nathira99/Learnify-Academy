import { Link } from "react-router-dom";
import { CheckCircle2, LucideHeartHandshake, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Container from "./ui/Container";
import Reveal, { Stagger, StaggerItem } from "./ui/Motion";

const trustItems = [
  "Structured courses",
  "Secure access",
  "Guided learning paths",
];

function AuthShell({ eyebrow, title, description, children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-app-shell">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(47,143,245,0.16),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(17,185,129,0.13),transparent_28%)]" />

      <Container
        size="wide"
        className="relative grid min-h-screen items-center gap-10 py-12 lg:grid-cols-[1fr_0.88fr] lg:py-16"
      >
        <Reveal as={motion.section} className="hidden lg:block">
          <Link to="/" className="group inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sheen text-white shadow-glow transition duration-200 ease-premium group-hover:-translate-y-0.5">
              <LucideHeartHandshake size={25} />
            </span>
            <span className="text-xl font-semibold text-ink-950">
              Learnify Academy
            </span>
          </Link>

          <div className="mt-12 max-w-xl">
            <span className="eyebrow gap-2">
              <ShieldCheck size={14} />
              Secure learning portal
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-ink-950 lg:text-display-lg">
              Access a polished learning experience built around progress.
            </h1>
            <p className="text-lead mt-5">
              Manage your courses, continue enrolled programs, and move through
              structured learning paths with confidence.
            </p>
          </div>

          <Stagger className="mt-8 grid max-w-xl gap-3">
            {trustItems.map((item) => (
              <StaggerItem
                key={item}
                className="glass-panel flex items-center gap-3 px-4 py-3 text-sm font-medium text-ink-700"
              >
                <CheckCircle2 size={18} className="text-accent-mint" />
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <section className="mx-auto w-full max-w-md">
          <Reveal className="glass-panel p-6 shadow-premium sm:p-8">
            <div className="mb-8 text-center">
              <Link
                to="/"
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-sheen text-white shadow-glow lg:hidden"
              >
                <LucideHeartHandshake size={27} />
              </Link>
              <span className="eyebrow justify-center">{eyebrow}</span>
              <h2 className="mt-4 text-3xl font-semibold text-ink-950">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">
                {description}
              </p>
            </div>

            {children}
          </Reveal>
        </section>
      </Container>
    </main>
  );
}

export default AuthShell;
