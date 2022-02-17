import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Snackbar } from 'react-native-paper';
import DashboardNavigator from './dashboard/DashboardNavigator';
import RoomsNavigator from './rooms/RoomsNavigator';

const _routes = [
  { key: 'dashboardNavigationStack', title: 'Dashboard', icon: 'view-dashboard' },
  { key: 'roomsNavigationStack', title: 'Rooms', icon: 'home-automation' }
];

export default function Main() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(_routes);

  const renderScene = BottomNavigation.SceneMap({
    dashboardNavigationStack: () => <DashboardNavigator />,
    roomsNavigationStack: () => <RoomsNavigator />
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
