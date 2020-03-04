import React from 'react';

import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP,
  Dispatches
} from '../../types/games/floating-point';

export const ContextGame = React.createContext<StatesGame>(null);
export const ContextPlayers = React.createContext<StatesPlayers>(null);
export const ContextParams = React.createContext<StatesParams>(null);
export const ContextFP = React.createContext<StatesFP>(null);
export const ContextDispatches = React.createContext<Dispatches>(null);

ContextGame.displayName = 'ContextGame';
ContextPlayers.displayName = 'ContextPlayers';
ContextParams.displayName = 'ContextParams';
ContextFP.displayName = 'ContextFP';
ContextDispatches.displayName = 'ContextDispatches';
