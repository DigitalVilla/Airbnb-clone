/**
 * Determines whether an object is empty.
 * @param object The element to validate.
 * @returns If empty true false otherwise
 */
exports.isEmpty = object =>
  object === undefined ||
  object === null ||
  (typeof object === 'object' && Object.keys(object).length === 0) ||
  (typeof object === 'string' && object.trim().length === 0);


/**
 * Filters the elements in an object and returns a new copy.
 * @param object The object to filter.
 * @param filters The array with elements to bo filtered.
 * @param toInclude If false, the elements in filters willbe excluded.
 * @returns A filteredcopy of the object.
 */
exports.filtered = (object, filters, toInclude = true) => {
  return Object.keys(object)
    .filter((key) => {
      if (toInclude) // include only ites that match the filters array
        return filters.includes(key)
      if (!toInclude) //exluce items that match the filters array
        return !filters.includes(key)
    })
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: object[key]
      }
    }, {});
}

/////
exports.parsErr = (errors) => {
  const err = {};
  if (errors.hasOwnProperty("errors")) {
    for (const e in errors) {
      if (errors.hasOwnProperty(e))
        err[e] = errors[e].message;
    }
    return err;
  }

  if (errors.hasOwnProperty("errmsg"))
    return parse(errors.errmsg)

  return errors
}

function parse(err) { // parse duplicate key error
  const start = (err.indexOf('$') >= 0) ?
    err.indexOf('$') + 1 //mlab error
    :
    err.indexOf('x:') + 3; // mongo error
  const end = err.indexOf('_');
  const type = err.slice(start, end);
  // console.log(type);
  return {
    [type]: `That ${type} is already registered`
  };
}