import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <div>
      <button className="bg-primary py-3.5 w-full rounded-lg text-sm text-white font-medium">
        {children}
      </button>
    </div>
  );
};

export default Button;
