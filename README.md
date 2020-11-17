# Frontend challenge for fetchr

This is a frontend challenge for fetchr

![demo](./assets/demo.gif)

## Application overview

This application is written using typescript. I decided to use hybrid approach for this project because of time and technology constraints. This application consist from 2 parts:

- Express.js proxy server - to access deezers cors api
- Frontend application

Tech used:

- [Typescript](https://www.typescriptlang.org/)
- [Css modules](https://github.com/css-modules/css-modules)
- [postcss](https://postcss.org/)
- [parcel.js](https://parceljs.org/)
- [pathparser](https://github.com/dstillman/pathparser.js#readme)

## Application architecture

Frontend application has following directory structure:

- **pages** - contains entry points for web route
  - **\_page/components** - contains set of components, used in `_page`
- **services** - contains services, which are used across the application (api)

Application Lifecycle starts at `src/index.ts`. Here, routing is initialized and application is rendering page accordingly to the current route.

## Installation

To install and run application, execute following in your terminal:

```bash
npm install
npm run start
```

This will install all the needed dependencies and start application in development mode
