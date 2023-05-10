import style from "./Pagination.module.css";

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
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
      <ul className={style.pagination}>
        <li onClick={previousPage} className="page-number">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={style.page_number}
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage} className="page-number">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M3 12h18m0 0l-8.5-8.5M21 12l-8.5 8.5"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
