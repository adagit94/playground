import React from 'react';

import { ActionsUser } from '../types/user';

export const ContextDispatchUser = React.createContext<
  React.Dispatch<ActionsUser>
>(null);

ContextDispatchUser.displayName = 'ContextDispatchUser';
