import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from './DashboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import NavigationHeader from '../components/NavigationHeader';

const Stack = createNativeStackNavigator();

export default function DashboardNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTitle: 'Dashboard',
        header: (props) => <NavigationHeader {...props} />
      }}>
        <Stack.Screen name='Dashboard' component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
