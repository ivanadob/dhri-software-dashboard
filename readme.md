# acdh-ch software dashboard

a collection of software products we are proud of.

## how to add content

- create a new feature branch
- create a new markdown file in [`src/content/software`](src/content/software) from the
  [template](src/content/_software-template.md), and fill out all
  [the fields](src/content/config.ts).
- create a pull request

## how to run

prerequisites:

- [Node.js v20](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)

set required environment variables in `.env.local`:

```bash
cp .env.local.example .env.local
```

adjust environment variables in `.github/workflows/build-deploy.yml` and
`.github/workflows/validate.yml`.

install dependencies:

```bash
pnpm install
```

run a development server on [http://localhost:3000](http://localhost:3000):

```bash
pnpm run dev
```
