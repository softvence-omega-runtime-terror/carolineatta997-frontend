import React from "react";

type HomeButtonProps = {
  text: string;
  icon?: React.ReactNode;
  variant?: "outline" | "filled";
  theme?: {
    primary: string;
    text: string;
  };
};

const HomeButton = ({ text, icon, variant = "outline", theme }: HomeButtonProps) => {
  const baseStyle =
    "flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition";

  const variantStyle =
    variant === "outline"
      ? `border border-${theme?.primary} text-${theme?.text}`
      : `bg-${theme?.primary} text-white`;

  return (
    <button className={`${baseStyle} ${variantStyle}`}>
      {icon}
      {text}
    </button>
  );
};

export default HomeButton;