import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import MovieListModel from 'webjumpMovieListApp/src/models/movieListModel';
import colors from 'webjumpMovieListApp/src/commons/colors';
import Icon from 'webjumpMovieListApp/src/commons/icon';
import {fontScale} from 'webjumpMovieListApp/src/commons/scaling';
import {
  GenericTextComponent,
  GenericTextComponentStyleguideItem,
} from 'webjumpMovieListApp/src/components/presentation';
import {MovieItemComponent} from 'webjumpMovieListApp/src/components/container';

class SeacrhScene extends Component {
  constructor(props) {
    super({...props});
    this.state = {
      loading: true,
      searchMovies: [],
      onUpdate: false,
    };
    this.movieListModel = new MovieListModel();
  }

  loadMovies = (searchText = '') => {
    this.movieListModel
      .searchMovieList(searchText)
      .then(result => {
        this.setState({searchMovies: result}, this.setState({loading: false}));
      })
      .catch(e => {
        console.log('Search error: ', e);
      });
  };

  componentDidMount() {
    this.setState({onUpdate: false});
  }

  componentDidUpdate(up) {
    up.searchText !== this.props.searchText &&
      (this.setState({loading: true}),
      !this.state.onUpdate &&
        this.setState({onUpdate: true}, () =>
          setTimeout(() => {
            this.loadMovies(this.props.searchText);
            this.setState({onUpdate: false});
          }, 3000),
        ));
  }

  render() {
    return (
      <>
        {this.props.searchText === '' ? (
          <SafeAreaView style={styles.container}>
            <View style={styles.waitContainer}>
              <Icon
                name="search"
                size={fontScale(150)}
                color={colors.awesomeRed}
              />
              <GenericTextComponent
                styleguideItem={GenericTextComponentStyleguideItem.HEADING}
                text={'Busque por filmes \n para salvá-los em sua lista'}
                textAlign={'center'}
                color={colors.awesomeRed}
              />
            </View>
          </SafeAreaView>
        ) : (
          <View style={{flex: 1}}>
            {!this.state.loading ? (
              <FlatList
                style={{flex: 1}}
                data={this.state.searchMovies}
                extraData={this.state.searchMovies}
                renderItem={({item}) => (
                  <MovieItemComponent
                    movie={item.movie}
                    onMoviePress={() => {
                      this.props.navigator.navigate('movieDetailStack', {
                        item,
                      });
                    }}
                  />
                )}
              />
            ) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={colors.awesomeRed} size="large" />
              </View>
            )}
          </View>
        )}
      </>
    );
  }
}

export default SeacrhScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  waitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
