import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import createNativeStackNavigator
import Newtreh from '../page/Newtreh';
import Bvrtgel from '../page/Bvrtgel';
import One from '../page/One';
import Home from '../page/Class';

const Stack = createNativeStackNavigator();
export default function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Newtreh" component={Newtreh} />
          <Stack.Screen name="Bvrtgel" component={Bvrtgel} />
          <Stack.Screen name="One" component={One} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  