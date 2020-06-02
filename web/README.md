# Area

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:8081/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Why Angular ?

We chose Angular, because:
 - it separates the DOM manipulation from application logic
 - it uses Dependency Injection which permits to have much more cleaner code

## Architecture

The web app is composed of 3 services:
 - BuilderService
 - MessagingService
 - AuthService

The BuilderService permits to create from scrach an AREA (Action, Reaction)
The MessagingService permits to manage notifications (Request permissions, display notifications)
The AuthService permits to manage all the authentication of the app (oauth2, auth via email/password)

## UI

We chose to be inspired by the ifttt.com website.

