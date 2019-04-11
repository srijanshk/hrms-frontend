// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //userUrl: 'http://hrms-users.sevadev.com/api',
  userUrl: 'http://localhost:5000/api',
  leaveApiUrl: 'http://localhost:3000',
  inventoryUrl: 'http://localhost:4000',
  recruitmentUrl: 'http://localhost:8000',
  // For Dummy content using JSON Server
  //  recruitmentUrl: 'http://localhost:3004',
  uploadUrl: 'http://localhost:8000/uploader'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
