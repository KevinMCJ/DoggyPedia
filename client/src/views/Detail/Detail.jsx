import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBreedById } from "../../redux/actions";
import measuresFormat from "./measuresFormat";
import style from "./Detail.module.css";
import life_bar from "../../assets/img/life-bar.svg";
import weight_icon from "../../assets/img/weight-icon.svg";
import height_icon from "../../assets/img/height-icon.svg";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const breed = useSelector((state) => state.breed);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getBreedById(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  const { weightFormat, heightFormat } = measuresFormat(
    breed.weight,
    breed.height
  );

  return (
    <div className={style.container}>
      {loading ? (
        <h3>Loading...</h3> // Hacer un componente de loading
      ) : (
        <div className={style.detail}>
          <div className={style.breed_visual}>
            <h2 className={style.name}>{breed.name}</h2>
            <img src={breed.image} alt={breed.name} className={style.image} />
          </div>
          <div className={style.info}>
            <h2 className={style.id}>{breed.id}</h2>
            <div className={style.info_item}>
              <div className={style.item_header}>
                <img src={weight_icon} alt="Weight icon" className={style.icon}/>
                <h3>WEIGHT</h3>
              </div>
              <p>{weightFormat}</p>
            </div>
            <div className={style.info_item}>
              <div className={style.item_header}>
                <img src={height_icon} alt="Height icon" className={style.icon}/>
                <h3>HEIGHT</h3>
              </div>
              <p>{heightFormat}</p>
            </div>
            <div className={style.info_item}>
              <div className={style.item_header}>
                <img src={life_bar} alt="Life bar icon" className={style.icon}/>
                <h3>LIFE SPAN</h3>
              </div>
              <p>About {breed.life_span.join(" to ")} Years</p>
            </div>
            {breed.temperament && breed.temperament.length > 0 && (
              <ul className={`${style.grid_temperaments} ${breed.temperament.length % 2 !== 0 && style.non_symmetrical}`}>
                {breed.temperament.map((breed) => (
                  <li key={breed} className={style.temp_item}>
                    {breed}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
