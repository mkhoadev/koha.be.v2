## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# env
$ cp .env.example .env

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Build docker image:

```bash
docker build --platform=linux/amd64 -t khoadevs/rev-be .
docker push khoadevs/rev-be # need login docker, try docker login
```
