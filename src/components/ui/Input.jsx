import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    id,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error = "",
    required = false,
    className = "",
    ...props
  },
  ref,
) {
  return (
    <div className={`input-group ${className}`}>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        ref={ref}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? "input input--error" : "input"}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="input__error">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
