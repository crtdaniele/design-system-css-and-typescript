import React from "react";
import { Colors, ColorsEnum } from "../styles/colors";
import { FontSizes, FontSizesEnum } from "../styles/fontSize";
import { Spacing, SpacingEnum } from "../styles/spacing";

type ButtonProps = {
  children: React.ReactNode;
  bgColor?: Colors;
  fontSize?: FontSizes;
  padding?: Spacing;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, bgColor, fontSize, padding, ...props }) => {
  return (
    <button
      style={{
        backgroundColor: bgColor ? `var(${ColorsEnum[bgColor]})` : "transparent",
        color: "white",
        fontSize: fontSize ? `var(${FontSizesEnum[fontSize]})` : "inherit",
        padding: padding ? `var(${SpacingEnum[padding]})` : "0.5rem",
        borderRadius: "8px",
        fontFamily: "var(--font-primary)",
        border: "none",
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
