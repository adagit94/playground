import styled, { keyframes, Keyframes } from 'styled-components';

import {
  LoadingIndicatorProps,
  LoadingIndicatorFragmentsProps
} from 'types/styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 25px;
  height: 12.5px;
`;

const LoadingFragment1 = styled.div<LoadingIndicatorFragmentsProps>`
  flex: auto;
  animation-name: ${({ animation }): Keyframes => animation};
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

const LoadingIndicatorFragments: React.FC<LoadingIndicatorFragmentsProps> = ({
  animation
}): JSX.Element => {
  return (
    <>
      <LoadingFragment1 animation={animation} />
      <LoadingFragment2 animation={animation} />
      <LoadingFragment3 animation={animation} />
      <LoadingFragment4 animation={animation} />
    </>
  );
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  color
}): JSX.Element => {
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

  return (
    <LoadingContainer>
      <LoadingIndicatorFragments animation={pulsing} />
    </LoadingContainer>
  );
};

export default LoadingIndicator;
