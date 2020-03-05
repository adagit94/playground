import React from 'react';

import { StatesLayout, ActionsLayout } from '../types/layout';

export const ContextLayout = React.createContext<StatesLayout>(null);
export const ContextDispatchLayout = React.createContext<
  React.Dispatch<ActionsLayout>
>(null);

ContextLayout.displayName = 'ContextLayout';
ContextDispatchLayout.displayName = 'ContextDispatchLayout';
