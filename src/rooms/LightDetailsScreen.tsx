import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Light } from '../models/Light';

import ColorPicker from 'react-native-wheel-color-picker'
import { xyBriToRgb, rgbToHex, hexToRgb, calculateXY } from '../utils/Utils';
import { getLightById, setLightState } from '../services/HueService';

interface ILightDetailScreenProps {
  route: any;
}

export default function LightDetailsScreen({ route }: ILightDetailScreenProps) {
  const [light, setLight] = useState<Light>()
  const [lightId, setLightId] = useState<string>()
  const [colorSupported, setColorSupported] = useState<boolean>(false);
  const [color, setColor] = useState<string>();

  useEffect(() => {
    (() => {
      const light = route.params.light;
      setLight(light);
      const lightId = route.params.lightId;
      setLightId(lightId);
      setColorSupported(light?.state.colormode == 'hs' || light?.state?.colormode == 'xy' || light?.state.hue);

      if (colorSupported) {
        const colorRgb = xyBriToRgb(light!.state.xy[0]!, light!.state.xy[1]!, light!.state.bri!);
        const colorHex = rgbToHex(colorRgb.r, colorRgb.g, colorRgb.b);
        setColor(colorHex)
      }
    })()
  }, [])

  const updateLightState = async (color: string) => {
    const rgbColor = hexToRgb(color);
    const xyColor = calculateXY(rgbColor?.r, rgbColor?.g, rgbColor?.b, light?.modelid)
    await setLightState(lightId!, { xy: xyColor });
    const l = await getLightById(lightId!)
    setLight(l);
  }

  return (
    <ScrollView style={styles.scrollview}>
      <Text>
        Color supported?: {colorSupported ? '😍' : '😞'}
      </Text>
      {!!light && colorSupported ?
        <ColorPicker
          color={color}
          onColorChangeComplete={(color) => updateLightState(color)}
        /> : null
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#1f1f1f'
  }
})