import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Reveal, { Stagger, StaggerItem } from "../components/ui/Motion";

const stats = [
  { value: "3+", label: "Learning paths" },
  { value: "24/7", label: "Course access" },
  { value: "100%", label: "Secure enrollment" },
];

const differentiators = [
  {
    icon: BookOpenText,
    title: "Structured Curriculum",
    text: "Courses designed with clear progression, learning goals, and outcomes.",
  },
  {
    icon: UsersRound,
    title: "Expert Mentorship",
    text: "Learn from instructors with academic and real-world experience.",
  },
  {
    icon: GraduationCap,
    title: "Practical Learning",
    text: "Focus on understanding, application, and long-term retention.",
  },
];

const learningApproach = [
  "Beginner-friendly explanations with depth",
  "Step-by-step progression",
  "Continuous assessment and feedback",
  "Self-paced with guided support",
];

const faculty = [
  {
    name: "Academic Faculty",
    role: "Structured course guidance",
    image: "/images/faculty/male user.png",
  },
  {
    name: "Learning Mentor",
    role: "Student-centered support",
    image: "/images/faculty/hijabi user.png",
  },
];

function About() {
  return (
    <main className="bg-app-shell">
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/hero/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(47,143,245,0.42),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(17,185,129,0.22),transparent_28%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.9)_55%,rgba(16,40,77,0.92))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-gray-50 to-transparent" />

        <Container size="wide" className="relative py-20 md:py-24 lg:py-28">
          <Reveal className="mx-auto max-w-4xl text-center">
            <div className="eyebrow gap-2 border-white/20 bg-white/10 text-brand-100 backdrop-blur">
              <Sparkles size={14} />
              About Learnify
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-display-xl">
              A professional academy for structured, confident learning.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
              Learnify Academy is built to deliver practical, meaningful
              education through clear programs, experienced mentors, and
              learner-first outcomes.
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              <Button as={Link} to="/courses" size="lg" className="group">
                Browse Courses
                <ArrowRight
                  size={18}
                  className="transition duration-200 ease-premium group-hover:translate-x-1"
                />
              </Button>
              <Button
                as={Link}
                to="/login"
                variant="secondary"
                size="lg"
                className="border-white/25 bg-white/12 text-white shadow-none backdrop-blur hover:border-white/40 hover:bg-white/18 hover:text-white"
              >
                Student Login
              </Button>
            </div>
          </Reveal>

          <Stagger className="mt-14 grid gap-3 rounded-3xl border border-white/14 bg-white/10 p-3 shadow-inset backdrop-blur-xl sm:grid-cols-3">
            {stats.map((stat) => (
              <StaggerItem
                key={stat.label}
                className="rounded-2xl border border-white/12 bg-white/10 px-5 py-5 text-center"
              >
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="wide">
          <Stagger className="grid gap-6 md:grid-cols-2">
            <StaggerItem className="card-premium p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sheen text-white shadow-glow">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-ink-950">Our Mission</h2>
              <p className="mt-4 text-sm leading-7 text-ink-600">
                Our mission is to make quality education accessible, structured,
                and impactful. We focus on clarity, consistency, and learner
                confidence, not shortcuts or superficial content.
              </p>
            </StaggerItem>

            <StaggerItem className="card-premium p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-white shadow-soft">
                <Sparkles size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-ink-950">Our Vision</h2>
              <p className="mt-4 text-sm leading-7 text-ink-600">
                We envision a learning ecosystem where students gain strong
                fundamentals, real skills, and lifelong learning habits through
                guided mentorship and well-designed programs.
              </p>
            </StaggerItem>
          </Stagger>
        </Container>
      </section>

      <section className="section bg-app-shell">
        <Container size="wide">
          <Reveal className="section-header">
            <span className="eyebrow">What makes us different</span>
            <h2 className="heading-section">Designed for serious progress</h2>
            <p className="text-lead mt-4">
              The platform experience is intentionally structured so students
              can understand what to learn, why it matters, and how to keep
              improving.
            </p>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-3">
            {differentiators.map((item) => {
              const Icon = item.icon;

              return (
                <StaggerItem key={item.title} className="glass-panel p-7 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-sheen text-white shadow-glow">
                    <Icon size={27} />
                  </div>
                  <h3 className="text-xl font-semibold text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-600">
                    {item.text}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="eyebrow">Learning approach</span>
              <h2 className="heading-section">A clear path, not scattered content</h2>
              <p className="text-lead mt-4">
                Our courses are shaped around steady comprehension, guided
                support, and practical retention.
              </p>
            </div>

            <div className="surface-panel p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {learningApproach.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-ink-50 p-4">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-accent-mint"
                    />
                    <p className="text-sm leading-6 text-ink-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-app-shell">
        <Container size="wide">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow">Faculty</span>
              <h2 className="heading-section">Mentors focused on student clarity</h2>
              <p className="text-lead mt-4">
                Our faculty members are selected for subject expertise, teaching
                clarity, and commitment to student success.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {faculty.map((member) => (
              <div key={member.name} className="card-premium flex gap-5 p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-soft"
                />
                <div>
                  <h3 className="text-xl font-semibold text-ink-950">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-700">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-600">
                    Real-world teaching experience paired with a structured,
                    learner-first approach.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="wide">
          <div className="overflow-hidden rounded-3xl bg-ink-950 p-8 text-white shadow-premium md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-200">
                  <ShieldCheck size={26} />
                </div>
                <h2 className="text-3xl font-semibold text-white">
                  Built on trust and transparency
                </h2>
              </div>
              <p className="text-base leading-8 text-slate-300">
                We believe education is a responsibility. Clear pricing, honest
                outcomes, secure payments, and learner-first decisions are
                central to everything we do.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-app-shell">
        <Container size="narrow" className="text-center">
          <span className="eyebrow">Start learning</span>
          <h2 className="heading-section">Start Learning With Confidence</h2>
          <p className="text-lead mx-auto mt-4 max-w-2xl">
            Explore our courses and begin your learning journey with a platform
            designed for clarity and progress.
          </p>
          <div className="mt-8 flex justify-center">
            <Button as={Link} to="/courses" variant="dark" size="lg" className="group">
              Browse Courses
              <ArrowRight
                size={18}
                className="transition duration-200 ease-premium group-hover:translate-x-1"
              />
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default About;
