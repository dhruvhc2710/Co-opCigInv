"use client";
import { useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import LowStockReport from "../components/ui/lowStockReport";

export default function LandingPage() {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
    setShowReport(false); // Reset report state when a new supplier is selected
  };

  const handleBack = () => {
    setSelectedSupplier(null);
    setShowReport(false);
  };

  const handleReport = () => {
    console.log("qweqwe")
    setShowReport(true); // Show the report when button is clicked
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
          <div className="flex justify-between">
            <div>
              <button
                onClick={handleBack}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Suppliers
              </button>
            </div>
            <div>
              <button
                onClick={handleReport}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Low Stock Report
              </button>
            </div>
          </div>

          {!showReport ? (
            <HoverEffect items={getItemsForSupplier(selectedSupplier)} />
          ) : (
            
            <LowStockReport smokeSupplier={selectedSupplier} />
          )}
        </div>
      )}
    </div>
  );
}

const imperial = [
  { title: "DuMaurier Smooth" },
  { title: "DuMaurier signature" },
  { title: "DuMaurier Mellow" },
  { title: "DuMaurier distinct plus" },
  { title: "DuMaurier distinct" },
  { title: "DuMaurier special" },
  { title: "Viceroy full" },
  { title: "Players" },
  { title: "Players smooth" },
  { title: "Players original" },
  { title: "John Players smooth" },
  { title: "John Players mellow" },
  { title: "John Players rich " },
  { title: "John Players bold" },
  { title: "Pall Mall smooth" },
  { title: "Pall Mall smooth extra" },
  { title: "Pall Mall Bold" },
  { title: "Pall Mall Bold Extra" },
  { title: "Pall Mall Full" },
  { title: "Malboro" },
  { title: "Malboro Original" },
  { title: "Malboro Full" },
  { title: "Malboro Select" },
  { title: "Vogue" },
  { title: "Matniee mellow" },
  { title: "Matinee Subtle" },
];

const rbh = [
  { title: "Belmont" },
  { title: "Belmont select" },
  { title: "Next smooth" },
  { title: "Next select" },
  { title: "Next original" },
  { title: "Next xtra" },
  { title: "Philip Morris special" },
  { title: "Philip Morris Original" },
  { title: "Number 7 special" },
  { title: "Number 7 original" },
  { title: "Rothmans" },
  { title: "Rothmans special" },
  { title: "Canadian Classics original" },
  { title: "Canadian Classics smooth" },
  { title: "Canadian Classics select" },
  { title: "Canadian Classics rich" },
];

const coremark = [
  { title: "Export A smooth" },
  { title: "Export A rich" },
  { title: "Export A medium" },
  { title: "Export A fine" },
  { title: "Export A full" },
  { title: "Export A extra" },
  { title: "MacDonald original" },
  { title: "MacDonald rich" },
  { title: "LD medium" },
  { title: "LD smooth" },
  { title: "LD bold" },
  { title: "LD standard bold" },
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
