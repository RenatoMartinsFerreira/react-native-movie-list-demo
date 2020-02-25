import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {fontScale} from 'webjumpMovieListApp/src/commons/scaling';
import {
  GenericTextComponent,
  GenericTextComponentStyleguideItem,
} from 'webjumpMovieListApp/src/components/presentation';

const StyleguideItem = {
  FULFILL: 'FULFILL',
  THIN: 'THIN',
  DEFAULT: 'DEFAULT',
};

export const GenericButtonComponent = ({
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
    case StyleguideItem.FULFILL:
      currentStyle = styles.fulfill;
      break;
    case StyleguideItem.THIN:
      currentStyle = styles.thin;
      break;
    default:
      currentStyle = styles.default;
      break;
  }

  return (
    <TouchableOpacity style={currentStyle}>
      <GenericTextComponent text={text} />
    </TouchableOpacity>
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

GenericButtonComponent.StyleguideItem = StyleguideItem;

const styles = StyleSheet.create({
  fulfill: {
    fontSize: fontScale(18),
  },
  thin: {
    fontSize: fontScale(13),
    lineHeight: fontScale(14),
  },
  default: {
    fontSize: fontScale(14),
    lineHeight: fontScale(24),
  },
});
