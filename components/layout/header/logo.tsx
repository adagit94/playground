import React from 'react';
import styled from 'styled-components';

import { ContainerColumnCenter } from '../../styled-components/containers';

const Container = styled(ContainerColumnCenter)`
  width: 150px;
`;

const Logo: React.FC = (): JSX.Element => {
  return (
    <Container>
      <img src='' alt='' />
      abc
    </Container>
  );
};

export default Logo;
