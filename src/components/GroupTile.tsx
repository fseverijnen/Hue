import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Text, Surface, Title, TouchableRipple, List } from 'react-native-paper';
import { Group } from '../models/Group';
import { Light } from '../models/Light';
import { getLightById, setGroupStateOnOff, setLightStateOnOff } from '../services/HueService';
import LightListItem from './LightListItem';

interface ILightProps {
  group: Group;
  navigation: any;
}

export default function GroupTile({ group, navigation }: ILightProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [lights, setLights] = useState<any[]>([]);

  const handlePress = () => setExpanded(!expanded);

  const getLightByIdFromApi = async (id: string): Promise<Light> => {
    const light = await getLightById(id);
    return light;
  }

  const getLightsForGroup = async () => {
    const lightsArray: any[] = [];
    group.lights.forEach(async (lightId: string) => {
      lightsArray.push({ light: await getLightByIdFromApi(lightId), lightId });
    });
    setLights(lightsArray);
  }

  const navigateToLightDetails = (light: Light, lightId: string) => {
    navigation.setOptions({ headerTitle: light.name })
    navigation.navigate('Light details', {
      light,
      lightId,
      title: light.name
    });
  }

  useEffect(() => {
    (async () => {
      await getLightsForGroup();
    })()
  }, [])

  return (
    <List.Accordion title={group.name} onPress={handlePress} expanded={expanded}>
      {lights.map((item: any) => {
        return <LightListItem key={item.light.uniqueid} light={item.light} id={item.lightId} onPress={() => navigateToLightDetails(item.light, item.lightId)} />
      })}
    </List.Accordion>
  );
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
    backgroundColor: '#fff'
  }
});