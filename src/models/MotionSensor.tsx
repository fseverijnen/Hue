export interface MotionSensor {
  state:            State;
  swupdate:         Swupdate;
  config:           Config;
  name:             string;
  type:             string;
  modelid:          string;
  manufacturername: string;
  productname:      string;
  swversion:        string;
  uniqueid:         string;
  capabilities:     Capabilities;
}

interface Capabilities {
  certified: boolean;
  primary:   boolean;
}

interface Config {
  on:             boolean;
  battery:        number;
  reachable:      boolean;
  alert:          string;
  sensitivity:    number;
  sensitivitymax: number;
  ledindication:  boolean;
  usertest:       boolean;
  pending:        any[];
}

interface State {
  presence:    boolean;
  lastupdated: string;
}

interface Swupdate {
  state:       string;
  lastinstall: string;
}