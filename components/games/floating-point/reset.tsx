import React, { useContext } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 5 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.input`
  border: none;
  width: 80px;
  height: 50px;
`;

const Reset = (): JSX.Element => {
  const dispatchGame = useContext(ContextDispatchGame);
  const callbacks = useContext(ContextCallbacks);

  return (
    <Container>
      <Button onClick={callbacks.handleReset} value='Reset' type='button' />
    </Container>
  );
};

export default React.memo(Button);
