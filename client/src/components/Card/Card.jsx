import style from "./Card.module.css";
import Temperaments from "../Temperaments/Temperaments";

const Card = (props) => {
  return (
    <div className={style.card}>
      <h2>{props.name}</h2>
      <p>Life-Span: {props.life_span} years</p>
      <img src={props.image} alt={props.name} />

      {Array.isArray(props.temperament) && props.temperament.length ? (
        <Temperaments className={style.temperaments} temperament={props.temperament}/>
      ) : (
        <p>Weight: {props.weight} kilograms</p>
      )}

    </div>
  );
};

export default Card;
