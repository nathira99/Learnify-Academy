import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight, BookOpenText, CheckCircle2, GraduationCap } from "lucide-react";
import API from "../config/api";
import { getToken } from "../utils/auth";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Reveal, { Stagger, StaggerItem } from "../components/ui/Motion";

function UserDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/enrollments/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEnrollments(res.data))
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <main className="min-h-screen bg-app-shell">
      <Container size="wide" className="py-10 md:py-14 lg:py-16">
        <Reveal className="mb-8 overflow-hidden rounded-3xl bg-ink-950 p-7 text-white shadow-premium md:p-9">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <span className="eyebrow gap-2 border-white/20 bg-white/10 text-brand-100 backdrop-blur">
                <GraduationCap size={14} />
                Student dashboard
              </span>
              <h1 className="mt-4 text-4xl font-semibold text-white">
                My Courses
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Access your enrolled courses and continue learning from where
                you left off.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-72">
              <Metric label="Enrolled" value={enrollments.length} />
              <Metric label="Access" value="24/7" />
            </div>
          </div>
        </Reveal>

        {loading ? (
          <DashboardSkeleton />
        ) : enrollments.length === 0 ? (
          <div className="surface-panel mx-auto max-w-2xl p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <BookOpenText size={31} />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-ink-950">
              No enrolled courses yet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-ink-600">
              You have not enrolled in any courses yet. Browse the catalog and
              choose a learning path that fits your goals.
            </p>
            <Button as={Link} to="/courses" variant="dark" className="mt-6 group">
              Browse Courses
              <ArrowRight
                size={17}
                className="transition duration-200 ease-premium group-hover:translate-x-1"
              />
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-ink-950">
                  Continue Learning
                </h2>
                <p className="mt-1 text-sm text-ink-500">
                  Your active enrolled programs
                </p>
              </div>
              <span className="badge-brand">{enrollments.length} courses</span>
            </div>

            <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {enrollments.map((enrollment) => (
                <StaggerItem
                  key={enrollment._id}
                  className="card-premium flex h-full flex-col p-6"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Enrolled
                    </span>
                    <CheckCircle2 size={20} className="text-accent-mint" />
                  </div>

                  <h3 className="text-xl font-semibold leading-snug text-ink-950">
                    {enrollment.course?.title}
                  </h3>

                  <p className="mt-3 min-h-[6rem] text-sm leading-7 text-ink-600">
                    {enrollment.course?.description}
                  </p>

                  <div className="mt-6 border-t border-ink-200/70 pt-5">
                    <Button
                      as={Link}
                      to={`/courses/${enrollment.course?._id}`}
                      variant="secondary"
                      className="w-full group"
                    >
                      Go to Course
                      <ArrowRight
                        size={17}
                        className="transition duration-200 ease-premium group-hover:translate-x-1"
                      />
                    </Button>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}
      </Container>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/10 px-4 py-4 text-center shadow-inset backdrop-blur">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-300">
        {label}
      </p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="card p-6">
          <div className="mb-5 h-6 w-24 animate-pulse rounded-full bg-ink-200" />
          <div className="h-7 w-3/4 animate-pulse rounded bg-ink-200" />
          <div className="mt-4 space-y-2">
            <div className="h-3 animate-pulse rounded bg-ink-200" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-ink-200" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-ink-200" />
          </div>
          <div className="mt-6 h-11 animate-pulse rounded-xl bg-ink-200" />
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
