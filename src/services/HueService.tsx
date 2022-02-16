import axios from "axios"
import { HUE_API_URL } from '../constants';
import { GenericError } from "../models/GenericError";
import { HueError } from "../models/HueError";

export const GenerateClientKey = async (): Promise<string | GenericError> => {
  const response = await axios.post(`${HUE_API_URL}/api`, { 'devicetype': 'rn_hue#dev', 'generateclientkey': true });
  console.log(response.data)
  if (response.data[0].error) {
    return handleHueError(response.data[0].error);
  }
  return response.data;
}

export const getDevices = async (): Promise<any> => {
  const response = await axios.get(`${HUE_API_URL}/clip/v2/resource/device`);
  console.log(response.data)
  if (response.data[0].error) {
    return handleHueError(response.data[0].error);
  }
  return response.data;
}

export const handleHueError = (error: HueError): GenericError => {
  switch (error.type) {
    case 101:
      return ({error: true, message: "Link button not pressed", code: error.type});
    default:
      return {error: true, message: "Unhandled error: " + JSON.stringify(error)};
  }
}