import { Themes } from 'types/layout';
import { ShapeStyles } from 'types/styled-components';

type DataSets = 'game' | 'players' | 'fp';

type GameStates = 'conf' | 'init' | 'run' | 'eval' | 'reset';

export type AnimationNames =
  | 'translateToCenterVertical'
  | 'rotate360'
  | 'translateCenterUp'
  | 'translateCenterRight'
  | 'translateCenterBottom'
  | 'translateCenterLeft';

export type ShapeNames =
  | 'Rectangle'
  | 'Circle'
  | 'Triangle'
  | 'TriangularSquare';

export type EnvObjects = {
  shape: ShapeNames;
  styles: ShapeStyles;
  positions: [number, number][];
}[];

export type Position = { top: number; left: number };

export type Key = {
  pressed: boolean;
  operation: 'add' | 'subtract';
  direction: 'top' | 'left';
  limit: 'top' | 'right' | 'bottom' | 'left';
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

export type PropsOptionsCommon = {
  highlightEnvOptions: boolean;
};

export type PropsOptionsPlayer = {
  player: string;
  highlightUnready: boolean;
  setHighlightUnready?: React.Dispatch<React.SetStateAction<boolean>>;
  setHighlightEnvOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PropsEnvOptions = {
  highlightEnvOptions: boolean;
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

export type GetAvatarPlaceholder = (theme: Themes) => string;
