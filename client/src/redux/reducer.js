import { GET_BREEDS, CREATE_BREED } from "./actions";

const initialState = {
  allBreeds: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BREEDS:
      return { ...state, allBreeds: action.payload };
    case CREATE_BREED:
      return { ...state, allBreeds: [...state.allBreeds, action.payload] };
    default:
      return { ...state };
  }
};

export default rootReducer;
