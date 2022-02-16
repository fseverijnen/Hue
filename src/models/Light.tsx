export interface Light {
  id?:              string;
  state:            State;
  swupdate:         Swupdate;
  type:             string;
  name:             string;
  modelid:          string;
  manufacturername: string;
  productname:      string;
  capabilities:     Capabilities;
  config:           Config;
  uniqueid:         string;
  swversion:        string;
}

interface Capabilities {
  certified: boolean;
  control:   Control;
  streaming: Streaming;
}

interface Control {
  mindimlevel:    number;
  maxlumen:       number;
  colorgamuttype: string;
  colorgamut:     Array<number[]>;
  ct:             CT;
}

interface CT {
  min: number;
  max: number;
}

interface Streaming {
  renderer: boolean;
  proxy:    boolean;
}

interface Config {
  archetype: string;
  function:  string;
  direction: string;
  startup:   Startup;
}

interface Startup {
  mode:       string;
  configured: boolean;
}

interface State {
  on:        boolean;
  bri:       number;
  hue:       number;
  sat:       number;
  effect:    string;
  xy:        number[];
  ct:        number;
  alert:     string;
  colormode: string;
  mode:      string;
  reachable: boolean;
}

interface Swupdate {
  state:       string;
  lastinstall: string;
}
