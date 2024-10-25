import React, { useId } from "react";

const Input = React.forwardRef(function Input({ label, type = "text", error, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="mt-2">
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input type={type} className={`w-full px-4 py-3 mt-2 bg-slate-200 rounded-lg focus:outline-none ${className}`} ref={ref} {...props} id={id} />
      {error && <p className="text-[0.90rem] text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
