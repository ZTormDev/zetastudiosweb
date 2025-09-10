import React from "react";
import { Link } from "react-router-dom";
import { isExternalUrl } from "../../core/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  href?: string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  href,
  to,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const baseClasses = `btn btn--${variant} btn--${size}`;
  const classes = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={isExternalUrl(href) ? "_blank" : undefined}
        rel={isExternalUrl(href) ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
