# Leveraging the Power of a Typed Schema

> Dynamic User Interfaces with GraphQL

[![GitHub Actions Test](https://github.com/GregBrimble/leveraging-the-power-of-a-typed-schema/workflows/Test/badge.svg)](https://github.com/GregBrimble/leveraging-the-power-of-a-typed-schema/actions?query=workflow%3ATest)
[![GitHub Actions Deploy](https://github.com/GregBrimble/leveraging-the-power-of-a-typed-schema/workflows/Deploy/badge.svg)](https://github.com/GregBrimble/leveraging-the-power-of-a-typed-schema/actions?query=workflow%3ADeploy)
[![LGTM Code Quality](https://img.shields.io/lgtm/grade/javascript/g/GregBrimble/leveraging-the-power-of-a-typed-schema.svg?logo=lgtm&style=plastic)](https://lgtm.com/projects/g/GregBrimble/leveraging-the-power-of-a-typed-schema/context:javascript)
[![License](https://img.shields.io/github/license/GregBrimble/leveraging-the-power-of-a-typed-schema?style=plastic)](https://github.com/GregBrimble/leveraging-the-power-of-a-typed-schema/blob/master/LICENSE)
[![Greenkeeper badge](https://badges.greenkeeper.io/GregBrimble/leveraging-the-power-of-a-typed-schema.svg?style=plastic)](https://greenkeeper.io/)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/GregBrimble/leveraging-the-power-of-a-typed-schema.svg?logo=github&style=plastic)](https://github.com/GregBrimble/leveraging-the-power-of-a-typed-schema)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=plastic)](https://lerna.js.org/)

## Author

👤 **Greg Brimble**

- Github: [@GregBrimble](https://github.com/GregBrimble)
- Personal Website: [https://gregbrimble.com/](https://gregbrimble.com/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/GregBrimble/leveraging-the-power-of-a-typed-schema/issues).

## 😍 Show your support

Please consider giving this project a <a href="https://github.com/GregBrimble/leveraging-the-power-of-a-typed-schema/stargazers" target="_blank" title="Thank you!">⭐️</a> if you use it, or if it provides some inspiration!

# Features

- 🧪 This is a proof-of-concept of dynamic user interfaces, defined by a GraphQL schema.

- ☁ It's full-stack serverless!

  This entire project is hosted on [Cloudflare's edge](https://workers.cloudflare.com/), which means:

  - ⚡ Everything is blazing fast
  - 💸 It's cheap
  - 🎈 It scales automatically
  - 💻 Development is really easy

- 🤖 Deployment is automated with [GitHub Actions](https://github.com/features/actions).

# Usage

## Install

```sh
git clone git@github.com:GregBrimble/leveraging-the-power-of-a-typed-schema.git
cd leveraging-the-power-of-a-typed-schema
npm install
```

## Development

```sh
npm start
```

The GraphQL server should be available at http://localhost:4000/ and the front-end should be available at http://localhost:3000/.

> Note: If the front-end first opens with a empty page, refresh after a couple of seconds. You've just beat the build process.

Optionally, to additionally run with Storybook (available at http://localhost:3001/):

```sh
npm run start:storybook
```

> Note: Storybook can take up to one minute to boot-up.

And if you only need the GraphQL server:

```sh
npm run start:graphql
```

### Testing

```sh
npm test
```

### Linting

```sh
npm run lint
```

And to automatically fix most errors:

```sh
npm run format
```

## Deployment

1. Set your [Cloudflare Account ID](https://developers.cloudflare.com/workers/reference/storage/api/) in `wrangler.toml`.
1. Create a [Cloudflare API Token](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys#12345680) using the `Edit Cloudflare Workers` template, and substitute it below:
   ```sh
   CF_API_TOKEN=xxx npm run deploy
   ```
