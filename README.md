# Chat server UI

The frontend is built with React and it uses socket.io client to communicate

To get started

```bash
npm install
```

Start webpack dev server

```bash
npm start
```

This starts the server on http://localhost:7000

For prod build

```bash
npm run build:prod
```

This will generate the build assets inside the `public` directory

Now this can be served with any static server. However make sure that URL its being served on is CORS whitelisted on the server
