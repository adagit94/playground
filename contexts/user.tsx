import React from 'react';

import { StatesUser } from '../types/user';

export const ContextUser = React.createContext<StatesUser>(null);

ContextUser.displayName = 'ContextUser';
