/* eslint-disable @typescript-eslint/camelcase */
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import styled from 'styled-components';
import $ from 'jquery';

import LogIn from './log-in';
import Profile from './profile';
import { LoadingIndicator } from '../../../components/styled-components/loading-indicator';

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

const Account: React.FC = () => {
  const router = useRouter();
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

  const Slider = styled.div`
    position: absolute;
    top: 75px;
    right: 0;
    width: ${isAuthenticated ? 150 : 300}px;
    height: ${isAuthenticated ? 150 : 300}px;
    z-index: 1;
    background-color: ${(props): string => props.theme.inverted};
  `;

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
