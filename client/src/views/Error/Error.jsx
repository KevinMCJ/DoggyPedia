import { useEffect } from "react";
import style from "./Error.module.css";
import { Link } from "react-router-dom";

const Error = ({ setShowNavBar }) => {
  
  useEffect(() => {
    setShowNavBar(false);

    return () => {
      setShowNavBar(true);
    };
  }, [setShowNavBar]);

  return (
    <section className={style.container}>
      <div className={style.content_box}>
        <h1 className={style.title}>Page not found</h1>
        <Link to="/home" className={style.backBtn}>Go back to home</Link>
      </div>
    </section>
  );
};

export default Error;
