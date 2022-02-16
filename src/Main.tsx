import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Snackbar } from 'react-native-paper';
import DashboardNavigator from './dashboard/DashboardNavigator';

const _routes = [{ key: 'dashboardNavigationStack', title: 'Dashboard', icon: 'view-dashboard' }];

export default function Main() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(_routes);

  const renderScene = BottomNavigation.SceneMap({
    dashboardNavigationStack: () => <DashboardNavigator />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
