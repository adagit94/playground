import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
`;

const Square = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid;
  transform: rotateZ(45deg);
`;

const Circle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  border: 1px solid;
  border-radius: 100%;
  background-color: ${(props): string => props.theme.inverted};
  transform: rotateZ(-45deg);
`;

const LineVertical = styled.div`
  position: absolute;
  width: 1px;
  height: 68px;
  background-color: ${(props): string => props.theme.inverted};
`;

const LineHorizontal = styled.div`
  position: absolute;
  width: 68px;
  height: 1px;
  background-color: ${(props): string => props.theme.inverted};
`;

const Logo: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Square>
        <Circle>
          <LineVertical />
          <LineHorizontal />
        </Circle>
      </Square>
    </Container>
  );
};

export default Logo;
