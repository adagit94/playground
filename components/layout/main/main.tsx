import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  /*height: 75px;*/
`;

const Main: React.FC = ({ content }): JSX.Element => {
  return <Container>{content}</Container>;
};

export default React.memo(Main);
