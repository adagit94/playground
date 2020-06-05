import { useRouter } from 'next/router';
import { useReducer, useEffect, useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header/header';
import Main from './main';

import { initFirebaseApp } from 'firebase/init-firebase';
import { initAuthObserver } from '../../firebase/auth';
import { reducerLayout } from 'reducers/layout';
import { reducerFirebase } from 'reducers/firebase';
import { initLayout } from 'inits/layout';
import { initFirebase } from 'inits/firebase';
import { ContextDispatchesLayout } from 'contexts/layout';
import { ContextFirebase } from 'contexts/firebase';
import { DispatchesLayout, PropsLayout, Theming, Themes } from 'types/layout';
import { InitUserFirebase, ClearUserFirebase } from 'types/auth';
import { LayoutContainerProps } from 'types/styled-components';

const Container = styled.div<LayoutContainerProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: ${({ color }): string => color};
  background-color: ${({ backgroundColor }): string => backgroundColor};

  * {
    box-sizing: border-box;
  }
`;

const Layout: React.FC<PropsLayout> = ({ content }): JSX.Element => {
  const router = useRouter();

  const [statesLayout, dispatchLayout] = useReducer(reducerLayout, initLayout);
  const [statesFirebase, dispatchFirebase] = useReducer(
    reducerFirebase,
    initFirebase
  );

  const dispatchesLayout: DispatchesLayout = useMemo(
    () => ({
      layout: dispatchLayout,
      firebase: dispatchFirebase
    }),
    [dispatchLayout, dispatchFirebase]
  );

  const { pathname, query } = router;
  const { theme } = statesLayout;

  const { uid: queryUID } = query;

  const theming: Theming = {
    theme,
    background: theme === 'dark' ? '#000000' : '#ffffff',
    inverted: theme === 'dark' ? '#ffffff' : '#000000'
  };

  if (queryUID !== undefined) {
    const sessionUID = sessionStorage.getItem('uid');

    if (queryUID !== sessionUID) {
      window.location.assign(window.location.origin);
    }
  }

  useEffect(() => {
    const theme = sessionStorage.getItem('theme') as Themes;

    if (theme !== null && theme !== statesLayout.theme) {
      dispatchLayout({
        type: 'changeTheme',
        theme
      });
    }
  });

  useEffect(() => {
    const initUserFirebase: InitUserFirebase = user => {
      dispatchFirebase({ type: 'initUser', payload: user });
    };

    const clearUserFirebase: ClearUserFirebase = () => {
      dispatchFirebase({ type: 'reset' });
    };

    initFirebaseApp();
    initAuthObserver(initUserFirebase, clearUserFirebase);
  }, []);

  return (
    <Container color={theming.inverted} backgroundColor={theming.background}>
      <ThemeProvider theme={theming}>
        <ContextDispatchesLayout.Provider value={dispatchesLayout}>
          <ContextFirebase.Provider value={statesFirebase}>
            {pathname !== '/create-account' &&
              pathname !== '/reset-password' && <Header />}
            <Main content={content} />
          </ContextFirebase.Provider>
        </ContextDispatchesLayout.Provider>
      </ThemeProvider>
    </Container>
  );
};

export default Layout;
// border: 2px solid red;
