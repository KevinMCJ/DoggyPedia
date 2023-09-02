import { useSelector } from "react-redux";
import sad_face from "../../assets/img/sad-face.svg";
import running_dog from "../../assets/img/running_dog.gif";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardContainer = ({ breeds }) => {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className={breeds.length ? style.container : style.no_matches}>
      {isLoading ? (
        <img
          src={running_dog}
          alt="Loading running dog"
          className={style.loading_dog}
        />
      ) : (
        <>
          {breeds.length ? (
            breeds.map((breed) => {
              return <Card key={breed.id} breed={breed} />;
            })
          ) : (
            <div className={style.not_found}>
              <img src={sad_face} alt="Sad face" />
              <h3>NO RESULTS ...</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CardContainer;
