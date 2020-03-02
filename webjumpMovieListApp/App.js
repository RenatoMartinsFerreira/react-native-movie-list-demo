import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';

import {createLogger} from 'redux-logger';

// A very simple reducer
function counterReducer(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const rootReducer = combineReducers({count: counterReducer});

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['count'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [''],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(createLogger())),
);

let persistor = persistStore(store);

// A very simple store
// let store = createStore(combineReducers({count: rootReducer}));

// A screen!
function Counter({count, dispatch, navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{count}</Text>
      <Button title="Increment" onPress={() => dispatch({type: 'INCREMENT'})} />
      <Button title="Decrement" onPress={() => dispatch({type: 'DECREMENT'})} />

      <Button
        title="Go to static count screen"
        onPress={() => navigation.navigate('StaticCounter')}
      />
    </View>
  );
}

// Another screen!
function StaticCounter({count}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{count}</Text>
    </View>
  );
}

// Connect the screens to Redux
let CounterContainer = connect(state => ({count: state.count}))(Counter);
let StaticCounterContainer = connect(state => ({count: state.count}))(
  StaticCounter,
);

// Create our stack navigator
let RootStack = createStackNavigator();

// Render the app container component with the provider around it
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Counter" component={CounterContainer} />
            <RootStack.Screen
              name="StaticCounter"
              component={StaticCounterContainer}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
