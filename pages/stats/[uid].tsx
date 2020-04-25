import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { DividerHorizontal } from '../../components/styled-components/dividers';
import LoadingIndicator from '../../components/styled-components/loading-indicator';

import { Colors } from '../../types/layout';
import { ContextFirebase } from '../../contexts/firebase';
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
  width: 150px;

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const StatsGames = styled.div`
  display: flex;
  flex-direction: row;
`;

const StatsGame = styled.div`
  width: 150px;

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
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
  const colors: Colors = useContext(ThemeContext);
  const statesFirebase = useContext(ContextFirebase);
  const statesUser = useContext(ContextUser);

  const { user } = statesFirebase;
  const { lastPlayed } = statesUser;
  const { wins, gatheredPoints } = statesUser.games.floatingPoint;

  return (
    <Container>
      <StatsWindow>
        <StatsGeneral>
          <ul>
            <li>
              <span>Last played:</span>
              {user ? (
                lastPlayed
              ) : (
                <LoadingIndicator color={colors.background} />
              )}
            </li>
          </ul>
        </StatsGeneral>
        <Divider />
        <StatsGames>
          <StatsGame>
            <HeadingGame>Floating Point</HeadingGame>
            <ul>
              <li>
                <span>Wins:</span>
                {user ? wins : <LoadingIndicator color={colors.background} />}
              </li>
              <li>
                <span>Gathered points:</span>
                {user ? (
                  gatheredPoints
                ) : (
                  <LoadingIndicator color={colors.background} />
                )}
              </li>
            </ul>
          </StatsGame>
        </StatsGames>
      </StatsWindow>
    </Container>
  );
};

export default Stats;
