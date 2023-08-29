import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.Landing}>
      <h1 className={style.title}>DoggyPedia</h1>
      <Link to="/home">
        <button className={style.button}>Adéntrate en el mundo perruno!</button>
      </Link>
    </div>
  );
};

export default Landing;
