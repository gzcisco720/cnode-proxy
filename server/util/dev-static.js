const axios = require('axios');
const webpack = require('webpack');
const serverConfig = require('../../build/webpack.config.server');
const path = require('path');
const MemoryFS = require('memory-fs');
const ReactDomServer = require('react-dom/server');
const proxy = require('http-proxy-middleware');

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
        .then((res) => {
           resolve(res.data);
        }).catch(reject);
    })
};

const mfs = new MemoryFS();
serverConfig.mode='development';
const serverCompiler = webpack(serverConfig);
const Module = module.constructor;
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;

    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warning => console.log(warning));
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename,
    );
    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    const m = new Module();
    m._compile(bundle, 'server-entry.js');
    serverBundle = m.exports.default;
});

module.exports = function(app){
    app.use('/public', proxy({
        target:'http://localhost:8888'
    }));
    app.get('*', function (req, res) {
        getTemplate().then((template) => {
            const content = ReactDomServer.renderToString(serverBundle);
            res.send(template.replace('<!--app-->', content));
        });
    });
};