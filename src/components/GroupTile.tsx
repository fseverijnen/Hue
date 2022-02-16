import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Text, Surface, Title, TouchableRipple } from 'react-native-paper';
import { Group } from '../models/Group';
import { Light } from '../models/Light';
import { setGroupStateOnOff, setLightStateOnOff } from '../services/HueService';

interface ILightProps {
  group: Group;
  getGroupsFromApi: () => {};
}

export default function GroupTile({ group, getGroupsFromApi}: ILightProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const updateGroup = async (groupId: string, state: boolean) => {
    setLoading(true);
    await setGroupStateOnOff(groupId, state);
    await getGroupsFromApi();
    setLoading(false);
  }

  if (!loading) {
    return (
      <TouchableRipple style={group.state.all_on ? styles.on : styles.default} rippleColor='rgba(0, 0, 0, 90)'
        onPress={() => updateGroup(group.id!, !group.state.all_on)}>
        <Text>{group.name}</Text>
      </TouchableRipple>
    );
  } else {
    return (
      <TouchableRipple style={styles.disabled} rippleColor='rgba(0, 0, 0, 90)'>
        <Text>{group.name}</Text>
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