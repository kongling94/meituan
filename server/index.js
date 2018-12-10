const Koa = require('koa');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
// cookies存储
const session = require('koa-generic-session');
const Redis = require('koa-redis');
const json = require('koa-json');
import mongoose from 'mongoose';
//数据库相关
import dbConfig from '../dbs/config';

const app = new Koa();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
// 接口
import User from '../dbs/api/user';
import passport from '../dbs/utils/passport';
import bodyparser from 'koa-bodyparser';

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

  // redis相关的设置
  app.keys = ['mt', 'keys'];
  app.proxy = true;
  app.use(
    session({
      key: 'mt',
      prefix: 'mt:uid',
      store: new Redis()
    })
  );
  // 数据格式化
  app.use(
    bodyparser({
      extendTypes: ['json', 'form', 'text']
    })
  );
  app.use(json());

  mongoose.connect(
    'mongodb://127.0.0.1:27017/choutuan',
    {
      useNewUrlParser: true
    }
  );
  //配置的后台接口
  app.use(User.routes()).use(User.allowedMethods());
  // redis本地策略的格式化
  app.use(passport.initialize());
  app.use(passport.session());

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
