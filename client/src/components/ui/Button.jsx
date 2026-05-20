import { cn } from "../../utils/cn";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  dark: "btn-dark",
  ghost: "btn-ghost",
  danger: "btn-danger",
};

const sizes = {
  sm: "min-h-9 px-4 py-2 text-xs",
  md: "",
  lg: "min-h-12 px-6 py-3 text-base",
};

function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className = "",
  type,
  ...props
}) {
  const buttonType = Component === "button" ? type || "button" : type;

  return (
    <Component
      type={buttonType}
      className={cn(variants[variant] || variants.primary, sizes[size], className)}
      {...props}
    />
  );
}

export default Button;
