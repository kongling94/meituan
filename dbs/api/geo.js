import Router from 'koa-router';

import axios from '../utils/axios';

// 定义路由就口前缀
let router = new Router({
  prefix: '/geo'
});

/* const sign = 'abcd',
  old_URL = 'http://cp-tools.cn/geo/getPosition?sign=${sign}'; */
router.get('/getPosition', async ctx => {
  let ip;
  let { status, data } = await axios.get(
    'http://www.taobao.com/help/getip.php'
  );
  if (status === 200) {
    ip = data.split('"')[1];
  }
  if (ip) {
    let {
      status,
      data: {
        data: { city, region }
      }
    } = await axios.get(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`);
    if (status === 200) {
      ctx.body = {
        city,
        region
      };
    }
  } else {
    ctx.body = {};
  }
  /*  if (status === 200) {
    ctx.body = {
      province,
      city
    };
  } else {
    ctx.body = {
      province: '',
      city: ''
    };
  } */
});
export default router;
