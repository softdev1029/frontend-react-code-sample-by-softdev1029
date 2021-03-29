/**
 * @param {string} separator - The element separator.
 * @param {readonly string[]} array - The array to convert.
 */
const join = (separator, array) => array.join(separator);

/**
 * @typedef {Object} Config - Husky config options.
 * @property {boolean} [skipCI=true] - Specify if hooks should be skipped in CI.
 * @property {{ [key: string]: string }} [hooks] - The git hooks to install.
 */

/** @type {Config} */
const config = {
  hooks: {
    "commit-msg": "yarn commitlint -E HUSKY_GIT_PARAMS",
    "pre-commit": join(" && ", [
      "yarn check:audit",
      "yarn check:constraints",
      "yarn check:staged",
      "yarn check:version",
    ]),
  },
};

module.exports = config;
