import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import $ from 'jquery';

import { Colors } from '../../../types/layout';
import { ContextDispatchesLayout } from '../../../contexts/layout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 20px;
  margin: 10px;
  border: 1px solid;
`;

const ThemeButton: React.FC = (): JSX.Element => {
  const colors: Colors = useContext(ThemeContext);
  const dispatches = useContext(ContextDispatchesLayout);

  const toggleTheme = (): void => {
    $('#theme-button').animate(
      { top: colors.theme === 'dark' ? 0 : '50%' },
      200,
      (): void => {
        sessionStorage.setItem(
          'theme',
          colors.theme === 'dark' ? 'light' : 'dark'
        );

        dispatches.layout({ type: 'changeTheme' });
      }
    );
  };

  const Button = styled.input`
    position: absolute;
    top: ${colors.theme === 'dark' ? '50%' : 0};
    width: 100%;
    height: 50%;
    border: none;
    background-color: ${(props): string => props.theme.inverted};

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  `;

  return (
    <Container>
      <Button onClick={toggleTheme} type='button' id='theme-button' />
    </Container>
  );
};

export default React.memo(ThemeButton);
