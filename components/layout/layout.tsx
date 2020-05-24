import { useRouter } from 'next/router';
import { useReducer, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header/header';
import Main from './main';

import { initFirebaseApp } from 'firebase/init-firebase';
import { initAuthObserver } from '../../firebase/auth';
import { initUserDB, removeListenerUser } from 'firebase/db';
import { reducerLayout } from 'reducers/layout';
import { reducerUser } from 'reducers/user';
import { reducerFirebase } from 'reducers/firebase';
import { initLayout } from 'inits/layout';
import { initUser } from 'inits/user';
import { initFirebase } from 'inits/firebase';
import { ContextDispatchesLayout } from 'contexts/layout';
import { ContextUser } from 'contexts/user';
import { ContextFirebase } from 'contexts/firebase';
import { DispatchesLayout, PropsLayout, Theming } from 'types/layout';
import { InitUserFirebase, ClearUserFirebase } from 'types/auth';
import { HandleData } from 'types/user';

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
  const { user } = statesFirebase;
  const { theme } = statesLayout;

  const { uid: queryUID } = query;

  const theming: Theming = {
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
    color: ${theming.inverted};
    background-color: ${theming.background};

    * {
      box-sizing: border-box;
    }
  `;

  if (queryUID !== undefined) {
    const sessionUID = sessionStorage.getItem('uid');

    if (queryUID !== sessionUID) {
      window.location.assign(window.location.origin);
    }
  }

  useEffect(() => {
    const theme = sessionStorage.getItem('theme');

    if (theme !== null && theme !== statesLayout.theme) {
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
    const initUserFirebase: InitUserFirebase = user => {
      dispatchFirebase({ type: 'initUser', payload: user });
    };

    const clearUserFirebase: ClearUserFirebase = () => {
      dispatchFirebase({ type: 'reset' });
    };

    initFirebaseApp();
    initAuthObserver(initUserFirebase, clearUserFirebase);
  }, []);

  useEffect(() => {
    const handleData: HandleData = data => {
      dispatchUser({ type: 'setData', payload: data });
    };

    if (user !== undefined && statesUser === undefined) {
      initUserDB(user, handleData);
    }

    /*
    return (): void => {
      removeListenerUser(uid);
    };
    */
  });

  return (
    <Container>
      <ThemeProvider theme={theming}>
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
// border: 1px solid red;
