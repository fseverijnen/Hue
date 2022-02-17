import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import GroupTile from '../components/GroupTile';
import { Group } from '../models/Group';
import { getGroups } from '../services/HueService';

interface IRoomsScreenProps {
  navigation: any;
}

export default function RoomsScreen({navigation}: IRoomsScreenProps) {
  const [groups, setGroups] = useState<any>([]);

  React.useEffect(() => {
    (async () => {
      const interval = setInterval(async () => {
        await getGroupsFromApi();
      }, 1000)

      return () => {
        clearInterval(interval);
      };
    })()
  }, [])

  const getGroupsFromApi = async () => {
    const response = await getGroups();
    setGroups(response);
  }
  return (
    <ScrollView style={styles.scrollview}>
      {
        groups.map((group: Group) => <GroupTile key={group.id} group={group} navigation={navigation}/>)
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red'
  },
  scrollview: {
    backgroundColor: '#1f1f1f'
  }
})