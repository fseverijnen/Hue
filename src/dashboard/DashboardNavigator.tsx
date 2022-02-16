import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from './DashboardScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function DashboardNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Dashboard' component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
