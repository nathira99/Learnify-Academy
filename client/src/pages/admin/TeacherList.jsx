import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, UsersRound } from "lucide-react";
import API from "../../config/api";
import { getToken } from "../../utils/auth";
import AdminLayout from "./AdminLayout";

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/api/teachers`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setTeachers(res.data))
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-8">
        <span className="eyebrow">Faculty management</span>
        <h1 className="heading-section mt-3">Teachers</h1>
        <p className="text-lead mt-3">Manage faculty members and expertise.</p>
      </div>

      <section className="surface-panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink-200/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <UsersRound size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink-950">Teacher List</h2>
              <p className="text-sm text-ink-500">Faculty records</p>
            </div>
          </div>
          <span className="badge-brand">{teachers.length} teachers</span>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : teachers.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <UsersRound size={27} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-ink-950">
              No teachers found
            </h3>
            <p className="mt-2 text-sm text-ink-500">
              Faculty members will appear here when available.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">Name</th>
                  <th className="px-5 py-4 text-left font-semibold">Email</th>
                  <th className="px-5 py-4 text-left font-semibold">Expertise</th>
                  <th className="px-5 py-4 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200/70">
                {teachers.map((teacher) => (
                  <tr
                    key={teacher._id}
                    className="transition duration-200 ease-premium hover:bg-brand-50/50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-950 text-sm font-semibold text-white">
                          {(teacher.name || teacher.email || "T").charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-ink-900">
                          {teacher.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-ink-600">
                      <span className="inline-flex items-center gap-2">
                        <Mail size={15} className="text-ink-400" />
                        {teacher.email}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink-600">
                      {teacher.expertise || "-"}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminLayout>
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

export default TeachersList;
