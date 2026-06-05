import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LucideUsersRound,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import API from "../config/api";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Reveal, { Stagger, StaggerItem } from "../components/ui/Motion";

const features = [
  {
    title: "Structured Learning Programs",
    color: "bg-emerald-500",
    items: [
      "Well-designed course curriculum",
      "Step-by-step learning paths",
      "Beginner to advanced levels",
      "Clear learning objectives",
    ],
  },
  {
    title: "Expert Faculty & Guidance",
    color: "bg-rose-500",
    items: [
      "Experienced instructors",
      "Clear concept explanations",
      "Practical teaching approach",
      "Student-focused mentoring",
    ],
  },
  {
    title: "Flexible & Accessible Learning",
    color: "bg-indigo-500",
    items: [
      "Learn at your own pace",
      "Access courses anytime",
      "Certification opportunities",
      "Secure online payments",
    ],
  },
];

const heroStats = [
  {
    value: "500+",
    label: "Active Students",
    description:
      "Learners building real-world skills through guided online programs.",
    gradient: "from-cyan-400 to-blue-500",
  },

  {
    value: "25+",
    label: "Premium Courses",
    description:
      "Modern technology and development courses with structured paths.",
    gradient: "from-emerald-400 to-cyan-400",
  },

  {
    value: "24/7",
    label: "Flexible Learning",
    description:
      "Access your enrolled courses anytime with self-paced learning.",
    gradient: "from-violet-400 to-pink-400",
  },
];
const trustItems = [
  "Structured curriculum",
  "Expert guidance",
  "Flexible learning",
];

const benefitItems = [
  {
    icon: BookOpenText,
    title: "Structured Learning",
    copy: "Well-organized courses designed for clarity and progress.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    copy: "Trusted and verified payment process with clear enrollment flow.",
  },
  {
    icon: LucideUsersRound,
    title: "Student-Centered",
    copy: "Learn at your own pace with access to enrolled courses anytime.",
  },
];

const testimonials = [
  "The courses are clearly structured and easy to follow. I always knew what to learn next.",
  "The instructors explain concepts patiently and practically. Very helpful experience.",
  "This platform helped me gain confidence and consistency in my learning journey.",
];

