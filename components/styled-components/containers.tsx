import styled from 'styled-components';

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContainerRowCenter = styled(ContainerRow)`
  justify-content: center;
  align-items: center;
`;

export const ContainerRowBetween = styled(ContainerRow)`
  justify-content: space-between;
  align-items: center;
`;

export const ContainerRowBetweenWrap = styled(ContainerRowBetween)`
  flex-wrap: wrap;
`;

export const ContainerRowAround = styled(ContainerRow)`
  justify-content: space-around;
  align-items: center;
`;

export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerColumnCenter = styled(ContainerColumn)`
  justify-content: center;
  align-items: center;
`;

export const ContainerColumnBetween = styled(ContainerColumn)`
  justify-content: space-between;
  align-items: center;
`;

export const ContainerColumnAround = styled(ContainerColumn)`
  justify-content: space-around;
  align-items: center;
`;

export const ContainerOptions = styled(ContainerRow)`
  flex: auto;
  position: relative;
  padding: 10px;
`;

export const ContainerOption = styled(ContainerColumnAround)`
  flex: auto;
`;
