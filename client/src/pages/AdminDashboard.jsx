import { useEffect, useState } from "react";
import axios from "axios";
import {
  BadgeIndianRupee,
  BookOpenText,
  CreditCard,
  ReceiptText,
} from "lucide-react";
import { getPayments, getStats } from "../services/adminApi";
import AdminLayout from "../pages/admin/AdminLayout";
import API from "../config/api";
import { getToken } from "../utils/auth";
import Button from "../components/ui/Button";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function AdminDashboard() {
  const token = getToken();

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [courseStats, setCourseStats] = useState(null);
  const [stats, setStats] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/api/courses/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourseStats(res.data))
      .catch((err) => console.error("COURSE STATS ERROR:", err));
  }, [token]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const statsRes = await getStats(token);
        const payRes = await getPayments(token, page);

        setStats(statsRes.data);
        setPayments(
          Array.isArray(payRes.data.payments) ? payRes.data.payments : []
        );
        setPages(payRes.data.pagination.pages);
      } catch (err) {
        console.error("ADMIN DASHBOARD ERROR:", err);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, page]);

  const statCards = [
    {
      label: "Total Revenue",
      value: stats ? currency.format(stats.totalRevenue / 100) : "Loading",
      icon: BadgeIndianRupee,
      tone: "brand",
    },
    {
      label: "Total Payments",
      value: stats ? stats.totalPayments : "Loading",
      icon: CreditCard,
      tone: "mint",
    },
    {
      label: "Active Courses",
      value: courseStats ? courseStats.activeCourses : "Loading",
      icon: BookOpenText,
      tone: "dark",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Admin overview</span>
          <h1 className="heading-section mt-3">Dashboard</h1>
          <p className="text-lead mt-3">
            Monitor revenue, payments, and active learning programs.
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <section className="surface-panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink-200/70 px-5 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <ReceiptText size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink-950">
                Recent Payments
              </h2>
              <p className="text-sm text-ink-500">
                Latest successful enrollment activity
              </p>
            </div>
          </div>
          <span className="badge-brand">{payments.length} records</span>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : payments.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-50 text-ink-500">
              <ReceiptText size={27} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-ink-950">
              No payments yet
            </h3>
            <p className="mt-2 text-sm text-ink-500">
              Recent payment activity will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">User</th>
                  <th className="px-5 py-4 text-left font-semibold">Course</th>
                  <th className="px-5 py-4 text-left font-semibold">Amount</th>
                  <th className="px-5 py-4 text-left font-semibold">Date</th>
                  <th className="px-5 py-4 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200/70">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="transition duration-200 ease-premium hover:bg-brand-50/50"
                  >
                    <td className="px-5 py-4 font-medium text-ink-800">
                      {payment.user?.email || "-"}
                    </td>
                    <td className="px-5 py-4 text-ink-600">
                      {payment.course?.title || "-"}
                    </td>
                    <td className="px-5 py-4 font-semibold text-ink-950">
                      {currency.format(payment.amount / 100)}
                    </td>
                    <td className="px-5 py-4 text-ink-600">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-ink-200/70 bg-ink-50/70 px-5 py-4">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span className="text-sm font-medium text-ink-600">
            Page {page} of {pages}
          </span>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </section>
    </AdminLayout>
  );
}

function StatCard({ label, value, icon: Icon, tone }) {
  const iconClass =
    tone === "mint"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "dark"
      ? "bg-ink-950 text-white"
      : "bg-brand-sheen text-white";

  return (
    <div className="card-premium p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-ink-950">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}>
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3 p-5">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="h-12 animate-pulse rounded-xl bg-ink-100" />
      ))}
    </div>
  );
}

export default AdminDashboard;
