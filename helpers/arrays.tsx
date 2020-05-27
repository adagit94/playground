import { TransformAndSort } from 'types/helpers';

export const transformAndSort: TransformAndSort = (
  dataObj,
  ordering,
  orderBy
) => {
  const dataArr = [];

  if (orderBy !== undefined) {
    for (const key in dataObj) dataArr.push([key, dataObj[key][orderBy]]);
  } else {
    for (const key in dataObj) dataArr.push([key, dataObj[key]]);
  }

  switch (ordering) {
    case 'ascending':
      dataArr.sort((a, b) => a[1] - b[1]);
      break;

    case 'descending':
      dataArr.sort((a, b) => a[1] - b[1]).reverse();
      break;
  }

  return dataArr;
};
