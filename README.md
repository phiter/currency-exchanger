## Currency exchanger

[![CircleCI](https://circleci.com/gh/phiter/currency-exchanger/tree/master.svg?style=shield)](https://circleci.com/gh/phiter/currency-exchanger)

This is an app built with Vue + Express, using the Open Exchange Rates api to make currency conversions.  
It also uses lerna to manage the two projects.

### Setup (docker)

1. Clone the project locally
2. Clone the `.env.example` file in the `backend` folder into a `.env` file.
3. Add your Open Exchange Rates `API_KEY` as a value to the variable in the env file.
4. Go to the base project directory (where `docker-compose.yml` is located) and run `docker-compose up`.
5. Make sure your `8080` port is not being used.

### Testing

Both the backend and frontend packages use jest for the unit tests.

1. Run `npm install` in the root directory if you haven't already.
2. Run `npm run bootstrap` to install the dependencies of both projects.
3. Run `npm test` to test both the `frontend` and `backend` projects.

### Linting

This project uses eslint with airbnb recommended config both for the `frontend` and `backend`.

To check the code, run `npm run lint`.
