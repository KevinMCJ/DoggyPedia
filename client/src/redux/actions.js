import axios from "axios";
export const CREATE_BREED = "ADD_BREED";
export const GET_BREEDS = "GET_BREEDS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const FILTER_BREEDS = "FILTER_BREEDS";
export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

export const getBreeds = () => {
  const endpoint = `http://localhost:3001/dogs`;

  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    dispatch({
      type: GET_BREEDS,
      payload: data,
    });
  };
};

export const createBreed = (newBreed) => {
  const endpoint = `http://localhost:3001/dogs`;

  return async (dispatch) => {
    const { data } = await axios.post(endpoint, newBreed);
    dispatch({
      type: CREATE_BREED,
      payload: data,
    });
  };
};

export const getTemperaments = () => {
  const endpoint = `http://localhost:3001/temperaments`;

  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    dispatch({
      type: GET_TEMPERAMENTS,
      payload: data,
    });
  };
};

export const getBreedById = (id) => {
  const endpoint = `http://localhost:3001/dogs/${id}`;

  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    dispatch({
      type: GET_BY_ID,
      payload: data,
    });
  };
};

export const getBreedByName = (name) => {
  const endpoint = `http://localhost:3001/dogs?name=${name}`;

  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    dispatch({
      type: GET_BY_NAME,
      payload: data,
    });
  };
};

export const filterBreeds = (filters) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_BREEDS,
      payload: filters,
    });
  };
};

export const sortBreedsByWeight = (order) => {
  return (dispatch) => {
    dispatch({
      type: SORT_BY_WEIGHT,
      payload: order,
    });
  };
};

export const sortBreedsByName = (order) => {
  return (dispatch) => {
    dispatch({
      type: SORT_BY_NAME,
      payload: order,
    });
  };
};

export const clearAllFilters = () => ({
  type: CLEAR_FILTERS,
});
