const Koa = require('koa');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
// cookies存储
const session = require('koa-generic-session');
const Redis = require('koa-redis');
//数据库相关
const mongoose = require('../dbs/config');

const app = new Koa();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
// 接口
const cityInterface = require('./interface/list');
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  app.keys = ['keys', 'nameList'];
  app.use(
    session({
      store: new Redis()
    })
  );

  //配置的后台接口
  app.use(cityInterface.routes()).use(cityInterface.allowedMethods());

  app.use(ctx => {
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve);
      ctx.res.on('finish', resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
