import Router from 'koa-router';

import axios from '../../dbs/utils/axios';
import Poi from '../../dbs/models/poi';

let router = new Router({
  prefix: '/search'
});
router.get('/top', async ctx => {
  let {
    status,
    data: { data }
  } = await axios.get('https://www.meituan.com/ptapi/suggest', {
    params: {
      keyword: ctx.query.input,
      city: ctx.query.city
    }
  });
  if (status === 200) {
    ctx.body = {
      top: data.suggestItems
    };
  }
});
router.get('/hotPlace', async ctx => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
  try {
    let result = await Poi.find({
      city,
      type: ctx.query.type || '景点'
    }).limit(10);

    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        };
      })
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    };
  }
});
router.get('/resultsByKeywords', async ctx => {
  const { city, keyword } = ctx.query;
  let {
    status,
    data: { data }
  } = await axios.get('https://bj.meituan.com/ptapi/getScenesList', {
    params: {
      theme: 'quality',
      tab: keyword,
      ci: 1,
      limit: 10
    }
  });

  if (status === 200) {
    ctx.body = {
      data
    };
  }
});
router.get('/products', async ctx => {});
export default router;
