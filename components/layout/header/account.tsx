/* eslint-disable @typescript-eslint/camelcase */
import { useContext, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import $ from 'jquery';

import LogIn from './log-in';
import Profile from './profile';

import Avatar from 'components/styled-components/avatar';
import LoadingIndicator from 'components/styled-components/loading-indicator';

import { Theming } from 'types/layout';
import { SliderProps } from 'types/styled-components';
import { ContextFirebase } from 'contexts/firebase';

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
  background-color: ${({ theme }): string => theme.inverted};
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
  color: ${({ theme }): string => theme.background};
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

const Slider = styled.div<SliderProps>`
  position: absolute;
  top: 75px;
  right: 0;
  width: ${({ isAuthenticated }): number => (isAuthenticated ? 150 : 300)}px;
  height: ${({ isAuthenticated }): number => (isAuthenticated ? 150 : 300)}px;
  z-index: 1;
  background-color: ${(props): string => props.theme.inverted};
`;

const Account: React.FC = (): JSX.Element => {
  const theming: Theming = useContext(ThemeContext);
  const statesFirebase = useContext(ContextFirebase);

  const { user, isAuthenticated, loading } = statesFirebase;

  const HiddenSlider = styled(Slider)`
    display: none;
  `;

  return (
    <Container>
      {loading && <LoadingIndicator color={theming.background} />}

      {!loading && (
        <Button onClick={toggleSlider} type='button'>
          {isAuthenticated && (
            <Avatar width={50} height={50} avatar={user.photoURL} />
          )}

          {!isAuthenticated && 'Log in'}
        </Button>
      )}

      <HiddenSlider isAuthenticated={isAuthenticated} id='slider'>
        {isAuthenticated && <Profile />}

        {!isAuthenticated && <LogIn />}
      </HiddenSlider>
    </Container>
  );
};

export default memo(Account);
