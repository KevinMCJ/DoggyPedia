import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedByName } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getBreedByName(name)).then(() => setCurrentPage(1));
  };

  return (
    <div className={style.search}>
      <label htmlFor="search">Search by Name</label>
      <div className={style.bar}>
        <input
          type="search"
          onChange={handleChange}
          placeholder="Name of a breed"
          value={name}
          className={style.input}
        />
        <button type="button" onClick={handleSubmit} className={style.btnSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
