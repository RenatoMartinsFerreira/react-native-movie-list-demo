import * as React from 'react';
import {Text, View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
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

import {HeaderComponent} from 'webjumpMovieListApp/src/components/presentation';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home({route, navigation}) {
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
          }}
          component={nav => <HomeScene navigator={nav} />}
        />
        <Tab.Screen
          name="MeusFilmes"
          options={{
            tabBarLabel: () => <Text style={styles.tabText}>Meus Filmes</Text>,
          }}
          component={nav => <MyMoviesScene navigator={nav} />}
        />
      </Tab.Navigator>
    </View>
  );
}

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
          name="movieDetailScene"
          component={nav => (
            <MovieDetailScene navigator={nav} movie={route.params.item.movie} />
          )}
        />
      </Stack.Navigator>
    </View>
  );
}

function searchSceneStack({route, navigation}) {
  return (
    <View style={styles.sceneContainer}>
      <HeaderComponent navigation={navigation} showBackButton isSearchHeader />
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
          name="searchScene"
          component={nav => <SearchScene navigator={nav} />}
        />
      </Stack.Navigator>
    </View>
  );
}

export default function App(route, navigation) {
  return (
    <View style={{flex: 1, backgroundColor: colors.awesomeRed}}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={colors.awesomeRed}
          barStyle="light-content"
        />
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                header: false,
                headerShown: false,
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{
                header: false,
                headerShown: false,
              }}
              name="movieDetailStack"
              component={movieDetailStack}
            />

            <Stack.Screen
              options={{
                header: false,
                headerShown: false,
              }}
              name="searchSceneStack"
              component={searchSceneStack}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
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
