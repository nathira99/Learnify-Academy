import { motion } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

function Reveal({ as = motion.div, className = "", children, ...props }) {
  const Component = as;

  return (
    <Component
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Stagger({ as = motion.div, className = "", children, ...props }) {
  const Component = as;

  return (
    <Component
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = motion.div, className = "", children, ...props }) {
  const Component = as;

  return (
    <Component variants={fadeUp} className={className} {...props}>
      {children}
    </Component>
  );
}

export default Reveal;
