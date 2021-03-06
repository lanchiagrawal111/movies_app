// {
//     type : 'ADD_MOVIES',
//     'movies' = [m1,m2,m3]
// }

//action types

export const ADD_MOVIES = "ADD_MOVIES";

export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE = "REMOVE_FROM_FAVOURITE";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";

//action creator which return action

export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies: movies,
  };
}

export function addfavourite(movie) {
  return {
    type: ADD_TO_FAVOURITE,
    movie: movie,
  };
}

export function removeFromFavourite(movie) {
  return {
    type: REMOVE_FROM_FAVOURITE,
    movie: movie,
  };
}

export function setShowFavourite(val) {
  return {
    type: SET_SHOW_FAVOURITES,
    val,
  };
}

export function handleMovieSearch(movie) {
  const url = `http://www.omdbapi.com/?apikey=5d7bee37&t=${movie}`;
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log("movie______", movie);
        //dispatch an action to add search result into  store
        dispatch(addMovieSearchResult(movie));
      });
  };
}

export function addMovieSearchResult(movie) {
  return {
    type: ADD_SEARCH_RESULT,
    movie: movie,
  };
}

export function addMovieToList(movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie: movie,
  };
}
