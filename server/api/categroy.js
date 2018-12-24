import Router from 'koa-router';
import axios from '../../dbs/utils/axios';
import Redis from 'koa-redis';
import sign from './sign';

let router = new Router({ prefix: '/categroy' });

router.get('/crumbs', async ctx => {
  // let result = await Categroy.findOne({city: ctx.query.city.replace('市', '') || '北京'})
  // if (result) {
  //   ctx.body = {
  //     areas: result.areas,
  //     types: result.types
  //   }
  // } else {
  //   ctx.body = {
  //     areas: [],
  //     types: []
  //   }
  // }

  //这里使用cookies是因为 store在asyncData中无法获得值
  const city = new Buffer(ctx.cookies.get('cur_city'), 'base64').toString();

  let {
    status,
    data: { areas, types }
  } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params: {
      city,
      sign
    }
  });
  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  };
});

export default router;
