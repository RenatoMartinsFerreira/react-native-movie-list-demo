import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
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

export const MovieItemComponent = ({movie, onMoviePress = () => {}}) => {
  const [favorite, setFavorite] = useState(false);
  const movieListModel = new MovieListModel();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onMoviePress();
        }}>
        {movie.uri ? (
          <Image
            style={styles.bannerContainer}
            source={{
              uri: movie.uri
                ? `https://image.tmdb.org/t/p/w500/${movie.uri}`
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
                onMoviePress();
              }}>
              <GenericTextComponent
                styleguideItem={GenericTextComponentStyleguideItem.HEADING}
                color={colors.redishBlack}
                text={movie.title}
              />

              <GenericTextComponent
                styleguideItem={GenericTextComponentStyleguideItem.TINY}
                color={colors.redishOpaqueBlack}
                text={`${movie.year}`}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              setFavorite(!favorite);
              onIconPress(favorite, movie);
            }}
            style={styles.iconContainer}>
            <Icon
              name={!favorite ? 'favorite-border' : 'favorite'}
              size={fontScale(30)}
              color={colors.awesomeRed}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <GenericTextComponent
            styleguideItem={GenericTextComponentStyleguideItem.BODY}
            text={movie.description}
            color={colors.redishBlack}
            numberOfLines={5}
            ellipsizeMode="tail"
          />
        </View>
      </View>
    </View>
  );
};

const onIconPress = (favorite, movie) => {
  console.log('onPress item', movie);

  const movieListModel = new MovieListModel();
  const movieModel = new MovieModel(movie);

  !favorite
    ? movieListModel.addMovieOnStore(movieModel)
    : movieListModel.removeMovieFromStore(movieModel);
};

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
