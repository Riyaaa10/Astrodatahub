import React from "react";

interface CardContentProps {
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

export default CardContent;
