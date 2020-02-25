import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GenericTextComponent} from 'webjumpMovieListApp/src/components/presentation';
import {
  horizontalScale,
  verticalScale,
} from 'webjumpMovieListApp/src/commons/scaling';
import colors from 'webjumpMovieListApp/src/commons/colors';

export const TextCardComponent = ({text}) => {
  return (
    <View style={styles.container}>
      <GenericTextComponent text={text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.awsomeRed,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    backgroundColor: colors.white,
  },
});
