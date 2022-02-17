import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, Title } from 'react-native-paper';
import GroupTile from '../components/GroupTile';
import LightTile from '../components/LightTile';
import MotionSensorTile from '../components/MotionSensorTile';
import { Group } from '../models/Group';
import { Light } from '../models/Light';
import { MotionSensor } from '../models/MotionSensor';
import { getGroups, getLights, getMotionSensors, getSensors } from '../services/HueService';

export default function DashboardScreen() {
  const [motionSensors, setMotionSensors] = useState<any>([]);
  const [lights, setLights] = useState<any>([]);

  React.useEffect(() => {
    (async () => {      
      const interval = setInterval(async () => {
        await getLightsFromApi();
        await getMotionSensorsFromApi();
      }, 1000)

      return () => {
        clearInterval(interval);
      };
    })()
  }, [])

  const getMotionSensorsFromApi = async () => {
    const response = await getMotionSensors();
    setMotionSensors(response);
  }

  const getLightsFromApi = async () => {
    const response = await getLights();
    setLights(response);
  }

  return (
    <ScrollView style={styles.scrollview}>
      <Title>Motion sensors</Title>
      <View style={styles.tiles}>
        {
          motionSensors.map((motionSensor: MotionSensor) => <MotionSensorTile key={motionSensor.uniqueid} motionSensor={motionSensor} />)
        }
      </View>
      <Title>Lights</Title>
      <View style={styles.tiles}>
        {
          lights.map((light: Light) => <LightTile key={light.uniqueid} light={light} getLightsFromApi={getLightsFromApi} />)
        }
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  text: {
    color: 'red'
  },
  tiles: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  scrollview: {
    backgroundColor: '#1f1f1f'
  }
})