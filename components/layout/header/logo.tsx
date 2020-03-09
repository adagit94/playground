import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
