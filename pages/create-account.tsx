import { useState } from 'react';
import styled from 'styled-components';

import {
  FormInput,
  FormButton,
  FormContainer,
  Form,
  FormRowVertical,
  FormWindowValidation
} from 'components/styled-components/forms';

import { createUser, validator } from '../firebase/auth';
import {
  CountProps,
  UpperProps,
  NumProps,
  SpecialProps,
  LabelPasswordProps,
  LabelPasswordConfirmProps,
  ValidationWindowProps
} from 'types/styled-components';

const ValidationWindow = styled(FormWindowValidation)<ValidationWindowProps>`
  visibility: ${({ typedPassword }): string =>
    typedPassword ? 'visible' : 'hidden'};
`;

const Count = styled.li<CountProps>`
  color: ${({ validCount }): string => (validCount ? '#00ff00' : '#ff0000')};
`;

const Upper = styled.li<UpperProps>`
  color: ${({ includesUpper }): string =>
    includesUpper ? '#00ff00' : '#ff0000'};
`;

const Num = styled.li<NumProps>`
  color: ${({ includesNum }): string => (includesNum ? '#00ff00' : '#ff0000')};
`;

const Special = styled.li<SpecialProps>`
  color: ${({ includesSpecial }): string =>
    includesSpecial ? '#00ff00' : '#ff0000'};
`;

const LabelPassword = styled.label<LabelPasswordProps>`
  color: ${({ highlightInvalid, validPassword }): string =>
    highlightInvalid && !validPassword && '#ff0000'};
`;

const LabelPasswordConfirm = styled.label<LabelPasswordConfirmProps>`
  color: ${({ highlightInvalid, equalPasswords }): string =>
    highlightInvalid && !equalPasswords && '#ff0000'};
`;

const CreateAccount: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [highlightInvalid, setHighlightInvalid] = useState(false);

  const {
    validPassword,
    equalPasswords,
    validCount,
    includesUpper,
    includesNum,
    includesSpecial
  } = validator(password, passwordConfirm);

  return (
    <FormContainer>
      <ValidationWindow typedPassword={password.length > 0}>
        Password must contain at least:
        <ul>
          <Count validCount={validCount}>8 characters</Count>
          <Upper includesUpper={includesUpper}>One uppercase letter</Upper>
          <Num includesNum={includesNum}>One number</Num>
          <Special includesSpecial={includesSpecial}>
            One special character
          </Special>
        </ul>
      </ValidationWindow>
      <Form
        onSubmit={(e): void => {
          e.preventDefault();

          if (validPassword && equalPasswords) {
            createUser(email, password);
          } else {
            setHighlightInvalid(true);
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
          <LabelPassword
            highlightInvalid={highlightInvalid}
            validPassword={validPassword}
            htmlFor='password'
          >
            Password:{' '}
          </LabelPassword>
          <FormInput
            onChange={(e): void => {
              setPassword(e.target.value);
            }}
            value={password}
            name='password'
            id='password'
            type='password'
            minLength={8}
            required
          />
        </FormRowVertical>
        <FormRowVertical>
          <LabelPasswordConfirm
            highlightInvalid={highlightInvalid}
            equalPasswords={equalPasswords}
            htmlFor='password-confirm'
          >
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
            minLength={8}
            required
          />
        </FormRowVertical>
        <FormRowVertical>
          <FormButton type='submit'>Create account</FormButton>
        </FormRowVertical>
      </Form>
    </FormContainer>
  );
};

export default CreateAccount;
