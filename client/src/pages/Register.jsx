import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Lock, Mail, UserRound } from "lucide-react";
import API from "../config/api";
import AuthShell from "../components/AuthShell";
import Button from "../components/ui/Button";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await axios.post(`${API}/api/auth/register`, {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Create account"
      title="Join Learnify"
      description="Start your learning journey with secure student access."
    >
      <form onSubmit={submit} className="space-y-5">
        {error && (
          <div
            className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="register-name"
            className="mb-2 block text-sm font-medium text-ink-700"
          >
            Full name
          </label>
          <div className="relative">
            <UserRound
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              id="register-name"
              className="form-input pl-12"
              placeholder="Your name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="mb-2 block text-sm font-medium text-ink-700"
          >
            Email address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              id="register-email"
              type="email"
              className="form-input pl-12"
              placeholder="example@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block text-sm font-medium text-ink-700"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              id="register-password"
              type="password"
              className="form-input pl-12"
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" variant="dark" className="w-full" disabled={submitting}>
          {submitting ? "Creating account..." : "Create Account"}
        </Button>

        <p className="text-center text-xs leading-6 text-ink-500">
          Secure access for students and administrators.
        </p>
      </form>

      <div className="mt-6 border-t border-ink-200/70 pt-6 text-center text-sm text-ink-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-brand-700 transition duration-200 ease-premium hover:text-brand-800"
        >
          Sign in
        </Link>
      </div>
    </AuthShell>
  );
}

export default Register;
