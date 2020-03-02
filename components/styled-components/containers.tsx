import styled from 'styled-components';

export const ContainerRowCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContainerRowBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-between;
`;

export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContainerButton = styled.div`
  border: 1px solid blue;
  height: 100%;
  flex: auto;
  text-align: center;
`;

export const ContainerOptions = styled.div`
  flex: auto;
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 10px;
`;

export const ContainerOption = styled(ContainerColumnCenter)`
  flex: auto;
`;
