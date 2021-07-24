import React from "react";

import { data as MovieList } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
// import movies from '../reducers';
import { addMovies, setShowFavourite } from "../actions";
import { connect } from "react-redux";
// import { StoreContext } from "../";
import { movies, search } from "../reducers";

class App extends React.Component {
  componentDidMount() {
    // const { store } = this.props;
    // console.log(store);
    // //make api call

    // //called after action dispatch
    // store.subscribe(() => {
    //   console.log("UPDATED");
    //   this.forceUpdate();
    // });

    // //dispatch an action
    // store.dispatch({
    //    type :'ADD_MOVIES',
    //    movies : data
    // })

    //another method of store dispatch used this method
    this.props.dispatch(addMovies(MovieList));

    // console.log("STATE", store.getState());
  }

  // check movie is in favourite state
  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);

    // movie is in favourite state or movie found
    if (index !== -1) {
      return true;
    }
    // movie not found in favourites,add it in favourites
    return false;
  };

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourite(val));
  };
  render() {
    const { movies, search } = this.props; //{movies:{},search:{}}
    const { list, favourites = [], showFavourites = [] } = movies; // state is objct now that contain list and favouite array , use destructuring to get list
    console.log("&&&&&&&&&&&&&&&&&&&&", this.props);
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar dispatch={this.props.dispatch} search={search} />
        {/*  <Navbar  search={search} />           //using NavbarWrapper */}
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              {" "}
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => {
              return (
                <MovieCard
                  movie={movie}
                  key={`movies-${index}`}
                  isFavourite={this.isMovieFavourite(movie)}
                />
              );
            })}
          </div>
        </div>
        {displayMovies.length === 0 ? (
          <div className="no-movies">No Movies To Display... </div>
        ) : null}
      </div>
    );
  }
}
//can access consumer only in render() method, in app component we need store value also in other methods,so we create a Appwrapper that
// pass store as a props to App component so each method of app componnet can use this store , here we pass store as a prop to app component
// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
// export default AppWrapper;

// instead of wrapper use connect function

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
