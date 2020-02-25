import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from 'webjumpMovieListApp/src/commons/colors';
import {createStackNavigator} from '@react-navigation/stack';
import {GenericTextComponent} from 'webjumpMovieListApp/src/components/presentation';
import {HomeScene, MyMoviesScene, MovieDetailScene} from './screens';
import {fontScale} from './commons/scaling';
import Icon from 'webjumpMovieListApp/src/commons/icon';
import {horizontalScale} from 'webjumpMovieListApp/src/commons/scaling';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const showBackButton = false;

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
  );
}

function movieDetail() {
  return (
    <Stack.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: fontScale(18)},
        style: {backgroundColor: colors.awsomeRed},
        activeTintColor: 'white',
        indicatorStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        options={{
          header: false,
          headerShown: false,
        }}
        name="Tendências"
        component={nav => <MovieDetailScene navigator={nav} />}
      />
    </Stack.Navigator>
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
          <View style={styles.headerContainer}>
            {showBackButton && (
              <TouchableOpacity>
                <Icon
                  style={{marginRight: horizontalScale(10)}}
                  name="arrow-back"
                  size={fontScale(25)}
                  color={colors.white}
                />
              </TouchableOpacity>
            )}

            <Icon
              style={{marginRight: horizontalScale(10)}}
              name="trakt-icon-white"
              size={fontScale(25)}
              color={colors.white}
            />
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
              text={'Movie List'}
              color={colors.white}
            />
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
            <Stack.Screen
              options={{
                header: false,
                headerShown: false,
              }}
              name="movieDetail"
              component={movieDetail}
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
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
