// @ts-ignore
/* eslint-disable */

declare namespace API {
  type JsonResult = {
    code?: number;
    msg?: string;
    content?: Record<string, any>;
  };

  type PageModel = {
    filter?: chaxunziduan[];
    token?: string;
    pageNum?: number;
    pageSize?: number;
  };

  type chaxunziduan = {
    /** 查询名称 数据库里面字段 */
    name?: string;
    /** 该字段的值 */
    value?: Record<string, any>;
    /** 判断  eq =  , like 模糊 ，ge 大于等于，le 小于等于，orderByDesc 倒序，orderByAsc 顺序 */
    symbols?: string;
  };

  type JsonResultString = {
    code?: number;
    msg?: string;
    content?: string;
  };
}
