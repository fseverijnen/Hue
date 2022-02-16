export interface Group {
  id?:     string;
  name:    string;
  lights:  string[];
  sensors: any[];
  type:    string;
  state:   State;
  recycle: boolean;
  class:   string;
  action:  Action;
}

interface Action {
  on:        boolean;
  bri:       number;
  hue:       number;
  sat:       number;
  effect:    string;
  xy:        number[];
  ct:        number;
  alert:     string;
  colormode: string;
}

interface State {
  all_on: boolean;
  any_on: boolean;
}
