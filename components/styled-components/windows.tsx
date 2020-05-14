import styled from 'styled-components';

export const WindowStats = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

export const WindowStatsItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const WindowStatsItem = styled.div`
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
