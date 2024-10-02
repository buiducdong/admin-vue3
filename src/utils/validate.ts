/* eslint-disable @typescript-eslint/no-explicit-any */
export const isExternal = (path: any) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};
