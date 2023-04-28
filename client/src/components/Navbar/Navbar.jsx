import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <ul>
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

export default Navbar;
