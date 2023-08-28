import { useDispatch, useSelector } from "react-redux";
import { filterBreeds } from "../../../redux/actions";
import { useState } from "react";
import style from "./FilterOptions.module.css";

const FilterOptions = ({ setCurrentPage, setIsOpen }) => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState("all");

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "temperament") {
      setSelectedTemperaments(
        checked
          ? [...selectedTemperaments, value]
          : selectedTemperaments.filter((t) => t !== value)
      );
    }

    if (name === "origin") setSelectedOrigin(value);
  };

  const handleFilter = () => {
    dispatch(
      filterBreeds({
        temperament: selectedTemperaments,
        origin: selectedOrigin,
      })
    );
    setCurrentPage(1);
  };

  return (
    <section className={style.filter_modal}>
      <div className={style.filter_container}>
        <button onClick={() => setIsOpen(false)} className={style.btnClose}>
          X
        </button>
        <h3 className={style.grid_title}>Filter By</h3>
        <div className={style.filter_grid}>
          <div className={style.filter_temp_section}>
            <h4 className={style.filter_title}>Temperaments</h4>
            <ul className={style.temperaments_list}>
              {temperaments.map((temp) => (
                <li key={temp} className={style.temperament_item}>
                  <input
                    type="checkbox"
                    name="temperament"
                    value={temp}
                    checked={selectedTemperaments.includes(temp)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="temperament">{temp}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.filter_origin_section}>
            <h4 className={style.filter_title}>Origin</h4>
            <ul className={style.origin_list}>
              <li>
                <input
                  type="checkbox"
                  name="origin"
                  value="all"
                  checked={selectedOrigin === "all"}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="origin">All</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="origin"
                  value="api"
                  checked={selectedOrigin === "api"}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="origin">API</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="origin"
                  value="created"
                  checked={selectedOrigin === "created"}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="origin">Created</label>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => {
            handleFilter();
            setIsOpen(false);
          }}
          className={style.btnFilter}
        >
          Apply Filter
        </button>
      </div>
    </section>
  );
};

export default FilterOptions;
