import { ReactNode, ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#8b0000] hover:bg-[#a00000] text-white",
  secondary: "bg-[var(--surface)] hover:bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]",
  ghost: "hover:bg-[var(--background)] text-[var(--foreground)]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  loading = false,
  children,
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
}
