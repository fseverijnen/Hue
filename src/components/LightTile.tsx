import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Text, Surface, Title, TouchableRipple } from 'react-native-paper';
import { Light } from '../models/Light';
import { setLightStateOnOff } from '../services/HueService';

interface ILightProps {
  light: Light;
  getLightsFromApi: () => {};
}

export default function LightTile({ light, getLightsFromApi}: ILightProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const updateLight = async (lightId: string, state: boolean) => {
    setLoading(true);
    await setLightStateOnOff(lightId, state);
    await getLightsFromApi();
    setLoading(false);
  }

  if (!loading) {
    return (
      <TouchableRipple style={light.state.on ? styles.on : styles.default} rippleColor='rgba(0, 0, 0, 90)'
        onPress={() => updateLight(light.id!, !light.state.on)}>
        <Text>{light.name}</Text>
      </TouchableRipple>
    );
  } else {
    return (
      <TouchableRipple style={styles.disabled} rippleColor='rgba(0, 0, 0, 90)'>
        <Text>{light.name}</Text>
      </TouchableRipple>
    );
  }
  
}

const styles = StyleSheet.create({
  default: {
    margin: 4,
    padding: 8,
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f2f2f',
  },
  on: {
    margin: 4,
    padding: 8,
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  disabled: {
    margin: 4,
    padding: 8,
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111111'
  }
});