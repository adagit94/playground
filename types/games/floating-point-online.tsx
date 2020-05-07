type DataSetsList = 'game' | 'players' | 'fp';

type Keys = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';

export type PlayerFP = {
  username: string;
  avatar: string;
  top: number;
  left: number;
  score: number;
  isReady: boolean;
};

export type UpdatePlayerFP = {
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
};

export type StatesGame = {
  state: string;
  width: number;
  height: number;
};

export type UpdateGameFP = {
  state?: string;
};

export type StatesPlayers = { [uid: string]: PlayerFP };

export type StatesFP = {
  top: number;
  left: number;
};

export type ActionsGame =
  | {
      type: 'changeDimensions';
      width: number;
      height: number;
    }
  | { type: 'setData'; payload: any };

export type ActionsPlayers = { type: 'setData'; payload: any };

export type ActionsFP = { type: 'setData'; payload: object };

export type HandleData = (dataSet: DataSetsList, data: any) => void;

export type Operations = 'add' | 'subtract';

export type Directions = 'top' | 'left';

export type Limits = 'topLeft' | 'bottomRight';

export type Position = { top?: number; left?: number };

export type GetDataFP = (
  dataSet: DataSetsList
) => Promise<StatesGame | StatesPlayers | StatesFP>;

export type UpdateDataFP = (update: StatesFP) => Promise<void>;

export type HandleMove = (key: Keys) => void;
