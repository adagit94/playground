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

const Disabled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #00000080;
`;

const Play = (): JSX.Element => {
  const statesGame = useContext(ContextGame);

  return (
    <Container>
      <Button onClick={() => props.data.handlePlay()} value={statesGame.isPaused || !statesGame.isRunning ? 'Play' : 'Pause'} type='button' />
    </Container>
  );
};


export default React.memo(Play);
