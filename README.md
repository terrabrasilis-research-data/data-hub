# TerraBrasilis Research Data - Data Hub
The Data Portal is responsible for organizing the entry of researchers and users in the form of a web interface and the platform's functionalities. Inspired by digital libraries, the Data Portal will provide navigation through all published data sets, visualization of research groups, generation of citation of data sets, download of data among other functions. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://0.0.0.0:4200/`. The app will automatically reload if you change any of the source files.

## Docker

Run `sudo docker build -t inpe/terrabrasilis-data-hub .`

Run `sudo docker run -d -p 4200:4200 --name terrabrasilisrd_portal inpe/terrabrasilis-data-hub`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
es -p 4201:4200 --name terrabrasilisrd_data-hub --rm inpe/terrabrasilis-data-hub`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

