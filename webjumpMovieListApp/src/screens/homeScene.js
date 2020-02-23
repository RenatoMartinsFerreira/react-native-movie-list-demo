import React, {Component} from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import MovieListModel from 'webjumpMovieListApp/src/models/movieListModel';

class HomeScene extends Component {
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
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text>webjump movie List</Text>
        </SafeAreaView>
      </>
    );
  }
}

export default HomeScene;
