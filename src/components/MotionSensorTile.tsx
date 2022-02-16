import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Paragraph, Surface, Title } from 'react-native-paper';
import { MotionSensor } from '../models/MotionSensor';

interface IMotionSensorProps {
  motionSensor: MotionSensor;
}

export default function MotionSensorTile({motionSensor}: IMotionSensorProps) {

  return (
    <Surface style={motionSensor.state.presence ? styles.detected : styles.default}>
      <Text>{motionSensor.name}</Text>
      <Text>{motionSensor.state.presence ? 'Motion detected!' : 'Nothing detected'}</Text>
    </Surface>
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
    elevation: 12,
  },
  detected: {
    margin: 4,
    padding: 8,
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    backgroundColor: 'green'
  }
});