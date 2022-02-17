const colorPointsGamut_A = [[0.703, 0.296], [0.214, 0.709], [0.139, 0.081]];
const colorPointsGamut_B = [[0.674, 0.322], [0.408, 0.517], [0.168, 0.041]];
const colorPointsGamut_C = [[0.692, 0.308], [0.17, 0.7], [0.153, 0.048]];
const colorPointsDefault = [[1.0, 0.0], [0.0, 1.0], [0.0, 0.0]];

const GAMUT_A_BULBS_LIST = ["LLC001", "LLC005", "LLC006", "LLC007", "LLC010", "LLC011", "LLC012", "LLC014", "LLC013", "LST001"];
const GAMUT_B_BULBS_LIST = ["LCT001", "LCT002", "LCT003", "LCT004", "LLM001", "LCT005", "LCT006", "LCT007"];
const GAMUT_C_BULBS_LIST = ["LCT010", "LCT011", "LCT012", "LCT014", "LCT015", "LCT016", "LLC020", "LST002"];
const MULTI_SOURCE_LUMINAIRES = ["HBL001", "HBL002", "HBL003", "HIL001", "HIL002", "HEL001", "HEL002"];

export const calculateXY = (red, green, blue, model) => {
  red = red / 255;
  green = green / 255;
  blue = blue / 255;
  const r = red > 0.04045 ? Math.pow(((red + 0.055) / 1.055), 2.4000000953674316) : red / 12.92;
  const g = green > 0.04045 ? Math.pow(((green + 0.055) / 1.055), 2.4000000953674316) : green / 12.92;
  const b = blue > 0.04045 ? Math.pow(((blue + 0.055) / 1.055), 2.4000000953674316) : blue / 12.92;
  const x = r * 0.664511 + g * 0.154324 + b * 0.162028;
  const y = r * 0.283881 + g * 0.668433 + b * 0.047685;
  const z = r * 8.8E-5 + g * 0.07231 + b * 0.986039;
  const xy = [x / (x + y + z), y / (x + y + z)];
  if (isNaN(xy[0])) {
    xy[0] = 0.0;
  }

  if (isNaN(xy[1])) {
    xy[1] = 0.0;
  }

  const colorPoints = colorPointsForModel(model);
  const inReachOfLamps = checkPointInLampsReach(xy, colorPoints);
  if (!inReachOfLamps) {
    const pAB = getClosestPointToPoints(colorPoints[0], colorPoints[1], xy);
    const pAC = getClosestPointToPoints(colorPoints[2], colorPoints[0], xy);
    const pBC = getClosestPointToPoints(colorPoints[1], colorPoints[2], xy);
    const dAB = getDistanceBetweenTwoPoints(xy, pAB);
    const dAC = getDistanceBetweenTwoPoints(xy, pAC);
    const dBC = getDistanceBetweenTwoPoints(xy, pBC);
    let lowest = dAB;
    let closestPoint = pAB;
    
    if (dAC < dAB) {
      lowest = dAC;
      closestPoint = pAC;
    }

    if (dBC < lowest) {
      closestPoint = pBC;
    }

    if (closestPoint) {
      xy[0] = closestPoint[0];
      xy[1] = closestPoint[1];
    }
  }

  xy[0] = precision(xy[0]);
  xy[1] = precision(xy[1]);
  return xy;
};

function colorPointsForModel(model) {
  if (model == null) {
    model = " ";
  }

  if (GAMUT_B_BULBS_LIST.indexOf(model) == -1 && MULTI_SOURCE_LUMINAIRES.indexOf(model) == -1) {
    if (GAMUT_A_BULBS_LIST.indexOf(model) >= 0) {
      return colorPointsGamut_A;
    } else if (GAMUT_C_BULBS_LIST.indexOf(model) >= 0) {
      return colorPointsGamut_C;
    } else {
      return colorPointsDefault;
    }
  } else {
    return colorPointsGamut_B;
  }
}

export const checkPointInLampsReach = (point, colorPoints) => {
  if (point != null && colorPoints != null) {
    const red = colorPoints[0];
    const green = colorPoints[1];
    const blue = colorPoints[2];
    const v1 = [green[0] - red[0], green[1] - red[1]];
    const v2 = [blue[0] - red[0], blue[1] - red[1]];
    const q = [point[0] - red[0], point[1] - red[1]];
    const s = crossProduct(q, v2) / crossProduct(v1, v2);
    const t = crossProduct(v1, q) / crossProduct(v1, v2);
    return s >= 0.0 && t >= 0.0 && s + t <= 1.0;
  } else {
    return false;
  }
}

export const crossProduct = (point1, point2) => {
  return point1[0] * point2[1] - point1[1] * point2[0];
}

export const getClosestPointToPoints = (pointA, pointB, pointP) => {
  if (pointA != null && pointB != null && pointP != null) {
    const pointAP = [pointP[0] - pointA[0], pointP[1] - pointA[1]];
    const pointAB = [pointB[0] - pointA[0], pointB[1] - pointA[1]];
    const ab2 = pointAB[0] * pointAB[0] + pointAB[1] * pointAB[1];
    const apAb = pointAP[0] * pointAB[0] + pointAP[1] * pointAB[1];
    let t = apAb / ab2;
    if (t < 0.0) {
      t = 0.0;
    } else if (t > 1.0) {
      t = 1.0;
    }

    return [pointA[0] + pointAB[0] * t, pointA[1] + pointAB[1] * t];
  } else {
    return null;
  }
}

export const getDistanceBetweenTwoPoints = (pointA, pointB) => {
  const dx = pointA[0] - pointB[0];
  const dy = pointA[1] - pointB[1];
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist;
}

export const precision = (d) => {
  return Math.round(10000.0 * d) / 10000.0;
}

export const xyBriToRgb = (x: number, y: number, bri: number) => {
  const z = 1.0 - x - y;
  const Y = bri / 255.0;
  const X = (Y / y) * x;
  const Z = (Y / y) * z;
  let r = X * 1.612 - Y * 0.203 - Z * 0.302;
  let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
  let b = X * 0.026 - Y * 0.072 + Z * 0.962;
  r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
  g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
  b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
  const maxValue = Math.max(r, g, b);
  r /= maxValue;
  g /= maxValue;
  b /= maxValue;
  r = r * 255; 
  r = ~~r;
  if (r < 0) { r = 0 };
  
  g = g * 255; 
  g = ~~g;
  if (g < 0) { g = 0 };
  
  b = b * 255;
  b = ~~b;
  if (b < 0) { b = 0 };

  return {
    r: r,
    g: g,
    b: b
  }
}

export const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}