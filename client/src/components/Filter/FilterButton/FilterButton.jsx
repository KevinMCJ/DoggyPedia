import { useState } from "react";
import FilterOptions from "../FilterOptions/FilterOptions";

const FilterButton = ({setCurrentPage}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Filter By</button>
      {isOpen && <FilterOptions setCurrentPage={setCurrentPage}/>}
    </div>
  );
};

export default FilterButton;
