import { InjectionKey } from 'vue';
import { createStore, Store as VuexStore, useStore as baseUseStore } from 'vuex';
import moduleLogin, { TModuleLogin } from './modules/moduleLogin';
import { CommonStore } from './vuex_ts';

export interface RootState {
  moduleLogin: TModuleLogin;
}

export type Store = CommonStore;

// 把多个模块聚合在一起
export const modules = {
  moduleLogin: moduleLogin,
};

export const storeInjectionKey: InjectionKey<VuexStore<RootState>> = Symbol();

const rootStore = createStore<RootState>({
  modules,
}) as CommonStore;

// 定义自己的 `useStore` 组合式函数
export function useStore(): CommonStore {
  return baseUseStore(storeInjectionKey);
}

export default rootStore;
