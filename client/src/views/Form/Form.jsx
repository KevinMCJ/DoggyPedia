import { useEffect, useState } from "react";
import { createBreed } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import validation from "./validation";
import style from "./Form.module.css";
import imageTest from "../../assets/img/landing.jpg";

const formatBreed = (dataForm) => {
  return {
    name: dataForm.name,
    height: [dataForm.min_height, dataForm.max_height],
    weight: [dataForm.min_weight, dataForm.max_weight],
    life_span: [dataForm.min_life_span, dataForm.max_life_span],
    temperament: dataForm.temperament,
    image: dataForm.image !== "" ? dataForm.image : undefined,
  };
};

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [hasErrors, setHasErrors] = useState(true);
  // ? Identifica si el usuario interactuó con el formulario.
  const [userInteraction, setUserInteraction] = useState(false);

  const handleChange = (event) => {
    if (!userInteraction) setUserInteraction(true);
    const { name, value } = event.target;
    setDataForm({ ...dataForm, [name]: value });
    setErrors(validation({ ...dataForm, [name]: value }));
  };

  const handleSelect = (event) => {
    let { value } = event.target;

    if (!userInteraction) setUserInteraction(true);

    if (
      dataForm.temperament.length < 20 &&
      !dataForm.temperament.includes(value)
    ) {
      setDataForm({
        ...dataForm,
        temperament: [...dataForm.temperament, value],
      });
    }

    setErrors(
      validation({
        ...dataForm,
        temperament: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hasErrors) {
      try {
        const newBreed = formatBreed(dataForm);
        dispatch(createBreed(newBreed));
        Swal.fire({
          icon: "success",
          title: "Breed created successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/home"));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error creating a new breed. Try again later.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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

    setErrors(
      validation({
        ...dataForm,
        temperament: filteredTemps,
      })
    );
  };

  // ? Cada vez que cambie el objeto errors, vera si puede activar el botón del formulario.
  useEffect(() => {
    if (userInteraction) {
      setHasErrors(Object.keys(errors).length > 0);
    }
  }, [errors, userInteraction]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <img src={imageTest} alt="Dogs with different breeds" />
        <form onSubmit={handleSubmit} className={style.form}>
          <h1>NEW BREED</h1>

          <div className={style.inputName}>
            <label>Name</label>
            <div className={style.inputWrapper}>
              <input
                type="text"
                onChange={handleChange}
                value={dataForm.name}
                name="name"
                placeholder="Breed Name"
                className={`${style.input} ${
                  errors.name ? style.input_invalid : style.input_valid
                }`}
              />
              {errors.name && (
                <span className={style.error}>{errors.name}</span>
              )}
            </div>
          </div>

          <div className={style.inputContainer}>
            <label>Height (Inches)</label>
            <div className={style.inputWrapper}>
              <input
                type="number"
                onChange={handleChange}
                value={dataForm.min_height}
                name="min_height"
                placeholder="Min"
                className={`${style.input} ${
                  errors.min_height ? style.input_invalid : style.input_valid
                }`}
              />
              {errors.min_height && (
                <span className={style.error}>{errors.min_height}</span>
              )}
            </div>
            <div className={style.inputWrapper}>
              <input
                type="number"
                onChange={handleChange}
                value={dataForm.max_height}
                name="max_height"
                placeholder="Max"
                className={`${style.input} ${
                  errors.max_height ? style.input_invalid : style.input_valid
                }`}
              />
              {errors.max_height && (
                <span className={style.error}>{errors.max_height}</span>
              )}
            </div>
          </div>

          <div className={style.inputContainer}>
            <label>Weight (Pounds)</label>
            <div className={style.inputWrapper}>
              <input
                type="number"
                onChange={handleChange}
                value={dataForm.min_weight}
                name="min_weight"
                placeholder="Min"
                className={`${style.input} ${
                  errors.min_weight ? style.input_invalid : style.input_valid
                }`}
              />
              {errors.min_weight && (
                <span className={style.error}>{errors.min_weight}</span>
              )}
            </div>
            <div className={style.inputWrapper}>
              <input
                type="number"
                onChange={handleChange}
                value={dataForm.max_weight}
                name="max_weight"
                placeholder="Max"
                className={`${style.input} ${
                  errors.max_weight ? style.input_invalid : style.input_valid
                }`}
              />
              {errors.max_weight && (
                <span className={style.error}>{errors.max_weight}</span>
              )}
            </div>
          </div>

          <div className={style.inputContainer}>
            <label>Life span (Years)</label>
            <div className={style.inputWrapper}>
              <input
                type="number"
                onChange={handleChange}
                value={dataForm.min_life_span}
                name="min_life_span"
                placeholder="Min"
                className={`${style.input} ${
                  errors.min_life_span ? style.input_invalid : style.input_valid
                }`}
              />
              {errors.min_life_span && (
                <span className={style.error}>{errors.min_life_span}</span>
              )}
            </div>
            <div className={style.inputWrapper}>
              <input
                type="number"
                onChange={handleChange}
                value={dataForm.max_life_span}
                name="max_life_span"
                placeholder="Max"
                className={`${style.input} ${
                  errors.max_life_span ? style.input_invalid : style.input_valid
                }`}
              />
              {errors.max_life_span && (
                <span className={style.error}>{errors.max_life_span}</span>
              )}
            </div>
          </div>

          <div className={style.temperamentBox}>
            <select onChange={handleSelect} className={style.select}>
              {temperaments.length ? (
                temperaments.map((temp, index) => (
                  <option key={index} value={temp}>
                    {temp}
                  </option>
                ))
              ) : (
                <option>No temperaments</option>
              )}
            </select>
            {dataForm.temperament.length > 0 ? (
              <ul className={style.tempList}>
                {dataForm.temperament.map((temp) => (
                  <li key={temp} onClick={handleList}>
                    {temp}
                  </li>
                ))}
              </ul>
            ) : (
              <span className={style.error}>{errors?.temperament}</span>
            )}
          </div>

          <div className={`${style.inputImageBox}`}>
            <label htmlFor="image">Image (optional)</label>
            <div className={style.inputWrapper}>
              <input
                type="text"
                name="image"
                onChange={handleChange}
                placeholder="https://example.com"
                className={`${style.input} ${style.inputImage} ${
                  errors.image ? style.input_invalid : style.input_valid
                }`}
              />
              {errors.image && (
                <span className={style.error}>{errors.image}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={style.btnSubmit}
            disabled={hasErrors}
          >
            Create breed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
