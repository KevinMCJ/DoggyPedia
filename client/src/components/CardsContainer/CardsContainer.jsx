import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardContainer = ({ breeds }) => {
  return (
    <div className={style.container}>
      {breeds.length ? (
        breeds.map((breed) => {
          return <Card key={breed.id} breed={breed} />;
        })
      ) : (
        <h3>Sin Coincidencias...</h3>
      )}
    </div>
  );
};

export default CardContainer;
