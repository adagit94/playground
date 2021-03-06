/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import { useState, useContext } from 'react';
import styled from 'styled-components';

import { paddingContainer } from 'components/styled-components/_variables';
import {
  FormRowVertical,
  FormLabel,
  FormInput,
  FormButton,
  FormButtonInput
} from 'components/styled-components/forms';

import { updateUser } from '../../firebase/auth';
import { ContextFirebase } from 'contexts/firebase';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${paddingContainer};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  color: ${({ theme }): string => theme.background};
  background-color: ${({ theme }): string => theme.inverted};
`;

const InputFile = styled.input`
  display: none;
`;

const Settings: React.FC = (): JSX.Element => {
  const statesFirebase = useContext(ContextFirebase);
  const [username, setUsername] = useState('');

  const { user } = statesFirebase;

  return (
    <Container>
      <Form
        onSubmit={(e): void => {
          e.preventDefault();

          const fileInput = document.querySelector(
            '#avatar-input'
          ) as HTMLInputElement;

          const avatar = (fileInput.files as FileList)[0];

          updateUser(user, username, avatar);
        }}
      >
        <FormRowVertical>
          <FormLabel htmlFor='username'>Username: </FormLabel>
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
            name='avatar-input'
            id='avatar-input'
            accept='image/jpeg, image/png, image/svg+xml'
          />
          <FormButtonInput
            onClick={(): void => {
              (document.querySelector(
                '#avatar-input'
              ) as HTMLInputElement).click();
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
