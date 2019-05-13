  exports.isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);

  exports.filtered = (object, filtr) => {
    return Object.keys(object._doc)
      .filter((key) => {
        if (filtr(key))
          return {}
      })
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: object[key]
        }
      }, {});
  }