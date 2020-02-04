import React from 'react';

export const ContextContent = React.createContext<JSX.Element | null>(null);

ContextContent.displayName = 'ContextContent';
