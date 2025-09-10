import React from "react";
import { useScrollToTop } from "../../core/hooks";

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  className = "",
}) => {
  useScrollToTop();

  return <div className={`page ${className}`}>{children}</div>;
};
