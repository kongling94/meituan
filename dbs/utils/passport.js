import passsport from 'koa-passport';
import LocalStrategry from 'passport-local'; //本地策略
import UserModel from '../models/user';

passsport.use(
  new LocalStrategry(async function(username, password, done) {
    // 查询条件
    let where = {
      username
    };
    //数据库查询结果 为真 返回整个user的信息
    let result = await UserModel.findOne(where);

    if (result != null) {
      // 返回匹配的信息
      if (result.passsport === password) {
        return done(null, result);
      } else {
        return done(null, false, '密码不对');
      }
      // 错误信息
    } else {
      return done(null, false, '用户不存在');
    }
  })
);

// 序列化操作
passsport.serializeUser(function(user, done) {
  done(null, user);
});
//反序列化
passsport.deserializeUser(function(user, done) {
  return done(null, user);
});

export default passsport;
