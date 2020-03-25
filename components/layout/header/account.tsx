import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import styled, { ThemeContext, keyframes } from 'styled-components';
import $ from 'jquery';

import Profile from './profile';

import { Colors } from '../../../types/layout';
import { ContextAuth0 } from '../../../contexts/auth0';

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
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
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

const Account: React.FC = (): JSX.Element => {
  const auth0 = useContext(ContextAuth0);
  const colors: Colors = useContext(ThemeContext);
  const router = useRouter();

  const statesAuth0 = auth0.statesAuth0;
  const isAuthenticated = statesAuth0.isAuthenticated;

  const Slider = styled.div`
    position: absolute;
    top: 75px;
    right: 0;
    width: ${isAuthenticated ? 150 : 300}px;
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

  return (
    <Container>
      {statesAuth0.loading ? (
        LoadingIndicator
      ) : (
        <Button
          onClick={
            isAuthenticated
              ? toggleSlider
              : async (): Promise<void> => {
                  await auth0.loginWithRedirect({
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    redirect_uri: `http://localhost:3000${router.pathname}`
                  });
                }
          }
          type='button'
        >
          {isAuthenticated ? statesAuth0.user.name : 'Log in'}
        </Button>
      )}
      {isAuthenticated && (
        <Slider style={{ display: 'none' }} id='slider'>
          <Profile />
        </Slider>
      )}
    </Container>
  );
};

export default Account;
