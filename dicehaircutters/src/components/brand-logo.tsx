import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/dice-logo.png";

type Props = {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

export function BrandLogo({ className = "", size = "md" }: Props) {
  const h = size === "sm" ? "h-10" : size === "lg" ? "h-20" : "h-14";

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Dice Hair Cutters home"
    >
      <img
        src={logoSrc}
        alt="Dice Hair Cutters"
        className={`${h} w-auto object-contain`}
        draggable={false}
      />
    </Link>
  );
}
