import style from "./Temperaments.module.css";

const Temperaments = (props) => {
  return (
    <div className={style.container}>
      {props.temperament.map((temp, index) => (
        <p key={index}>{temp}</p>
      ))}
    </div>
  );
};

export default Temperaments;
