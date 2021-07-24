import React from "react";
import { connect } from "react-redux";
import { addfavourite, removeFromFavourite } from "../actions";

class MovieCard extends React.Component {
  handleFavouriteClick = () => {
    const { movie } = this.props;
    this.props.dispatch(addfavourite(movie));
  };

  handleUnFavouriteClick = () => {
    const { movie } = this.props;
    this.props.dispatch(removeFromFavourite(movie));
  };

  render() {
    const { movie, isFavourite } = this.props;
    console.log("RENDER");
    console.log(movie);

    return (
      <div className="movie-card">
        <div className="left">
          <img alt="movie-poster" src={movie.Poster} />
        </div>
        <div className="right">
          <div className="title"> {movie.Title} </div>
          <div className="plot"> {movie.Plot} </div>
          <div className="footer">
            <div className="rating"> {movie.imdbRating} </div>
            {isFavourite ? (
              <button
                className="unfavourite-btn"
                onClick={this.handleUnFavouriteClick}
              >
                Unfavourite
              </button>
            ) : (
              <button
                className="favourite-btn"
                onClick={this.handleFavouriteClick}
              >
                Favourite
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// can use dispatch by this , bydefault takes dispatch
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(MovieCard);
