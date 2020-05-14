import { createContext } from 'react';

import {
  StatesGame,
  StatesPlayers,
  StatesParams,
  StatesFP,
  DispatchesFP
} from '../../types/games/floating-point-offline';

export const ContextGame = createContext<StatesGame>(null);
export const ContextPlayers = createContext<StatesPlayers>(null);
export const ContextParams = createContext<StatesParams>(null);
export const ContextFP = createContext<StatesFP>(null);
export const ContextDispatchesFP = createContext<DispatchesFP>(null);

ContextGame.displayName = 'ContextGame';
ContextPlayers.displayName = 'ContextPlayers';
ContextParams.displayName = 'ContextParams';
ContextFP.displayName = 'ContextFP';
ContextDispatchesFP.displayName = 'ContextDispatchesFP';
