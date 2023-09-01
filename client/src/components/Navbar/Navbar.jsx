import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import hamburger from "../../assets/img/hamburger.svg";
import menuClose from "../../assets/img/menu-close.svg";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // * Cerrar el menu cuando cambia a desktop.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={styles.container}>
      <div className={styles.navbar}>
      <div className={styles.heading}>
        <img
          src="https://www.svgrepo.com/show/405231/dog-face.svg"
          alt="Dog face"
        />
        <Link to="/">
          <h1>DoggyPedia</h1>
        </Link>
      </div>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className={styles.toggleBtn}>
          <img
            src={hamburger}
            alt="Menu hamburger icon"
            className={styles.menu_icon}
          />
        </button>
      )}
      <ul className={`${styles.ul} ${isOpen ? styles.open : ""}`}>
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
        <button
          onClick={() => setIsOpen(false)}
          className={styles.btnCloseMenu}
        >
          <img
            src={menuClose}
            alt="Menu close btn"
            className={styles.menu_icon}
          />
        </button>
      </ul>
      </div>
    </nav>
  );
};

export default NavBar;
