import { HandleLoading } from 'types/firebase';

type ValidatorReturn = {
  validPassword: boolean;
  equalPasswords: boolean;
  count: boolean;
  upper: boolean;
  num: boolean;
  special: boolean;
};

export type InitUserFirebase = (user: firebase.User) => void;

export type ClearUserFirebase = () => void;

export type InitAuthObserver = (
  initUserFirebase: InitUserFirebase,
  clearUserFirebase: ClearUserFirebase
) => void;

export type Logout = () => Promise<void>;

export type CreateUser = (email: string, password: string) => Promise<void>;

export type UpdateUser = (
  user: firebase.User,
  username: string,
  avatar: File
) => Promise<void>;

export type LoginEmail = (
  email: string,
  password: string,
  handleLoading: HandleLoading
) => Promise<void>;

export type LoginProvider = (
  provider: 'fb' | 'google',
  handleLoading: HandleLoading
) => Promise<void>;

export type ResetPassword = (email: string) => Promise<void>;

export type Validator = (
  password: string,
  passwordConfirm: string
) => ValidatorReturn;
