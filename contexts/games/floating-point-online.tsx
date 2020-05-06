import React from 'react';

import {
  StatesGame,
  StatesPlayers,
  StatesFP
} from '../../types/games/floating-point-online';

export const ContextGame = React.createContext<StatesGame>(null);
export const ContextPlayers = React.createContext<StatesPlayers>(null);
export const ContextFP = React.createContext<StatesFP>(null);

ContextGame.displayName = 'ContextGame';
ContextPlayers.displayName = 'ContextPlayers';
ContextFP.displayName = 'ContextFP';
