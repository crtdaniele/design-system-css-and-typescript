import React from "react";
import { Colors } from "../styles/colors";
import { FontSizes } from "../styles/fontSize";
import { Spacing } from "../styles/spacing";

type ButtonProps = {
  children: React.ReactNode;
  color?: Colors;
  fontSize?: FontSizes;
  padding?: Spacing;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, color = "--color-primary", fontSize = "--font-size-md", padding = "--spacing-md", ...props }) => {
  return (
    <button
      style={{
        backgroundColor: `var(${color})`,
        color: "white",
        fontSize: `var(${fontSize})`,
        padding: `var(${padding})`,
        borderRadius: "8px",
        fontFamily: "var(--font-primary)",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;