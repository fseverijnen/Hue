import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, Title } from 'react-native-paper';
import { useTheme } from 'react-navigation';
import GroupTile from '../components/GroupTile';
import LightTile from '../components/LightTile';
import MotionSensorTile from '../components/MotionSensorTile';
import { CLIENT_KEY } from '../constants';
import { Group } from '../models/Group';
import { Light } from '../models/Light';
import { MotionSensor } from '../models/MotionSensor';
import { GenerateClientKey, getGroups, getLights, getMotionSensors, getSensors } from '../services/HueService';

export default function DashboardScreen() {
  const theme = useTheme();
  const [linked, setLinked] = useState<boolean>(false);
  const [devices, setDevices] = useState<any>([]);
  const [motionSensors, setMotionSensors] = useState<any>([]);
  const [lights, setLights] = useState<any>([]);
  const [groups, setGroups] = useState<any>([]);
  const [snackbarContent, setSnackbarContent] = useState<string>('');
  const [clientKey, setClientKey] = useState<string>();

  React.useEffect(() => {
    (async () => {      
      const motionSensorInterval = setInterval(async () => {
        await getGroupsFromApi();
        await getLightsFromApi();
        await getMotionSensorsFromApi();
      }, 1000)


      if (snackbarContent !== '') {
        await getKey();
      }

      return () => {
        clearInterval(motionSensorInterval);
      };
    })()
  }, [snackbarContent])

  const getKey = async (fromStore?: boolean) => {
    if (!fromStore) {
      const response = await GenerateClientKey();
      if (typeof response === 'string') {
        setLinked(true);
        setClientKey(response);
      } else if (response.code === 101) {
        setSnackbarContent(response.message);
        setLinked(false);
      } else {
        setSnackbarContent(response.message);
      }
    } else {
      setClientKey(CLIENT_KEY)
      setLinked(true);
    }
  }

  const getMotionSensorsFromApi = async () => {
    const response = await getMotionSensors();
    setMotionSensors(response);
  }

  const getLightsFromApi = async () => {
    console.log('getting lights')
    const response = await getLights();
    setLights(response);
  }

  const getGroupsFromApi = async () => {
    const response = await getGroups();
    setGroups(response);
  }

  return (
    <ScrollView style={styles.scrollview}>
      <Snackbar
        visible={snackbarContent !== ''}
        onDismiss={() => {
          setSnackbarContent('');
        }}
        action={{
          label: 'Hide',
          onPress: () => setSnackbarContent('')
        }}
        duration={2000}
      >
        {snackbarContent}
      </Snackbar>
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
      <Title>Groups</Title>
      <View style={styles.tiles}>
        {
          groups.map((group: Group) => <GroupTile key={group.id} group={group} getGroupsFromApi={getGroupsFromApi} />)
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