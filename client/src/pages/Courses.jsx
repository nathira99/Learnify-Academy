import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  BookOpenText,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import API from "../config/api";
import { getToken } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Reveal, { Stagger, StaggerItem } from "../components/ui/Motion";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/courses`)
      .then((res) => setCourses(res.data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setEnrolledCourseIds([]);
      return;
    }

    axios
      .get(`${API}/api/enrollments/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const ids = Array.isArray(res.data)
          ? res.data.map((e) => e.course?._id).filter(Boolean)
          : [];
        setEnrolledCourseIds(ids);
      })
      .catch(() => setEnrolledCourseIds([]));
  }, []);

  const categories = useMemo(() => {
    const values = courses
      .map((course) => course.category)
      .filter(Boolean)
      .filter((value, index, array) => array.indexOf(value) === index);

    return ["All", ...values];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All" || course.category === activeCategory;
      const searchableText = `${course.title || ""} ${course.description || ""} ${
        course.category || ""
      }`.toLowerCase();
      const matchesQuery =
        !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, courses, query]);

  const enrolledCount = enrolledCourseIds.length;

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("All");
  };

  const pay = async (course) => {
    const token = getToken();

    if (!token) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${API}/api/orders/create`,
        {
          amount: course.price,
          courseId: course._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          await axios.post(
            `${API}/api/payments/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );

          navigate("/dashboard");
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <main className="bg-app-shell">
      <section className="relative overflow-hidden border-b border-white/70 bg-white/62">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(47,143,245,0.14),transparent_30%),radial-gradient(circle_at_86%_20%,rgba(17,185,129,0.12),transparent_28%)]" />
        <Container size="wide" className="relative py-12 md:py-16 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <Reveal className="max-w-3xl">
              <div className="eyebrow gap-2">
                <Sparkles size={14} />
                Course marketplace
              </div>
              <h1 className="heading-display">
                Choose your next learning path
              </h1>
              <p className="text-lead mt-5">
                Browse structured programs with clear topics, flexible access,
                polished course previews, and a secure enrollment flow.
              </p>
            </Reveal>

            <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <StaggerItem><MetricCard label="Courses" value={courses.length} /></StaggerItem>
              <StaggerItem><MetricCard label="Categories" value={Math.max(categories.length - 1, 0)} /></StaggerItem>
              <StaggerItem><MetricCard label="Enrolled" value={enrolledCount} /></StaggerItem>
            </Stagger>
          </div>
        </Container>
      </section>

      <Container size="wide" className="py-10 md:py-12 lg:py-14">
        <Reveal className="glass-panel mb-8 p-4 md:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <Search
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, topics, or categories"
                className="form-input pl-12 pr-11"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-400 transition duration-200 ease-premium hover:bg-ink-100 hover:text-ink-700"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </label>

            <div className="flex items-center gap-2 text-sm font-medium text-ink-500">
              <SlidersHorizontal size={18} className="text-brand-600" />
              <span>{filteredCourses.length} matching courses</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ease-premium ${
                    isActive
                      ? "border-brand-500 bg-brand-600 text-white shadow-glow"
                      : "border-ink-200 bg-white/80 text-ink-600 hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {loading ? (
          <CourseGridSkeleton />
        ) : filteredCourses.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isEnrolled={enrolledCourseIds.includes(course._id)}
                onEnroll={pay}
                showEnroll
              />
            ))}
          </div>
        ) : (
          <div className="surface-panel mx-auto max-w-2xl p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <BookOpenText size={28} />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-ink-950">
              No courses found
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink-600">
              Try a different search term or reset your filters to view the
              full course catalog.
            </p>
            <Button
              type="button"
              variant="dark"
              className="mt-6"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </Container>
    </main>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="glass-panel px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-sheen text-white shadow-soft">
          <CheckCircle2 size={19} />
        </div>
        <div>
          <p className="text-2xl font-semibold text-ink-950">{value}</p>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function CourseGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="card overflow-hidden p-0"
          aria-label="Loading course"
        >
          <div className="h-52 animate-pulse bg-ink-200" />
          <div className="space-y-4 p-5">
            <div className="h-4 w-32 animate-pulse rounded-full bg-ink-200" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-ink-200" />
            <div className="space-y-2">
              <div className="h-3 animate-pulse rounded bg-ink-200" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-ink-200" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-ink-200" />
            </div>
            <div className="h-11 animate-pulse rounded-xl bg-ink-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Courses;
