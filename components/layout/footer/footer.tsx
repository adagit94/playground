import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid;
`;

const Footer: React.FC = (): JSX.Element => {
  return <Container>abc</Container>;
};

export default React.memo(Footer);
