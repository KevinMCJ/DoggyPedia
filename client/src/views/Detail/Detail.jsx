import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Temperaments from "../../components/Temperaments/Temperaments";
import { useDispatch, useSelector } from "react-redux";
import { getBreedById } from "../../redux/actions";
import measuresFormat from "./measuresFormat";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const breed = useSelector((state) => state.breed);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getBreedById(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  const { weightFormat, heightFormat } = measuresFormat(breed.weight, breed.height);

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <img
            src={breed.image}
            alt={breed.name}
            width="400px"
            height="400px"
          />
          <div>
            <h1>{breed.id}</h1>
            <h2>{breed.name}</h2>
            <p>HEIGHT: {weightFormat}</p>
            <p>WEIGHT: {heightFormat}</p>
            <p>LIFE SPAN: About {breed.life_span.join(" to ")} Years</p>
            {breed.temperament && breed.temperament.length > 0 && (
              <>
                <h3>Temperaments</h3>
                <Temperaments temperament={breed.temperament} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
