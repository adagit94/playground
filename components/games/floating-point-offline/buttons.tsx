import { memo } from 'react';
import styled from 'styled-components';

import { paddingContainer } from 'components/styled-components/_variables';

import { PropsButtons } from 'types/games/floating-point-offline';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: ${paddingContainer};
`;

const Buttons: React.FC<PropsButtons> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default memo(Buttons);
