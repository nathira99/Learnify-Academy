import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/api";
import { getToken } from "../../utils/auth";
import AdminLayout from "./AdminLayout";
import Button from "../../components/ui/Button";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Skills");
  const [duration, setDuration] = useState("");
  const [teacher, setTeacher] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/api/users/teachers`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setTeachers(res.data))
      .catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!teacher) {
      alert("Please select a teacher");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${API}/api/courses`,
        {
          title,
          image,
          description,
          price: Number(price),
          category,
          duration: duration ? Number(duration) : undefined,
          teacher,
          isActive,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      alert("Course added successfully");

      setTitle("");
      setImage("");
      setDescription("");
      setPrice("");
      setCategory("Skills");
      setDuration("");
      setTeacher("");
      setIsActive(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <span className="eyebrow">Course setup</span>
          <h1 className="heading-section mt-3">Add New Course</h1>
          <p className="text-lead mt-3">
            Create a new learning program and assign it to a teacher.
          </p>
        </div>

        <form onSubmit={submit} className="surface-panel space-y-6 p-6 md:p-8">
          <Field label="Course Title">
            <input
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Field>

          <Field label="Image Path">
            <input
              className="form-input"
              placeholder="/images/courses/course.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-3 h-48 w-full rounded-2xl border border-ink-200 object-cover shadow-soft"
              />
            )}
          </Field>

          <Field label="Description">
            <textarea
              className="form-input min-h-[130px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Field>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Price (paise)">
              <input
                type="number"
                className="form-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Field>

            <Field label="Duration (hours) - optional">
              <input
                type="number"
                className="form-input"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Teacher">
              <select
                className="form-input"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                required
              >
                <option value="">Select teacher</option>
                {teachers.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name || item.email}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Category">
              <select
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-5 w-5 rounded border-ink-300 text-brand-600"
            />
          </div>

          <Button type="submit" disabled={loading} variant="dark" className="w-full">
            {loading ? "Adding Course..." : "Add Course"}
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

export default AddCourse;
