import React, {Component} from 'react';
import {
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {MovieItemComponent} from 'webjumpMovieListApp/src/components/container';
import {
  GenericTextComponent,
  GenericTextComponentStyleguideItem,
} from 'webjumpMovieListApp/src/components/presentation';
import colors from 'webjumpMovieListApp/src/commons/colors';
import Icon from 'webjumpMovieListApp/src/commons/icon';
import {
  fontScale,
  verticalScale,
  horizontalScale,
} from 'webjumpMovieListApp/src/commons/scaling';
import MovieListModel from 'webjumpMovieListApp/src/models/movieListModel';

class HomeScene extends Component {
  constructor(props) {
    super({...props});
    this.state = {
      loading: true,
      loadingButton: false,
      movies: [],
    };
    this.movieListModel = new MovieListModel(null, null, this.props.dispatch);
  }

  componentDidMount() {
    this.movieListModel.setMovies().then(treandMovieList => {
      this.setState(
        {movies: treandMovieList.movies},
        this.setState({loading: false}),
      );
    });
  }

  footerButton = () => {
    return (
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => {
          this.setState({loadingButton: true});
          this.movieListModel.nextPageMovies().then(newMovies => {
            this.setState({
              loadingButton: false,
              movies: this.state.movies.concat(newMovies.movies),
            });
          });
        }}>
        {this.state.loadingButton ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <GenericTextComponent
            styleguideItem={GenericTextComponentStyleguideItem.HEADING}
            color={colors.white}
            text={'Carregar mais'}
          />
        )}
      </TouchableOpacity>
    );
  };

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
                dispatcher={this.props.dispatch}
                onMoviePress={() => {
                  this.props.navigator.navigate('movieDetailStack', {
                    item,
                  });
                }}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
            ListFooterComponent={() => this.footerButton()}
          />
        </SafeAreaView>
      </>
    ) : (
      <>
        <SafeAreaView style={styles.loadingScreenContainer}>
          <View style={styles.loadingAlignment}>
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
  loadingAlignment: {
    flexDirection: 'row',
    padding: horizontalScale(20),
    justifyContent: 'space-around',
  },
  bottomButton: {
    backgroundColor: colors.awesomeRed,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: horizontalScale(50),
    marginBottom: verticalScale(50),
  },
});
