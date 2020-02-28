import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, FlatList, View, Text} from 'react-native';
import MovieListModel from 'webjumpMovieListApp/src/models/movieListModel';
import colors from 'webjumpMovieListApp/src/commons/colors';
import Icon from 'webjumpMovieListApp/src/commons/icon';
import {fontScale} from 'webjumpMovieListApp/src/commons/scaling';
import {
  GenericTextComponent,
  GenericTextComponentStyleguideItem,
} from 'webjumpMovieListApp/src/components/presentation';
import {MovieItemComponent} from 'webjumpMovieListApp/src/components/presentation';
import AsyncStorage from '@react-native-community/async-storage';

class SeacrhScene extends Component {
  constructor(props) {
    super({...props});
    this.state = {
      loading: true,
      myMovies: [],
    };
    this.movieListModel = new MovieListModel();
  }

  getMyMoviesData = async () => {
    try {
      const value = await AsyncStorage.getItem('@myMovies');
      if (value !== null) {
        // value previously stored
        const movieList = JSON.parse(value);
        this.setState({myMovies: [movieList]});
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    // this.getMyMoviesData();
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          {this.state.myMovies.length > 0 ? (
            <FlatList
              style={{flex: 1}}
              data={this.state.myMovies}
              extraData={this.state.myMovies}
              renderItem={({item}) => (
                <MovieItemComponent
                  movie={item}
                  onMoviePress={() => {
                    this.props.navigator.navigation.navigate('movieDetail', {
                      item,
                    });
                  }}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.listSeparator} />
              )}
            />
          ) : (
            <View style={styles.loadingContainer}>
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
          )}
        </SafeAreaView>
      </>
    );
  }
}

export default SeacrhScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
