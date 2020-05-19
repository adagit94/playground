import { useState } from 'react';
import styled from 'styled-components';

import {
  FormInput,
  FormButton,
  FormContainer,
  Form,
  FormRowVertical
} from 'components/styled-components/forms';

import { resetPassword } from '../firebase/auth';

const FormFullHeight = styled(Form)`
  height: 100%;
`;

const ResetPassword: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');

  return (
    <FormContainer>
      <FormFullHeight
        onSubmit={(e): void => {
          e.preventDefault();

          resetPassword(email);
        }}
      >
        <FormRowVertical>
          <label htmlFor='email'>Email: </label>
          <FormInput
            onChange={(e): void => {
              setEmail(e.target.value);
            }}
            value={email}
            type='email'
            name='email'
            id='email'
            required
          />
        </FormRowVertical>
        <FormRowVertical>
          <FormButton type='submit'>Reset</FormButton>
        </FormRowVertical>
      </FormFullHeight>
    </FormContainer>
  );
};

export default ResetPassword;
