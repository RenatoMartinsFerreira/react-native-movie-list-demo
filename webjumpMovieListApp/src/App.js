import * as React from 'react';
import {Text, View, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScene, MyMoviesScene} from './screens';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
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
      <Tab.Screen
        name="MeusFilmes"
        component={nav => <MyMoviesScene navigator={nav} />}
      />
    </Tab.Navigator>
  );
}

function Profile() {
  return (
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
    </Tab.Navigator>
  );
}

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

          <Stack.Navigator>
            <Stack.Screen
              options={{
                header: false,
                headerShown: false,
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </View>
  );
}
