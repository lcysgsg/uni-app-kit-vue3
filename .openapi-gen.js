const openAPI = require('openapi2typescript-yaml');
const path = require('path');
const config = [
  // https://github.com/lcysgsg/openapi2typescript/blob/main/src/index.ts#L20
  // 参考 @umijs/openapi type GenerateServiceProps
  // {
  //   projectName: 'system',
  //   schemaPath: 'http://192.168.1.110:8080/v2/api-docs?group=%E7%B3%BB%E7%BB%9F%E6%A8%A1%E5%9D%97',
  //   requestLibPath: "import { request } from '@/utils/request'",
  //   hook: {
  //     customFunctionName(OperationObject) {
  //       // 使用接口路径作函数名。
  //       // '/business_under/car-back/removeByIds'.replace(/(\/|-|_).{0,1}/g, (w) => w[1].toLocaleUpperCase())
  //       // => 'BusinessUnderCarBackRemoveByIds'
  //       // console.log(`[info]::OperationObject.path`, OperationObject.path);
  //       if (OperationObject.path === '/') return OperationObject.path;
  //       const nameWithPath = [];
  //       if (Array.isArray(OperationObject.parameters)) {
  //         for (let i = 0; i < OperationObject.parameters.length; i++) {
  //           const param = OperationObject.parameters[i];
  //           if (param.in === 'path') {
  //             nameWithPath.push(param.name);
  //           }
  //         }
  //       }
  //       const nameWithPathStr = nameWithPath.map((e) => e.slice(0, 1).toLocaleUpperCase() + e.slice(1)).join('');
  //       const nameWithMethodStr = OperationObject.method
  //         ? OperationObject.method.slice(0, 1).toLocaleUpperCase() + OperationObject.method.slice(1).toLocaleLowerCase()
  //         : '';
  //       return (
  //         OperationObject.path.replace(/\/\{.*\}/g, '').replace(/(\/|-|_).{0,1}/g, (w) => w[1].toLocaleUpperCase()) +
  //         nameWithPathStr
  //       );
  //     },
  //   },
  // },
];

config.forEach((e) => {
  openAPI.generateService({
    serversPath: './src/services',
    ...e,
  });
});
