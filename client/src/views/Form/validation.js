const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const numberRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
const breedRegex = /^[a-zA-ZÁ-ú\s-]+$/;

const validation = (dataForm) => {
  const errors = {};

  // * Name
  if (!dataForm.name.trim()) {
    errors.name = "Name required";
  } else if (!breedRegex.test(dataForm.name.trim())) {
    errors.name = "Only letters";
  } else if (dataForm.name.trim().length > 30) {
    errors.name = "Cannot exceed 30 characters";
  }

  // * Height
  if (!dataForm.min_height.trim()) {
    errors.min_height = "Field required";
  } else if (!numberRegex.test(dataForm.min_height.trim())) {
    errors.min_height = "Invalid number";
  } else if (dataForm.min_height.trim() < 2) {
    errors.min_height = "Cannot be less than 2in";
  }

  if (!dataForm.max_height.trim()) {
    errors.max_height = "Field required";
  } else if (!numberRegex.test(dataForm.max_height.trim())) {
    errors.max_height = "Invalid number";
  } else if (dataForm.max_height.trim() > 45) {
    errors.max_height = "Cannot be greater than 45in";
  }

  if (Number(dataForm.min_height.trim()) > Number(dataForm.max_height.trim())) {
    errors.min_height = "Cannot be greater than maximum";
    errors.max_height = "Cannot be less than minimum";
  }

  // * Weight
  if (!dataForm.min_weight.trim()) {
    errors.min_weight = "Field required";
  } else if (!/^\d+$/.test(dataForm.min_weight.trim())) {
    errors.min_weight = "Not an integer";
  } else if (dataForm.min_weight.trim() < 2) {
    errors.min_weight = "Cannot be less than 2in";
  }

  if (!dataForm.max_weight.trim()) {
    errors.max_weight = "Field required";
  } else if (!/^\d+$/.test(dataForm.max_weight.trim())) {
    errors.max_weight = "Not an integer";
  } else if (Number(dataForm.max_weight.trim()) > 200) {
    errors.max_weight = "Cannot be greater than 200lbs";
  }

  if (Number(dataForm.min_weight.trim()) > Number(dataForm.max_weight.trim()) ) {
    errors.min_weight = "Cannot be greater than maximum";
    errors.max_weight = "Cannot be less than minimum";
  }

  // * Life_span
  if (!dataForm.min_life_span.trim()) {
    errors.min_life_span = "Field required";
  } else if (!/^\d+$/.test(dataForm.min_weight.trim())) {
    errors.min_life_span = "Not an integer";
  } else if (Number(dataForm.min_life_span.trim()) < 5) {
    errors.min_life_span = "Cannot be less than 5";
  }

  if (!dataForm.max_life_span.trim()) {
    errors.max_life_span = "Field required";
  } else if (!/^\d+$/.test(dataForm.max_life_span.trim())) {
    errors.max_life_span = "Not an integer";
  } else if (Number(dataForm.max_life_span.trim()) > 30) {
    errors.max_life_span = "Cannot be greater than 30";
  }

  if (Number(dataForm.min_life_span.trim()) > Number(dataForm.max_life_span.trim())) {
    errors.min_life_span = "Cannot be greater than maximum";
    errors.max_life_span = "Cannot be less than minimum";
  }

  // * Temperament
  if(!dataForm.temperament.length){
    errors.temperament = "At least one temperament";
  }

  // * Image
  if (dataForm.image.trim() && !urlRegex.test(dataForm.image.trim())) {
    errors.image = "Invalid URL";
  }

  return errors;
};

export default validation;
