import React from 'react';
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
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'webjumpMovieListApp/src/commons/icon';

import {TouchableOpacity} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage';

const storeData = async movie => {
  try {
    await AsyncStorage.setItem('@myMovies', JSON.stringify(movie));
  } catch (e) {
    // saving error
  }
};

export const MovieItemComponent = ({
  movie,
  onMoviePress = () => {},
  onIconPress = () => {
    storeData(movie);
  },
}) => {
  console.log('movie component', movie);
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
              onIconPress();
            }}
            style={styles.iconContainer}>
            <Icon
              name="favorite-border"
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
