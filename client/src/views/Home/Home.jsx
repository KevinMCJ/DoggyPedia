import { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { clearAllFilters } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import FilterButton from "../../components/Filter/FilterButton/FilterButton";
import SortBy from "../../components/SortBy/SortBy";
import style from "./Home.module.css";
import clearIcon from "../../assets/img/clear-icon.svg"

const Home = () => {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.copyBreeds);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // * Pagination logic
  const indexOfLastBreed = currentPage * itemsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - itemsPerPage;

  useEffect(() => {
    setDisplayedItems(breeds.slice(indexOfFirstBreed, indexOfLastBreed));
  }, [breeds, indexOfLastBreed, indexOfFirstBreed]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(breeds.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={style.body}>
      <SearchBar setCurrentPage={setCurrentPage} />
      <div className={style.filter_sort_section}>
        <FilterButton setCurrentPage={setCurrentPage} />
        <SortBy setCurrentPage={setCurrentPage} />
        <button onClick={() => dispatch(clearAllFilters())} className={style.clearBtn}>
          Clear All Filters
          <img src={clearIcon} alt="Clear icon" />
        </button>
      </div>
      <CardsContainer breeds={displayedItems} />
      {breeds.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={breeds.length}
          paginate={paginate}
          currentPage={currentPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
};

export default Home;
