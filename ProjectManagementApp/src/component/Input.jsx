import { forwardRef } from "react";

const inputStyles = 'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600';
let inputBox;

const Input = forwardRef(function Input({ label, type = "text", children, ...props }, ref) {
  if (type === 'textarea') {
    inputBox = <textarea ref={ref} className={inputStyles} {...props}>{children}</textarea>;
  } else {
    inputBox = (
      <input
        ref={ref}
        type={type}
        className={inputStyles}
        {...props}
      >
        {children}
      </input>
    );
  }
  return (
    <p className='flex flex-col gap-1 my-4'>
      <label className="text-sm font-bold uppercase text-stone-500 text-left">
        {label}
      </label>
      {inputBox}
    </p>
  );
})

export default Input;
