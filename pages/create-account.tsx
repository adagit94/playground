import { useState } from 'react';
import styled from 'styled-components';

import {
  FormInput,
  FormButton,
  FormContainer,
  Form,
  FormRowVertical,
  FormContainerWindow,
  FormWindowValidation,
  FormWindowError
} from '../components/styled-components/forms';

import { createUser, validator } from '../firebase/auth';

const CreateAccount: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [markedInvalid, setMarkedInvalid] = useState(false);

  const {
    validPassword,
    equalPasswords,
    count,
    upper,
    num,
    special
  } = validator(password, passwordConfirm);

  const ValidationWindow = styled(FormWindowValidation)`
    visibility: ${password ? 'visible' : 'hidden'};
  `;

  const Count = styled.li`
    color: ${count === true ? '#00ff00' : '#ff0000'};
  `;

  const Upper = styled.li`
    color: ${upper === true ? '#00ff00' : '#ff0000'};
  `;

  const Num = styled.li`
    color: ${num === true ? '#00ff00' : '#ff0000'};
  `;

  const Special = styled.li`
    color: ${special === true ? '#00ff00' : '#ff0000'};
  `;

  const LabelPassword = styled.label`
    color: ${markedInvalid && !validPassword && '#ff0000'};
  `;

  const LabelPasswordConfirm = styled.label`
    color: ${markedInvalid && !equalPasswords && '#ff0000'};
  `;

  return (
    <FormContainer>
      <FormContainerWindow>
        <ValidationWindow>
          Password must contain at least:
          <ul>
            <Count>8 characters</Count>
            <Upper>One uppercase letter</Upper>
            <Num>One number</Num>
            <Special>One special character</Special>
          </ul>
        </ValidationWindow>
      </FormContainerWindow>
      <Form
        onSubmit={(e): void => {
          e.preventDefault();

          if (validPassword && equalPasswords) {
            createUser(email, password);
          } else {
            setMarkedInvalid(true);
          }
        }}
      >
        <FormRowVertical>
          <label htmlFor='email'>Email: </label>
          <FormInput
            onChange={(e): void => {
              setEmail(e.target.value);
            }}
            value={email}
            name='email'
            id='email'
            type='email'
            required
          />
        </FormRowVertical>
        <FormRowVertical>
          <LabelPassword htmlFor='password'>Password: </LabelPassword>
          <FormInput
            onChange={(e): void => {
              setPassword(e.target.value);
            }}
            value={password}
            name='password'
            id='password'
            type='password'
            minLength='8'
            required
          />
        </FormRowVertical>
        <FormRowVertical>
          <LabelPasswordConfirm htmlFor='password-confirm'>
            Confirm password:
          </LabelPasswordConfirm>
          <FormInput
            onChange={(e): void => {
              setPasswordConfirm(e.target.value);
            }}
            value={passwordConfirm}
            name='password-confirm'
            id='password-confirm'
            type='password'
            minLength='8'
            required
          />
        </FormRowVertical>
        <FormRowVertical>
          <FormButton type='submit'>Create account</FormButton>
        </FormRowVertical>
      </Form>
      <FormContainerWindow>
        <FormWindowError id='errWindow' />
      </FormContainerWindow>
    </FormContainer>
  );
};

export default CreateAccount;
