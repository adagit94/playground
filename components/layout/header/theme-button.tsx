import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import $ from 'jquery';

import { ContainerColumn } from '../../styled-components/containers';

import { ContextDispatchLayout } from '../../../contexts/layout';

const Container = styled(ContainerColumn)`
  position: relative;
  width: 25px;
  margin: 10px;
  border-top: 2px solid;
  border-bottom: 2px solid;
  border-radius: 5px;
`;

const ThemeButton: React.FC = (): JSX.Element => {
  const dispatch = useContext(ContextDispatchLayout);
  const colors: any = useContext(ThemeContext);

  const toggleTheme = (): void => {
    $('#theme-button').animate(
      { [colors.theme === 'dark' ? 'top' : 'bottom']: '0' },
      250,
      (): void => dispatch({ type: 'changeTheme' })
    );
  };

  const Button = styled.input`
    position: absolute;
    top: ${colors.theme === 'dark' ? 'auto' : 0};
    bottom: ${colors.theme === 'dark' ? '0' : 'auto'};
    width: 100%;
    height: 25px;
    border: none;
    border-radius: 100%;
    background-color: ${(props): string => props.theme.inverted};
  `;

  return (
    <Container>
      <Button onClick={toggleTheme} type='button' id='theme-button' />
    </Container>
  );
};

export default React.memo(ThemeButton);
