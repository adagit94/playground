import styled, { keyframes } from 'styled-components';

const LoadingIndicator = ({
  color,
  width,
  height
}: {
  color: string;
  width?: number;
  height?: number;
}): JSX.Element => {
  const LoadingContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: ${width ? width : 25}px;
    height: ${height ? height : 12.5}px;
  `;

  const pulsing = keyframes`
    0% {
      background-color: unset;
    } 

    50% {
      background-color: ${color};
    }

    100% {
      background-color: unset;    
    }
    `;

  const LoadingFragment1 = styled.div`
    flex: auto;
    animation-name: ${pulsing};
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  `;

  const LoadingFragment2 = styled(LoadingFragment1)`
    animation-delay: 0.2s;
  `;

  const LoadingFragment3 = styled(LoadingFragment1)`
    animation-delay: 0.4s;
  `;

  const LoadingFragment4 = styled(LoadingFragment1)`
    animation-delay: 0.6s;
  `;

  return (
    <LoadingContainer>
      <LoadingFragment1 />
      <LoadingFragment2 />
      <LoadingFragment3 />
      <LoadingFragment4 />
    </LoadingContainer>
  );
};

export default LoadingIndicator;
