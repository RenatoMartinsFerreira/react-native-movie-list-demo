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

export const HeaderComponent = ({navigation, showBackButton = false}) => {
  return (
    <View style={styles.headerContainer}>
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
      <GenericTextComponent
        styleguideItem={GenericTextComponentStyleguideItem.HEADING}
        text={'Movie List'}
        color={colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.awesomeRed,
  },
});
