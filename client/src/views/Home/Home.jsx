import { useEffect } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch } from "react-redux";
import { getBreeds } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  return (
    <>
      <h1>Este es mi Home</h1>
      <CardsContainer />
    </>
  );
};

export default Home;
