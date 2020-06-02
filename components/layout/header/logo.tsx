import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
`;

const Square = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid ${(props): string => props.theme.inverted};
  transform: rotateZ(45deg);
  transition-property: border-color, background-color, width, height;
  transition-duration: 0.1s;
  transition-timing-function: linear;

  &:hover {
    transition-delay: 0.1s;
    border-color: ${(props): string => props.theme.background};
    background-color: ${(props): string => props.theme.inverted};
    background-clip: content-box;

    #circle {
      transition-delay: 0.1s;
      width: 25px;
      height: 25px;
      background-color: ${(props): string => props.theme.background};
    }

    #lineVertical {
      height: 0;
      background-color: ${(props): string => props.theme.background};
    }

    #lineHorizontal {
      width: 0;
      background-color: ${(props): string => props.theme.background};
    }
  }
`;

const Rotator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: rotateZ(-45deg);
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  z-index: 1;
  background-color: ${(props): string => props.theme.inverted};
  transition-property: background-color, width, height;
  transition-duration: 0.1s;
  transition-timing-function: linear;
`;

const LineVertical = styled.div`
  position: absolute;
  width: 2px;
  height: 68px;
  background-color: ${(props): string => props.theme.inverted};
  transition-property: height, background-color, transform;
  transition-duration: 0.1s;
  transition-timing-function: linear;
`;

const LineHorizontal = styled.div`
  position: absolute;
  width: 68px;
  height: 2px;
  background-color: ${(props): string => props.theme.inverted};
  transition-property: width, background-color, transform;
  transition-duration: 0.1s;
  transition-timing-function: linear;
`;

const Logo: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Link href='/'>
        <a>
          <Square>
            <Rotator>
              <Circle id='circle' />
              <LineVertical id='lineVertical' />
              <LineHorizontal id='lineHorizontal' />
            </Rotator>
          </Square>
        </a>
      </Link>
    </Container>
  );
};

export default memo(Logo);
