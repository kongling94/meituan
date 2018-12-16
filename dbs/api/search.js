import Router from 'koa-router';

import axios from '../utils/axios';
import Poi from '../models/poi';
let router = new Router({
  prefix: '/search'
});
router.get('/top', async ctx => {
  try {
    let top = await Poi.find({
      name: new RegExp(ctx.query.input),
      city: ctx.query.city
    });
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        };
      }),
      type: top.length ? top[0].type : ''
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    };
  }
});
router.get('/hotPlace', async ctx => {});
router.get('/resultsByKeywords', async ctx => {});
router.get('/products', async ctx => {});
export default router;
