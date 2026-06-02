import React from "react";

interface CalloutProps {
  children: React.ReactNode;
  type?: "default" | "note" | "warning";
}

export default function Callout({ children, type = "default" }: CalloutProps) {
  const styles = {
    default: "bg-ll-warm border-l-4 border-ll-accent",
    note: "bg-blue-50 border-l-4 border-blue-400",
    warning: "bg-amber-50 border-l-4 border-amber-400",
  };

  return (
    <div className={`not-prose ${styles[type]} rounded-r-lg px-6 py-5 my-8 text-sm text-ll-text leading-relaxed`}>
      {children}
    </div>
  );
}
