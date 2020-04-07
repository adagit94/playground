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
import { ContextDispatchesLayout } from '../../contexts/layout';
import { ContextUser } from '../../contexts/user';
import { ContextFirebase } from '../../contexts/firebase';

let firebaseApp;

const dispatchesLayout: DispatchesLayout = {
  layout: undefined,
  user: undefined,
  firebase: undefined
};

const Layout: React.FC<PropsLayout> = ({ content }) => {
  const router = useRouter();
  const [statesLayout, dispatchLayout] = useReducer(reducerLayout, initLayout);
  const [statesUser, dispatchUser] = useReducer(reducerUser, initUser);
  const [statesFirebase, dispatchFirebase] = useReducer(
    reducerFirebase,
    initFirebase
  );

  const pathname = router.pathname;
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
    dispatchesLayout.firebase = dispatchFirebase;
  }, []);

  useEffect(() => {
    const loggedIn = (user): void => {
      dispatchFirebase({ type: 'setUser', payload: user });
    };

    const loggedOut = (): void => {
      dispatchFirebase({ type: 'reset' });
    };

    if (!firebaseApp) firebaseApp = initFirebaseApp();

    initAuthObserver(loggedIn, loggedOut);
  }, []);

  /*
  var displayName = user.displayName;
  var email = user.email;
  var emailVerified = user.emailVerified;
  var photoURL = user.photoURL;
  var isAnonymous = user.isAnonymous;
  var uid = user.uid;
  var providerData = user.providerData;
  */

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
