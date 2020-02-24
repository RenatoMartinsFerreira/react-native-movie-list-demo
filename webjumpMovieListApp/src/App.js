import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScene from './screens/homeScene';

export default function App() {
  return (
    <NavigationContainer>
      <HomeScene />
    </NavigationContainer>
  );
}
