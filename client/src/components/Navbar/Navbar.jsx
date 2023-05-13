import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.heading}>
        <img src="https://www.svgrepo.com/show/405231/dog-face.svg" alt="Dog face" />
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
