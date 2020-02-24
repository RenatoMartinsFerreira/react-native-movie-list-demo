import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
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
        <SafeAreaView>
          <Text>webjump movie List</Text>

          <TouchableOpacity
            onPress={() => {
              this.props.navigator.navigation.navigate('Profile');
            }}>
            <Text>teste</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }
}

export default HomeScene;
