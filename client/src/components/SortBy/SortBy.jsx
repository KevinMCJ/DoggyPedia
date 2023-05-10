import { useDispatch } from "react-redux";
import { sortBreedsByWeight, sortBreedsByName } from "../../redux/actions";

const SortBy = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const handleSelect = (event) => {
    const { name, value } = event.target;
    if (name === "sort-name") {
      dispatch(sortBreedsByName(value));
    } else if (name === "sort-weight") {
      dispatch(sortBreedsByWeight(value));
    }
    setCurrentPage(1);
  };

  return (
    <div className="sort-container">
      <div>
        <label htmlFor="sort-weight">Sort by Weight</label>
        <select name="sort-weight" id="sort-weight" onChange={handleSelect}>
          <option value="highest">Weight (Highest)</option>
          <option value="lowest">Weight (Lowest)</option>
        </select>
      </div>
      <div>
        <label htmlFor="sort-name">Sort by Name</label>
        <select name="sort-name" id="sort-name" onChange={handleSelect}>
          <option value="asc">Name (a-z)</option>
          <option value="desc">Name (z-a)</option>
        </select>
      </div>
    </div>
  );
};

export default SortBy;
