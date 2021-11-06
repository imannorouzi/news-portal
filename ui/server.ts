import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';

import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import {OutgoingHttpHeaders, RequestOptions} from 'http';

import * as http from 'http';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ui/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  const { createProxyMiddleware } = require('http-proxy-middleware');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  const options = {
    target: 'http://localhost:8083/', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
      [`^/api`]: '/api',
    }, // rewrites our endpoints to '' when forwarded to our target
  };

  server.use('/api', createProxyMiddleware(options));

  server.get('*', (req, res) => {
    console.log(req.url);
    try {
        res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    } catch (err) {
      console.error('error occurred', err);
    }
  });

  return server;
}


function handleRequest(req: any, res: any) {

  console.log(req.queries);
  const options: RequestOptions = {
    host: 'localhost',
    path: req.path,
    port: 8083,
    method: 'GET',
    // headers: headerOptions
  };
  let body = '';
  // res.setEncoding( 'utf-8' );

  return new Promise((resolve, reject) => {
    http.request(options, (response) => {

      response.on('data', (chunk) => {
        console.log('here we are - 2 ', chunk);
        // res.send(heroes);
        body += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(body));
      });
    }).end();
  });
}

function run(): void {
  const port = process.env.PORT || 80;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
