import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  FormInput,
  FormButton,
  FormPage,
  FormContainerPage,
  FormRowPage
} from '../components/styled-components/forms';

import { createUser, validator } from '../firebase/auth';

const CreateAccount: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [markedInvalid, setMarkedInvalid] = useState(false);

  const { isValid, equalPasswords, count, upper, num, special } = validator(
    password,
    passwordConfirm
  );

  const ValidationWindow = styled.div`
    visibility: ${password ? 'visible' : 'hidden'};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    margin-bottom: 15px;
    border: 2px solid;
    border-radius: 5px;

    ul {
      padding: 0;
      margin: 0;
    }
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
    color: ${markedInvalid && !isValid && '#ff0000'};
  `;

  const LabelPasswordConfirm = styled.label`
    color: ${markedInvalid && !equalPasswords && '#ff0000'};
  `;

  /*  useEffect(() => {
    if (
      isValid === false &&
      count === true &&
      upper === true &&
      num === true &&
      special === true
    ) {
      setIsValid(true);
    }
  });
  */

  return (
    <FormContainerPage>
      <ValidationWindow>
        Password must contain at least:
        <ul>
          <Count>8 - 30 characters</Count>
          <Upper>One uppercase letter</Upper>
          <Num>One number</Num>
          <Special>One special character</Special>
        </ul>
      </ValidationWindow>
      <FormPage
        onSubmit={(e): void => {
          e.preventDefault();

          if (isValid && equalPasswords) {
            createUser(email, password);
          } else {
            setMarkedInvalid(true);
          }
        }}
      >
        <FormRowPage>
          <label htmlFor='email'>Email: </label>
          <FormInput
            onChange={(e): void => {
              setEmail(e.target.value);
            }}
            type='email'
            name='email'
            id='email'
          />
        </FormRowPage>
        <FormRowPage>
          <LabelPassword htmlFor='password'>Password: </LabelPassword>
          <FormInput
            onChange={(e): void => {
              setPassword(e.target.value);
            }}
            value={password}
            type='password'
            name='password'
            id='password'
          />
        </FormRowPage>
        <FormRowPage>
          <LabelPasswordConfirm htmlFor='password-confirm'>
            Confirm password:
          </LabelPasswordConfirm>
          <FormInput
            onChange={(e): void => {
              setPasswordConfirm(e.target.value);
            }}
            value={passwordConfirm}
            type='password'
            name='password-confirm'
            id='password-confirm'
          />
        </FormRowPage>
        <FormRowPage>
          <FormButton type='submit'>Create account</FormButton>
        </FormRowPage>
      </FormPage>
    </FormContainerPage>
  );
};

export default CreateAccount;
