import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, Lock, Mail } from "lucide-react";
import { loginUser } from "../services/authApi";
import { getRole, setToken } from "../utils/auth";
import AuthShell from "../components/AuthShell";
import Button from "../components/ui/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await loginUser({ email, password });
      setToken(res.data.token);

      const redirectTo = location.state?.from || "/";
      const role = getRole();

      if (role === "admin") navigate("/admin");
      else navigate(redirectTo);
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Academy Login"
      description="Access your courses, dashboard, and learning progress."
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
            htmlFor="login-email"
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
              id="login-email"
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
            htmlFor="login-password"
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
              id="login-password"
              type="password"
              className="form-input pl-12"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" variant="dark" className="w-full" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-center text-xs leading-6 text-ink-500">
          Secure access for students and administrators.
        </p>
      </form>

      <div className="mt-6 border-t border-ink-200/70 pt-6 text-center text-sm text-ink-600">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-brand-700 transition duration-200 ease-premium hover:text-brand-800"
          >
            Create one
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

export default Login;
