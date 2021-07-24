import { combineReducers } from "redux";

import {
  ADD_MOVIES,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
  SET_SHOW_FAVOURITES,
  ADD_SEARCH_RESULT,
  ADD_MOVIE_TO_LIST,
} from "../actions";

const initialMoviesState = {
  list: [],
  favourites: [],
  showFavourites: false,
};

export function movies(state = initialMoviesState, action) {
  // if(action.type === ADD_MOVIES){
  //     console.log("*******************");
  //     return {
  //     ...state ,                                                             //getting old state by spread operator
  //     list: action.movies                                                    // and modify list property from old that and return this new state
  //     }
  // }
  // return state;
  console.log("MOVIES REDUCER");

  //use switch case
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_TO_FAVOURITE:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };
    case REMOVE_FROM_FAVOURITE:
      const filteredArray = state.favourites.filter((movie) => {
        return movie !== action.movie;
      });
      //    console.log("*************",filteredArray);
      return {
        ...state,
        favourites: filteredArray,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        list: [action.movie, ...state.list],
      };
    default:
      return state;
  }
}

const initialSearchState = {
  result: {},
  showSearchResults: false,
};
export function search(state = initialSearchState, action) {
  console.log("SEARCH REDUCER");
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movie,
        showSearchResults: true,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        showSearchResults: false,
      };
    default:
      return state;
  }
}

// const initialRootState = {
//   movies: initialMoviesState,
//   search: initialSearchState,
// };

// we cam create rootareducer or can use combineReducers method provided by redux both are same
// export default function rootReducer ( state = initialRootState,action){
//     console.log('ROOT_REDUCER');
//     return{
//         movies : movies(state.movies,action),
//         search : search(state.search,action)
//     }
// }

// create root reducer using combinereducer method , automatically call movie by passing state and action
export default combineReducers({
  movies: movies,
  search: search,
});
