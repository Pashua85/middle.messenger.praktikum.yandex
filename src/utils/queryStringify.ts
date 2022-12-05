// TODO убрать any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function queryStringify(data: any) {
  if (!data) return '';
  const queryParams = Object.keys(data).map((item) => `${item}=${data[item]}`);
  return `?${queryParams.join('&')}`;
}
