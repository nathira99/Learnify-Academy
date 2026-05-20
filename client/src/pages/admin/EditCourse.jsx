import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/api";
import { getToken } from "../../utils/auth";
import AdminLayout from "./AdminLayout";
import Button from "../../components/ui/Button";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setCourse(res.data))
      .catch(() => alert("Failed to load course"));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API}/api/teachers`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setTeachers(res.data))
      .catch(() => {});
  }, []);

  const update = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      await axios.put(
        `${API}/api/courses/${id}`,
        {
          ...course,
          price: Number(course.price),
          duration: course.duration ? Number(course.duration) : undefined,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      alert("Course updated successfully");
      navigate("/admin/courses");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <AdminLayout>
        <div className="surface-panel p-8 text-ink-500">Loading course...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <span className="eyebrow">Course editor</span>
          <h1 className="heading-section mt-3">Edit Course</h1>
          <p className="text-lead mt-3">
            Update course information, teacher assignment, and visibility.
          </p>
        </div>

        <form onSubmit={update} className="surface-panel space-y-6 p-6 md:p-8">
          <Field label="Course Title">
            <input
              className="form-input"
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
              required
            />
          </Field>

          <Field label="Image Path">
            <input
              className="form-input"
              value={course.image}
              onChange={(e) => setCourse({ ...course, image: e.target.value })}
            />
            {course.image && (
              <img
                src={course.image}
                alt="Preview"
                className="mt-3 h-48 w-full rounded-2xl border border-ink-200 object-cover shadow-soft"
              />
            )}
          </Field>

          <Field label="Description">
            <textarea
              className="form-input min-h-[130px]"
              value={course.description}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
              required
            />
          </Field>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Price (paise)">
              <input
                type="number"
                className="form-input"
                value={course.price}
                onChange={(e) => setCourse({ ...course, price: e.target.value })}
                required
              />
            </Field>

            <Field label="Duration (hours) - optional">
              <input
                type="number"
                className="form-input"
                value={course.duration || ""}
                onChange={(e) =>
                  setCourse({ ...course, duration: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Teacher">
              <select
                className="form-input"
                value={course.teacher}
                onChange={(e) => setCourse({ ...course, teacher: e.target.value })}
              >
                <option value="">Select teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name || teacher.email}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Category">
              <select
                className="form-input"
                value={course.category}
                onChange={(e) =>
                  setCourse({ ...course, category: e.target.value })
                }
              >
                <option value="Academic">Academic</option>
                <option value="Skills">Skills</option>
                <option value="Islamic">Islamic</option>
              </select>
            </Field>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-ink-200 bg-ink-50 px-4 py-3">
            <span className="text-sm font-medium text-ink-800">Course Active</span>
            <input
              type="checkbox"
              checked={course.isActive}
              onChange={(e) =>
                setCourse({ ...course, isActive: e.target.checked })
              }
              className="h-5 w-5 rounded border-ink-300 text-brand-600"
            />
          </div>

          <Button type="submit" disabled={loading} variant="dark" className="w-full">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink-700">
        {label}
      </label>
      {children}
    </div>
  );
}

export default EditCourse;
