import React from 'react';

import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP,
  DispatchesFP
} from '../../types/games/floating-point-offline';

export const ContextGame = React.createContext<StatesGame>(null);
export const ContextPlayers = React.createContext<StatesPlayers>(null);
export const ContextParams = React.createContext<StatesParams>(null);
export const ContextFP = React.createContext<StatesFP>(null);
export const ContextDispatchesFP = React.createContext<DispatchesFP>(null);

ContextGame.displayName = 'ContextGame';
ContextPlayers.displayName = 'ContextPlayers';
ContextParams.displayName = 'ContextParams';
ContextFP.displayName = 'ContextFP';
ContextDispatchesFP.displayName = 'ContextDispatchesFP';
