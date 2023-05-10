import { useEffect, useState } from "react";
import { createBreed, getTemperaments } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import style from "./Form.module.css";

const formatBreed = (dataForm) => {
  return {
    name: dataForm.name,
    height: [dataForm.min_height, dataForm.max_height],
    weight: [dataForm.min_weight, dataForm.max_weight],
    life_span: [dataForm.min_life_span, dataForm.max_life_span],
    temperament: dataForm.temperament,
    image: dataForm.image !== '' ? dataForm.image : undefined
  };
};

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [dataForm, setDataForm] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_life_span: "",
    max_life_span: "",
    temperament: [],
    image: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataForm({ ...dataForm, [name]: value });
    setErrors(
      validation({
        ...dataForm,
        [name]: value,
      })
    );
  };

  const handleSelect = (event) => {
    let {value} = event.target;

    if(dataForm.temperament.length < 20 && !dataForm.temperament.includes(value)){
      setDataForm({
        ...dataForm,
        temperament: [...dataForm.temperament, value],
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const newBreed = formatBreed(dataForm);
      dispatch(createBreed(newBreed));
      alert("Breed created successfully");
    } catch (error) {
      alert("Error creating a new breed : " + error.message);
    }
  };

  const handleList = (event) => {
    const filteredTemps = dataForm.temperament.filter(
      (temp) => temp !== event.target.innerText
    );

    setDataForm({
      ...dataForm,
      temperament: filteredTemps,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.container}>
        <div className={style.inputName}>
          <label>Name</label>
          <input
            type="text"
            onChange={handleChange}
            value={dataForm.name}
            name="name"
            placeholder="Breed Name"
            className={style.inputName}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div className={style.inputContainer}>
          <label>Height (Inches)</label>
          <input
            type="number"
            onChange={handleChange}
            value={dataForm.min_height}
            name="min_height"
            placeholder="Min"
          />
          <input
            type="number"
            onChange={handleChange}
            value={dataForm.max_height}
            name="max_height"
            placeholder="Max"
          />
          {errors.min_height && <span>{errors.min_height}</span>}
          {errors.max_height && <span>{errors.max_height}</span>}
        </div>
        <div className={style.inputContainer}>
          <label>Weight (Pounds)</label>
          <input
            type="number"
            onChange={handleChange}
            value={dataForm.min_weight}
            name="min_weight"
            placeholder="Min"
          />
          <input
            type="number"
            onChange={handleChange}
            value={dataForm.max_weight}
            name="max_weight"
            placeholder="Max"
          />
          {errors.min_weight && <span>{errors.min_weight}</span>}
          {errors.max_weight && <span>{errors.max_weight}</span>}
        </div>
        <div className={style.inputContainer}>
          <label>Life span (Years)</label>
          <input
            type="number"
            onChange={handleChange}
            value={dataForm.min_life_span}
            name="min_life_span"
            placeholder="Min"
          />
          <input
            type="number"
            onChange={handleChange}
            value={dataForm.max_life_span}
            name="max_life_span"
            placeholder="Max"
          />
          {errors.min_life_span && <span>{errors.min_life_span}</span>}
          {errors.max_life_span && <span>{errors.max_life_span}</span>}
        </div>
        <div className={style.temperamentBox}>
          <select onChange={handleSelect} className={style.select}>
            {temperaments.map((temp, index) => (
              <option key={index} value={temp}>
                {temp}
              </option>
            ))}
          </select>
          <ul className={style.tempList}>
            {dataForm.temperament.map((temp) => (
              <li key={temp} onClick={handleList}>
                {temp}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${style.imageBox}`}>
          <label htmlFor="image">Image (optional)</label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com"
            className={style.inputImage}
          />
          {errors.image && <span>{errors.image}</span>}
        </div>
        <button type="submit" className={style.btnSubmit}>Create Breed</button>
      </div>
    </form>
  );
};

export default Form;
