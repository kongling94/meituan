import Router from 'koa-router';
import axios from '../../dbs/utils/axios';
import md5 from 'crypto-js/md5';
import Redis from 'koa-redis';
import sign from './sign';
import Cart from '../../dbs/models/cart';

let router = new Router({ prefix: '/cart' });

router.post('/create', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login!'
    };
  } else {
    let time = new Date();
    let cartNo = md5(Math.random() * 1000 + new Date().getTime()).toString();
    let {
      params: { id, detail }
    } = ctx.request.body;
    let cart = new Cart({
      id,
      cartNo,
      time,
      detail,
      user: ctx.session.passport.user
    });
    let result = await cart.save();
    if (result) {
      ctx.body = {
        code: 0,
        mgs: '',
        id: cartNo
      };
    } else {
      ctx.bod = {
        code: -1,
        msg: '写入错误'
      };
    }
  }
});

router.post('/getCart', async ctx => {
  let { id } = ctx.request.body;
  console.log(id);

  try {
    let result = await Cart.findOne({ cartNo: id });
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    };
  }
});
export default router;
