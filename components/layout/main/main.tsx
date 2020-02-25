import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  flex: auto;
`;

const Main: React.FC<{ content: JSX.Element }> = ({ content }): JSX.Element => {
  return <Container>{content}</Container>;
};

export default React.memo(Main);
