// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

export async function commonAdminLogin(
  body: {
    ident: string;
    passWord: string;
    sysType: string;
    userName: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.JsonResult>('/common/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function commonAdminGetLoginInfo(options?: { [key: string]: any }) {
  return request<API.JsonResult>('/common/admin/getLoginInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function warehouseGoodsListByReginon(body: any, options?: { [key: string]: any }) {
  return request<API.JsonResult>('/warehouse/goods/listByReginon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
