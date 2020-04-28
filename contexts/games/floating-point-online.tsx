import React from 'react';

import {
  StatesGame,
  StatesPlayers,
  StatesFP,
  DispatchesFP
} from '../../types/games/floating-point-online';

export const ContextGame = React.createContext<StatesGame>(null);
export const ContextPlayers = React.createContext<StatesPlayers>(null);
export const ContextFP = React.createContext<StatesFP>(null);
export const ContextDispatchesFP = React.createContext<DispatchesFP>(null);

ContextGame.displayName = 'ContextGame';
ContextPlayers.displayName = 'ContextPlayers';
ContextFP.displayName = 'ContextFP';
ContextDispatchesFP.displayName = 'ContextDispatchesFP';
