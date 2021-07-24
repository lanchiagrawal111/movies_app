import React from "react";
import { addMovieToList, handleMovieSearch } from "../actions";
// import { StoreContext } from "..";
import { connect } from "react-redux";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }
  onInputChange = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  handleSearch = () => {
    this.props.dispatch(handleMovieSearch(this.state.searchText));
  };
  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  };

  render() {
    //rename result with movie
    const { result: movie, showSearchResults } = this.props.search;
    console.log("navbar____________", this.props);
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.onInputChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>
          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add To Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// class NavbarWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => (
//           <Navbar dispatch={store.dispatch} search={this.props.search} />
//         )}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps({ search }) {
  return {
    search: search,
  };
}

export default connect(mapStateToProps)(Navbar);
