# volto-hero-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-hero-block)](https://github.com/eea/volto-hero-block/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-hero-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-hero-block/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-hero-block%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-hero-block/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block&branch=develop)

Enhanced Hero Block [Volto](https://github.com/plone/volto) add-on

## Features

![Hero Block](https://raw.githubusercontent.com/eea/volto-hero-block/master/docs/volto-hero-block.gif "Hero Block")

## Upgrade

### Upgrading to 2.x

This version requires: `@plone/volto >= 16.0.0.alpha.46` (schemaEnhancer / addStyling).

### Upgrading to 6.x

Starting with version `6.0.0` we have the following breaking changes from version `5.x.x`:

1. Removed inner `div` that was used to add `quoted-wrapper` class.
   This `class` is now added on the main `div` alongside the other `block` options.
2. Block is using `BlocksForm` to add more than one `Slate` blocks. 
This is useful in case you have to add some sub titles or extra paragraphs inside the `Hero block`. The default `Slate` tag is still `h2` but you can change it using the rich text options toolbar.


## Getting started

### Try volto-hero-block with Docker

      git clone https://github.com/eea/volto-hero-block.git
      cd volto-hero-block
      make
      make start

Go to http://localhost:3000

`make start` now defaults to Volto 18. To run the same setup against Volto 17, use:

      VOLTO_VERSION=17 make
      VOLTO_VERSION=17 make start

### Add volto-hero-block to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
  "addons": [
      "@eeacms/volto-hero-block"
  ],

   "dependencies": {
       "@eeacms/volto-hero-block": "*"
   }
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

   For a legacy Volto 17 project, install the package with `yarn` and restart the frontend as usual.

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-hero-block/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-hero-block/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-hero-block/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