function Home() {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  const scrollRef = useRef(null);
  const sliderRef = useRef(null);
  const autoRef = useRef(null);
  const navigate = useNavigate();

  const cardWidth = 260;

  useEffect(() => {
    axios
      .get(`${API}/api/courses`)
      .then((res) => setCourses(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/api/teachers`)
      .then((res) => setFaculty(res.data))
      .catch(() => {});
  }, []);

  const extendedFaculty =
    faculty.length > 1
      ? [faculty[faculty.length - 1], ...faculty, faculty[0]]
      : faculty;

  useEffect(() => {
    if (!faculty.length) return;

    autoRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(autoRef.current);
  }, [faculty]);

  useEffect(() => {
    if (!sliderRef.current) return;

    sliderRef.current.style.transition =
      "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    sliderRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }, [currentIndex]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onTransitionEnd = () => {
      if (currentIndex === extendedFaculty.length - 1) {
        slider.style.transition = "none";
        setCurrentIndex(1);
      }

      if (currentIndex === 0) {
        slider.style.transition = "none";
        setCurrentIndex(extendedFaculty.length - 2);
      }
    };

    slider.addEventListener("transitionend", onTransitionEnd);
    return () => slider.removeEventListener("transitionend", onTransitionEnd);
  }, [currentIndex, extendedFaculty.length]);

  const stopAuto = () => clearInterval(autoRef.current);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrentIndex((p) => p + 1);
    }, 4000);
  };

  const prevSlide = () => {
    stopAuto();
    setCurrentIndex((p) => p - 1);
  };

  const nextSlide = () => {
    stopAuto();
    setCurrentIndex((p) => p + 1);
  };

  return (
    <div className="bg-gray-50">
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/hero/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(47,143,245,0.42),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(17,185,129,0.24),transparent_28%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.86)_48%,rgba(16,40,77,0.92))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-gray-50 to-transparent" />

        <Container size="wide" className="relative py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
            <Reveal className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
              <div className="eyebrow gap-2 border-white/20 bg-white/10 text-brand-100 backdrop-blur">
                <Sparkles size={14} />
                Premium online academy
              </div>

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-display-xl">
                Learn smarter with a polished path from curiosity to mastery.
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg lg:mx-0">
                A modern learning platform built for structured courses, expert
                guidance, flexible access, and confident student progress.
              </p>

              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => navigate("/courses")}
                  className="group"
                >
                  Explore Courses
                  <ArrowRight
                    size={18}
                    className="transition duration-200 ease-premium group-hover:translate-x-1"
                  />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/about")}
                  className="border-white/25 bg-white/12 text-black shadow-none backdrop-blur hover:border-white/40 hover:bg-white/18 hover:text-white"
                >
                  Learn More
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                {trustItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-inset backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-400/20 via-white/10 to-accent-mint/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/12 p-3 shadow-premium backdrop-blur-xl">
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                  <img
                    src="/images/hero/hero-bg.jpg"
                    alt="Learnify Academy online learning"
                    className="h-64 w-full object-cover opacity-90 sm:h-80"
                  />
                </div>

                <div className="absolute left-6 top-6 rounded-2xl border border-white/20 bg-white/82 p-4 text-ink-900 shadow-premium backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                    Live learning
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-ink-950">
                    Clear progress
                  </p>
                </div>

                <div className="absolute bottom-6 right-6 rounded-2xl border border-white/20 bg-ink-950/78 p-4 text-white shadow-premium backdrop-blur-xl">
                  <p className="text-xs font-medium text-slate-600">
                    Student focus
                  </p>
                  <p className="mt-1 text-lg font-semibold">Guided paths</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
            {heroStats.map((stat) => (
              <StaggerItem
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${stat.gradient} blur-3xl`}
                />

                <div className="relative z-10">
                  <div
                    className={`inline-block bg-gradient-to-r ${stat.gradient} bg-clip-text text-5xl font-bold text-transparent`}
                  >
                    {stat.value}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {stat.label}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {stat.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="wide">
          <Reveal className="section-header">
            <span className="eyebrow">Featured courses</span>
            <h2 className="heading-section">Explore Our Courses</h2>
            <p className="text-lead mt-4">
              Start with structured programs designed for steady progress, clear
              outcomes, and flexible learning.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              type="button"
              variant="dark"
              size="lg"
              className="group"
              onClick={() => navigate("/courses")}
            >
              View All Courses
              <ArrowRight
                size={18}
                className="transition duration-200 ease-premium group-hover:translate-x-1"
              />
            </Button>
          </div>
        </Container>
      </section>

      <section className="section bg-app-shell">
        <Container size="wide">
          <div className="section-header">
            <span className="eyebrow">Why Learnify</span>
            <h2 className="heading-section">
              Built around clarity and momentum
            </h2>
            <p className="text-lead mt-4">
              Each part of the platform supports a simple flow: understand the
              path, enroll securely, and keep moving through your lessons.
            </p>
          </div>

          <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {benefitItems.map((item) => {
              const Icon = item.icon;

              return (
                <StaggerItem
                  key={item.title}
                  className="glass-panel group p-6 text-center transition duration-200 ease-premium hover:-translate-y-1 hover:shadow-premium"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-sheen text-white shadow-glow transition duration-200 ease-premium group-hover:-translate-y-0.5">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-600">
                    {item.copy}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="wide">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="eyebrow">Learning experience</span>
              <h2 className="heading-section">
                Programs that feel easy to follow
              </h2>
            </div>
            <p className="text-lead lg:max-w-2xl lg:justify-self-end">
              Clear curriculum design, guided instruction, and flexible access
              keep the experience organized without adding complexity.
            </p>
          </div>

          <Stagger className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <StaggerItem
                key={i}
                className="card-premium p-7 transition duration-200 ease-premium hover:-translate-y-1"
              >
                <div
                  className={`${f.color} mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-soft`}
                >
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-semibold text-ink-950">
                  {f.title}
                </h3>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-ink-600">
                  {f.items.map((it, idx) => (
                    <li key={idx} className="flex gap-3">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-accent-mint"
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-app-shell">
        <Container size="wide">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow">Faculty</span>
              <h2 className="heading-section">Our Faculty</h2>
              <p className="text-lead mt-4">
                Learn with instructors focused on clear explanations, practical
                guidance, and consistent student support.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={prevSlide}
                className="h-11 w-11 rounded-full px-0"
                aria-label="Previous faculty"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={nextSlide}
                className="h-11 w-11 rounded-full px-0"
                aria-label="Next faculty"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="overflow-hidden rounded-3xl border border-white/70 bg-white/55 p-4 shadow-soft backdrop-blur-xl sm:p-6"
            style={{ touchAction: "pan-x" }}
            onWheel={(e) => {
              if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY;
            }}
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
          >
            <div ref={sliderRef} className="flex gap-6">
              {extendedFaculty.map((f, i) => (
                <div
                  key={i}
                  className="min-w-[240px] rounded-2xl border border-ink-200/70 bg-white p-6 text-center shadow-soft transition duration-200 ease-premium hover:-translate-y-1 hover:shadow-premium"
                >
                  <img
                    src={f.image}
                    alt={f.name}
                    className="mx-auto mb-4 h-24 w-24 rounded-2xl object-cover shadow-soft"
                  />
                  <h3 className="text-lg font-semibold text-ink-950">
                    {f.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-600">{f.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {faculty.map((_, i) => (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                onClick={() => setCurrentIndex(i + 1)}
                className={`h-2.5 rounded-full transition-all duration-200 ease-premium ${
                  currentIndex === i + 1
                    ? "w-8 bg-brand-600"
                    : "w-2.5 bg-ink-300 hover:bg-ink-400"
                }`}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="wide">
          <div className="section-header">
            <span className="eyebrow">Student feedback</span>
            <h2 className="heading-section">What Our Students Say</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((text, i) => (
              <div key={i} className="card-premium p-8">
                <p className="text-sm leading-7 text-ink-600">"{text}"</p>

                <div className="mt-7 flex items-center gap-3 border-t border-ink-200/70 pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-sheen text-sm font-semibold text-white shadow-soft">
                    VS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">
                      Verified Student
                    </p>
                    <p className="text-xs text-ink-500">Enrolled Learner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Home;
