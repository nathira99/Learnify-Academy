import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookOpenText, Edit3, PlusCircle } from "lucide-react";
import API from "../../config/api";
import { getToken } from "../../utils/auth";
import AdminLayout from "../../pages/admin/AdminLayout";
import Button from "../../components/ui/Button";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = getToken();

  const loadCourses = useCallback(async () => {
    const res = await axios.get(`${API}/api/courses/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCourses(res.data);
  }, [token]);

  useEffect(() => {
    loadCourses()
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [loadCourses]);

  const toggleStatus = async (courseId) => {
    const res = await axios.patch(
      `${API}/api/courses/admin/${courseId}/toggle`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCourses((prev) =>
      prev.map((course) =>
        course._id === courseId ? { ...course, isActive: res.data.isActive } : course
      )
    );
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Course management</span>
          <h1 className="heading-section mt-3">Manage Courses</h1>
          <p className="text-lead mt-3">
            Activate courses, review categories, and monitor enrollments.
          </p>
        </div>

        <Button as={Link} to="/admin/add-course" variant="dark" className="group">
          <PlusCircle size={18} />
          Add Course
        </Button>
      </div>

      <section className="surface-panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink-200/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <BookOpenText size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink-950">Course List</h2>
              <p className="text-sm text-ink-500">Manage catalog visibility</p>
            </div>
          </div>
          <span className="badge-brand">{courses.length} courses</span>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : courses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">Title</th>
                  <th className="px-5 py-4 text-left font-semibold">Category</th>
                  <th className="px-5 py-4 text-center font-semibold">Status</th>
                  <th className="px-5 py-4 text-left font-semibold">Teacher</th>
                  <th className="px-5 py-4 text-center font-semibold">Enrolled</th>
                  <th className="px-5 py-4 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200/70">
                {courses.map((course) => (
                  <tr
                    key={course._id}
                    className="transition duration-200 ease-premium hover:bg-brand-50/50"
                  >
                    <td className="px-5 py-4 font-semibold text-ink-900">
                      {course.title}
                    </td>
                    <td className="px-5 py-4">
                      <span className="badge">{course.category}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleStatus(course._id)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition duration-200 ease-premium ${
                          course.isActive ? "bg-emerald-500" : "bg-ink-300"
                        }`}
                        aria-label="Toggle course status"
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition duration-200 ease-premium ${
                            course.isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-5 py-4 text-ink-600">
                      {course.teachers?.name || (
                        <span className="text-ink-400">Unassigned</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-700">
                        {course.enrolledCount}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Button
                        as={Link}
                        to={`/admin/edit-course/${course._id}`}
                        variant="ghost"
                        size="sm"
                        className="text-brand-700 hover:bg-brand-50"
                      >
                        <Edit3 size={15} />
                        Edit
                      </Button>
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

function EmptyState() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <BookOpenText size={27} />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-ink-950">No courses found</h3>
      <p className="mt-2 text-sm text-ink-500">
        Add your first course to start building the catalog.
      </p>
    </div>
  );
}

export default CourseList;
