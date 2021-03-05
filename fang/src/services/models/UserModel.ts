import { ReadSettings } from './SettingsModel';

export class UserModel {
  name: string = '';
  email: string = '';
  accessToken: string = '';
  settings: ReadSettings = new ReadSettings();
}
