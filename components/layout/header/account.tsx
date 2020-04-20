/* eslint-disable @typescript-eslint/camelcase */
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
  const colors: Colors = useContext(ThemeContext);
  const statesUser = useContext(ContextUser);
  const statesFirebase = useContext(ContextFirebase);
  const dispatches = useContext(ContextDispatchesLayout);

  const { user, isAuthenticated, loading } = statesFirebase;

  const avatar = user && user.photoURL;
  const avatarPlaceholder = `icons/account-${colors.theme}.svg`;

  const initUser = (): StatesUser => ({
    username: user.name,
    wins: 0,
    gatheredPoints: 0
  });

  const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-image: url(${avatar ? avatar : avatarPlaceholder});
  `;

  const Slider = styled.div`
    position: absolute;
    top: 75px;
    right: 0;
    width: ${isAuthenticated ? 150 : 300}px;
    height: ${isAuthenticated ? 150 : 300}px;
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

  return (
    <Container>
      {loading ? (
        LoadingIndicator
      ) : (
        <Button onClick={toggleSlider} type='button'>
          {isAuthenticated ? <Avatar /> : 'Log in'}
        </Button>
      )}

      <Slider style={{ display: 'none' }} id='slider'>
        {isAuthenticated ? <Profile /> : <LogIn />}
      </Slider>
    </Container>
  );
};

export default React.memo(Account);
