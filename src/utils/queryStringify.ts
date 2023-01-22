import { AnyType } from '../types';

export function queryStringify(data: AnyType) {
  if (!data) return '';
  const queryParams = Object.keys(data).map((item) => `${item}=${data[item]}`);
  return `?${queryParams.join('&')}`;
}
