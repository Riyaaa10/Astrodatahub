import React from "react";

interface CardHeaderProps {
  title: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title }) => {
  return <h3 className="text-xl font-semibold">{title}</h3>;
};

export default CardHeader;
