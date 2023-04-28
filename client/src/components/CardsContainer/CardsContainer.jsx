import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardContainer = () => {
  const allBreeds = useSelector((state) => state.allBreeds);

  return (
    <>
      <div className={style.container}>
        {allBreeds.length ? (
          allBreeds.map((breed) => {
            return (
              <Card
                key={breed.id}
                id={breed.id}
                name={breed.name}
                weight={breed.weight}
                height={breed.height}
                life_span={breed.life_span}
                temperament={breed.temperament}
                image={breed.image}
              />
            );
          })
        ) : (
          <h3>Sin Coincidencias...</h3>
        )}
      </div>
    </>
  );
};

export default CardContainer;
