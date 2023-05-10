import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.heading}>
        <img src="../../assets/img/dog-face.png" alt="Dog-face" />
        <h1>DoggyPedia</h1>
      </div>
      <ul className={style.ul}>
        <li>
          <Link to="/home">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to="/create">
            <p>Create Dog</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
