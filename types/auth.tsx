import { HandleLoading } from '../types/firebase';
import { StatesUser } from './user';

export type InitUser = (
  userFirebase: firebase.User,
  userDB: StatesUser
) => void;

export type ClearUser = () => void;

export type InitAuthObserver = (
  initUser: InitUser,
  clearUser: ClearUser
) => void;

export type Logout = () => Promise<void>;

export type HandleError = (err, out: 'el' | 'alert') => void;

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

type ValidatorReturn = {
  validPassword: boolean;
  equalPasswords: boolean;
  count: boolean;
  upper: boolean;
  num: boolean;
  special: boolean;
};

export type Validator = (
  password: string,
  passwordConfirm: string
) => ValidatorReturn;
