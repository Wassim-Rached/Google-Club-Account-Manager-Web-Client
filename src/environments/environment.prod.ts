import { Environment } from 'src/types';
import packageInfo from '../../package.json';

export const environment: Environment = {
  appVersion: packageInfo.version,
  production: true,
  defaultPhotoUrl: 'assets/images/user/avatar-2.jpg',
  requireStrongPassword: true,
  termsAndConditionsUrl: 'https://example.com',

  // central authentication service
  cas: 'https://cas-server.azurewebsites.net',
  // identity and access control service
  ics: 'https://ics-server.azurewebsites.net'
};
