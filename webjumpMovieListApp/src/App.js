import * as React from 'react';
import {View, SafeAreaView, StatusBar, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {homeStack, movieDetailStack, searchSceneStack} from './';
import colors from 'webjumpMovieListApp/src/commons/colors';

import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider, connect} from 'react-redux';

import {store, persistor} from 'webjumpMovieListApp/src/redux/store';

// Connect the screens to Redux
let HomeContainer = connect(state => ({
  movieFavoriteList: state.movieListReducer,
}))(homeStack);
let movieDetailStackContainer = connect(state => ({
  movieFavoriteList: state.movieListReducer,
}))(movieDetailStack);
let searchSceneStackContainer = connect(state => ({
  movieFavoriteList: state.movieListReducer,
}))(searchSceneStack);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
                  component={HomeContainer}
                />
                <Stack.Screen
                  options={{
                    header: false,
                    headerShown: false,
                  }}
                  name="movieDetailStack"
                  component={movieDetailStackContainer}
                />

                <Stack.Screen
                  options={{
                    header: false,
                    headerShown: false,
                  }}
                  name="searchSceneStack"
                  component={searchSceneStackContainer}
                />
              </Stack.Navigator>
            </SafeAreaView>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}
