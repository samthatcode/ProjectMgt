import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <div>
      <button
        className={`py-2 px-6 text-white font-bold rounded-md bg-[#186049] hover:bg-[#247158]`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
