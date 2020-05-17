import styled from 'styled-components';

export const WindowStats = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

export const WindowStatsUser = styled.div`
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;

    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 150px;
      margin: 0 5px;
    }
  }
`;

export const WindowStatsGames = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
`;

export const WindowStatsGame = styled.div`
  width: 150px;
  margin: 0 5px;

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;
