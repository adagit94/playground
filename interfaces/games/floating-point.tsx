declare namespace States {
  interface InitStates {
    readonly isTurnedOn: boolean;
    readonly isRunning: boolean;
    readonly isPaused: boolean;
    readonly mode: string;
    readonly dimensions: number;
    readonly speed: number;
    readonly visibility: string;
    readonly players: Players;
    readonly floatingPointPos: Positions;
  }

  interface Positions {
    top: number;
    left: number;
  }

  interface Players {
    P1: Player;
    P2: Player;
    P3: Player;
    P4: Player;
    shapesOthers: Array<string>;
    colorsOthers: Array<string>;
  }

  interface Player {
    positions: Positions;
    shape: string;
    color: string;
    score: number;
  }
}

declare namespace Panel {
  interface Defaults {
    readonly P1: Player;
    readonly P2: Player;
    readonly P3: Player;
    readonly P4: Player;
    readonly dimensions: number;
    readonly speed: number;
    readonly fpPadding: number;
  }

  interface Player {
    color: string;
  }  
}

declare namespace Keys {
  interface Directions {
    ArrowUp: Key,
    ArrowRight: Key,
    ArrowDown: Key,
    ArrowLeft: Key,
    w: Key,
    d: Key,
    s: Key,
    a: Key,
    i: Key,
    l: Key,
    k: Key,
    j: Key,
    '8': Key,
    '6': Key,
    '5': Key,
    '4': Key
  }

  interface Key {
    pressed: boolean
  }
}

export {States.InitStates, Panel.Defaults, Keys.Directions};