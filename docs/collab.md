# Collaborative Editing

This example uses yjs to setup collaborative editing.

The following example is from https://github.com/yjs/yjs-demos.

See https://github.com/yjs for more details

```ts
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror';
import { Editor } from 'ngx-editor';

const ydoc = new Y.Doc();
const provider = new WebsocketProvider(
  'wss://prosemirror-collab.glitch.me/',
  'prosemirror-demo',
  ydoc
);
const type = ydoc.getXmlFragment('prosemirror');

new Editor({
  plugins: [
    ySyncPlugin(type),
    yCursorPlugin(provider.awareness),
    yUndoPlugin(),
  ],
});
```

### Server

See https://glitch.com/edit/#!/prosemirror-collab

```js
const WebSocket = require('ws');
const http = require('http');
const StaticServer = require('node-static').Server;
const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection;

const production = process.env.PRODUCTION != null;
const port = process.env.PORT || 8080;

const staticServer = new StaticServer('../', {
  cache: production ? 3600 : false,
  gzip: production,
});

const server = http.createServer((request, response) => {
  request
    .addListener('end', () => {
      staticServer.serve(request, response);
    })
    .resume();
});
const wss = new WebSocket.Server({ server });

wss.on('connection', (conn, req) =>
  setupWSConnection(conn, req, {
    gc: req.url.slice(1) !== 'prosemirror-versions',
  })
);

server.listen(port);

console.log(
  `Listening to http://localhost:${port} ${production ? '(production)' : ''}`
);
```
