import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <h1>Esta es mi Landing Page</h1>
      <Link to="/home">
        <button>Ingresar!</button>
      </Link>
    </>
  );
};

export default Landing;
