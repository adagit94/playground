import React, { useReducer, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header/header';
import Main from './main';

import { reducerLayout } from '../../reducers/layout';
import { reducerUser } from '../../reducers/user';
import { reducerAuth0 } from '../../reducers/auth0';
import { initLayout } from '../../inits/layout';
import { initUser } from '../../inits/user';
import { initAuth0 } from '../../inits/auth0';
import { DispatchesLayout, PropsLayout, Colors } from '../../types/layout';
import { ContextDispatchesLayout } from '../../contexts/layout';
import { ContextUser } from '../../contexts/user';
import { ContextAuth0 } from '../../contexts/auth0';

const dispatchesLayout: DispatchesLayout = {
  layout: undefined,
  user: undefined,
  auth0: undefined
};

const Layout: React.FC<PropsLayout> = ({ content }) => {
  const [statesLayout, dispatchLayout] = useReducer(reducerLayout, initLayout);
  const [statesUser, dispatchUser] = useReducer(reducerUser, initUser);
  const [statesAuth0, dispatchAuth0] = useReducer(reducerAuth0, initAuth0);

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
    dispatchesLayout.layout = dispatchLayout;
    dispatchesLayout.user = dispatchUser;
    dispatchesLayout.auth0 = dispatchAuth0;
  }, []);

  return (
    <Container>
      <ThemeProvider theme={colors}>
        <ContextDispatchesLayout.Provider value={dispatchesLayout}>
          <ContextUser.Provider value={statesUser}>
            <ContextAuth0.Provider value={statesAuth0}>
              <Header />
              <Main content={content} />
            </ContextAuth0.Provider>
          </ContextUser.Provider>
        </ContextDispatchesLayout.Provider>
      </ThemeProvider>
    </Container>
  );
};

export default Layout;
