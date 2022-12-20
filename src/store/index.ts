import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import moduleLogin, { TModuleLogin } from './moduleLogin';

export interface IRootState {
  moduleLogin: TModuleLogin;
}

export const storeInjectionKey: InjectionKey<Store<IRootState>> = Symbol();

const store = createStore<IRootState>({
  modules: {
    moduleLogin,
  },
});

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(storeInjectionKey);
}

export default store;
