import React from 'react';

export const ContextGame = React.createContext(null);
export const ContextParams = React.createContext(null);
export const ContextDispatchGame = React.createContext(null);
export const ContextDispatchParams = React.createContext(null);

ContextGame.displayName = 'ContextGame';
ContextParams.displayName = 'ContextParams';
ContextDispatchGame.displayName = 'ContextDispatchGame';
ContextDispatchParams.displayName = 'ContextDispatchParams';
