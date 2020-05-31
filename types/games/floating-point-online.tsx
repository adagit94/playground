type DataSets = 'game' | 'players' | 'fp';

type GameStates = 'conf' | 'init' | 'run' | 'eval' | 'reset';

type Shapes = 'Rectangle' | 'Circle';

type ShapeValues = {
  size: [number, number];
  positions: [number, number];
};

type TestEnv = [
  { shape: 'Rectangle'; shapes: ShapeValues[] },
  { shape: 'Circle'; shapes: ShapeValues[] }
];

type LabyrinthI = [{ shape: 'Rectangle'; shapes: ShapeValues[] }];

export type EnvObjects = {
  shape: Shapes;
  shapes: ShapeValues[];
}[];

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

export type UpdatePlayer = {
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
  winner: Winner;
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

export type StatesFP = Position;

export type ActionsGame =
  | {
      type: 'changeDimensions';
      width: number;
      height: number;
    }
  | { type: 'setData'; payload: StatesGameDB };

export type Winner = { name: string; score: number };

export type EnvNames = 'test' | 'labyrinthI';

export type EnvList = ['test', 'labyrinthI'];

export type EnvVotes = { test: number };

export type Envs = TestEnv | LabyrinthI;

export type Enviroments = {
  test: TestEnv;
  labyrinthI: LabyrinthI;
};

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
  enviroments: Enviroments;
};

export type ControlKeys = {
  ArrowUp: Key;
  ArrowRight: Key;
  ArrowDown: Key;
  ArrowLeft: Key;
};

export type InitGameDefaults = (admin: string) => CreateGame;

export type InitPlayerDefaults = (user: firebase.User) => CreatePlayer;

export type InitEnvVotes = () => EnvVotes;

export type CheckOverlap = (pointTop: number, pointLeft: number) => boolean;
