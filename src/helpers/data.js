import _ from 'lodash';

/**
 * Parses and normalizes height (given in feet/inches), returning inches.
 * @param {String} rawHeight
 * @returns {Number} height in inches or undefined.
 */
function parseHeight(rawHeight = '') {
  const matches = rawHeight.match(/^\D*(\d)\D*(\d+(?:\.5)?)?\D*$/);
  return matches ? (Number(matches[1]) * 12) + Number(matches[2]) : undefined;
}

/**
 * Parses and normalizes gender.
 *
 * @param {String} rawGender
 * @returns {String} gender code, 'M' or 'F' or an empty string if it is missing.
 */
function parseGender(rawGender = '') {
  const g = rawGender.charAt(0).toUpperCase();
  return g === 'M' || g === 'F' ? g : '';
}

/**
 * Parses a number from a string if possible.
 * @param {*} value
 */
function parseNumber(value) {
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? value : parsed;
}

/**
 * Parse and normalize a row from the CSV.
 *
 * @param {Object} row raw row, parsed from CSV.
 * @returns {Object} parsed CSV row.
 */
export default function parseRow(row) {
  // Apply transformations to all row values
  let mappedRow = _.mapValues(row, value =>
    _.reduce([
      _.trim,
      parseNumber,
    ], (acc, transform) => transform(acc), value));


  const weightKeys = _.map(_.range(7), i => `weight_${i}`);
  mappedRow.weights = _.map(weightKeys, k => mappedRow[k]);
  mappedRow = _.omit(mappedRow, weightKeys);

  // Apply column-specifc transformations
  return Object.assign(mappedRow, {
    height: parseHeight(row.height),
    gender: parseGender(row.gender),
  });
}
