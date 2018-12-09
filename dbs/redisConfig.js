const redis = {
  get host() {
    return '127.0.0.1';
  },
  get port() {
    return 6379;
  },
  smtp: {
    get host() {
      return 'smtp.qq.com';
    },
    get user() {
      return 'k.cohen@foxmail.com';
    },
    get pass() {
      return 'ejrktbpdcogqcbbe';
    },
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase();
      };
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 100;
      };
    }
  }
};
export default redis;
