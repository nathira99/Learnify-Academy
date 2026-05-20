import { cn } from "../../utils/cn";

const variants = {
  default: "card",
  premium: "card-premium",
  glass: "glass-panel",
  surface: "surface-panel",
};

function Card({ as: Component = "div", variant = "default", className = "", ...props }) {
  return (
    <Component
      className={cn(variants[variant] || variants.default, className)}
      {...props}
    />
  );
}

export default Card;
