import React, { useState } from 'react';
import styled from 'styled-components';

import {
  FormRowVertical,
  FormLabel,
  FormInput,
  FormButton,
  FormButtonInput
} from '../../components/styled-components/forms';

import { updateUser } from '../../firebase/auth';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

const InputFile = styled.input`
  display: none;
`;

const Settings: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState('');

  return (
    <Container>
      <Form
        onSubmit={(e): void => {
          e.preventDefault();

          updateUser(username, document.querySelector('#avatar').files[0]);
        }}
      >
        <FormRowVertical htmlFor='username'>
          <FormLabel>Username: </FormLabel>
          <FormInput
            onChange={(e): void => {
              setUsername(e.target.value);
            }}
            type='text'
            name='username'
            id='username'
          />
        </FormRowVertical>
        <FormRowVertical>
          <InputFile
            type='file'
            name='avatar'
            id='avatar'
            accept='image/jpeg, image/png, image/svg+xml'
          />
          <FormButtonInput
            onClick={(e): void => {
              document.querySelector('#avatar').click();
            }}
            type='button'
            id='avatar-button'
          >
            Avatar
          </FormButtonInput>
        </FormRowVertical>
        <FormRowVertical>
          <FormButton type='submit'>Apply changes</FormButton>
        </FormRowVertical>
      </Form>
    </Container>
  );
};

export default Settings;
