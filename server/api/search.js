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
router.get('/hotPlace', async ctx => {});
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
