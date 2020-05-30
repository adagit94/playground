import { useContext, useEffect, useState, Fragment } from 'react';
import styled, { ThemeContext } from 'styled-components';

import LoadingIndicator from 'components/styled-components/loading-indicator';
import { paddingContainer } from 'components/styled-components/_variables';
import {
  DividerHorizontal,
  DividerVertical
} from 'components/styled-components/dividers';

import {
  WindowStats,
  WindowStatsUser,
  WindowStatsGames,
  WindowStatsGame
} from 'components/styled-components/windows';

import { keyEditReg, dateExtractReg } from 'regs/db';
import { keyReplacer } from 'helpers/regs';
import { convertPlayedTime } from 'helpers/stats';
import { Theming } from 'types/layout';
import { GamesList } from 'types/games/generic';
import { ContextUser } from 'contexts/user';

const Container = styled.div`
  height: 100%;
  padding: ${paddingContainer};
`;

const HeadingGame = styled.h3`
  margin: 0;
`;

const Stats: React.FC = (): JSX.Element => {
  const [userStats, setUserStats] = useState([]);
  const [gamesStats, setGamesStats] = useState([]);

  const theming: Theming = useContext(ThemeContext);
  const statesUser = useContext(ContextUser);

  const { background } = theming;

  const Stats = styled(WindowStats)`
    justify-content: ${userStats.length === 0 ? 'center' : 'start'};
    align-items: ${userStats.length === 0 ? 'center' : 'flex-start'};
  `;

  useEffect(() => {
    const initStats = (): void => {
      let userStatsArr: [string, string][] = [];
      let gamesStatsArr: [GamesList, [string, string | number][]][] = [];

      for (const stat in statesUser) {
        if (stat === 'games') continue;

        const editedStatName = stat.replace(keyEditReg, keyReplacer);

        if (stat === 'lastPlayed' || stat === 'mostPlayed') {
          const editedGameName = statesUser[stat].replace(
            keyEditReg,
            keyReplacer
          );

          userStatsArr.push([editedStatName, editedGameName]);
        } else if (stat === 'registred') {
          const extractedDate = dateExtractReg.exec(statesUser[stat])[0];

          userStatsArr.push([editedStatName, extractedDate]);
        } else {
          userStatsArr.push([editedStatName, statesUser[stat]]);
        }
      }

      for (const game in statesUser.games) {
        const editedGameName = game.replace(
          keyEditReg,
          keyReplacer
        ) as GamesList;

        let gameStatsArr: [GamesList, [string, string | number][]] = [
          editedGameName,
          []
        ];

        for (const gameStat in statesUser.games[game]) {
          const editedGameStatName = gameStat.replace(keyEditReg, keyReplacer);

          if (gameStat === 'playedTime') {
            let playedTime = statesUser.games[game][gameStat];

            if (playedTime > 0) playedTime = convertPlayedTime(playedTime);

            gameStatsArr[1].push([editedGameStatName, playedTime]);
          } else {
            gameStatsArr[1].push([
              editedGameStatName,
              statesUser.games[game][gameStat]
            ]);
          }
        }

        gamesStatsArr.push(gameStatsArr);
      }

      setUserStats(userStatsArr);
      setGamesStats(gamesStatsArr);
    };

    if (
      statesUser !== undefined &&
      userStats.length === 0 &&
      gamesStats.length === 0
    ) {
      initStats();
    }
  });

  //console.log(stats);

  return (
    <Container>
      <Stats>
        {userStats.length === 0 && <LoadingIndicator color={background} />}

        {userStats.length !== 0 && (
          <>
            <WindowStatsUser>
              <ul>
                {userStats.map((stat, i, arr) => {
                  const [name, value] = stat;

                  return (
                    <Fragment key={name}>
                      <li key={name}>
                        <span>{name}: </span>
                        <span>{value}</span>
                      </li>

                      {i < arr.length - 1 && (
                        <DividerVertical color='background' />
                      )}
                    </Fragment>
                  );
                })}
              </ul>
            </WindowStatsUser>

            <DividerHorizontal color='background' />

            <WindowStatsGames>
              {gamesStats.map((game, i, arr) => {
                const [name, stats] = game;

                return (
                  <Fragment key={name}>
                    <WindowStatsGame key={name}>
                      <HeadingGame>{name}</HeadingGame>
                      <ul key={name}>
                        {stats.map(stat => {
                          const [name, value] = stat;

                          return (
                            <li key={name}>
                              <span>{name}: </span>
                              <span>{value}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </WindowStatsGame>

                    {i < arr.length - 1 && (
                      <DividerVertical color='background' />
                    )}
                  </Fragment>
                );
              })}
            </WindowStatsGames>
          </>
        )}
      </Stats>
    </Container>
  );
};

export default Stats;
