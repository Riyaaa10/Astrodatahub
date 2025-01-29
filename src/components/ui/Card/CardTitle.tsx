import React from "react";

interface CardTitleProps {
  title: string;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ title, className }) => {
  return (
    <h3 className={`text-lg font-bold text-gray-900 ${className || ""}`}>
      {title}
    </h3>
  );
};
