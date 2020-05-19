/* eslint-disable @typescript-eslint/camelcase */
import { useContext, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import $ from 'jquery';

import LogIn from './log-in';
import Profile from './profile';

import LoadingIndicator from 'components/styled-components/loading-indicator';

import { Theming, PropsAvatar } from 'types/layout';
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

const Avatar: React.FC<PropsAvatar> = ({ user, theme }): JSX.Element => {
  const avatar = user.photoURL;
  const avatarPlaceholder = `${window.location.origin}/icons/account-${theme}.svg`;

  const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-image: url(${avatar ? avatar : avatarPlaceholder});
    background-size: contain;
  `;

  return <Avatar />;
};

const Account: React.FC = (): JSX.Element => {
  const theming: Theming = useContext(ThemeContext);
  const statesFirebase = useContext(ContextFirebase);

  const { user, isAuthenticated, loading } = statesFirebase;

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
      {loading && <LoadingIndicator color={theming.background} />}

      {!loading && (
        <Button onClick={toggleSlider} type='button'>
          {isAuthenticated && <Avatar user={user} theme={theming.theme} />}

          {!isAuthenticated && 'Log in'}
        </Button>
      )}

      <Slider style={{ display: 'none' }} id='slider'>
        {isAuthenticated && <Profile />}

        {!isAuthenticated && <LogIn />}
      </Slider>
    </Container>
  );
};

export default memo(Account);
