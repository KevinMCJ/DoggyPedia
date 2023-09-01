import style from "./Card.module.css";
import Temperaments from "../Temperaments/Temperaments";
import { Link } from "react-router-dom";

const Card = ({ breed }) => {
  const { id, name, image, weight, temperament } = breed;
  let formatWeightString = "???";

  // ? Entra => weight: [min, max] o weight: [max]. Quedaría => 10 - 20 O ??? - 10
  if (weight) {
    formatWeightString =
      weight.length === 1
        ? `??? - ${weight[0]}`
        : `${weight[0]} - ${weight[1]}`;
  }

  return (
    <Link to={`/detail/${id}`}>
      <div className={style.card}>
        <h2>{name}</h2>
        <img src={image} alt={name} />
        {temperament && (
          <Temperaments
            className={style.temperaments}
            temperament={temperament}
          />
        )}
        <p>
          Weight: {formatWeightString} Lb
        </p>
      </div>
    </Link>
  );
};

export default Card;
