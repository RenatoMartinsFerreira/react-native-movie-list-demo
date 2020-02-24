import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {fontScale} from 'webjumpMovieListApp/src/commons/scaling';

const StyleguideItem = {
  HEADING: 'HEADING',
  BODY: 'BODY',
  TINY: 'TINY',
  DEFAULT: 'DEFAULT',
};

export const GenericTextComponent = ({
  testID,
  styleguideItem,
  text,
  color,
  opacity,
  textAlign,
  marginTop,
  marginBottom,
  numberOfLines,
  strike,
}) => {
  let currentStyle;

  switch (styleguideItem) {
    case StyleguideItem.HEADING:
      currentStyle = styles.heading;
      break;
    case StyleguideItem.BODY:
      currentStyle = styles.body;
      break;
    case StyleguideItem.TINY:
      currentStyle = styles.tiny;
      break;
    default:
      currentStyle = styles.default;
      break;
  }

  return (
    <Text
      testID={testID}
      style={[
        currentStyle,
        {
          opacity,
          color,
          textAlign,
          marginTop,
          marginBottom,
        },
        !!strike && styles.strike,
      ]}
      allowFontScaling={false}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

GenericTextComponent.defaultProps = {
  styleguideItem: StyleguideItem.DEFAULT,
  color: colors.black,
  opacity: 1,
  textAlign: 'left',
  marginTop: 0,
  marginBottom: 0,
  numberOfLines: 99999,
  strike: false,
};

GenericTextComponent.propTypes = {
  styleguideItem: PropTypes.oneOf(Object.keys(StyleguideItem)),
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  opacity: PropTypes.number,
  textAlign: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  numberOfLines: PropTypes.number,
  strike: PropTypes.bool,
};

GenericTextComponent.StyleguideItem = StyleguideItem;

const styles = StyleSheet.create({
  heading: {
    fontSize: fontScale(18),
    fontFamily: 'Inter-Bold',
  },
  body: {
    fontSize: fontScale(18),
    fontFamily: 'Inter-Regular',
    lineHeight: fontScale(24),
  },
  tiny: {
    fontSize: fontScale(12),
    fontFamily: 'Inter-Regular',
    lineHeight: fontScale(24),
  },

  default: {
    fontSize: fontScale(14),
    fontFamily: 'Inter-Regular',
    lineHeight: fontScale(24),
  },
});
