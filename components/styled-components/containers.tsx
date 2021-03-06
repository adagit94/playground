import styled from 'styled-components';

import { paddingContainer } from './_variables';

export const ContainerOptions = styled.div`
  flex: auto;
  display: flex;
  flex-direction: row;
  position: relative;
  padding: ${paddingContainer};
  font-size: 1.1rem;
`;

export const ContainerOption = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
