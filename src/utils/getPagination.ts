export const getPagination = (page: number, size: number) => {
  const limit = +size;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};
