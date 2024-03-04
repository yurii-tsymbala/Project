/** *************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init'
import 'zone.js/dist/zone-node'

import { existsSync } from 'fs'
import { join } from 'path'

import { ngExpressEngine } from '@nguniversal/express-engine'
import * as domino from 'domino'
import * as express from 'express'

import { AppServerModule } from './src/main.server'

import { APP_BASE_HREF } from '@angular/common'

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express()
  const distFolder = join(process.cwd(), 'dist/angular-starter1/browser')
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index'

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    }),
  )

  server.set('view engine', 'html')
  server.set('views', distFolder)

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.json',
    express.static(distFolder, {
      maxAge: '10m',
    }),
  )

  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  )

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    const host = req.header('x-forwarded-host') || 'localhost'
    const protocol = req.header('x-forwarded-proto') || 'http'
    const href = `${protocol}://${host}${req.originalUrl}`

    ;(<any>global).window = domino.createWindow(indexHtml, href)
    ;(<any>global).document = (<any>global).window.document
    ;(<any>global).navigator = (<any>global).window.navigator
    ;(<any>global).history = (<any>global).window.history
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] }, (err: Error, html: string) => {
      const matches = html.match(/ssrHttpStatusCode:(\d\d\d)/)

      if (matches) {
        res.statusCode = Number(matches[1])
      }

      if (err) {
        console.log('ERROR: ', err.message || JSON.stringify(err))
      } else {
        res.set('Cache-Control', 'public, max-age=300')
        res.send(html)
      }
    })
  })

  return server
}

function run(): void {
  const port = process.env.PORT || 4000

  // Start up the Node server
  const server = app()

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`)
  })
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire
const mainModule = __non_webpack_require__.main
const moduleFilename = (mainModule && mainModule.filename) || ''
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run()
}

export * from './src/main.server'
