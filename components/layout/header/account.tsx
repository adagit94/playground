/* eslint-disable @typescript-eslint/camelcase */

import Router, { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import styled, { ThemeContext, keyframes } from 'styled-components';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import createAuth0Client from '@auth0/auth0-spa-js';
import $ from 'jquery';

import Profile from './profile';

import firebaseConfig from '../../../firebase-config.json';
import auth0Config from '../../../auth0-config.json';
import { Colors } from '../../../types/layout';
import { StatesUser } from '../../../types/user';
import { ContextDispatchesLayout } from '../../../contexts/layout';
import { ContextUser } from '../../../contexts/user';
import { ContextAuth0 } from '../../../contexts/auth0';

let firebaseApp;

const toggleSlider = (): void => {
  $('#slider').slideToggle(100, 'linear');
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 150px;
  background-color: ${(props): string => props.theme.inverted};
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  color: ${(props): string => props.theme.background};
  background-color: transparent;
  transition-property: font-size;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  &:hover {
    cursor: pointer;
    font-size: 1.3rem;
  }

  &:focus {
    outline: none;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 25px;
  height: 12.5px;
`;

const Account: React.FC = () => {
  const router = useRouter();
  const colors: Colors = useContext(ThemeContext);
  const statesUser = useContext(ContextUser);
  const statesAuth0 = useContext(ContextAuth0);
  const dispatches = useContext(ContextDispatchesLayout);

  const { auth0, user, isAuthenticated, loading } = statesAuth0;

  const redirectURL = `http://localhost:3000${router.pathname}`;
  const initUser = (): StatesUser => ({
    username: user.name,
    wins: 0,
    gatheredPoints: 0
  });

  const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-image: url(${user && user.picture});
  `;

  const Slider = styled.div`
    position: absolute;
    top: 75px;
    right: 0;
    width: 150px;
    height: 150px;
    z-index: 1;
    background-color: ${(props): string => props.theme.inverted};
  `;

  const pulsing = keyframes`
    0% {
      background-color: unset;
    } 

    50% {
      background-color: ${colors.background};
    }

    100% {
      background-color: unset;    
    }
  `;

  const LoadingFragment1 = styled.div`
    flex: auto;
    animation-name: ${pulsing};
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  `;

  const LoadingFragment2 = styled(LoadingFragment1)`
    animation-delay: 0.2s;
  `;

  const LoadingFragment3 = styled(LoadingFragment1)`
    animation-delay: 0.4s;
  `;

  const LoadingFragment4 = styled(LoadingFragment1)`
    animation-delay: 0.6s;
  `;

  const LoadingIndicator = (
    <LoadingContainer>
      <LoadingFragment1 />
      <LoadingFragment2 />
      <LoadingFragment3 />
      <LoadingFragment4 />
    </LoadingContainer>
  );

  useEffect(() => {
    const initAuth0 = async (): Promise<void> => {
      if (!auth0) {
        const auth0 = await createAuth0Client(auth0Config);

        dispatches.auth0({ type: 'setAuth0', payload: auth0 });

        if (
          window.location.search.includes('code=') &&
          window.location.search.includes('state=')
        ) {
          await auth0.handleRedirectCallback();

          Router.push(window.location.pathname);
        }

        const isAuthenticated = await auth0.isAuthenticated();

        dispatches.auth0({
          type: 'setIsAuthenticated',
          value: isAuthenticated
        });

        if (isAuthenticated) {
          const user = await auth0.getUser();

          dispatches.auth0({ type: 'setUser', payload: user });
        }

        dispatches.auth0({ type: 'setLoading', value: false });
      }
    };

    initAuth0().catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const initFirestore = async (): Promise<void> => {
      if (user && !statesUser.username) {
        if (!firebaseApp) firebaseApp = firebase.initializeApp(firebaseConfig);

        const users = firebase.firestore().collection('users');

        const userData = await users
          .doc(user.email)
          .get()
          .then(data => data.data())
          .catch(err => console.error(err));

        if (!userData) {
          users
            .doc(user.email)
            .set(initUser())
            .then(() => console.log('data uploaded'))
            .catch(err => console.error(err));
        }

        dispatches.user({
          type: 'setUser',
          payload: userData || initUser()
        });
      }
    };

    initFirestore().catch(err => console.error(err));
  });

  console.log(statesUser);
  return (
    <Container>
      {loading && LoadingIndicator}

      {!loading && (
        <Button
          onClick={
            isAuthenticated
              ? toggleSlider
              : async (): Promise<void> => {
                  await auth0.loginWithRedirect({
                    redirect_uri: redirectURL
                  });
                }
          }
          type='button'
        >
          {isAuthenticated ? <Avatar /> : 'Log in'}
        </Button>
      )}

      {!loading && isAuthenticated && (
        <Slider style={{ display: 'none' }} id='slider'>
          <Profile
            logout={(): void => {
              auth0.logout({
                returnTo: redirectURL,
                client_id: auth0Config.client_id
              });
            }}
          />
        </Slider>
      )}
    </Container>
  );
};

export default React.memo(Account);
