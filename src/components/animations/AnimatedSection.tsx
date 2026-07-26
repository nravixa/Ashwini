import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  style?: React.CSSProperties;
}

export default function AnimatedSection({
  children,
  className = "",
  id,
  style,
}: AnimatedSectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={style}
    >
      {children}
    </section>
  );
}
