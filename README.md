# NestJS MongoDB API

A NestJS API connected to MongoDB 7 through Mongoose. The project includes a
production Docker image and a Docker Compose stack for running the API and
database together.

## Requirements

Choose one of these setups:

- Docker with the Docker Compose plugin
- Node.js 24+, Yarn, and a running MongoDB instance

## Run with Docker

Build and start the backend and MongoDB together:

```bash
docker compose up --build --remove-orphans
```

This single command starts both Compose services. Their logs are attached to
the same terminal. The services will be available at:

- API: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27017/new`

MongoDB data is stored in the persistent `mongo_data` Docker volume.

The Compose stack uses MongoDB 7 because MongoDB 8.x currently has a known
startup incompatibility with Linux kernels 6.19 and newer.

Run the stack in the background:

```bash
docker compose up --build --remove-orphans -d
```

View both backend and MongoDB logs:

```bash
docker compose logs -f backend mongo
```

Stop the services while preserving database data:

```bash
docker compose down
```

To also delete the MongoDB volume and all of its data:

```bash
docker compose down --volumes
```

## Run locally

Install dependencies:

```bash
yarn install
```

Create your local environment file from the example:

```bash
cp .env.example .env
```

Start MongoDB separately, then run the API in watch mode:

```bash
yarn start:dev
```

## Environment variables

| Variable | Description | Default example |
| --- | --- | --- |
| `MONGODB_URI` | MongoDB connection URI | `mongodb://localhost:27017/new` |
| `PORT` | HTTP port used by the API | `3000` |

Inside Docker Compose, the API connects to MongoDB using the service hostname
`mongo`, so its connection URI is `mongodb://mongo:27017/new`.

## Build for production

```bash
yarn build
yarn start:prod
```

The compiled application is written to `dist/`.
