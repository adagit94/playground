import React, { useReducer, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header/header';
import Main from './main';

import { reducerLayout } from '../../reducers/layout';
import { reducerUser } from '../../reducers/user';
import { initLayout } from '../../inits/layout';
import { initUser } from '../../inits/user';
import { Dispatches, PropsLayout, Colors } from '../../types/layout';
import { ContextDispatches } from '../../contexts/layout';
import { ContextUser } from '../../contexts/user';

const dispatches: Dispatches = {
  layout: undefined,
  user: undefined
};

const Layout: React.FC<PropsLayout> = ({ content }) => {
  const [statesLayout, dispatchLayout] = useReducer(reducerLayout, initLayout);
  const [statesUser, dispatchUser] = useReducer(reducerUser, initUser);

  const theme = statesLayout.theme;
  const colors: Colors = {
    theme,
    background: theme === 'dark' ? '#000000' : '#ffffff',
    inverted: theme === 'dark' ? '#ffffff' : '#000000'
  };

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: ${colors.inverted};
    background-color: ${colors.background};

    * {
      box-sizing: border-box;
    }
  `;

  useEffect(() => {
    const theme = sessionStorage.getItem('theme');

    if (theme && theme !== statesLayout.theme) {
      dispatchLayout({
        type: 'changeTheme',
        theme
      });
    }
  });

  useEffect(() => {
    dispatches.layout = dispatchLayout;
    dispatches.user = dispatchUser;
  }, []);

  return (
    <Container>
      <ThemeProvider theme={colors}>
        <ContextUser.Provider value={statesUser}>
          <ContextDispatches.Provider value={dispatches}>
            <Header />
          </ContextDispatches.Provider>
          <Main content={content} />
        </ContextUser.Provider>
      </ThemeProvider>
    </Container>
  );
};

export default Layout;
