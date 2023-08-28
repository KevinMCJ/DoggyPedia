import style from "./Pagination.module.css";
import arrowLeft from "../../assets/img/arrow-left.svg";
import arrowRight from "../../assets/img/arrow-right.svg";

const generatePageNumbers = (currentPage, totalPages) => {
  const pageNumbers = new Set();

  pageNumbers.add(1);
  if (currentPage > 1) pageNumbers.add(currentPage - 1);
  pageNumbers.add(currentPage);
  if (currentPage < totalPages) pageNumbers.add(currentPage + 1);
  pageNumbers.add(totalPages);

  return Array.from(pageNumbers).sort((a, b) => a - b);
};

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  previousPage,
  nextPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <div className={style.container}>
      <button
        onClick={previousPage}
        className={`${currentPage === 1 && style.btnDisable} ${style.arrowBtn}`}
      >
        <img src={arrowLeft} alt="Arrow left" className={style.icon}/>
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
        <img src={arrowRight} alt="Arrow right" className={style.icon} />
      </button>
    </div>
  );
};

export default Pagination;
