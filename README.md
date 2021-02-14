# TerraBrasilis Research Data - Data Hub

The Data Portal is responsible for organizing the entry of researchers and users in the form of a web interface and the platform's functionalities. Inspired by digital libraries, the Data Portal will provide navigation through all published data sets, visualization of research groups, generation of citation of data sets, download of data among other functions. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://0.0.0.0:4200/`. The app will automatically reload if you change any of the source files.

## Run with docker

**Image build**

```shell
docker build -t terrabrasilisrd/data-hub .
```

**Container run**

```shell
docker run -d -p 4200:4200 --name tbrd_data-hub terrabrasilisrd/data-hub
```

or

```shell
docker-compose up -d --build
```
