type DataSetsList = 'game' | 'players' | 'fp';

type UpdateActionsList = 'move' | 'changePos' | 'changeReady' | 'addScore';

type Keys = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';

export type Player = {
  username: string;
  avatar: string;
  top: number;
  left: number;
  score: number;
  isReady: boolean;
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

export type StatesPlayers = { [uid: string]: Player };

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

export type Limits = 'top' | 'right' | 'bottom' | 'left';

export type Position = { top: number; left: number };

export type Move = { operation: Operations; direction: Directions };

export type UpdateDataPlayer = (
  player: string,
  action: UpdateActionsList,
  conf?: Move | Position
) => Promise<void>;

export type GetData = (
  dataSet: DataSetsList
) => Promise<StatesGame | StatesPlayers | StatesFP>;

export type UpdateDataFP = (update: StatesFP) => Promise<void>;

export type CreateDataPlayer = (user: firebase.User) => Promise<void>;

export type HandleMove = (key: Keys) => void;
