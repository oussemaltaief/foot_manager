import { PAGES_BY_KEY, DEFAULT_PAGE } from '../const';

/**
 * Put date in DD/MM/YYYY format
 *
 * @param {Date} date date to format
 *
 * @returns formatted date
 */
export const formatDate = date => {
  const dateObj = new Date(date);
  const formattedDate = [
    dateObj.getDate(),
    dateObj.getMonth() + 1,
    dateObj.getFullYear()
  ]
    .map(i => (i < 10 ? '0' + i : i))
    .join('/');
  return formattedDate;
};

export const getByKey = options =>
  options.reduce((acc, options) => {
    acc[options.key] = options;
    return acc;
  }, {});

/**
 * Compute number of items to skip
 * based on limit and page
 *
 * @param {Number} limit number of items per page
 * @param {Number} page index of the page
 *
 * @returns number of items to skip
 */
export const getSkipFromLimitAndPage = (limit, page) => page * limit - limit;

/**
 * Returns an array of the keys from an array of objects.
 *
 * @param {Array} options array of objects
 *
 * @returns {Array} array of keys
 */
export const getKeys = options => options.map(option => option.key);

/**
 * Converts antd Table filters to feathers compatible ones.
 *
 * @param {Object} filters filters from antd Table
 * @param {Object} props filter properties and their types
 *
 * @returns {Object} converted filters
 */
export function convertFilters(filters, props = {}) {
  const query = Object.keys(filters).reduce((acc, key) => {
    const val = filters[key];

    if (val && val.length) {
      switch (props[key]) {
        case 'regex':
          acc[key] = { $regex: val[0], $options: 'i' };
          break;

        case 'array':
          acc[key] = { $in: val };
          break;

        case 'fullName':
          acc.$or = [
            { firstName: { $regex: val[0], $options: 'i' } },
            { lastName: { $regex: val[0], $options: 'i' } }
          ];
          break;

        default:
          acc[key] = val;
          break;
      }
    }

    return acc;
  }, {});

  return query;
}

/**
 * Converts antd Table sorter to a feathers compatible one.
 *
 * @param {Object} sorter sorter from antd Table
 * @param {Object} props sorter properties and their types
 *
 * @returns {Object} converted sorter
 */
export function convertSorter(sorter = {}, props = {}) {
  const { order, columnKey } = sorter;

  let sort;

  if (order && columnKey) {
    const dir = order === 'ascend' ? 1 : -1;

    switch (props[columnKey]) {
      case 'fullName':
        sort = { lastName: dir, firstName: dir };
        break;

      default:
        sort = { [columnKey]: dir };
    }
  }

  return sort;
}

/**
 * Converts antd Table meta (pagination, filters and sorter) to propeties
 * as needed by a client service.
 *
 * @param {Object} pagination pagination from antd Table
 * @param {Object} filters filters from antd Table
 * @param {Object} sorter sorter from antd Table
 * @param {Object} props filters/sorter properties and their types
 *
 * @returns {Object} converted meta
 */
export function convertTableMeta(pagination, filters, sorter, props = {}) {
  return {
    page: pagination.current,
    filter: convertFilters(filters, props),
    sort: convertSorter(sorter, props)
  };
}

/**
 * Checks whether specified use has acces to specified page.

 * @param {Object} user user to check access for
 * @param {String} page page key
 */
export function hasAccess(user, page) {
  return (
    (user &&
      PAGES_BY_KEY[page] &&
      PAGES_BY_KEY[page].access.indexOf(user.type) >= 0) ||
    false
  );
}

/**
 * Returns the default page to display for a user.
 *
 * @param {Object} user user for which to get the default page
 */
export function getDefaultPage(user) {
  return user && DEFAULT_PAGE[user.type];
}
