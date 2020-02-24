import React, {Component} from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import MovieListModel from 'webjumpMovieListApp/src/models/movieListModel';

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
        <SafeAreaView>
          <Text> Meus Filmes :D </Text>
        </SafeAreaView>
      </>
    );
  }
}

export default MyMoviesScene;
