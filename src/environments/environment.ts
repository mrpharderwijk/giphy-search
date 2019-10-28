// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviceUrls: {
    giphy: {
      // documentation contained a `)` at the end of the apiKey which was not correct ;)
      apiKey: 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6',
      gifs: {
        search: 'http://api.giphy.com/v1/gifs/search',
        trending: 'http://api.giphy.com/v1/gifs/trending',
      },
      stickers: {
        search: 'http://api.giphy.com/v1/stickers/search',
        trending: 'http://api.giphy.com/v1/stickers/trending',
      },
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
