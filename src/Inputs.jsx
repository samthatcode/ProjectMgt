import React, { forwardRef } from "react";

export const classes = `w-full p-1 border-b-2 bg-[#e4d5c7] text-stone-600 border-stone-300 rounded-md focus:outline-none focus:border-stone-600`;

const Inputs = forwardRef(function Inputs({ textarea, label, ...props }, ref) {
  return (
    <p className={`flex flex-col my-4 gap-1`}>
      <label className={`text-sm uppercase font-bold text-[#27251f]`}>
        {label}
      </label>
      {textarea ? (
        <textarea className={classes} {...props} ref={ref} />
      ) : (
        <input className={classes} {...props} ref={ref} />
      )}
    </p>
  );
});
export default Inputs;
