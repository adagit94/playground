import React from 'react';
import styled from 'styled-components';

import { FormStandard } from '../components/styled-components/forms';
import { ButtonSubmit } from '../components/styled-components/buttons';
import { InputForm } from '../components/styled-components/inputs';
import {
  ContainerRowCenter,
  ContainerColumnAround
} from '../components/styled-components/containers';

const Container = styled(ContainerRowCenter)`
  height: 100%;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

const Row = styled(ContainerColumnAround)`
  height: 75px;
`;

const Button = styled(ButtonSubmit)`
  background-color: ${(props): string => props.theme.inverted};

  &:hover {
    border-right-color: ${(props): string => props.theme.inverted};
    border-left-color: ${(props): string => props.theme.inverted};
    color: ${(props): string => props.theme.inverted};
    background-color: ${(props): string => props.theme.background};
  }
`;

const ResetPassword: React.FC = (): JSX.Element => {
  return (
    <Container>
      <FormStandard>
        <Row>
          <label htmlFor='email'>Email: </label>
          <InputForm type='email' name='email' id='email' required />
        </Row>
        <Row>
          <Button value='Reset' type='button' />
        </Row>
      </FormStandard>
    </Container>
  );
};

export default ResetPassword;
