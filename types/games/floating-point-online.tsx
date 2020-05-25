type Keys = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';

type DataSets = 'game' | 'players' | 'fp';

type GameStates = 'conf' | 'init' | 'run' | 'eval' | 'reset';

type EnvNames = 'test';

type ShapeValues = {
  dimensions: [number, number];
  positions: [number, number];
};

type TestEnv = [
  { shape: 'Square'; shapes: ShapeValues[] },
  { shape: 'Circle'; shapes: ShapeValues[] }
];

export type Player = {
  username: string;
  avatar: string;
  top: number;
  left: number;
  score: number;
  isReady: boolean;
};

export type UpdatePlayer = {
  username?: string;
  avatar?: string;
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
  winner: Winner;
  timer: number;
  timestampStart: number;
  timestampEnd: number;
  width: number;
  height: number;
};

export type CreateGame = {
  state: 'conf';
  admin: string;
  envVotes: EnvVotes;
  timer: number;
};

export type CreatePlayer = {
  username: string;
  avatar: string;
  isReady: boolean;
};

export type DataSet = {
  game: CreateGame;
  players: StatesPlayers;
  fp: StatesFP;
};

export type UpdateGame = {
  state?: GameStates;
  admin?: string;
  env?: EnvNames;
  envVotes?: EnvVotes;
  winner?: Winner;
  timer?: number;
  timestampStart?: number;
  timestampEnd?: number;
};

export type StatesPlayers = { [uid: string]: Player };

export type StatesFP = { top: number; left: number };

export type ActionsGame =
  | {
      type: 'changeDimensions';
      width: number;
      height: number;
    }
  | { type: 'setData'; payload: any };

export type Winner = { name: string; score: number };

export type EnvNamesEdited = 'Test';

export type EnvList = ['test'];

export type EnvVotes = { test: number };

export type Envs = TestEnv;

export type Enviroments = {
  test: TestEnv;
};

export type ActionsPlayers = { type: 'setData'; payload: any };

export type ActionsFP = { type: 'setData'; payload: StatesFP };

export type HandleData = (dataSet: DataSets, data: any) => void;

export type Operations = 'add' | 'subtract';

export type Directions = 'top' | 'left';

export type Limits = 'topLeft' | 'bottomRight';

export type UpdateDataFP = (update: StatesFP) => Promise<void>;

export type HandleMove = (key: Keys) => void;

export type Defaults = {
  dimensions: number;
  timer: number;
  enviroments: Enviroments;
};

export type InitGameDefaults = (admin: string) => CreateGame;

export type InitPlayerDefaults = (user: firebase.User) => CreatePlayer;

export type InitEnvVotes = (envs: EnvList) => EnvVotes;
