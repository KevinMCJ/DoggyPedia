import { useState } from "react";
import FilterOptions from "../FilterOptions/FilterOptions";
import style from "./FilterButton.module.css";
import filterIcon from "../../../assets/img/filter-icon.svg";

const FilterButton = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={style.filterBtn}>
        Filter By
        <img src={filterIcon} alt="Filter icon"/>
      </button>
      {isOpen && (
        <FilterOptions setCurrentPage={setCurrentPage} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default FilterButton;
