/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import $ from 'jquery';

import LogIn from './log-in';
import Profile from './profile';
import LoadingIndicator from '../../styled-components/loading-indicator';

import { Colors } from '../../../types/layout';
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
  const colors: Colors = useContext(ThemeContext);
  const statesFirebase = useContext(ContextFirebase);

  const { user, isAuthenticated, loading } = statesFirebase;

  const avatar = user && user.photoURL;
  const avatarPlaceholder = `icons/account-${colors.theme}.svg`;

  const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-image: url(${avatar ? avatar : avatarPlaceholder});
    background-size: contain;
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
        <LoadingIndicator color={colors.background} />
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
