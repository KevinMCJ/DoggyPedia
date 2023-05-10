import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, filterBreeds } from "../../../redux/actions";
import { useState, useEffect } from "react";
import style from "./FilterOptions.module.css";

const FilterOptions = ({ setCurrentPage, onFilter }) => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState("all");

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

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
    <div className="filter_container">
      <div className={style.filter_temp_section}>
        <h4>Temperaments</h4>
        <ul className={style.temperaments_list}>
          {temperaments.map((temp) => (
            <li key={temp}>
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
      <div className="filter_origin_section">
        <h4>Origin</h4>
        <ul>
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
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default FilterOptions;
