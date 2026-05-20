import { cn } from "../../utils/cn";
import Container from "./Container";

const spacing = {
  default: "section",
  compact: "section-compact",
  none: "",
};

function Section({
  as: Component = "section",
  spacing: spacingKey = "default",
  container = "default",
  className = "",
  children,
  ...props
}) {
  return (
    <Component className={cn(spacing[spacingKey] || spacing.default, className)} {...props}>
      {container ? <Container size={container}>{children}</Container> : children}
    </Component>
  );
}

export default Section;
