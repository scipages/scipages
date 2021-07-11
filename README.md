<div align="center">
  <h1>
    <a href="https://github.com/scipages/scipages/">
      <img alt="SciPages logo" src="https://github.com/scipages/scipages/blob/main/public/icons/favicon-96x96.png?raw=true" width="96">
    </a>
    <br />
    SciPages
  </h1>
  <p align="center">
    <strong>A CMS and Static Site Generator for academic websites.</strong>
  </p>

  [Download](https://github.com/scipages/scipages/releases) | [Homepage](https://scipages.github.io/)

  <a href="https://github.com/scipages/scipages/actions">
    <img src="https://github.com/scipages/scipages/workflows/build/badge.svg" alt="build" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/scipages/scipages" alt="license" />
  </a>
</div>

<!--
<div align="center">
  <img src="screenshot.png">
</div>
-->


## Developer Notes

Make sure that you have Node.js and NPM installed on your machine. Preferably >= 16.x. Then Quasar CLI needs to be installed:

```bash
npm install -g @quasar/cli
```

#### Build Setup

```bash
# Install the dependencies
npm install

# Start the app in development mode (hot-code reloading, error reporting, etc.)
quasar dev -m electron

# Lint the files
npm run lint

# Build the app for production
quasar build -m electron
```

## License

This project is licensed under the terms of the MIT license - see the [LICENSE](LICENSE) file for details.
