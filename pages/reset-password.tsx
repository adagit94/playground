import React from 'react';
import styled from 'styled-components';

import { FormPage } from '../components/styled-components/forms';
import { ButtonStandard } from '../components/styled-components/buttons';
import { InputForm } from '../components/styled-components/inputs';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: ${(props): string => props.theme.background};
`;

const ResetPassword: React.FC = (): JSX.Element => {
  return (
    <Container>
      <FormPage>
        <Row>
          <label htmlFor='email'>Email: </label>
          <InputForm type='email' name='email' id='email' required />
        </Row>
        <Row>
          <ButtonStandard type='button'>Reset</ButtonStandard>
        </Row>
      </FormPage>
    </Container>
  );
};

export default ResetPassword;
