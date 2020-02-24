import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {horizontalScale} from 'webjumpMovieListApp/src/commons/scaling';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {GenericTextComponent} from 'webjumpMovieListApp/src/components/presentation';

import {verticalScale} from '../../commons/scaling';

export const MovieItemComponent = ({movie}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.bannerContainer}
        source={{
          uri: movie.uri
            ? movie.uri
            : 'https://image.tmdb.org/t/p/w500/vllvystwQjmXzy5OvBKnGl1JREF.jpg',
        }}
      />
      <View style={styles.dataContainer}>
        <View style={styles.topRowContainer}>
          <View style={styles.titleContainer}>
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
              color={'#081C24'}
              text={movie.title}
            />

            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.TINY}
              color={'#464646'}
              text={`${movie.yaer} | ${movie.time}`}
            />
          </View>
          <View style={styles.iconContainer}>
            <Text> S2 </Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={5} ellipsizeMode="tail">
            {movie.description}
          </Text>
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
    paddingLeft: horizontalScale(10)
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
    justifyContent: 'center',
  },
  topRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
