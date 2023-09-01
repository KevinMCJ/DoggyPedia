import {
  GET_BREEDS,
  CREATE_BREED,
  GET_TEMPERAMENTS,
  GET_BY_ID,
  GET_BY_NAME,
  FILTER_BREEDS,
  SORT_BY_WEIGHT,
  SORT_BY_NAME,
  SET_LOADING,
  CLEAR_FILTERS,
} from "./actions";

const initialState = {
  allBreeds: [],
  copyBreeds: [],
  breed: {},
  temperaments: [],
  isLoading: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        allBreeds: action.payload,
        copyBreeds: action.payload,
      };
    case GET_BY_ID:
      return { ...state, breed: action.payload };
    case GET_BY_NAME:
      return { ...state, copyBreeds: action.payload };
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };
    case CREATE_BREED:
      const updatedDogs = [...state.allBreeds, action.payload];
      return { ...state, allBreeds: updatedDogs, copyBreeds: updatedDogs };
    case FILTER_BREEDS:
      const { temperament, origin } = action.payload;
      const filteredBreeds = state.copyBreeds.filter(
        (breed) =>
          temperament.every((temp) => breed.temperament?.includes(temp)) &&
          (origin === "all" || breed.origin === origin)
      );
      return { ...state, copyBreeds: filteredBreeds };
    case SORT_BY_WEIGHT:
      // * weight: [min, max] o weight[number] si solo tiene un elemento tomo este como el máximo.
      // * Somo el que tiene un solo elemento se toma como el máximo , en el caso de lowest estos van al final del todo.
      const sortedBreeds = [...state.copyBreeds];
      if (action.payload === "highest") {
        sortedBreeds.sort((a, b) => {
          const aMaxWeight = a.weight.length === 1 ? a.weight[0] : a.weight[1];
          const bMaxWeight = b.weight.length === 1 ? b.weight[0] : b.weight[1];

          return bMaxWeight - aMaxWeight;
        });
      } else if (action.payload === "lowest") {
        sortedBreeds.sort((a, b) => {
          const aMinWeight = a.weight.length === 1 ? 999 : a.weight[0];
          const bMinWeight = b.weight.length === 1 ? 999 : b.weight[0];

          return aMinWeight - bMinWeight;
        });
      }
      return { ...state, copyBreeds: sortedBreeds };
    case SORT_BY_NAME:
      const sortedBreedsByName = [...state.copyBreeds];

      if (action.payload === "asc") {
        sortedBreedsByName.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "desc") {
        sortedBreedsByName.sort((a, b) => b.name.localeCompare(a.name));
      }

      return { ...state, copyBreeds: sortedBreedsByName };
    case CLEAR_FILTERS:
      return { ...state, copyBreeds: state.allBreeds };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
