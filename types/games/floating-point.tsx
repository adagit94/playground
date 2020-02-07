import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP,
  ControlKeys2P,
  ControlKeys3P,
  ControlKeys4P
} from '../../interfaces/games/floating-point';

export type Inits = StatesGame | StatesPlayers | StatesParams | StatesFP;

export type ActionsGame =
  | {
      type: 'changeState';
      state: string;
    }
  | { type: 'calculateDimensions'; width: number; height: number }
  | { type: 'logPlayer'; operation: string; pos: string };

export type ActionsPlayers =
  | {
      type: 'init';
      topP1P2: number;
      leftP2: number;
      leftP3P4: number;
      topP4: number;
    }
  | { type: 'recalculatePos'; player: string; top: number; left: number }
  | { type: 'move'; player: string; direction: string; operation: string }
  | { type: 'addScore'; player: string };

export type ActionsParams =
  | { type: 'reset' }
  | {
      type: 'changeShape';
      player: string;
      operation: string;
      shape?: string;
    }
  | {
      type: 'changeColor';
      player: string;
      color: string;
    }
  | { type: 'changeDimensions'; dimensions: number }
  | { type: 'changeSpeed'; speed: number };

export type ActionsFP = { type: 'move'; top: number; left: number };

export type ControlKeys = ControlKeys2P | ControlKeys3P | ControlKeys4P;
