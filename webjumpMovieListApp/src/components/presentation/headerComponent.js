import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  GenericTextComponent,
  GenericTextComponentStyleguideItem,
} from 'webjumpMovieListApp/src/components/presentation';
import {
  verticalScale,
  horizontalScale,
  fontScale,
} from 'webjumpMovieListApp/src/commons/scaling';
import Icon from 'webjumpMovieListApp/src/commons/icon';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {TextInput} from 'react-native-gesture-handler';

export const HeaderComponent = ({
  navigation,
  showBackButton = false,
  showSearchButton = false,
  isSearchHeader = false,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Icon
              style={{marginRight: horizontalScale(10)}}
              name="arrow-back"
              size={fontScale(25)}
              color={colors.white}
            />
          </TouchableOpacity>
        )}

        <Icon
          style={{marginRight: horizontalScale(10)}}
          name="trakt-icon-white"
          size={fontScale(25)}
          color={colors.white}
        />
        {!isSearchHeader && (
          <GenericTextComponent
            styleguideItem={GenericTextComponentStyleguideItem.HEADING}
            text={'Movie List'}
            color={colors.white}
          />
        )}
      </View>

      {showSearchButton && (
        <TouchableOpacity
          onPress={() =>
            console.log('navigation', navigation.navigate('searchSceneStack'))
          }>
          <Icon
            style={{marginRight: horizontalScale(10)}}
            name="search"
            size={fontScale(25)}
            color={colors.white}
          />
        </TouchableOpacity>
      )}

      {isSearchHeader && (
        <View style={styles.serachBarContainer}>
          <TextInput
            onChangeText={event => {
              console.log('teste', event);
            }}
            style={styles.searchInputStyle}
            autoFocus
          />
          <Icon
            style={{marginRight: horizontalScale(10)}}
            name="search"
            size={fontScale(25)}
            color={colors.awesomeRed}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.awesomeRed,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
  },
  serachBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(5),
    paddingVertical: horizontalScale(5),
    backgroundColor: colors.white,
    borderRadius: 10000,
  },
  searchInputStyle: {
    padding: 0,
    marginLeft: horizontalScale(10),
    color: colors.awesomeRed,
    flex: 1,
  },
});
