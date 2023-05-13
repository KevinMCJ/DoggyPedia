import style from "./Pagination.module.css";
import arrowLeft from "../../assets/img/arrow-left.svg";
import arrowRight from "../../assets/img/arrow-right.svg";

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [];

  // * Calcula el numero de paginas.
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
      <button
        onClick={previousPage}
        className={`${currentPage === 1 && style.btnDisable} ${style.arrowBtn}`}
      >
        <img src={arrowLeft} alt="Arrow left" />
      </button>
      <ul className={style.pagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`${style.page_number} ${currentPage === number && style.active}`}
          >
            {number}
          </li>
        ))}
      </ul>
      <button
        onClick={nextPage}
        className={`
              ${
                currentPage === Math.ceil(totalItems / itemsPerPage) &&
                style.btnDisable
              } ${style.arrowBtn}`}
      >
        <img src={arrowRight} alt="Arrow right" />
      </button>
    </div>
  );
};

export default Pagination;
