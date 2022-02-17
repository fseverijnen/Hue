import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import RoomsScreen from './RoomsScreen';
import LightDetailsScreen from './LightDetailsScreen';
import NavigationHeader from '../components/NavigationHeader';

const Stack = createNativeStackNavigator();

export default function RoomsNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTitle: 'Rooms',
        header: (props) => <NavigationHeader {...props} />
      }}>
        <Stack.Screen name='Rooms'>
          {(props) => <RoomsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name='Light details' component={LightDetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
