import { Link } from "react-router-dom";
import { Menu, X, LucideHeartHandshake } from "lucide-react";
import { useState } from "react";
import { getToken, getRole, logout } from "../utils/auth";

function Navbar() {
  const token = getToken();
  const role = getRole();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <LucideHeartHandshake className="text-slate-900" size={36} />
          <Link to="/" className="text-2xl font-bold text-slate-800">
            Learnify Academy
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks token={token} role={role} />
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          <NavLinks token={token} role={role} mobile />
        </div>
      )}
    </nav>
  );
}

/* Extracted links to avoid repetition */
function NavLinks({ token, role, mobile }) {
  const baseClass = mobile
    ? "block text-gray-700 hover:text-blue-600 font-medium"
    : "text-gray-700 hover:text-blue-600 font-medium";

  return (
    <>
      <Link to="/" className={baseClass}>Home</Link>
      <Link to="/courses" className={baseClass}>Courses</Link>
      <Link to="/about" className={baseClass}>About</Link>

      {!token ? (
        <Link
          to="/login"
          className={
            mobile
              ? "block bg-blue-600 text-white px-4 py-2 rounded text-center"
              : "bg-blue-600 text-white px-4 py-1.5 rounded"
          }
        >
          Login
        </Link>
      ) : (
        <>
          <Link
            to={role === "admin" ? "/admin" : "/dashboard"}
            className={baseClass}
          >
            Dashboard
          </Link>

          <button
            onClick={logout}
            className="text-red-500 hover:underline font-medium block"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
}

export default Navbar;