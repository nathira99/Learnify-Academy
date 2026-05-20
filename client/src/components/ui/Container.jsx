import { cn } from "../../utils/cn";

const sizes = {
  default: "app-container",
  narrow: "app-container-narrow",
  wide: "app-container-wide",
};

function Container({ as: Component = "div", size = "default", className = "", ...props }) {
  return (
    <Component
      className={cn(sizes[size] || sizes.default, className)}
      {...props}
    />
  );
}

export default Container;
