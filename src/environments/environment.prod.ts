import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  defaultPhotoUrl: 'assets/images/user/avatar-2.jpg',
  requireStrongPassword: true,

  // central authentication service
  cas: 'https://cas-server.azurewebsites.net',
  // identity and access control service
  ics: 'https://ics-server.azurewebsites.net'
};
