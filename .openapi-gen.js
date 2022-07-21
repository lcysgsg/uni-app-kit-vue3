const path = require('path');
module.exports = [
  // https://github.com/lcysgsg/openapi2typescript/blob/main/src/index.ts#L20
  // 参考 @umijs/openapi type GenerateServiceProps
  // export type GenerateServiceProps = {
  //     requestLibPath?: string;
  //     requestImportStatement?: string;
  //     /**
  //      * api 的前缀
  //      */
  //     apiPrefix?:
  //         | string
  //         | ((params: {
  //             path: string;
  //             method: string;
  //             namespace: string;
  //             functionName: string;
  //             autoExclude?: boolean;
  //         }) => string);
  //     /**
  //      * 生成的文件夹的路径
  //      */
  //     serversPath?: string;
  //     /**
  //      * openAPI 3.0 的地址
  //      */
  //     schemaPath?: string;
  //     /**
  //      * 项目名称
  //      */
  //     projectName?: string;
  //     hook?: {
  //         /** 自定义函数名称 */
  //         customFunctionName?: (data: OperationObject) => string;
  //         /** 自定义类名 */
  //         customClassName?: (tagName: string) => string;
  //     };
  //     namespace?: string;
  //     mockFolder?: string;
  // };
  // ===========================================================
  // = e.g.
  // ===========================================================
  // {
  //   projectName: 'api',
  //   schemaPath: 'http://192.168.1.253:8000/ananliangliang/tt-order-backend/-/raw/main/openapi/api/openapi.yml',
  //   requestLibPath: "import { request } from '@/utils/request'",
  //   hook: {
  //     customFunctionName(OperationObject) {
  //       // 使用接口路径作函数名。
  //       // '/business_under/car-back/removeByIds'.replace(/(\/|-|_).{0,1}/g, (w) => w[1].toLocaleUpperCase())
  //       // => 'BusinessUnderCarBackRemoveByIds'
  //       return OperationObject.path
  //         .replace(/\/\{.*\}/g, '')
  //         .replace(/(\/|-|_).{0,1}/g, (w) => w[1].toLocaleUpperCase());
  //     },
  //   },
  // },
];
