import { useContext, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import $ from 'jquery';

import { Theming } from 'types/layout';
import { ContextDispatchesLayout } from 'contexts/layout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 20px;
  margin: 5px 10px;
  border: 2px solid;
  border-radius: 5px;
`;

const Button = styled.input`
  position: absolute;
  top: ${({ theme }): number => (theme.theme === 'dark' ? 50 : 0)}%;
  width: 100%;
  height: 50%;
  border: none;
  background-color: ${({ theme }): string => theme.inverted};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const ThemeButton: React.FC = (): JSX.Element => {
  const theming: Theming = useContext(ThemeContext);
  const dispatches = useContext(ContextDispatchesLayout);

  const toggleTheme = (): void => {
    $('#theme-button').animate(
      { top: theming.theme === 'dark' ? 0 : '50%' },
      200,
      (): void => {
        sessionStorage.setItem(
          'theme',
          theming.theme === 'dark' ? 'light' : 'dark'
        );

        dispatches.layout({ type: 'changeTheme' });
      }
    );
  };

  return (
    <Container>
      <Button onClick={toggleTheme} type='button' id='theme-button' />
    </Container>
  );
};

export default memo(ThemeButton);
