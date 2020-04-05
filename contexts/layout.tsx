import React from 'react';

import { StatesLayout, DispatchesLayout } from '../types/layout';

export const ContextLayout = React.createContext<StatesLayout>(null);
export const ContextDispatchesLayout = React.createContext<DispatchesLayout>(
  null
);

ContextLayout.displayName = 'ContextLayout';
ContextDispatchesLayout.displayName = 'ContextDispatchesLayout';
