# volto-hero-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-hero-block)](https://github.com/eea/volto-hero-block/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-hero-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-hero-block/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-hero-block%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-hero-block/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-hero-block-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-hero-block-develop)


Enhanced Hero Block [Volto](https://github.com/plone/volto) add-on

## Features

![Hero Block](https://github.com/eea/volto-hero-block/raw/docs/docs/volto-hero.gif)

## Upgrade

### Upgrading to 2.x

This version requires: `@plone/volto >= 16.0.0.alpha.46` (schemaEnhancer / addStyling).

## Getting started

### Try volto-hero-block with Docker

      git clone https://github.com/eea/volto-hero-block.git
      cd volto-hero-block
      make
      make start

Go to http://localhost:3000

### Add volto-hero-block to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-hero-block"
   ],

   "dependencies": {
       "@eeacms/volto-hero-block": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-hero-block
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

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
