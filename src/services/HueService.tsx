import axios from "axios"
import { CLIENT_KEY, HUE_API_URL, USERNAME } from '../constants';
import { GenericError } from "../models/GenericError";
import { Group } from "../models/Group";
import { HueError } from "../models/HueError";
import { Light } from "../models/Light";
import { MotionSensor } from "../models/MotionSensor";

export const GenerateClientKey = async (): Promise<string | GenericError> => {
  const response = await axios.post(`${HUE_API_URL}/api`, { 'devicetype': 'rn_hue#dev', 'generateclientkey': true });
  if (response.data[0].error) {
    return handleHueError(response.data[0].error);
  }
  return response.data;
}

export const getSensors = async (): Promise<any> => {
  try {
    const response = await axios.request({
      method: 'GET',
      baseURL: `${HUE_API_URL}/api/${USERNAME}/sensors`
    });

    if (response.data[0]?.error) {
      return handleHueError(response.data[0].error);
    }
    return Object.values(response.data);
  }
  catch (err) {
    console.error(JSON.stringify(err))
  }
}

export const getMotionSensors = async (): Promise<MotionSensor[]> => {
  const sensors = await getSensors();

  return sensors.filter((value: any) => {
    return value.type === 'ZLLPresence';
  });
}

export const getLights = async (): Promise<any> => {
  try {
    const response = await axios.request({
      method: 'GET',
      baseURL: `${HUE_API_URL}/api/${USERNAME}/lights`
    });
  
    if (response.data[0]?.error) {
      return handleHueError(response.data[0].error);
    }
    const lightIds = Object.keys(response.data);
    const lights = Object.values<Light>(response.data);

    for (let i = 0; i < lightIds.length; i++) {
      for (let j = 0; j < lights.length; j++) {
        lights[i].id = lightIds[i];
      }
    }

    return lights.sort((a: Light , b: Light) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)));
  }
  catch (err) {
    console.error(JSON.stringify(err))
  }
}

export const setLightStateOnOff = async (lightId: string, on: boolean) => {
  try {
    const response = await axios.request({
      method: 'PUT',
      baseURL: `${HUE_API_URL}/api/${USERNAME}/lights/${lightId}/state`,
      data: {
        "on": on
      }
    });
    if (response.data[0]?.error) {
      return handleHueError(response.data[0].error);
    }

    console.log(response.data)

    return Object.values(response.data);
  }
  catch (err) {
    console.error(JSON.stringify(err))
  }
}

export const getGroups = async (): Promise<any> => {
  try {
    const response = await axios.request({
      method: 'GET',
      baseURL: `${HUE_API_URL}/api/${USERNAME}/groups`
    });
  
    if (response.data[0]?.error) {
      return handleHueError(response.data[0].error);
    }
    const groupIds = Object.keys(response.data);
    const groups = Object.values<Group>(response.data);

    for (let i = 0; i < groupIds.length; i++) {
      for (let j = 0; j < groups.length; j++) {
        groups[i].id = groupIds[i];
      }
    }

    return groups.sort((a: Group , b: Group) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)));
  }
  catch (err) {
    console.error(JSON.stringify(err))
  }
}

export const setGroupStateOnOff = async (groupId: string, on: boolean) => {
  try {
    const response = await axios.request({
      method: 'PUT',
      baseURL: `${HUE_API_URL}/api/${USERNAME}/groups/${groupId}/action`,
      data: {
        "on": on
      }
    });
    if (response.data[0]?.error) {
      return handleHueError(response.data[0].error);
    }

    return Object.values(response.data);
  }
  catch (err) {
    console.error(JSON.stringify(err))
  }
}


export const handleHueError = (error: HueError): GenericError => {
  switch (error.type) {
    case 101:
      return ({error: true, message: "Link button not pressed", code: error.type});
    default:
      return {error: true, message: "Unhandled error: " + JSON.stringify(error)};
  }
}