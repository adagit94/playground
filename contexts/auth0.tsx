import { createContext } from 'react';

import { StatesAuth0 } from '../types/auth0';

export const ContextAuth0 = createContext<StatesAuth0>(null);

ContextAuth0.displayName = 'ContextAuth0';
