import { commonAdminGetLoginInfo } from '@/services';
import { ActionContext, Module, ModuleTree, Store, StoreOptions } from 'vuex';
import { IRootState } from '.';
// import { IndexGetLoginInfo } from '@/services/api/denglujiekou';

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

const moduleLogin: Module<TModuleLogin, IRootState> = {
  namespaced: true,
  state: {
    userInfo: undefined,
    token: undefined,
  },
  mutations: {
    setUserInfo(state, userInfo: IUserInfo) {
      state.userInfo = userInfo;
      uni.setStorageSync('userInfo', userInfo);
    },
    setToken(state, token: string) {
      state.token = token;
      uni.setStorageSync('token', token);
    },
  },
  actions: {
    updateUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // 没token的时候触发更新
        const token = uni.getStorageSync('token');
        if (!token) {
          reject('需要登录');
          // uni.reLaunch({
          //   url: '/pages/Login/index',
          // });
        } else {
          console.log('[TODO]:: 在这里连接接口登录');

          // commonAdminGetLoginInfo().then((userRes) => {
          //   commit('setUserInfo', userRes);
          //   commit('setToken', userRes.loginToken);
          //   resolve(userRes.data);
          // });
        }
      });
    },

    clear({ commit }) {
      commit('setUserInfo', undefined);
      commit('setToken', undefined);
      uni.removeStorageSync('user');
      uni.removeStorageSync('token');
    },
  },
};

export default moduleLogin;
