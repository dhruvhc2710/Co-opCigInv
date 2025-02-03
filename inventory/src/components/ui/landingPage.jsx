import { useState } from "react";

const suppliers = [
  {
    name: "Imperial",
    items: ["DuMaurier", "Viceroy", "Players", "John Players", "Pall Mall", "Malboro", "Vogue", "Matniee"],
  },
  {
    name: "RBH",
    items: ["Belmont", "Next", "Philip Morris", "Number 7", "Rothmans", "Canadian Classics"],
  },
  {
    name: "Coremark",
    items: ["Export A", "MacDonald", "LD"],
  },
];

export default function LandingPage() {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {!selectedSupplier ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map((supplier) => (
            <div
              key={supplier.name}
              className="cursor-pointer p-6 bg-gray-800 text-white rounded-2xl shadow-md hover:bg-gray-700 transition"
              onClick={() => setSelectedSupplier(supplier)}
            >
              <h2 className="text-xl font-bold text-center">{supplier.name}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            onClick={() => setSelectedSupplier(null)}
          >
            Back to Suppliers
          </button>
          <h2 className="text-2xl font-bold text-center mb-4">
            {selectedSupplier.name} Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedSupplier.items.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-700 transition"
              >
                <h3 className="text-lg font-semibold text-center">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
