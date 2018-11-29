// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientID: 'iiB08rNIqjRH1m5gFjcRwxv5DJ7uWxgl',
    domain: 'yape-web.auth0.com', // e.g., you.auth0.com
    audience: 'https://yape.iscinternal.com:5000', // e.g., http://localhost:3001
    redirect: 'http://yape.iscinternal.com:4200/callback',
    scope: 'openid profile email'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
