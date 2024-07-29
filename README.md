# PFtrackr

Simple-to-use web app that helps track the amount of people at planet fitness over the day. You can use this to go to the gym during emptier times where more equipment is available.

## Running

Run `yarn` and `yarn dev` in both the frontend and backends.

## Building

Run `yarn` and `yarn build` in both the frontend and backends. Then, copy frontend/dist to backend/dist/web. Finally, run `node dist/` to start the web app.

To build the docker image, simply run `docker build -t pftracker .` and watch the magic happen.

## Contribution

Contributions are welcome! Either make an issue or open a pull request and it'll be reviewed promptly (hopefully).
