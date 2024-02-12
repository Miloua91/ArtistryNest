import { useState } from "react";
import DropDown from "@/pages/components/DropMenu";

export default function Filter({ onPriceChange, onSortingChange }) {
  const [priceOption, setPriceOption] = useState("");
  const [sortingOption, setSortingOption] = useState("");

  const price = [
    { value: "low-to-high", label: "Price: Low to High" },
    { value: "high-to-low", label: "Price: High to Low" },
  ];

  const sorting = [
    { value: "new", label: "New" },
    { value: "old", label: "Old" },
    { value: "alphabitical_a-z", label: "Alphabitical A-Z" },
    { value: "alphabitical_z-a", label: "Alphabitical Z-A" },
  ];

  const handlePriceChange = (value) => {
    setPriceOption(value);
    onPriceChange(value);
    setSortingOption("");
    onSortingChange("");
  };

  const handleSortingChange = (value) => {
    setSortingOption(value);
    onSortingChange(value);
    setPriceOption("");
    onPriceChange("");
  };

  return (
    <div className="filter">
      <DropDown
        options={price}
        label={"Price"}
        selectedOption={priceOption}
        onOptionChange={handlePriceChange}
      />
      <DropDown
        options={sorting}
        label={"Sort by"}
        selectedOption={sortingOption}
        onOptionChange={handleSortingChange}
      />
    </div>
  );
}
