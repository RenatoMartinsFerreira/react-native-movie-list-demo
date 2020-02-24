import * as React from 'react';
import {Text, View, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {HomeScene, MyMoviesScene} from './screens';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: colors.awsomeRed}}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={colors.awsomeRed}
          barStyle="light-content"
        />
        <SafeAreaView style={{flex: 1}}>
          <View style={{paddingVertical: 20, paddingHorizontal: 30}}>
            <Text style={{color: 'white', fontSize: 18}}>Jump Movie List</Text>
          </View>
          <Tab.Navigator
            tabBarOptions={{
              labelStyle: {fontSize: 18},
              style: {backgroundColor: colors.awsomeRed},
              activeTintColor: 'white',
              indicatorStyle: {backgroundColor: 'white'},
            }}>
            <Tab.Screen
              name="Tendências"
              component={nav => <HomeScene navigator={nav} />}
            />
            <Tab.Screen name="MeusFilmes" component={() => <MyMoviesScene />} />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </View>
  );
}
