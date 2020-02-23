import React, {Component} from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import TraktService from '../services/traktService';
import axios from 'axios';

class HomeScene extends Component {
  constructor(props) {
    super({...props});
    this.state = {
      fetchData: '',
    };
  }

  componentDidMount() {
    console.log('TraktService', TraktService.trendingList);

    TraktService.trendingList().then(response => {
      console.log(response, 'resp');
    });

    axios
      .get('https://private-ca0de0-trakt.apiary-mock.com/movies/trending')
      .then(response => {
        this.setState({fetchData: response.data[0].movie.title});
      });

    // console.log('TraktService', TraktService.trendingList);
    // TraktService.trendingList().then(e => console.log(e));
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text>webjump movie List</Text>
          <Text>
            teste
            {this.state.fetchData}
          </Text>
        </SafeAreaView>
      </>
    );
  }
}

export default HomeScene;
