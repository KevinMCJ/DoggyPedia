import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardContainer = ({ breeds }) => {
  return (
    <div className={breeds.length ? style.container : style.no_matches}>
      {breeds.length ? (
        breeds.map((breed) => {
          return <Card key={breed.id} breed={breed} />;
        })
      ) : (
        <div className={style.not_found}>
          <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="none" stroke-width="0.024" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM14.0333 17.2558C14.173 17.7836 14.7113 18.1027 15.2425 17.9699C15.7783 17.8359 16.1041 17.293 15.9701 16.7572C15.5311 15.0012 13.7167 13.9998 12 13.9998C10.2147 13.9998 8.54762 15.0116 8.02985 16.7597C7.8959 17.2955 8.22166 17.8359 8.75746 17.9699C9.28872 18.1027 9.827 17.7836 9.96665 17.2558C10.2278 16.3851 11.1602 15.9998 12 15.9998C12.8398 15.9998 13.7722 16.3851 14.0333 17.2558ZM10.5 10C10.5 10.8284 9.82843 11.5 9 11.5C8.17157 11.5 7.5 10.8284 7.5 10C7.5 9.17157 8.17157 8.5 9 8.5C9.82843 8.5 10.5 9.17157 10.5 10ZM15 11.5C15.8284 11.5 16.5 10.8284 16.5 10C16.5 9.17157 15.8284 8.5 15 8.5C14.1716 8.5 13.5 9.17157 13.5 10C13.5 10.8284 14.1716 11.5 15 11.5Z" fill="#ddaa4f"></path> </g></svg>
          <h3>Sin Coincidencias...</h3>
        </div>
      )}
    </div>
  );
};

export default CardContainer;
