import React from 'react';

import { StatesAuth0 } from '../types/auth0';

export const ContextStatesAuth0 = React.createContext<StatesAuth0>(null);
export const ContextFunctionsAuth0 = React.createContext<{
  [key: string]: Function;
}>(null);

ContextStatesAuth0.displayName = 'ContextStatesAuth0';
ContextFunctionsAuth0.displayName = 'ContextFunctionsAuth0';
