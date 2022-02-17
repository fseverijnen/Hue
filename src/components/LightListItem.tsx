import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, List, Modal, Portal, Provider, Switch } from "react-native-paper";
import { Light, LightState } from "../models/Light";
import { setLightState, setLightStateOnOff } from "../services/HueService";

interface ILightListItemProps {
  light: Light;
  id: string;
  onPress: () => {} | void;
}

export default function LightListItem({ light, id, onPress }: ILightListItemProps) {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsSwitchOn(light.state.on!);
    })()
  }, [])

  const updateLightStateOnOff = async () => {
    return await setLightStateOnOff(id, !isSwitchOn);
  }

  const updateLightState = async () => {
    const state: LightState = {
      on: !isSwitchOn
    }
    return await setLightState(id, state);
  }

  const onToggleSwitch = async () => {
    await updateLightStateOnOff();
    setIsSwitchOn(!isSwitchOn);
  }

  return (
    <List.Item title={light.name} onPress={onPress} right={props => <Switch {...props} value={isSwitchOn} onValueChange={onToggleSwitch}/>} />
  );
}