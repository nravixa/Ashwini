

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
}

export default function AnimatedHeading({
  text,
  className = "",
  as = "h2",
}: AnimatedHeadingProps) {
  const Component = as as any;
  
  return (
    <Component className={className}>
      {text}
    </Component>
  );
}
