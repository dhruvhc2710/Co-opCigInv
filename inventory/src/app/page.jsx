"use client";
import { useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";

export default function LandingPage() {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleBack = () => {
    setSelectedSupplier(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {!selectedSupplier ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              onClick={() => handleSupplierClick(project.title)}
              className="cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
                {project.title}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Suppliers
          </button>
          <HoverEffect items={getItemsForSupplier(selectedSupplier)} />
        </div>
      )}
    </div>
  );
}

const imperial = [
  { title: "DuMaurier" },
  { title: "Viceroy" },
  { title: "Players" },
  { title: "John Players" },
  { title: "Pall Mall" },
  { title: "Malboro" },
  { title: "Vogue" },
  { title: "Matniee" },
];

const rbh = [
  { title: "Belmont" },
  { title: "Next" },
  { title: "Philip Morris" },
  { title: "Number 7" },
  { title: "Rothmans" },
  { title: "Canadian Classics" },
];

const coremark = [
  { title: "Export A" },
  { title: "MacDonald" },
  { title: "LD" },
];

const projects = [
  { title: "Imperial" },
  { title: "RBH" },
  { title: "Coremark" },
];

function getItemsForSupplier(supplier) {
  switch (supplier) {
    case "Imperial":
      return imperial;
    case "RBH":
      return rbh;
    case "Coremark":
      return coremark;
    default:
      return [];
  }
}
