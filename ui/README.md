# Patient Level Monitoring - Proof of Concept

The ui directory is built into the dist directory and manually updated in the server/public/
directory when changes are made.  You only need to build this when making changes to the UI.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
Edit vue.config.js to set the URL for the server when doing development.

Edit package.json to set the UI server to use for development or remove --server for localhost.

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
