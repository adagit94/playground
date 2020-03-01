import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const Buttons: React.FC<{children: Array<JSX.Element>}> = ({children}): JSX.Element => {
  return <Container>{children}</Container>;
};

export default React.memo(Buttons);
