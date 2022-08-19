# Full Stack Blocks - Starter Kit

Full-stack starter kit built on top the [T3 stack](https://github.com/t3-oss/create-t3-app).

Save valuable development time by getting started with a complete development setup. Our starter kit provides you:

- A [Next.js](https://nextjs.org/) app
- With an end-to-end typesafe API trough [tRPC](https://trpc.io/)
- Typesafe database interaction with [Prisma](https://www.prisma.io/)
- Auth with [NextAuth.js](https://next-auth.js.org/)
- A full browser and API testing setup with [Playwright](https://playwright.dev/)
- Local email testing
- [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) for consistent code-style, including commit hooks
- Pre-configured GitHub actions to run tests
- Integrated examples for included technologies to make you productive faster

## Table of Contents

- [Included Technologies](#included-technologies)
- [Getting Started](#getting-started)
- [Overview of Commands](#overview-of-commands)
  - [Start development dependencies](#start-development-dependencies)
  - [Start the development server](#start-the-development-server)
  - [Run end-to-end tests](#run-end-to-end-tests)
  - [Run Linter](#run-linter)
  - [Format code](#format-code)
  - [Run production build locally](#run-production-build-locally)

## Included Technologies

- [Next.js](https://nextjs.org/) - The React framework for production
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs made easy
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication built for Next.js
- [Playwright](https://playwright.dev/) - Fast and reliable end-to-end testing
- [MailHog](https://github.com/mailhog/MailHog) - Local email testing
- [Prettier](https://prettier.io/) - Opinionated code formatter
- [ESLint](https://eslint.org/) - Find and fix problems in your TypeScript code
- [husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/okonet/lint-staged) - Runs Prettier and ESLint on commit
- [GitHub action](./.github/workflows/tests.yaml) - Runs your tests in CI

## Getting Started

Clone the repository:

```
git clone https://github.com/Dennitz/fullstackblocks-core.git
cd fullstackblocks-core
```

Install dependencies:

```
npm install
```

Start development dependencies in Docker (make sure you have Docker running):

```
docker-compose up
```

In another terminal window, start the development server:

```
npm run dev
```

Open http://localhost:3000 to view the running application and explore examples.

Open http://localhost:8025 to view emails in development.

**Now, go ahead and build your next project :)**

## Overview of Commands

### Start development dependencies

```
docker-compose up
```

Make sure you have Docker running.

### Start the development server

```
npm run dev
```

Make sure you have [started the development dependencies](#start-development-dependencies).

### Run end-to-end tests

```
npm run test:e2e
```

Make sure you have [started the development dependencies](#start-development-dependencies).

### Run linter

```
npm run lint
```

### Format code

```
npm run format
```

### Run production build locally

```
npm run build
npm run start
```
