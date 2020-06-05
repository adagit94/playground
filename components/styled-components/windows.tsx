import styled from 'styled-components';

import {
  paddingContainer,
  borderRadiusWindow,
  widthStatsItem,
  heightStatsItem
} from './_variables';

export const WindowStats = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${paddingContainer};
  border-radius: ${borderRadiusWindow};
  color: ${({ theme }): string => theme.background};
  background-color: ${({ theme }): string => theme.inverted};
`;

export const WindowStatsUser = styled.div`
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
    height: 100%;

    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: ${heightStatsItem};
      width: ${widthStatsItem};
      margin: 0 5px;
    }
  }
`;

export const WindowStatsGames = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const WindowStatsGame = styled.div`
  width: ${widthStatsItem};
  margin: 0 5px;

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: ${heightStatsItem};
    }
  }
`;

export const WindowEval = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: ${({ theme }): string => theme.background};
  background-color: ${({ theme }): string => theme.inverted};
`;

export const WindowEvalResults = styled.div`
  font-size: 1.5rem;
`;

export const WindowEvalResultsTie = styled.div`
  color: #ff0000;
`;
