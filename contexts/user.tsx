import { createContext } from 'react';

import { StatesUser } from 'types/user';

export const ContextUser = createContext<StatesUser>(null);

ContextUser.displayName = 'ContextUser';
