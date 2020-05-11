import { useRouter } from 'next/router';
import React, { useReducer, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header/header';
import Main from './main';

import { initFirebaseApp } from '../../firebase/init-firebase';
import { initAuthObserver } from '../../firebase/auth';
import { reducerLayout } from '../../reducers/layout';
import { reducerUser } from '../../reducers/user';
import { reducerFirebase } from '../../reducers/firebase';
import { initLayout } from '../../inits/layout';
import { initUser } from '../../inits/user';
import { initFirebase } from '../../inits/firebase';
import { DispatchesLayout, PropsLayout, Colors } from '../../types/layout';
import { InitUser, ClearUser } from '../../types/auth';
import { ContextDispatchesLayout } from '../../contexts/layout';
import { ContextUser } from '../../contexts/user';
import { ContextFirebase } from '../../contexts/firebase';

const dispatchesLayout: DispatchesLayout = {
  layout: undefined,
  user: undefined,
  firebase: undefined
};

const Layout: React.FC<PropsLayout> = ({ content }): JSX.Element => {
  const router = useRouter();
  const [statesLayout, dispatchLayout] = useReducer(reducerLayout, initLayout);
  const [statesUser, dispatchUser] = useReducer(reducerUser, initUser);
  const [statesFirebase, dispatchFirebase] = useReducer(
    reducerFirebase,
    initFirebase
  );

  const { pathname, query } = router;
  const { theme } = statesLayout;

  const { uid: queryUID } = query;

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

  if (queryUID) {
    const sessionUID = sessionStorage.getItem('uid');

    if (queryUID !== sessionUID) {
      window.location.assign(window.location.origin);
    }
  }

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
    dispatchesLayout.firebase = dispatchFirebase;
  }, []);

  useEffect(() => {
    const initUser: InitUser = (userFirebase, userDB) => {
      dispatchFirebase({ type: 'initUser', payload: userFirebase });
      dispatchUser({ type: 'initUser', payload: userDB });
    };

    const clearUser: ClearUser = () => {
      dispatchFirebase({ type: 'reset' });
      dispatchUser({ type: 'reset' });
    };

    initFirebaseApp();
    initAuthObserver(initUser, clearUser);
  }, []);

  console.log(statesFirebase.user);

  return (
    <Container>
      <ThemeProvider theme={colors}>
        <ContextDispatchesLayout.Provider value={dispatchesLayout}>
          <ContextUser.Provider value={statesUser}>
            <ContextFirebase.Provider value={statesFirebase}>
              {pathname !== '/create-account' &&
                pathname !== '/reset-password' && <Header />}
              <Main content={content} />
            </ContextFirebase.Provider>
          </ContextUser.Provider>
        </ContextDispatchesLayout.Provider>
      </ThemeProvider>
    </Container>
  );
};

export default Layout;
//console.log(statesGame.state); border: 1px solid red;
