const axios = require('axios')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const path = require('path')
const MemoryFS = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')
const bootstrapper = require('react-async-bootstrapper')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const Helmet = require('react-helmet').default

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then((res) => {
        resolve(res.data)
      }).catch(reject)
  })
}

const nativeModule = require('module')
const vm = require('vm')
const getModuleFromString = (bundle, filename) => {
  const m = {exports: {}}
  const wrapper = nativeModule.wrap(bundle)
  const Script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })
  const result = Script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

const mfs = new MemoryFS()
serverConfig.mode = 'development'
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs

let serverBundle, createStoreMap
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err

  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warning => console.log(warning))
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports.default
  createStoreMap = m.exports.createStoreMap
})

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', function (req, res) {
    getTemplate().then((template) => {
      const routerContext = {}
      const stores = createStoreMap()
      const app = serverBundle(stores, routerContext, req.url)
      bootstrapper(app).then(() => {
        const content = ReactDomServer.renderToString(app)
        if (routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.end()
          return
        }
        const helmet = Helmet.rewind()
        const state = getStoreState(stores)
        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state),
          title: helmet.title.toString(),
          meta: helmet.meta.toString(),
          style: helmet.style.toString(),
          link: helmet.link.toString()
        })
        res.send(html)
      })
    })
  })
}
