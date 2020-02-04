import React from 'react';

import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP
} from '../../interfaces/games/floating-point';

import {
  ActionsGame,
  ActionsPlayers,
  ActionsParams,
  ActionsFP
} from '../../types/games/floating-point';

export const ContextGame = React.createContext<StatesGame | null>(null);
export const ContextPlayers = React.createContext<StatesPlayers | null>(null);
export const ContextParams = React.createContext<StatesParams | null>(null);
export const ContextFP = React.createContext<StatesFP | null>(null);
export const ContextDispatchGame = React.createContext<React.Dispatch<
  ActionsGame
> | null>(null);
export const ContextDispatchPlayers = React.createContext<React.Dispatch<
  ActionsPlayers
> | null>(null);
export const ContextDispatchParams = React.createContext<React.Dispatch<
  ActionsParams
> | null>(null);
export const ContextDispatchFP = React.createContext<React.Dispatch<
  ActionsFP
> | null>(null);

ContextGame.displayName = 'ContextGame';
ContextPlayers.displayName = 'ContextPlayers';
ContextParams.displayName = 'ContextParams';
ContextFP.displayName = 'ContextFP';
ContextDispatchGame.displayName = 'ContextDispatchGame';
ContextDispatchPlayers.displayName = 'ContextDispatchPlayers';
ContextDispatchParams.displayName = 'ContextDispatchParams';
ContextDispatchFP.displayName = 'ContextDispatchFP';
