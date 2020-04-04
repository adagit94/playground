import React from 'react';

import { StatesLayout, Dispatches } from '../types/layout';

export const ContextLayout = React.createContext<StatesLayout>(null);
export const ContextDispatches = React.createContext<Dispatches>(null);

ContextLayout.displayName = 'ContextLayout';
ContextDispatches.displayName = 'ContextDispatches';
