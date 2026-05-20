import { NavLink } from "react-router-dom";
import {
  BookOpenText,
  LayoutDashboard,
  LucideHeartHandshake,
  PlusCircle,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { fadeUp } from "../../components/ui/Motion";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/courses", label: "Courses", icon: BookOpenText },
  { to: "/admin/add-course", label: "Add Course", icon: PlusCircle },
  { to: "/admin/teachers", label: "Teachers", icon: UsersRound },
];

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-app-shell">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col lg:flex-row">
        <aside className="sticky top-0 z-30 border-b border-white/70 bg-white/78 px-4 py-4 shadow-sm backdrop-blur-xl lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <div className="flex items-center justify-between gap-4 lg:block">
            <NavLink to="/admin" className="group flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-sheen text-white shadow-glow transition duration-200 ease-premium group-hover:-translate-y-0.5">
                <LucideHeartHandshake size={23} />
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-wide text-ink-500">
                  Academy
                </span>
                <span className="block text-lg font-semibold text-ink-950">
                  Admin
                </span>
              </span>
            </NavLink>

            <span className="badge-brand hidden sm:inline-flex lg:mt-8">
              Control panel
            </span>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:flex-col lg:overflow-visible lg:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ease-premium",
                      isActive
                        ? "bg-ink-950 text-white shadow-soft"
                        : "text-ink-600 hover:bg-white hover:text-brand-700 hover:shadow-soft"
                    )
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <motion.main
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export default AdminLayout;
