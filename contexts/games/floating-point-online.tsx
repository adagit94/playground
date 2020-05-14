import { createContext } from 'react';

import {
  StatesGame,
  StatesPlayers,
  StatesFP
} from '../../types/games/floating-point-online';

export const ContextGame = createContext<StatesGame>(null);
export const ContextPlayers = createContext<StatesPlayers>(null);
export const ContextFP = createContext<StatesFP>(null);

ContextGame.displayName = 'ContextGame';
ContextPlayers.displayName = 'ContextPlayers';
ContextFP.displayName = 'ContextFP';
