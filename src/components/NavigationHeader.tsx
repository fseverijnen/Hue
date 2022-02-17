import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Appbar, Switch } from 'react-native-paper';
import { getLightById, setLightStateOnOff } from '../services/HueService';

export default function NavigationHeader({ navigation, back }: NativeStackHeaderProps) {
  const [title, setTitle] = useState<string>()
  const [routeParams, setRouteParams] = useState<any>();
  const [isSwitchOn, setIsSwitchOn] = useState<any>();

  useEffect(() => {
    (async () => {
      const state = navigation.getState();
      const routeName = state.routes[state.routes.length - 1].name;
      const routeParams = state.routes[state.routes.length - 1].params;
      if (!routeParams) {
        setTitle(routeName)
        setRouteParams(null);
      } else {
        setRouteParams(routeParams);
        setTitle((routeParams as any).title)
        setIsSwitchOn((routeParams as any).light.state.on)
      }
    })()
  }, [])

  const toggleLight = async () => {
    await setLightStateOnOff(routeParams.lightId, !routeParams.light.state.on);
    const light = await getLightById(routeParams.lightId);
    let newParams = routeParams;
    newParams.light = light;
    setRouteParams(newParams);
    setIsSwitchOn(light.state.on);
  }

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!!routeParams?.light ? <Switch value={isSwitchOn} onValueChange={() => toggleLight()} /> : null}
    </Appbar.Header>
  );
}