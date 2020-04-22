import React, { useContext } from 'react';
import styled from 'styled-components';

import { DividerHorizontal } from '../../components/styled-components/dividers';

import { ContextUser } from '../../contexts/user';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

const StatsWindow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

const StatsGeneral = styled.div`
  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
    }
  }
`;

const StatsGames = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StatsGame = styled.div`
  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
    }
  }
`;

const HeadingGame = styled.h3`
  margin: 0;
`;

const Divider = styled(DividerHorizontal)`
  background-color: ${(props): string => props.theme.background};
`;

const Stats: React.FC = (): JSX.Element => {
  const statesUser = useContext(ContextUser);

  const { lastPlayed } = statesUser;
  const { wins, gatheredPoints } = statesUser.games.floatingPoint;

  return (
    <Container>
      <StatsWindow>
        <StatsGeneral>
          <ul>
            <li>Last played: {lastPlayed}</li>
          </ul>
        </StatsGeneral>
        <Divider />
        <StatsGames>
          <StatsGame>
            <HeadingGame>Floating Point</HeadingGame>
            <ul>
              <li>Wins: {wins}</li>
              <li>Gathered points: {gatheredPoints}</li>
            </ul>
          </StatsGame>
        </StatsGames>
      </StatsWindow>
    </Container>
  );
};

export default Stats;
