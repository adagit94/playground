import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  grid-area: foo;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #000000;

`;

const Footer = () => {
  return (
    <Container>
      <Square>abc</Square>
    </Container>
  );
};

export default Footer;
