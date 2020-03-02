import React, {Component} from 'react';
import {View, StyleSheet, Image, Button} from 'react-native';
import PropTypes from 'prop-types';
import {
  horizontalScale,
  fontScale,
  verticalScale,
} from 'webjumpMovieListApp/src/commons/scaling';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {
  GenericTextComponent,
  GenericTextComponentStyleguideItem,
} from 'webjumpMovieListApp/src/components/presentation';
import Icon from 'webjumpMovieListApp/src/commons/icon';
import {TouchableOpacity} from 'react-native-gesture-handler';

import MovieListModel from 'webjumpMovieListApp/src/models/movieListModel';
import MovieModel from 'webjumpMovieListApp/src/models/movieModel';

export class MovieItemComponent extends Component {
  constructor(props) {
    super({...props});
    this.state = {
      favorite: false,
    };


    this.movieListModel = new MovieListModel(null, null, this.props.dispatcher);

    this.setIcon = movie => {
      const movieListModel = new MovieListModel(
        null,
        null,
        this.props.dispatcher,
      );
      const newMovieModel = new MovieModel(movie);
      return !movieListModel.isFavorite(newMovieModel)
        ? 'favorite-border'
        : 'favorite';
    };

    this.onIconPress = (favorite, movie) => {
      const movieListModel = new MovieListModel(
        null,
        null,
        this.props.dispatcher,
      );
      const movieModel = new MovieModel(movie);
      movieListModel.onFavoriteClick(movieModel);
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.onMoviePress();
          }}>
          {this.props.movie.uri ? (
            <Image
              style={styles.bannerContainer}
              source={{
                uri: this.props.movie.uri
                  ? `https://image.tmdb.org/t/p/w500/${this.props.movie.uri}`
                  : 'https://image.tmdb.org/t/p/w500/vllvystwQjmXzy5OvBKnGl1JREF.jpg',
              }}
            />
          ) : (
            <View style={[styles.bannerContainer, styles.bannerIconContainer]}>
              <Icon
                name="trakt-icon-red"
                size={fontScale(60)}
                color={colors.awesomeRed}
              />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.dataContainer}>
          <View style={styles.topRowContainer}>
            <View style={styles.titleContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.onMoviePress();
                }}>
                <GenericTextComponent
                  styleguideItem={GenericTextComponentStyleguideItem.HEADING}
                  color={colors.redishBlack}
                  text={this.props.movie.title}
                />

                <GenericTextComponent
                  styleguideItem={GenericTextComponentStyleguideItem.TINY}
                  color={colors.redishOpaqueBlack}
                  text={`${this.props.movie.year}`}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.setState({favorite: !this.state.favorite});
                this.onIconPress(this.state.favorite, this.props.movie);
              }}
              style={styles.iconContainer}>
              <Icon
                name={this.setIcon(this.props.movie)}
                size={fontScale(30)}
                color={colors.awesomeRed}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <GenericTextComponent
              styleguideItem={GenericTextComponentStyleguideItem.BODY}
              text={this.props.movie.description}
              color={colors.redishBlack}
              numberOfLines={5}
              ellipsizeMode="tail"
            />
          </View>
        </View>
      </View>
    );
  }
}

MovieItemComponent.defaultProps = {
  editText: null,
  loading: false,
};

MovieItemComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(23),
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: horizontalScale(10),
  },
  titleContainer: {
    flex: 3,
    flexDirection: 'column',
    padding: horizontalScale(5),
    justifyContent: 'space-around',
  },
  bannerContainer: {
    width: horizontalScale(124),
    aspectRatio: 500 / 750,
    resizeMode: 'cover',
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  bannerIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    flex: 5,
    paddingHorizontal: horizontalScale(5),
    alignItems: 'center',
    // justifyContent: 'center',
  },
  topRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
