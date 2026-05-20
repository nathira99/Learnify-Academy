import { ArrowRight, CheckCircle2, Clock3, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { fadeUp } from "./ui/Motion";
import { cn } from "../utils/cn";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function CourseCard({
  course,
  isEnrolled = false,
  onEnroll,
  showEnroll = false,
  className = "",
}) {
  const coursePath = `/courses/${course._id}`;
  const price = typeof course.price === "number" ? currency.format(course.price / 100) : "";
  const description =
    course.description && course.description.length > 132
      ? `${course.description.slice(0, 132)}...`
      : course.description;

  return (
    <Card
      as={motion.div}
      variant="premium"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group flex h-full flex-col overflow-hidden p-0",
        className
      )}
    >
      <Link to={coursePath} className="block">
        <div className="relative overflow-hidden bg-ink-100">
          <img
            src={course.image}
            alt={course.title}
            className="h-52 w-full object-cover transition duration-500 ease-premium group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/48 via-ink-950/4 to-transparent opacity-80" />
          {course.category && (
            <span className="absolute left-4 top-4 rounded-full border border-white/55 bg-white/84 px-3 py-1 text-xs font-semibold text-brand-700 shadow-soft backdrop-blur">
              {course.category}
            </span>
          )}
          <span className="absolute bottom-4 right-4 rounded-full border border-white/40 bg-ink-950/72 px-3 py-1 text-xs font-medium text-white shadow-soft backdrop-blur">
            Online course
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to={coursePath} className="group/link flex flex-1 flex-col">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap size={15} className="text-brand-600" />
              Guided lessons
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} className="text-accent-mint" />
              Flexible
            </span>
          </div>

          <h3 className="text-xl font-semibold leading-snug text-ink-950 transition duration-200 ease-premium group-hover/link:text-brand-700">
            {course.title}
          </h3>

          <p className="mt-3 min-h-[5.25rem] text-sm leading-7 text-ink-600">
            {description}
          </p>
        </Link>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-ink-200/70 pt-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
              Course fee
            </p>
            <p className="mt-1 text-2xl font-semibold text-ink-950">
              {price}
            </p>
          </div>

          {!showEnroll && (
            <Button
              as={Link}
              to={coursePath}
              variant="ghost"
              size="sm"
              className="group/cta text-brand-700 hover:bg-brand-50"
            >
              Details
              <ArrowRight
                size={16}
                className="transition duration-200 ease-premium group-hover/cta:translate-x-1"
              />
            </Button>
          )}
        </div>

        {showEnroll && (
          <Button
            type="button"
            variant={isEnrolled ? "secondary" : "dark"}
            disabled={isEnrolled}
            onClick={() => onEnroll?.(course)}
            className="mt-5 w-full"
          >
            {isEnrolled && <CheckCircle2 size={17} />}
            {isEnrolled ? "Already Enrolled" : "Enroll Now"}
          </Button>
        )}
      </div>
    </Card>
  );
}

export default CourseCard;
