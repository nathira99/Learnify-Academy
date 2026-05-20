import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, LucideHeartHandshake, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getRole, getToken, logout } from "../utils/auth";
import Button from "./ui/Button";
import Container from "./ui/Container";
import { cn } from "../utils/cn";

function Navbar() {
  const token = getToken();
  const role = getRole();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/72 shadow-sm shadow-ink-900/5 backdrop-blur-xl">
      <Container size="wide" className="py-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/62 px-3 py-2 shadow-inset backdrop-blur md:px-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex min-w-0 items-center gap-3 rounded-xl pr-2 transition duration-200 ease-premium hover:opacity-90"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-sheen text-white shadow-glow transition duration-200 ease-premium group-hover:-translate-y-0.5 group-hover:shadow-premium">
              <LucideHeartHandshake size={23} />
            </span>
            <span className="truncate text-lg font-semibold tracking-normal text-ink-950 sm:text-xl">
              Learnify Academy
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <NavLinks
              token={token}
              role={role}
              pathname={pathname}
              onNavigate={closeMenu}
            />
          </div>

          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="h-11 w-11 shrink-0 px-0 md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="relative h-6 w-6">
              <Menu
                size={24}
                className={cn(
                  "absolute inset-0 transition duration-200 ease-premium",
                  isOpen
                    ? "rotate-90 scale-75 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                )}
              />
              <X
                size={24}
                className={cn(
                  "absolute inset-0 transition duration-200 ease-premium",
                  isOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-75 opacity-0"
                )}
              />
            </span>
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                className="mt-3 rounded-2xl border border-white/70 bg-white/88 p-3 shadow-premium backdrop-blur-xl"
              >
              <NavLinks
                token={token}
                role={role}
                pathname={pathname}
                mobile
                onNavigate={closeMenu}
              />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
}

function NavLinks({ token, role, pathname, mobile = false, onNavigate }) {
  const dashboardPath = role === "admin" ? "/admin" : "/dashboard";
  const links = [
    { to: "/", label: "Home", exact: true },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About", exact: true },
  ];

  const isActive = (link) =>
    link.exact
      ? pathname === link.to
      : pathname === link.to || pathname.startsWith(`${link.to}/`);

  return (
    <div className={cn(mobile ? "flex flex-col gap-1" : "flex items-center gap-1")}>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className={cn(
            "nav-link relative",
            mobile && "flex items-center justify-between px-4 py-3 text-base",
            isActive(link) && "nav-link-active",
            isActive(link) &&
              !mobile &&
              "after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-brand-500"
          )}
        >
          {link.label}
        </Link>
      ))}

      <div
        className={cn(
          mobile
            ? "mt-3 flex flex-col gap-2 border-t border-ink-200/70 pt-3"
            : "ml-2 flex items-center gap-2 border-l border-ink-200/80 pl-3"
        )}
      >
        {!token ? (
          <Button
            as={Link}
            to="/login"
            variant="primary"
            size={mobile ? "lg" : "sm"}
            onClick={onNavigate}
            className={cn(mobile && "w-full")}
          >
            Login
          </Button>
        ) : (
          <>
            <Button
              as={Link}
              to={dashboardPath}
              variant="secondary"
              size={mobile ? "lg" : "sm"}
              onClick={onNavigate}
              className={cn(
                "group",
                mobile && "w-full",
                (pathname === dashboardPath || pathname.startsWith(`${dashboardPath}/`)) &&
                  "border-brand-200 text-brand-700"
              )}
            >
              <LayoutDashboard
                size={16}
                className="transition duration-200 ease-premium group-hover:-translate-y-0.5"
              />
              Dashboard
            </Button>

            <Button
              variant="danger"
              size={mobile ? "lg" : "sm"}
              onClick={logout}
              className={cn(mobile && "w-full")}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
