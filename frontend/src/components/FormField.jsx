import React from "react";

const FormField = ({label,type,placeholder,name,value,onChange,error}) => {
  return (
    <div className="mb-3">
      <label
        className="block text-sm font-medium text-gray-200 mb-1"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="w-[400px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {
        error && <p className="text-sm text-red-600 mt-1">{error}</p>
      }
    </div>
  );
};

export default FormField;
