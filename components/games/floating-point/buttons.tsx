import React from 'react';
import styled from 'styled-components';

import { ContainerRowCenter } from '../../styled-components/containers';

const Container = styled(ContainerRowCenter)`
  height: 50px;
  padding: 10px;
`;

const Buttons: React.FC<{ children: Array<JSX.Element> | JSX.Element }> = ({
  children
}): JSX.Element => {
  return <Container>{children}</Container>;
};

export default React.memo(Buttons);
