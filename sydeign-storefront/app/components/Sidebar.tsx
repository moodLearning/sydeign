import React from "react";
import { productCategories } from "../data/data";
import { Funnel } from "lucide-react";

export default function Sidebar({
  onFilterChange,
}: {
  onFilterChange: (cat: string) => void;
}) {
  return (
    <aside className="bg-white p-6 pr-13 sticky top-6 z-0">
     {/*<h2 className="flex items-center gap-2 text-2xl font-semibold text-primary mb-6 p-4">
        <Funnel size={28} />
        Categories
      </h2>

      <div className="space-y-5 px-5">
        {productCategories.map((cat) => (
          <label
            key={cat.name}
            className="flex items-center gap-5 cursor-pointer text-gray-700 hover:text-primary"
          >
            <input
              type="checkbox"
              className="w-6 h-6 border-gray-300 rounded"
              onChange={() => onFilterChange(cat.name)}
            />
            <span className="text-xl">{cat.name}</span>
          </label>
        ))}
      </div>*/}

      <div className="p-6">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-primary mb-6 p-4">
              <Funnel size={28} />
              Categories
            </h2>
            <ul>
              {/* All Products Option */}
              <li className="mb-2">
                <button 
                  onClick={() => onFilterChange('All Products')}
                  className="flex items-center gap-5 cursor-pointer text-gray-700 text-xl hover:text-primary"
                >
                  All Products
                </button>
              </li>
              {productCategories.map((cat) => (
                <li key={cat.name} className="mb-2">
                  <button 
                    onClick={() => onFilterChange(cat.name)}
                    className="flex items-center gap-5 cursor-pointer text-gray-700 text-xl hover:text-primary"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
      </div>


      <hr className="my-12" />

      <h2 className="flex items-center gap-2 text-2xl font-semibold text-primary mb-6 p-4">
        Price Range
      </h2>

      <input
        type="range"
        min="1000"
        max="10000"
        className="w-full mx-4 accent-primary"
      />

      <div className="flex justify-between mt-2 px-4">
      <h2 className="flex items-center gap-2 text-2xl font-semibold text-primary mb-6 ">
        ₱1,000</h2>
      <h2 className="flex items-center gap-2 text-2xl font-semibold text-primary mb-6">
        ₱10,000</h2>
      </div>

      <button className="mt-5 border border-primary text-primary text-2xl rounded mx-20 mb-6 px-15 py-1 hover:bg-primary hover:text-white transition">
        APPLY
      </button>
    </aside>
  );
}

