import React, {Component} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import MovieListModel from 'webjumpMovieListApp/src/models/movieListModel';
import {MovieItemComponent} from 'webjumpMovieListApp/src/components/presentation';
import {FlatList} from 'react-native-gesture-handler';

class HomeScene extends Component {
  constructor(props) {
    super({...props});
    this.state = {
      loading: true,
      movies: [
        {
          movie: {
            title: 'Tron',
            yaer: 2019,
            time: '2h27min',
            description: 'teste',
          },
        },
      ],
    };

    this.movieListModel = new MovieListModel(MovieListModel.TYPE.TRENDING);
  }

  componentDidMount() {
    this.movieListModel.setMovies().then(treandMovieList => {
      console.log('treandMovieList', treandMovieList);

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
                  this.props.navigator.navigation.navigate('movieDetail');
                }}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          />
        </SafeAreaView>
      </>
    ) : (
      <>
        <SafeAreaView style={{flex: 1}}>
          <Text> loading </Text>
        </SafeAreaView>
      </>
    );
  }
}

export default HomeScene;

const styles = StyleSheet.create({
  listSeparator: {
    borderWidth: 1 / 2,
    borderColor: '#D6D6D6',
  },
});
