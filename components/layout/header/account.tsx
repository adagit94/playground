/* eslint-disable @typescript-eslint/camelcase */

import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import styled, { ThemeContext, keyframes } from 'styled-components';
import $ from 'jquery';

import LogIn from './log-in';
import Profile from './profile';

import { Colors } from '../../../types/layout';
import { StatesUser } from '../../../types/user';
import { ContextDispatchesLayout } from '../../../contexts/layout';
import { ContextUser } from '../../../contexts/user';
import { ContextFirebase } from '../../../contexts/firebase';

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
  const StatesFirebase = useContext(ContextFirebase);
  const dispatches = useContext(ContextDispatchesLayout);

  const { user, isAuthenticated, loading } = StatesFirebase;

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

  const Slider = styled.div`
    position: absolute;
    top: 75px;
    right: 0;
    width: ${isAuthenticated ? 150 : 300}px;
    height: ${isAuthenticated ? 150 : 300}px;
    z-index: 1;
    background-color: ${(props): string => props.theme.inverted};
  `;

  /*
  useEffect(() => {
    const initFirebase = async (): Promise<void> => {
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

    initFirebase().catch(err => console.error(err));
  }, []);
  */

  console.log(StatesFirebase.user);
  return (
    <Container>
      {loading && LoadingIndicator}

      {!loading && (
        <Button onClick={toggleSlider} type='button'>
          {isAuthenticated ? <Avatar /> : 'Log in'}
        </Button>
      )}

      <Slider style={{ display: 'none' }} id='slider'>
        {isAuthenticated && <Profile />}

        {!isAuthenticated && <LogIn />}
      </Slider>
    </Container>
  );
};

export default React.memo(Account);
