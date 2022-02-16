import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, Snackbar, Text } from 'react-native-paper';
import { useTheme } from 'react-navigation';
import { GenerateClientKey, getDevices } from '../services/HueService';

export default function DashboardScreen() {
  const theme = useTheme();
  const [linked, setLinked] = useState<boolean>(false);
  const [devices, setDevices] = useState<any>([]);
  const [snackbarContent, setSnackbarContent] = useState<string>('');
  const [clientKey, setClientKey] = useState<string>();

  React.useEffect(() => {
    (async () => {
      if (snackbarContent !== '') {
        getKey();
      }
    })()
  }, [snackbarContent])

  const getKey = async () => {
    console.log('getting key')
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
  }

  if (linked) {
    return (
      <View>
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
        <Text>
          {snackbarContent}
          Dashboard screen works!
          Bridge linked: {linked}
          Client key:  { clientKey }

        </Text>
        <Button onPress={getDevices}>
          Get devices
        </Button>
        <Text>
          {devices}
        </Text>
      </View>
    );
  } else {
    return (
      <View>
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
        <Text style={styles.text}>
          Press the Bridge Link button and press button below
          Bridge linked: {linked}
          Client key:  { clientKey }
          {snackbarContent}
        </Text>
        <Button onPress={getKey}>
          Link!
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'red'
  }
})