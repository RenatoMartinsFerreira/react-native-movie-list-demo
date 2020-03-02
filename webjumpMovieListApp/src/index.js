import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {createStackNavigator} from '@react-navigation/stack';
import {fontScale} from 'webjumpMovieListApp/src/commons/scaling';
import {
  HomeScene,
  MyMoviesScene,
  MovieDetailScene,
  SearchScene,
} from './screens';
import MovieModel from 'webjumpMovieListApp/src/models/movieModel';

import {HeaderComponent} from 'webjumpMovieListApp/src/components/presentation';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const homeStack = function({
  movieFavoriteList,
  route,
  navigation,
  store,
  dispatch,
}) {
  return (
    <View style={styles.sceneContainer}>
      <HeaderComponent navigation={navigation} showSearchButton />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {fontSize: 18},
          style: {backgroundColor: colors.awesomeRed},
          activeTintColor: 'white',
          indicatorStyle: {backgroundColor: 'white'},
        }}>
        <Tab.Screen
          name="Tendências"
          options={{
            tabBarLabel: () => <Text style={styles.tabText}>Tendências</Text>,
          }}>
          {() => <HomeScene navigator={navigation} dispatch={dispatch} />}
        </Tab.Screen>
        <Tab.Screen
          name="MeusFilmes"
          options={{
            tabBarLabel: () => <Text style={styles.tabText}>Meus Filmes</Text>,
          }}>
          {() => <MyMoviesScene navigator={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

function movieDetailStack({route, navigation}) {
  return (
    <View style={styles.sceneContainer}>
      <HeaderComponent navigation={navigation} showBackButton />
      <Stack.Navigator
        tabBarOptions={{
          labelStyle: {fontSize: fontScale(18)},
          style: {backgroundColor: colors.awesomeRed},
          activeTintColor: 'white',
          indicatorStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen
          options={{
            header: false,
            headerShown: false,
          }}
          name="movieDetailScene">
          {() => (
            <MovieDetailScene
              navigator={navigation}
              movie={route.params.item.movie}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
}

function searchSceneStack({route, navigation}) {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.sceneContainer}>
      <HeaderComponent
        navigation={navigation}
        showBackButton
        isSearchHeader
        hooksToSet={setSearch}
      />
      <Stack.Navigator
        tabBarOptions={{
          labelStyle: {fontSize: fontScale(18)},
          style: {backgroundColor: colors.awesomeRed},
          activeTintColor: 'white',
          indicatorStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen
          options={{
            header: false,
            headerShown: false,
          }}
          name="searchScene">
          {() => <SearchScene navigator={navigation} searchText={search} />}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tabText: {
    color: 'white',
    fontSize: fontScale(18),
  },
  sceneContainer: {
    flex: 1,
  },
});

export {homeStack, movieDetailStack, searchSceneStack};
