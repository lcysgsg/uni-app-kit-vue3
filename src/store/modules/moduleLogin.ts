import { RootState } from '@/store';
import { Getters } from '@/store/vuex_ts';
import { commonAdminGetLoginInfo } from '@/services';
import { ActionContext } from 'vuex';

type IUserInfo = {
  department: any;
  ident: string;
  loginToken: string;
  menus: any[];
  openId: any;
  productName: string;
  roles: any[];
  state: number;
  sysType: string;
  user: {
    address: string;
    realName: string;
    userName: string;
    phone: string;
    gender: string;
    fpath: string;
    [key: string]: string | number;
  };
  userProductId?: number;
};

export type TModuleLogin = {
  userInfo: IUserInfo | undefined;
  token: string | undefined;
};

const state: TModuleLogin = {
  userInfo: undefined,
  token: undefined,
};

const mutations = {
  setUserInfo(state: TModuleLogin, userInfo: IUserInfo) {
    state.userInfo = userInfo;
    uni.setStorageSync('userInfo', userInfo);
  },
  setToken(state: TModuleLogin, token: string) {
    state.token = token;
    uni.setStorageSync('token', token);
  },
};

type LoginActionContext = ActionContext<TModuleLogin, RootState>;
const actions = {
  updateUserInfo(ctx: LoginActionContext) {
    return new Promise((resolve, reject) => {
      // 没token的时候触发更新
      const token = uni.getStorageSync('token');
      if (!token) {
        reject('需要登录');
        // uni.reLaunch({
        //   url: '/pages/Login/index',
        // });
      } else {
        commonAdminGetLoginInfo().then((userRes) => {
          ctx.commit('setUserInfo', userRes);
          ctx.commit('setToken', userRes.loginToken);
          resolve(userRes.data);
        });
      }
    });
  },

  clear(ctx: LoginActionContext) {
    ctx.commit('setUserInfo', undefined);
    ctx.commit('setToken', undefined);
    uni.removeStorageSync('user');
    uni.removeStorageSync('token');
  },
};

const getters: Getters<TModuleLogin> = {
  token: (state) => state.token,
  userInfo: (state) => state.userInfo,
};

const moduleLogin = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default moduleLogin;
