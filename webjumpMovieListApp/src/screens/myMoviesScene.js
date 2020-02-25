import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MovieListModel from 'webjumpMovieListApp/src/models/movieListModel';
import colors from 'webjumpMovieListApp/src/commons/colors';
import Icon from 'webjumpMovieListApp/src/commons/icon';
import {fontScale} from 'webjumpMovieListApp/src/commons/scaling';
import {
  GenericTextComponent,
  GenericTextComponentStyleguideItem,
} from 'webjumpMovieListApp/src/components/presentation';

class MyMoviesScene extends Component {
  constructor(props) {
    super({...props});
    this.state = {
      loading: true,
    };
    this.movieListModel = new MovieListModel();
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <Icon name="video" size={fontScale(150)} color={colors.awsomeRed} />

          <GenericTextComponent
            styleguideItem={GenericTextComponentStyleguideItem.HEADING}
            text={'Favorite filmes para \n lembra-los depois'}
            textAlign={'center'}
            color={colors.awsomeRed}
          />
        </SafeAreaView>
      </>
    );
  }
}

export default MyMoviesScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
