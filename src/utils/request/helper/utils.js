/**
 * 判断无效参数, null、undefined、'' 会
 * 0 是有效值
 * @param {number|string} val
 */
export function isValidParam(val) {
  return val !== null && val !== undefined && val !== '';
}

/**
 * 筛选得到非null字段
 * @param {object} params 对象
 */
export function filterObjectNullVal(params) {
  const result = {};
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (isValidParam(key)) {
        result[key] = params[key];
      }
    }
  }
  return result;
}

export function isUploadFile(config) {
  if (config.filePath && config.name) {
    return true;
  }
  if (config.files) {
    return true;
  }
  return false;
}
