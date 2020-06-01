import { memo, useReducer, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { initUserDB, removeListenerUser } from 'firebase/db';
import { reducerUser } from 'reducers/user';
import { initUser } from 'inits/user';
import { ContextFirebase } from 'contexts/firebase';
import { ContextUser } from 'contexts/user';
import { PropsLayout } from 'types/layout';
import { HandleData } from 'types/user';

const Container = styled.main`
  flex: auto;
`;

const Main: React.FC<PropsLayout> = ({ content }): JSX.Element => {
  const [statesUser, dispatchUser] = useReducer(reducerUser, initUser);
  const statesFirebase = useContext(ContextFirebase);

  const { user } = statesFirebase;

  const uid = user?.uid;

  useEffect(() => {
    const handleData: HandleData = data => {
      dispatchUser({ type: 'setData', payload: data });
    };

    if (user !== undefined && statesUser === undefined) {
      initUserDB(user, handleData);
    }

    /*
    return (): void => {
      console.log('user listener removed');
      if (uid !== undefined) removeListenerUser(uid);
    };
    */
  });

  return (
    <Container>
      <ContextUser.Provider value={statesUser}>{content}</ContextUser.Provider>
    </Container>
  );
};

export default memo(Main);
