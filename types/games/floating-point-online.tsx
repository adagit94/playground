type DataSets = 'game' | 'players' | 'fp';

type GameStates = 'conf' | 'init' | 'run' | 'eval' | 'reset';

type ShapeStyles = {
  transform?: string;
  borderRadius?: string;
  backgroundColor?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  animationName?: string;
};

type ShapeValues = {
  size: [number, number] | number;
  position: [number, number];
};

export type EnvObjects = {
  shape: ShapeNames | [ShapeNames, ShapeStyles];
  shapes: ShapeValues[];
}[];

export type ShapeNames = 'Rectangle' | 'Circle';

export type Position = { top: number; left: number };

export type Key = {
  pressed: boolean;
  operation: 'add' | 'subtract';
  direction: 'top' | 'left';
  limit: 'topLeft' | 'bottomRight';
};

export type Player = {
  username: string;
  avatar: string;
  selectedEnv: EnvNames;
  top: number;
  left: number;
  score: number;
  isReady: boolean;
};

export type PlayerUpdate = {
  username?: string;
  avatar?: string;
  selectedEnv?: EnvNames;
  top?: number;
  left?: number;
  score?: number;
  isReady?: boolean;
};

export type PropsOptions = {
  state: string;
  player: string;
};

export type PropsOptionsPlayer = {
  player: string;
  initPossible: boolean;
  setInitPossible?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PropsEnv = {
  env: EnvNames;
};

export type StatesGame = {
  state: GameStates;
  admin: string;
  env: EnvNames;
  envVotes: EnvVotes;
  winner: Results;
  timer: number;
  timestampStart: number;
  timestampEnd: number;
  width: number;
  height: number;
};

export type StatesGameDB = {
  state: GameStates;
  admin: string;
  env: EnvNames;
  envVotes: EnvVotes;
  winner: Results;
  timer: number;
  timestampStart: number;
  timestampEnd: number;
  width: number;
  height: number;
};

export type GameCreate = {
  state: 'conf';
  admin: string;
  envVotes: EnvVotes;
  timer: number;
};

export type PlayerCreate = {
  username: string;
  avatar: string;
  isReady: boolean;
};

export type DataSet = {
  game: GameCreate;
  players: StatesPlayers;
  fp: StatesFP;
};

export type GameUpdate = {
  state?: GameStates;
  admin?: string;
  env?: EnvNames;
  envVotes?: EnvVotes;
  winner?: Results;
  timer?: number;
  timestampStart?: number;
  timestampEnd?: number;
};

export type StatesPlayers = { [uid: string]: Player };

export type StatesFP = Position;

export type ActionsGame =
  | {
      type: 'changeDimensions';
      width: number;
      height: number;
    }
  | { type: 'setData'; payload: StatesGameDB };

export type PlayerResultData = { name: string; score: number };

export type PlayerResultsData = PlayerResultData[];

export type Results = PlayerResultData | PlayerResultsData;

export type EnvNames = 'testI' | 'testII';

export type EnvList = ['testI', 'testII'];

export type EnvVotes = { test: number };

export type ActionsPlayers = { type: 'setData'; payload: StatesPlayers };

export type ActionsFP = { type: 'setData'; payload: StatesFP };

export type HandleData = (
  dataSet: DataSets,
  data: StatesGameDB | StatesPlayers | StatesFP
) => void;

export type UpdateDataFP = (update: StatesFP) => Promise<void>;

export type Defaults = {
  size: number;
  timer: number;
  enviroments: { testI: EnvObjects; testII: EnvObjects };
};

export type ControlKeys = {
  ArrowUp: Key;
  ArrowRight: Key;
  ArrowDown: Key;
  ArrowLeft: Key;
};

export type InitGameDefaults = (admin: string) => GameCreate;

export type InitPlayerDefaults = (user: firebase.User) => PlayerCreate;

export type InitEnvVotes = () => EnvVotes;

export type CheckOverlap = (pointTop: number, pointLeft: number) => boolean;
