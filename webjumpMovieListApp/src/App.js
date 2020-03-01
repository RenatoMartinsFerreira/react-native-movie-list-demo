import * as React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {homeStack, movieDetailStack, searchSceneStack} from './';
import colors from 'webjumpMovieListApp/src/commons/colors';

const Stack = createStackNavigator();

export default function App() {
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
              component={homeStack}
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
