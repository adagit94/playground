import Link from 'next/link';
import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

const rotateX = keyframes`
  from {
    transform: rotateX(0deg);
  }

  to {
    transform: rotateX(180deg);
  }
`;

const rotateY = keyframes`
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(180deg);
  }
`;

const rotateZ = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(180deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
`;

const ContainerCircles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  color: ${({ theme }): string => theme.inverted};
  animation-name: ${rotateZ};
  animation-duration: 2.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const ContainerCirclesCenter = styled.div`
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  color: ${({ theme }): string => theme.background};
  background-color: ${({ theme }): string => theme.inverted};
  animation-name: ${rotateZ};
  animation-duration: 2.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const CircleX = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px solid;
  border-radius: 100%;
  animation-name: ${rotateX};
  animation-duration: 2.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const CircleY = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px solid;
  border-radius: 100%;
  animation-name: ${rotateY};
  animation-duration: 2.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const Logo: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Link href='/'>
        <a>
          <ContainerCircles>
            <CircleX />
            <CircleY />
            <ContainerCirclesCenter>
              <CircleX />
              <CircleY />
            </ContainerCirclesCenter>
          </ContainerCircles>
        </a>
      </Link>
    </Container>
  );
};

export default memo(Logo);
