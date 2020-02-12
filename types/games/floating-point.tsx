import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP,
  ControlKeys2P,
  ControlKeys3P,
  ControlKeys4P,
  ChangePlayer
} from '../../interfaces/games/floating-point';

export type Inits = StatesGame | StatesPlayers | StatesParams | StatesFP;

export type ActionsGame =
  | {
      type: 'changeState';
      state: string;
    }
  | {
      type: 'calculateDimensions';
      width: number;
      height: number;
    }
  | { type: 'changePlayers'; operation: string; pos: string };

export type ActionsPlayers =
  | {
      type: 'init';
      player: string;
      top: number;
      left: number;
    }
  | {
      type: 'recalculatePos';
      player: string;
      top: number;
      left: number;
    }
  | { type: 'move'; player: string; direction: string; operation: string }
  | { type: 'addScore'; player: string }
  | ChangePlayer;

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
  | { type: 'changeSpeed'; speed: number }
  | ChangePlayer;

export type ActionsFP = { type: 'move'; top: number; left: number };

export type ControlKeys = ControlKeys2P | ControlKeys3P | ControlKeys4P;
