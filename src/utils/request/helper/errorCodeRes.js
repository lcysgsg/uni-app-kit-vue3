import store from '@/store';

/**
 * 错误返回码 统一处理
 */
export default function apiErrorCodeHandling(error) {
  // console.error('apiErrorCodeHandling: ', console.log(JSON.stringify(error)));
  // 错误返回码
  const code = Number(error.data.code);
  let msg = error.data.msg || '';

  switch (code) {
    // 登录错误
    case 400:
      // message = `${message}`;
      // console.log('[request]登录失效');
      uni.showToast({
        title: msg,
        icon: 'none',
        duration: 2000,
      });
      break;

    case 1000:
      store?.dispatch('login/clear');
      uni.reLaunch({
        url: '/pages/Login/index',
      });
      break;
    default:
      msg = `ERROR_CODE:${code}::UNKNOWN ERROR`;
      break;
  }

  return {
    ...error,
    msg: msg,
  };
}
