import Router from 'koa-router';
import axios from '../../dbs/utils/axios';
import Province from '../../dbs/models/province';
import Menu from '../../dbs/models/menu';
import City from '../../dbs/models/city';
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
});

router.get('/menu', async ctx => {
  let result = await Menu.findOne();
  ctx.body = {
    menu: result.menu
  };
});

router.get('/province', async ctx => {
  let result = await Province.find();
  ctx.body = {
    province: result.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      };
    })
  };
});

router.get('/province/:id', async ctx => {
  let city = await City.findOne({
    id: ctx.params.id
  });
  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return { province: item.province, id: item.id, name: item.name };
    })
  };
});
router.get('/city', async ctx => {
  let city = [];
  let result = await City.find();
  result.forEach(item => {
    city = city.concat(item.value);
  });
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name:
          item.name === '市辖区' || item.name === '省直辖县级行政区划'
            ? item.province
            : item.name
      };
    })
  };
});
router.get('/hotCity', async ctx => {
  let list = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ];
  let result = await City.find();
  let nList = [];
  result.forEach(item => {
    nList = nList.concat(
      item.value.filter(k => list.includes(k.name) || list.includes(k.province))
    );
  });
  ctx.body = {
    hots: nList
  };
});
export default router;
