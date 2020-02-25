import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {
  horizontalScale,
  fontScale,
  verticalScale,
} from 'webjumpMovieListApp/src/commons/scaling';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {GenericTextComponent} from 'webjumpMovieListApp/src/components/presentation';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'webjumpMovieListApp/src/commons/icon';

import {TouchableOpacity} from 'react-native-gesture-handler';

export const MovieItemComponent = ({
  movie,
  onMoviePress = () => {},
  onIconPress = () => {},
}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onMoviePress();
        }}>
        <Image
          style={styles.bannerContainer}
          source={{
            uri: movie.uri
              ? `https://image.tmdb.org/t/p/w500/${movie.uri}`
              : 'https://image.tmdb.org/t/p/w500/vllvystwQjmXzy5OvBKnGl1JREF.jpg',
          }}
        />
      </TouchableOpacity>
      <View style={styles.dataContainer}>
        <View style={styles.topRowContainer}>
          <View style={styles.titleContainer}>
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
              color={colors.redishBlack}
              text={movie.title}
            />

            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.TINY}
              color={colors.redishOpaqueBlack}
              text={`${movie.year}`}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onIconPress();
            }}
            style={styles.iconContainer}>
            <Icon
              name="favorite-border"
              size={fontScale(30)}
              color={colors.awsomeRed}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.BODY}
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
