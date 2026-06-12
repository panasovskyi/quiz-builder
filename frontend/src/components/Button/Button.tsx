import { ReactNode, ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";
import Link from "next/link";

type BaseProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
};

type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "onClick"> &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "onClick">;

export function Button({
  children,
  className = "",
  href,
  onClick,
  ...props
}: ButtonProps) {
  const buttonClasses = `${styles.button} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={buttonClasses} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
