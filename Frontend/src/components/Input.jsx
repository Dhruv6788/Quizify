import React from "react";

const Input = (props) => {
  const {
    id,
    name,
    title,
    placeholder,
    type,
    value,
    onchange,
    onblur,
    errors,
    istouched,
  } = props;
  return (
    <div>
      <div className="input-container bg-[transperant] py-2 border-b-[1px] border-black rounded-sm cursor-pointer">
        <div className="input flex flex-col px-2">
          <label
            htmlFor="email"
            className="text-black text-sm font-[ppm-r] uppercase"
          >
            {title}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className="py-1 text-black text-lg tracking-wide font-[ppm-r] placeholder:text-sm placeholder:uppercase placeholder:opacity-50 placeholder:text-black border-none outline-none"
            autoComplete="off"
            value={value}
            onChange={onchange}
            onBlur={onblur}
          />
          {errors && istouched ? (
            <p className="text-sm text-red-500 opacity-70 font-[ppm-r]">{errors}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Input;
