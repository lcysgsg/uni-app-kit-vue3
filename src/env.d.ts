/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production';
    RUN_BY_HBUILDERX: boolean;
    UNI_COMPILER_VERSION: string;
    UNI_DEBUG: boolean;
    UNI_PLATFORM: string;
    UNI_STAT_DEBUG: boolean;
  };
};

interface ImportMetaEnv {
  // 更多环境变量...
  readonly VITE_APP_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
