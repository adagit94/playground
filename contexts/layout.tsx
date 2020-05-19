import { createContext } from 'react';

import { StatesLayout, DispatchesLayout } from 'types/layout';

export const ContextLayout = createContext<StatesLayout>(null);
export const ContextDispatchesLayout = createContext<DispatchesLayout>(null);

ContextLayout.displayName = 'ContextLayout';
ContextDispatchesLayout.displayName = 'ContextDispatchesLayout';
