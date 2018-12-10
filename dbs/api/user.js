import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer';
import axios from '../utils/axios';
import passport from '../utils/passport';
import Email from '../redisConfig';

// 引入数据库模型
import User from '../models/user';

// 定义路由就口前缀
let router = new Router({
  prefix: '/users'
});

let Store = new Redis().client;

// 注册的接口
router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body;
  // 注册前 验证码的校验
  if (code) {
    // 获取 redis中的code值
    const saveCode = await Store.hget(`nodemail:${username}`, 'code');
    // 获取 redis中的过期时间
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
    // code值的校验
    if (code === saveCode) {
      // code为真下 过期时间的检验
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        };
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码错误'
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请输入验证码'
    };
  }
  // 用户名的校验
  let user = await User.findOne({
    username
  });
  // 数据库中查询到已经存在
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已存在'
    };
    return;
  }
  // 写入数据库
  let n_user = await User.create({
    username,
    password,
    email
  });
  // 写入是否成功
  if (n_user) {
    let res = await axios.post('/users/signin', {
      username,
      password
    });
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      };
    } else {
      ctx.body = {
        code: -1,
        msg: '注册失败'
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    };
  }
});

// 登录
router.post('/signin', async (ctx, next) => {
  return passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      };
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登陆成功',
          user
        };
        return ctx.login(user);
      } else {
        ctx.body = {
          code: 1,
          msg: info
        };
      }
    }
  })(ctx, next);
});

// 验证码验证
router.post('/verify', async function(ctx, next) {
  let user = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail:${user}`, 'expire');
  // 频繁请求拦截
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁'
    };
    return false;
  }
  // Email地址的相关配置
  let smtpConfig = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  });
  // 生成验证码和注册的信息
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  };

  // 邮件内容的设置
  let mailOptions = {
    from: `"认证邮件"<${Email.smtp.user}>`,
    to: ko.email,
    subject: '丑团网注册验证信息',
    html: `注册验证码是${ko.code}`
  };
  // 发送验证码到邮箱
  await smtpConfig.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log('error');
    } else {
      Store.hmset(
        `nodemail:${ko.user}`,
        'code',
        ko.code,
        'expire',
        ko.expire,
        'email',
        ko.email
      );
    }
  });
  ctx.body = {
    code: 0,
    msg: '验证码已发送'
  };
});

//登出
router.get('/exit', async function(ctx, next) {
  await ctx.logout();
  // 登出检查
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '登出成功'
    };
  } else {
    ctx.body = {
      code: -1
    };
  }
});

//获取用户名和邮箱
router.get('/getuser', async ctx => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email
    };
  } else {
    ctx.body = {
      user: '',
      email: ''
    };
  }
});
export default router;
