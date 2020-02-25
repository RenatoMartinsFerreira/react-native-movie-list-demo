import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  horizontalScale,
  fontScale,
  verticalScale,
} from 'webjumpMovieListApp/src/commons/scaling';
import {
  GenericTextComponent,
  GenericTextComponentStyleguideItem,
  TextCardComponent,
} from 'webjumpMovieListApp/src/components/presentation';
import Icon from 'webjumpMovieListApp/src/commons/icon';
import colors from 'webjumpMovieListApp/src/commons/colors';

class MovieDetailScene extends Component {
  constructor(props) {
    super({...props});
    this.state = {
      loading: true,
    };

    console.log(this.props.movie);
  }

  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1, backgroundColor: '#F2EEEE'}}>
          <View style={styles.topContainer}>
            <Image
              style={styles.bannerContainer}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${this.props.movie.uri}`,
              }}
            />

            <View
              style={{
                flex: 1,
                paddingHorizontal: horizontalScale(10),
                justifyContent: 'space-around',
              }}>
              <View>
                <GenericTextComponent
                  styleguideItem={GenericTextComponentStyleguideItem.HEADING}
                  text={this.props.movie.title}
                />

                <GenericTextComponent
                  styleguideItem={GenericTextComponentStyleguideItem.TINY}
                  text={this.props.movie.year}
                />
              </View>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(this.props.movie.link).catch(err =>
                    console.error("Couldn't load page", err),
                  )
                }
                style={styles.roundedButton}>
                <Icon
                  style={{marginRight: horizontalScale(10)}}
                  name="link"
                  size={fontScale(30)}
                  color={colors.awsomeRed}
                />
                <GenericTextComponent
                  styleguideItem={GenericTextComponentStyleguideItem.HEADING}
                  text={'Link'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1, paddingHorizontal: horizontalScale(30)}}>
            <TextCardComponent text={this.props.movie.description} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default MovieDetailScene;

const styles = StyleSheet.create({
  listSeparator: {
    borderWidth: 1 / 2,
    borderColor: '#D6D6D6',
  },
  topContainer: {
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(30),
    flexDirection: 'row',
  },
  roundedButton: {
    borderWidth: 1,
    borderColor: colors.awsomeRed,
    backgroundColor: colors.white,
    borderRadius: 4,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  bannerContainer: {
    width: horizontalScale(124),
    aspectRatio: 500 / 750,
    resizeMode: 'cover',
    borderRadius: 2,
  },
});
