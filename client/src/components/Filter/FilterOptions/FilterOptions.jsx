import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, filterBreeds } from "../../../redux/actions";
import { useState, useEffect } from "react";
import style from "./FilterOptions.module.css";

//! Eliminar y descomentar lo de abajo cuando hayas hecho los estilos
const temperaments = [
  "Stubborn",
  "Curious",
  "Playful",
  "Adventurous",
  "Active",
  "Fun-loving",
  "Aloof",
  "Clownish",
  "Dignified",
  "Independent",
  "Happy",
  "Wild",
  "Hardworking",
  "Dutiful",
  "Outgoing",
  "Friendly",
  "Alert",
  "Confident",
  "Intelligent",
  "Courageous",
  "Loyal",
  "Brave",
  "Docile",
  "Responsive",
  "Composed",
  "Receptive",
  "Faithful",
  "Loving",
  "Protective",
  "Trainable",
  "Responsible",
  "Energetic",
  "Gentle",
  "Affectionate",
  "Devoted",
  "Assertive",
  "Dominant",
  "Strong Willed",
  "Obedient",
  "Reserved",
  "Kind",
  "Sweet-Tempered",
  "Tenacious",
  "Attentive",
  "Steady",
  "Bold",
  "Proud",
  "Reliable",
  "Fearless",
  "Lively",
  "Self-assured",
  "Cautious",
  "Eager",
  "Good-natured",
  "Spirited",
  "Companionable",
  "Even Tempered",
  "Rugged",
  "Fierce",
  "Refined",
  "Joyful",
  "Agile",
  "Amiable",
  "Excitable",
  "Determined",
  "Self-confidence",
  "Hardy",
  "Calm",
  "Good-tempered",
  "Watchful",
  "Hard-working",
  "Feisty",
  "Cheerful",
  "Sensitive",
  "Easygoing",
  "Adaptable",
  "Trusting",
  "Lovable",
  "Territorial",
  "Keen",
  "Familial",
  "Rational",
  "Bright",
  "Quick",
  "Powerful",
  "Gay",
  "Stable",
  "Quiet",
  "Inquisitive",
  "Strong",
  "Sociable",
  "Patient",
  "Suspicious",
  "Great-hearted",
  "Merry",
  "Vocal",
  "Tolerant",
  "Mischievous",
  "People-Oriented",
  "Bossy",
  "Cunning",
  "Athletic",
  "Boisterous",
  "Cooperative",
  "Trustworthy",
  "Self-important",
  "Respectful",
  "Thoughtful",
  "Generous",
  "Cat-like",
  "Sturdy",
  "Benevolent",
  "Clever",
  "Bubbly",
  "Opinionated",
  "Aggressive",
  "Extroverted",
  "Charming",
  "Unflappable",
  "Spunky",
  "Diligent",
  "Willful",
  "Fast",
  "Vigilant",
];

const FilterOptions = ({ setCurrentPage, setIsOpen }) => {
  const dispatch = useDispatch();
  // const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState("all");

  // useEffect(() => {
  //   dispatch(getTemperaments());
  // }, [dispatch]);

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "temperament") {
      setSelectedTemperaments(
        checked
          ? [...selectedTemperaments, value]
          : selectedTemperaments.filter((t) => t !== value)
      );
    }

    if (name === "origin") setSelectedOrigin(value);
  };

  const handleFilter = () => {
    dispatch(
      filterBreeds({
        temperament: selectedTemperaments,
        origin: selectedOrigin,
      })
    );
    setCurrentPage(1);
  };

  return (
    <section className={style.filter_modal}>
      <div className={style.filter_container}>
        <button onClick={() => setIsOpen(false)} className={style.btnClose}>
          X
        </button>
        <h3 className={style.grid_title}>Filter By</h3>
        <div className={style.filter_grid}>
          <div className={style.filter_temp_section}>
            <h4>Temperaments</h4>
            <ul className={style.temperaments_list}>
              {temperaments.map((temp) => (
                <li key={temp} className={style.temperament_item}>
                  <input
                    type="checkbox"
                    name="temperament"
                    value={temp}
                    checked={selectedTemperaments.includes(temp)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="temperament">{temp}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.filter_origin_section}>
            <h4>Origin</h4>
            <ul className={style.origin_list}>
              <li>
                <input
                  type="checkbox"
                  name="origin"
                  value="all"
                  checked={selectedOrigin === "all"}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="origin">All</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="origin"
                  value="api"
                  checked={selectedOrigin === "api"}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="origin">API</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="origin"
                  value="created"
                  checked={selectedOrigin === "created"}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="origin">Created</label>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => {
            handleFilter();
            setIsOpen(false);
          }}
          className={style.btnFilter}
        >
          Apply Filter
        </button>
      </div>
    </section>
  );
};

export default FilterOptions;
