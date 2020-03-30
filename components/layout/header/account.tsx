/* eslint-disable @typescript-eslint/camelcase */

import Router, { useRouter } from 'next/router';
import React, { useContext, useReducer, useEffect } from 'react';
import styled, { ThemeContext, keyframes } from 'styled-components';
import createAuth0Client from '@auth0/auth0-spa-js';
import $ from 'jquery';

import Profile from './profile';

import auth0Config from '../../../auth0-config.json';
import { Colors } from '../../../types/layout';
import { reducerAuth0 } from '../../../reducers/auth0';
import { initAuth0 } from '../../../inits/auth0';

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
  const [statesAuth0, dispatchAuth0] = useReducer(reducerAuth0, initAuth0);
  const colors: Colors = useContext(ThemeContext);
  const router = useRouter();

  const { auth0, user, isAuthenticated, loading } = statesAuth0;

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
    const onRedirectCallback = (appState): void => {
      Router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    };

    const initAuth0 = async (): Promise<void> => {
      const auth0 = await createAuth0Client(auth0Config);

      dispatchAuth0({ type: 'setAuth0', payload: auth0 });

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const appState = await auth0.handleRedirectCallback();

        onRedirectCallback(appState);
      }
      const isAuthenticated = await auth0.isAuthenticated();

      dispatchAuth0({ type: 'setIsAuthenticated', value: isAuthenticated });

      if (isAuthenticated) {
        const user = await auth0.getUser();

        dispatchAuth0({ type: 'setUser', payload: user });
      }

      dispatchAuth0({ type: 'setLoading', value: false });
    };

    initAuth0().catch(err => console.log(err));
  }, []);

  console.log(auth0);
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
                    redirect_uri: `http://localhost:3000${router.pathname}`
                  });
                }
          }
          type='button'
        >
          {isAuthenticated ? <Avatar /> : 'Log in'}
        </Button>
      )}

      {isAuthenticated && !loading && (
        <Slider style={{ display: 'none' }} id='slider'>
          <Profile
            clientID={auth0Config.client_id}
            name={user && user.name}
            logout={(): void => auth0.logout()}
          />
        </Slider>
      )}
    </Container>
  );
};

export default Account;
