import { atom } from 'recoil';
import { LoginDataProps } from '../../api/auth';

export interface AuthState {
  user: LoginDataProps | null;
  isAuthenticated: boolean;
}

export const blogAtom = atom({
  key: 'blogAtom',
  default: [],
});

export const loadingAtom = atom<boolean>({
  key: 'loadingAtom',
  default: true,
});

export const authAtom = atom<AuthState>({
  key: 'authAtom',
  default: {
    user: null,
    isAuthenticated: false,
  },
});
