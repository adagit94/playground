import { memo } from 'react';
import styled from 'styled-components';

import Logo from './logo';
import Nav from './nav';
import ThemeButton from './theme-button';
import Account from './account';

const Container = styled.header`
  flex: none;
  display: flex;
  flex-direction: row;
  height: 75px;
  border-bottom: 2px solid;
`;

const PillarDivider: React.FC = (): JSX.Element => {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 20px;
    margin: 5px 0;
  `;

  const PillarDividerLeft = styled.div`
    width: 5px;
    border: 2px solid ${(props): string => props.theme.inverted};
    border-left: none;
    border-radius: 0 15px 15px 0;
  `;

  const PillarDividerRight = styled.div`
    width: 5px;
    border: 2px solid ${(props): string => props.theme.inverted};
    border-right: none;
    border-radius: 15px 0 0 15px;
  `;

  return (
    <Container>
      <PillarDividerLeft />
      <PillarDividerRight />
    </Container>
  );
};

const Header: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Logo />
      <PillarDivider />
      <Nav />
      <ThemeButton />
      <Account />
    </Container>
  );
};

export default memo(Header);
