# Giphy Search

This is a simple application that can be used to search Giphy's database. The application has been made ready to deploy to Heroku. A live demo can be viewed [here](https://ng-giphy.herokuapp.com/);

## Installation

Clone the project by using ssh `git clone git@github.com:mrpharderwijk/giphy-search.git` or https `git clone https://github.com/mrpharderwijk/giphy-search.git`. Then run `npm install` to install all dependencies. To run the application locally check the Development server section below.

## Development server

Run `npm run serve:local` for a dev server. Navigate to `http://localhost:4500/`. The app will automatically reload if you change any of the source files. Use `npm run serve:prod` for a check for prod build/server.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `npm run postinstall` for a production build. The `postinstall` is used by Heroku, please leave it like that.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io). Run `npm run coverage` after that to start the coverage server and check the reports by navigating to `http://localhost:9875`.

## Running end-to-end tests

TODO: setup e2e tests

## Custom Giphy Search Changelog

Changes made in:

- added `./.prettierignore`
- added `./.prettierrc`
- `./angular.json`
  - added `stylePreprocessorOptions` rules for custom general scss files
  - added `local`-build and `local`-serve rules
- `./tslint.json` refers to a `./giphy-tslint.json` file with all the rules in it
- `./src/styles.scss` added a reference to the custom general scss file (`_main.scss`)
- `./package.json`
  - added/adjusted in scripts
    - `build` with aot build
    - `coverage` run the test coverage server
    - `postinstall` aot production build
    - `pretty` prettify all ts source files
    - `serve:local` aot local serve, running on port 4203
    - `serve:prod` aot production serve, running on port 4203
    - `start` runs the application with express.js from the `dist`-folder
    - `test` runs the tests with coverage and watch mode on
  - `pre-commit` hooks added
  - `dependencies` and `devDependencies` updated

## TODO'S / Backlog

- add all unit tests
- add search options (GIF's or Stickers)
- add sorting and ordering
- add caching for better performance
- add light(/dark) theme switcher
- add user previous searches (localstorage)
- add masonry for better layout
- adjust styling of the card
- add better responsive stuff
- add copy/paste gif/sticker link
- add error handling for http calls
- add snackbar service for no internet error
