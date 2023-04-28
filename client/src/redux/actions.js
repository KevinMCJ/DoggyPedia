import axios from "axios";
export const CREATE_BREED = "ADD_BREED";
export const GET_BREEDS = "GET_BREEDS";

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

export const createBreed = () => {
  const endpoint = `http://localhost:3001/dogs`;

  return async (dispatch) => {
    const { data } = await axios.post(endpoint);

    dispatch({
      type: CREATE_BREED,
      payload: data,
    });
  };
};
