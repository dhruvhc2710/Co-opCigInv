import { useState } from "react";

export default function VariantsSelector({ variants }) {
  if (!variants || !Array.isArray(variants)) return null; // Handle case where variants are undefined or not an array

  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleRadioChange = (variant) => {
    setSelectedBrand(variant);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
        Select a variant
      </h3>
      <ul>
        {variants.map((variant) => (
          <li key={variant} className="flex items-center space-x-2">
            <input
              type="radio"
              id={variant}
              name="variant"
              checked={selectedBrand === variant}
              onChange={() => handleRadioChange(variant)}
              className="cursor-pointer"
            />
            <label htmlFor={variant} className="text-gray-900 dark:text-white cursor-pointer">
              {variant}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
