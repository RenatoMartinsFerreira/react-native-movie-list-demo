import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet, ActivityIndicator} from 'react-native';
import MovieListModel from 'webjumpMovieListApp/src/models/movieListModel';
import {MovieItemComponent} from 'webjumpMovieListApp/src/components/presentation';
import {FlatList} from 'react-native-gesture-handler';
import {
  GenericTextComponent,
  GenericTextComponentStyleguideItem,
} from 'webjumpMovieListApp/src/components/presentation';
import colors from 'webjumpMovieListApp/src/commons/colors';
import Icon from 'webjumpMovieListApp/src/commons/icon';
import {fontScale} from 'webjumpMovieListApp/src/commons/scaling';
import {horizontalScale} from '../commons/scaling';

class HomeScene extends Component {
  constructor(props) {
    super({...props});
    this.state = {
      loading: true,
      movies: [],
    };

    this.movieListModel = new MovieListModel(MovieListModel.TYPE.TRENDING);
  }

  componentDidMount() {
    this.movieListModel.setMovies().then(treandMovieList => {
      this.setState(
        {movies: treandMovieList.movies},
        this.setState({loading: false}),
      );
    });
  }

  render() {
    return !this.state.loading ? (
      <>
        <SafeAreaView style={{flex: 1, backgroundColor: '#F2EEEE'}}>
          <FlatList
            style={{flex: 1}}
            data={this.state.movies}
            extraData={this.state.movies}
            renderItem={({item}) => (
              <MovieItemComponent
                movie={item.movie}
                onMoviePress={() => {
                  this.props.navigator.navigation.navigate('movieDetail', {
                    item,
                  });
                }}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          />
        </SafeAreaView>
      </>
    ) : (
      <>
        <SafeAreaView style={styles.loadingScreenContainer}>
          <View
            style={{
              flexDirection: 'row',
              padding: horizontalScale(20),
              justifyContent: 'space-around',
            }}>
            <Icon
              name="trakt-icon-red"
              size={fontScale(150)}
              color={colors.awesomeRed}
            />
            <Icon name="tmdb" size={fontScale(150)} color={colors.tmdbGreen} />
          </View>

          <GenericTextComponent
            styleguideItem={GenericTextComponentStyleguideItem.HEADING}
            text={'Powerd by \n Trakt and TMDB'}
            textAlign={'center'}
          />

          <ActivityIndicator color={colors.awesomeRed} />
        </SafeAreaView>
      </>
    );
  }
}

export default HomeScene;

const styles = StyleSheet.create({
  loadingScreenContainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },

  listSeparator: {
    borderWidth: 1 / 2,
    borderColor: '#D6D6D6',
  },
});
