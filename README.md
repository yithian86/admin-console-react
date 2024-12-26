# Admin Console React
A pretty basic FE project for an administration console of a web application.

The BE of this project is currently handled by a mock server in ExpressJS. I plan on doing an actual BE in Java Spring + some dumb DB thingy. Probably not. My current work-life balance is pretty messed up.



## Prerequisites
node version >= 23


## How to install it
    npm i


## How to run it
    npm run dev


## Technologies involved
This project is based on: 
- `React` + `Vite` + `Typescript`
- `Axios` for the HTTP client
- `antd` for the UI components


## Current features:

### 'Languages' page
A page where the user can add and activate/deactivate the client web app languages.

### 'Manage translations' page (WIP):
A page where the user can add/edit/delete all the client web app labels. The page allows to see the translations in all available languages (even the inactive ones).



## Future 'wanna-do' features:

## Admin Console configuration
Manage a configuration from BE api.

### Basic console localization
Add the possibility to change the console language and set a default one. Add a language selector.

### Basic authentication
A basic login with username and password.

### User roles and permissions
- Basic user: a user with partial permissions to the console features (labels export, read/edit labels, ...)
- Root user: a user with full permissions.

### 'Import/export' page:
A page where the user may import or export all labels and languages from/to DB through a BE api.