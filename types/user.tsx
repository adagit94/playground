export type StatesUser =
  | {
      username: string;
      wins: number;
      gatheredPoints: number;
    }
  | firebase.firestore.DocumentData;

export type ActionsUser =
  | {
      type: 'setUser';
      payload: StatesUser;
    }
  | { type: 'addPoint' }
  | { type: 'reset' };
