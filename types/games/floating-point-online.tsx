import { Themes } from 'types/layout';
import { EnvObjectStyles } from 'types/styled-components';

type DataSets = 'game' | 'players' | 'fp';

type GameStates = 'conf' | 'init' | 'run' | 'eval' | 'reset';

export type AnimationName =
  | 'translateToCenterVertical'
  | 'rotate360'
  | 'translateCenterUp'
  | 'translateCenterRight'
  | 'translateCenterBottom'
  | 'translateCenterLeft'
  | 'fadeBackground';

export type EnvObjectName =
  | 'Rectangle'
  | 'Circle'
  | 'Triangle'
  | 'CircleTunnel';

export type EnvObjectsList = {
  object: EnvObjectName;
  styles: EnvObjectStyles;
  positions: [number, number][];
}[];

export type PositionPlayer = { top: number; left: number };

export type Key = {
  pressed: boolean;
  operation: 'add' | 'subtract';
  direction: 'top' | 'left';
  limit: 'top' | 'right' | 'bottom' | 'left';
};

export type Player = {
  username: string;
  avatar: string;
  selectedEnv: EnvName;
  top: number;
  left: number;
  score: number;
  isReady: boolean;
};

export type PlayerUpdate = {
  username?: string;
  avatar?: string;
  selectedEnv?: EnvName;
  top?: number;
  left?: number;
  score?: number;
  isReady?: boolean;
};

export type FPUpdate = {
  top: number;
  left: number;
  autoMove?: boolean;
};

export type PropsOptionsCommon = {
  highlightEnvOptions: boolean;
};

export type PropsOptionsPlayer = {
  player: string;
  highlightUnready: boolean;
  dispatchControlPanel?: React.Dispatch<ActionsControlPanel>;
};

export type PropsEnvOptions = {
  highlightEnvOptions: boolean;
};

export type PropsEnv = {
  env: EnvName;
};

export type StatesGameDB = {
  state: GameStates;
  admin: string;
  env: EnvName;
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
  env?: EnvName;
  envVotes?: EnvVotes;
  winner?: Results;
  timer?: number;
  timestampStart?: number;
  timestampEnd?: number;
};

export type StatesGame = {
  state: GameStates;
  admin: string;
  env: EnvName;
  envVotes: EnvVotes;
  winner: Results;
  timer: number;
  timestampStart: number;
  timestampEnd: number;
  width: number;
  height: number;
};

export type StatesPlayers = { [uid: string]: Player };

export type StatesFP = {
  top: number;
  left: number;
  autoMove: boolean;
};

export type StatesControlPanel = {
  highlightUnready: boolean;
  highlightEnvOptions: boolean;
};

export type ActionsGame =
  | {
      type: 'changeDimensions';
      width: number;
      height: number;
    }
  | { type: 'setData'; payload: StatesGameDB };

export type ActionsPlayers = { type: 'setData'; payload: StatesPlayers };

export type ActionsFP = { type: 'setData'; payload: StatesFP };

export type ActionsControlPanel =
  | { type: 'setHighlightUnready'; value: boolean }
  | { type: 'setHighlightEnvOptions'; value: boolean }
  | { type: 'reset' };

export type PlayerResultData = { name: string; score: number };

export type PlayerResultsData = PlayerResultData[];

export type Results = PlayerResultData | PlayerResultsData;

export type EnvName = 'testI' | 'testII';

export type EnvList = ['testI', 'testII'];

export type EnvVotes = { test: number };

export type HandleData = (
  dataSet: DataSets,
  data: StatesGameDB | StatesPlayers | StatesFP
) => void;

export type UpdateDataFP = (update: FPUpdate) => Promise<void>;

export type Defaults = {
  size: number;
  timer: number;
  enviroments: { testI: EnvObjectsList; testII: EnvObjectsList };
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
