import React from 'react';
import { UserModel } from './models/UserModel';

export const UserContext = React.createContext({
  userData: new UserModel(),
  updateSettings: () => {},
});
