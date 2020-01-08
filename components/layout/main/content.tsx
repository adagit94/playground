import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  
`;

const Content = props => {
  return (
    <Container>
      {props.content}
    </Container>
  );
};

export default Content;
