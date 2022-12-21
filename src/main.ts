import { createSSRApp } from 'vue';
import App from './App.vue';
import store, { storeInjectionKey } from './store';

export function createApp() {
  const app = createSSRApp(App);

  app.use(store, storeInjectionKey);
  return {
    app,
  };
}
