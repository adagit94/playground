import { createContext } from 'react';

import { StatesFirebase } from '../types/firebase';

export const ContextFirebase = createContext<StatesFirebase>(null);

ContextFirebase.displayName = 'ContextFirebase';
