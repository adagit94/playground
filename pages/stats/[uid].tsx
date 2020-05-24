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

import { statEditReg, statDateExtractReg } from 'regs/stats';
import { statReplacer, convertPlayedTime } from 'helpers/stats';
import { Theming } from 'types/layout';
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

  useEffect(() => {
    const initStats = (): void => {
      const userStatsArr: any[] = [];
      const gamesStatsArr: any[] = [];

      for (const stat in statesUser) {
        if (stat === 'games') continue;

        const editedStatName = stat.replace(statEditReg, statReplacer);

        if (stat === 'lastPlayed' || stat === 'mostPlayed') {
          const editedGameName = statesUser[stat].replace(
            statEditReg,
            statReplacer
          );

          userStatsArr.push([editedStatName, editedGameName]);
        } else if (stat === 'registred') {
          const extractedDate = statDateExtractReg.exec(statesUser[stat])[0];

          userStatsArr.push([editedStatName, extractedDate]);
        } else {
          userStatsArr.push([editedStatName, statesUser[stat]]);
        }
      }

      for (const game in statesUser.games) {
        const editedGameName = game.replace(statEditReg, statReplacer);
        const gameStatsArr: [string, any[]] = [editedGameName, []];

        for (const gameStat in statesUser.games[game]) {
          const editedGameStatName = gameStat.replace(
            statEditReg,
            statReplacer
          );

          if (gameStat === 'playedTime') {
            let playedTime = statesUser.games[game][gameStat];

            if (playedTime > 0) {
              playedTime = convertPlayedTime(playedTime);
            }

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
      <WindowStats>
        {userStats.length === 0 && <LoadingIndicator color={background} />}

        {userStats.length !== 0 && (
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
        )}

        <DividerHorizontal color='background' />

        {gamesStats.length === 0 && <LoadingIndicator color={background} />}

        {gamesStats.length !== 0 && (
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

                  {i < arr.length - 1 && <DividerVertical color='background' />}
                </Fragment>
              );
            })}
          </WindowStatsGames>
        )}
      </WindowStats>
    </Container>
  );
};

export default Stats;
