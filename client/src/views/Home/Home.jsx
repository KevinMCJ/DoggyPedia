import { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, clearAllFilters } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import FilterButton from "../../components/Filter/FilterButton/FilterButton";
import SortBy from "../../components/SortBy/SortBy";
import style from "./Home.module.css"

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
    dispatch(getBreeds());
  }, [dispatch]);

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
    <>
      <div>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div className={style.filter_sort_section}>
        <div>
          <FilterButton setCurrentPage={setCurrentPage}/>
          <SortBy setCurrentPage={setCurrentPage} />
        </div>
        <button onClick={() => dispatch(clearAllFilters())}>
          Clear All Filters
        </button>
      </div>
      <CardsContainer breeds={displayedItems} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={breeds.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
};

export default Home;
