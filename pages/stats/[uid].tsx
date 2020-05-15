import { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import LoadingIndicator from '../../components/styled-components/loading-indicator';
import { DividerHorizontal } from '../../components/styled-components/dividers';
import {
  WindowStats,
  WindowStatsItems,
  WindowStatsItem
} from '../../components/styled-components/windows';

import { statReg, statReplacer } from '../../helpers/regs';
import { Theming } from '../../types/layout';
import { ContextFirebase } from '../../contexts/firebase';
import { ContextUser } from '../../contexts/user';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

const HeadingGame = styled.h3`
  margin: 0;
`;

const Stats: React.FC = (): JSX.Element => {
  const [stats, setStats] = useState(null);

  const theming: Theming = useContext(ThemeContext);
  const statesFirebase = useContext(ContextFirebase);
  const statesUser = useContext(ContextUser);

  const { background } = theming;
  const { user } = statesFirebase;

  useEffect(() => {
    const initStats = (): void => {
      const statsArr = [];

      for (const stat in statesUser) {
        if (statesUser[stat] === 'games') {
          for (const game in statesUser[stat]) {
            for (const statGame in statesUser[stat][game]) {
              const editedStat = statGame.replace(statReg, statReplacer);
            }
          }
          const editedStat = stat.replace(statReg, statReplacer);
        }

        statsArr.push([editedProp, stats[prop]]);
      }
      setStats(statsArr);
    };
  }, [statesUser]);

  return (
    <Container>
      <WindowStats>
        <WindowStatsItem>
          <ul>
            <li>
              <span>Last played:</span>
              <span>
                {user && lastPlayed}

                {!user && <LoadingIndicator color={background} />}
              </span>
            </li>
          </ul>
        </WindowStatsItem>
        <DividerHorizontal />
        <WindowStatsItems>
          <WindowStatsItem>
            <HeadingGame>Floating Point</HeadingGame>
            <ul>
              <li>
                <span>Wins:</span>
                <span>
                  {user && wins}

                  {!user && <LoadingIndicator color={background} />}
                </span>
              </li>
              <li>
                <span>Gathered points:</span>
                <span>
                  {user && gatheredPoints}

                  {!user && <LoadingIndicator color={background} />}
                </span>
              </li>
            </ul>
          </WindowStatsItem>
        </WindowStatsItems>
      </WindowStats>
    </Container>
  );
};

export default Stats;
