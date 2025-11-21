"use client";

import { Button001 } from "arcfe/packages/ui";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "001" | "002" | "003";
  size?: "small" | "middle" | "large";
  disabled?: boolean;
  as?: "button" | "a" | "span";
  href?: string;
};

export const Button = ({
  children,
  onClick,
  type = "001",
  size = "middle",
  disabled = false,
  as = "button",
  href,
}: ButtonProps) => {
  return (
    <Button001 type={type} size={size} disabled={disabled} as={as} href={href} onClick={onClick}>
      {children}
    </Button001>
  );
};
