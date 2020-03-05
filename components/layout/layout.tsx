import React, { useReducer } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header/header';
import Main from './main';

import { ContainerColumn } from '../styled-components/containers';

import { reducerLayout } from '../../reducers/layout';
import { initLayout } from '../../inits/layout';
import { PropsLayout, Colors } from '../../types/layout';
import { ContextDispatchLayout } from '../../contexts/layout';

const Layout: React.FC<PropsLayout> = ({ content }): JSX.Element => {
  const [statesLayout, dispatchLayout] = useReducer(reducerLayout, initLayout);

  const theme = statesLayout.theme;

  const colors: Colors = {
    theme,
    background: theme === 'dark' ? '#000000' : '#ffffff',
    inverted: theme === 'dark' ? '#ffffff' : '#000000'
  };

  const Container = styled(ContainerColumn)`
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

  return (
    <Container>
      <ThemeProvider theme={colors}>
        <ContextDispatchLayout.Provider value={dispatchLayout}>
          <Header />
        </ContextDispatchLayout.Provider>
        <Main content={content} />
      </ThemeProvider>
    </Container>
  );
};

export default React.memo(Layout);
