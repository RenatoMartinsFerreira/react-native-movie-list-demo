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
    };

    this.movieMockData = [
      {
        title: 'Batman',
        yaer: 2020,
        time: '1h27min',
        description:
          'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every ...',
        uri: 'https://image.tmdb.org/t/p/w500/pKKvCaL1TPTVtbI6EeliyND3api.jpg',
      },
      {title: 'Tron', yaer: 2019, time: '2h27min', description: 'teste'},
      {title: 'Tron', yaer: 2019, time: '2h27min', description: 'teste'},
      {title: 'Tron', yaer: 2019, time: '2h27min', description: 'teste'},
      {title: 'Tron', yaer: 2019, time: '2h27min', description: 'teste'},
      {title: 'Tron', yaer: 2019, time: '2h27min', description: 'teste'},
    ];

    this.movieListModel = new MovieListModel();
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  render() {
    return !this.state.loading ? (
      <>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            data={this.movieMockData}
            renderItem={({item}) => <MovieItemComponent movie={item} />}
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
