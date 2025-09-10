import React from "react";

const NavigationButtons = ({ onBack, onNext, nextDisabled }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onBack}
        className="border border-orange-500 text-orange-500 bg-white rounded-full px-6 py-2 hover:bg-white hover:text-orange-500"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="bg-orange-500 text-white rounded-full px-6 py-2 disabled:opacity-50 hover:bg-orange-600"
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
