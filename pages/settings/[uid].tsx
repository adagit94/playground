import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  FormRowHorizontal,
  FormLabel,
  FormInput,
  FormButton
} from '../../components/styled-components/forms';

import { ContextUser } from '../../contexts/user';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  border-radius: 5px;
  color: ${(props): string => props.theme.background};
  background-color: ${(props): string => props.theme.inverted};
`;

const Settings: React.FC = (): JSX.Element => {
  const router = useRouter();
  const statesUser = useContext(Context);

  const { uid } = router.query;
  const { lastPlayed } = statesUser;

  console.log(router);

  return (
    <Container>
      <Form>
        <FormRowHorizontal htmlFor='username'>
          <FormLabel>Username: </FormLabel>
          <FormInput type='text' name='username' id='username' />
        </FormRowHorizontal>
        <FormRowHorizontal>
          <FormLabel htmlFor='avatar'>Avatar: </FormLabel>
          <FormInput type='file' name='avatar' id='avatar' />
        </FormRowHorizontal>
        <FormRowHorizontal>
          <FormButton type='submit'>Log in</FormButton>
        </FormRowHorizontal>
      </Form>
    </Container>
  );
};

export default Settings;
