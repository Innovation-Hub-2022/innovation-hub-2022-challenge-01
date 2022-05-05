// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'https://pz6irm4l4g.execute-api.eu-west-2.amazonaws.com/Prod/',

  uploadCSVUrl: 'https://q2q3wadoai.execute-api.eu-west-2.amazonaws.com/',

  production: false,

  sso_api_username: '5ep3i10lbdv3bfgg8gl42mdj3v',
  sso_api_pwd: '13ft70tlj1g1d18932c61l87glouc14euitc6hu742k78kqcobef',

  loginURL: 'https://innovatio-hub.auth.eu-west-2.amazoncognito.com/login?client_id=5ep3i10lbdv3bfgg8gl42mdj3v&response_type=code&scope=openid+profile+email&redirect_uri=http://localhost:52333/callback',

  redirectURL: 'http://localhost:52333/callback',

  cognitoTokenURL: 'https://innovatio-hub.auth.eu-west-2.amazoncognito.com/oauth2/token',

  logout: 'https://innovatio-hub.auth.eu-west-2.amazoncognito.com/logout?' +
          'client_id=5ep3i10lbdv3bfgg8gl42mdj3v&' +
          'logout_uri=http://localhost:52333/login'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
