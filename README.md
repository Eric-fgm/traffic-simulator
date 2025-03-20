# Traffic Simulator

The Traffic Simulator is an full-stack / CLI application that simulates the operation of traffic signals at an intersection. The project aims to evaluate programming skills, analytical thinking, and the ability to work with algorithms and user interfaces.

![Client Demo App](./assets/client-app.png)

### Algorithm

## Technologies

This project is built using TypeScript with Turborepo for monorepo management:

- `Node.js`: required version: 18
- `pnpm`: package manager
- `Hono`: API server
- `React`: client app

## How to run?

### 1. Install Dependencies

First, ensure that you have **Node.js** and **pnpm** installed on your system. Then, install dependencies:

```bash
pnpm install
```

### 2. Build Project

Compile the project before running it:

```bash
pnpm build
```

### 3. Run CLI

Navigate to the CLI app and execute it using Node.js:

```bash
cd apps/cli
node dist/index.cjs ./input.json ./output.json
```

Replace ./input.json and ./output.json with your actual input and output file paths.

### 4. Run Fullstack App

Run this command from the root of the project:

```bash
pnpm start:app
```

- API Server: http://localhost:8080/

- Client: http://localhost:3001/

## What's inside?

This monorepo includes the following packages and apps:

### Apps and Packages

- `cli`: a CLI app
- `server`: an [Hono](https://hono.dev/) API server
- `web`: a [Vite](https://vitejs.dev/) client app
- `@traffic/core`: core business logic of Traffic Simulator
- `@traffic/helpers`: helpers used throughout the monorepo
- `@traffic/types`: types used throughout the monorepo
- `@traffic/eslint-config`: ESLint configurations used throughout the monorepo
- `@traffic/jest-presets`: Jest configurations
- `@traffic/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).
