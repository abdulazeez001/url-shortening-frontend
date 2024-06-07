import React, { useState, ChangeEvent } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import email from "@/assets/images/email.svg";
import eyeIcon from "@/assets/images/eye.svg";
import closedEyeIcon from "@/assets/images/closedeye.svg";

interface InputProps {
  type?: string;
  name: string;
  modelValue: string | number;
  label: string;
  placeholder?: string;
  error?: boolean;
  customError?: string;
  onUpdateModelValue: (name: string, value: string | number) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  modelValue = "",
  label,
  placeholder = "",
  error = false,
  customError,
  onUpdateModelValue,
}) => {
  const [inputType, setInputType] = useState<string>(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdateModelValue(name, e.target.value);
  };

  return (
    <div className="input-wrapper">
      <label className="text-header font-semibold text-sm" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          className={`border rounded-lg py-3 px-4 outline-none bg-white text-sm placeholder-bodytext w-full text-bodytext2 focus:border-primary ${
            customError ? "border-red-500" : "border-[#D0D5DD]"
          }`}
          type={inputType}
          name={name}
          value={modelValue}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {type === "password" && (
          <button
            onClick={togglePasswordVisibility}
            type="button"
            className="absolute inset-y-0 right-0 px-3 flex items-center"
          >
            <Image
              src={inputType === "password" ? eyeIcon : closedEyeIcon}
              alt={inputType === "password" ? "Show password" : "Hide password"}
              width={24}
              height={24}
              className="w-6 mt-1"
            />
          </button>
        )}
        {type === "email" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 flex items-center"
          >
            <Image
              src={email}
              alt={"email"}
              width={24}
              height={24}
              className="w-6 mt-1"
            />
          </button>
        )}
      </div>
      {customError ? (
        <span className="text-red-500 text-xs mt-2">{customError}</span>
      ) : (
        error && (
          <span className="text-red-500 text-xs mt-2">
            Please enter {label}
          </span>
        )
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  customError: PropTypes.string,
  onUpdateModelValue: PropTypes.func.isRequired,
};

export default Input;
