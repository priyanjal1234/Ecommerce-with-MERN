import React from "react";

const PaymentMethodCard = ({ selected, title, description,onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-[600px] h-[90px] block mb-5 p-4 rounded-lg border ${
        selected
          ? "border-purple-500 bg-purple-500/10"
          : "border-gray-700 bg-gray-800 hover:border-purple-500/50"
      } transition-all duration-200`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-1 text-left">
          <h3 className={`font-medium ${selected ? 'text-purple-500' : 'text-gray-200'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="flex items-center justify-center w-6 h-6">
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              selected
                ? 'border-purple-500 bg-purple-500'
                : 'border-gray-600 bg-transparent'
            }`}
          >
            {selected && (
              <div className="w-full h-full rounded-full bg-white transform scale-50" />
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default PaymentMethodCard;
