import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.heading}>
        <img src="https://www.svgrepo.com/show/405231/dog-face.svg" alt="Dog face" />
        <h1>DoggyPedia</h1>
      </div>
      <ul className={styles.ul}>
        <li>
          <Link to="/home">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to="/create">
            <p>Create</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
