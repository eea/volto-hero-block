# @eeacms/volto-hero-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-hero-block)](https://github.com/eea/volto-hero-block/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-hero-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-hero-block/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block)

Enhanced Hero Block [Volto](https://github.com/plone/volto) add-on

## Features

![Hero Block](https://raw.githubusercontent.com/eea/volto-hero-block/master/docs/volto-hero-block.gif "Hero Block")

## Upgrade

### Upgrading to 10.x

> This version requires `Volto 18` or `Volto 19` and Node.js 22.

The block, its schema and its `blocksWithFootnotesSupport` configuration keep the same names and defaults, so upgrading from 9.x on Volto 18 needs no content changes. The release adds Volto 19 support and moves the repository to the Volto 19 layout, where the published package lives in `packages/volto-hero-block`.

#### Breaking changes

- **Node.js 22 or newer is required** (`engines.node >= 22`), 9.x declared no engine.
- **React 18 is required.** The package declares `react` and `react-dom` as `^18.2.0` peers, 9.x declared no peers.
- **The package no longer ships the Jest setup.** `jest-addon.config.js` was removed and `jest.setup.js` became `vitest.setup.jsx`, so a Volto 18 project that still runs the Jest harness has to keep its own copy.

The link rendered by the remix-icon field now carries `rel="noopener noreferrer"` instead of `rel="noopener"`.

### Upgrading to 9.x

> This version requires `Volto >= 17.18` or `Volto 18+`. It removes the custom `EditBlockWrapper` usage in favor of Volto's built-in block chrome provided by `BlocksForm`.

#### Breaking changes

- **Removed `EditBlockWrapper` render prop from `BlocksForm`.** The `BlocksForm` children render prop that wrapped each inner block in `<EditBlockWrapper>` has been removed. `BlocksForm` now handles block chrome internally via Volto core's `EditBlockWrapper`. Any code that relied on the children render prop pattern in the hero block's `Edit` component will need to be updated.
- **`disableInnerButtons`** continues to work via the existing CSS rules in `edit.css` rather than the previously used `disabled` prop on `EditBlockWrapper`.

### Upgrading to 2.x

This version requires: `@plone/volto >= 16.0.0.alpha.46` (schemaEnhancer / addStyling).

### Upgrading to 6.x

Starting with version `6.0.0` we have the following breaking changes from version `5.x.x`:

1. Removed inner `div` that was used to add `quoted-wrapper` class.
   This `class` is now added on the main `div` alongside the other `block` options.
2. Block is using `BlocksForm` to add more than one `Slate` blocks. 
This is useful in case you have to add some sub titles or extra paragraphs inside the `Hero block`. The default `Slate` tag is still `h2` but you can change it using the rich text options toolbar.

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
   "dependencies": {
       "@eeacms/volto-hero-block": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-hero-block'];
   ```

- If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
