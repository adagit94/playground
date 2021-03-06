import styled from 'styled-components';

export const OverlapDisabled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  background-color: ${({ theme }): string =>
    theme.theme === 'dark' ? '#ffffff80' : '#00000080'};
`;
