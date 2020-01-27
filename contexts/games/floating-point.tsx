import React from 'react';

export const ContextGame = React.createContext(null);
export const ContextPlayers = React.createContext(null);
export const ContextParams = React.createContext(null);
export const ContextFP = React.createContext(null);
export const ContextGlobals = React.createContext(null);
export const ContextDispatchGame = React.createContext(null);
export const ContextDispatchPlayers = React.createContext(null);
export const ContextDispatchParams = React.createContext(null);
export const ContextDispatchFP = React.createContext(null);

ContextGame.displayName = 'ContextGame';
ContextPlayers.displayName = 'ContextPlayers';
ContextParams.displayName = 'ContextParams';
ContextFP.displayName = 'ContextFP';
ContextGlobals.displayName = 'ContextGlobals';
ContextDispatchGame.displayName = 'ContextDispatchGame';
ContextDispatchPlayers.displayName = 'ContextDispatchPlayers';
ContextDispatchParams.displayName = 'ContextDispatchParams';
ContextDispatchFP.displayName = 'ContextDispatchFP';
