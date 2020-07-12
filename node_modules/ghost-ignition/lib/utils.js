var findRoot = require('find-root');
var caller = require('caller');

/**
 * @description Get caller root.
 *
 * Used by debug,
 * because we want to find the root (where a package.json exists) nearest to the calling module.
 * So that debug messages are output relative to the CALLER module
 *
 * caller dependency is able to detect the calling unit
 * they are doing this with the trick of creating an error stack
 * caller(2) means -> get me the previous calling unit
 *
 * Example Structure:
 * Ghost
 *    node_modules
 *       ghost-ignition
 *       passport-ghost
 *
 * Ghost uses ghost-ignition and passport-ghost uses ghost-ignition.
 *
 * If passport-ghost calls ghost-ignition, caller(2) would return the last caller of this module
 * If Ghost calls ghost-ignition, caller(2) would return the last caller of this module
 * And findRoot will be able to get the latest path with a valid package.json
 */
exports.getCallerRoot = function getCallerRoot() {
    try {
        return findRoot(caller(2));
    } catch (err) {
        return;
    }
};

/**
 * @description Get current working directory.
 *
 * Used by config,
 * because we want to find the root (where a package.json exists) nearest to the current working directory
 * So that configuration uses the config file AT the CWD, or at the project root of the CWD
 *
 * process.cwd() is the path from which `node` was called
 * usually, the root of a project, e.g. the same level as where package.json,
 * config.*.json and node_modules folder would be found.
 *
 * However, in some cases, the CWD may be deeper in the project,
 * e.g. if using a script, or using a childprocess.
 */
exports.getCWDRoot = function getCWDRoot() {
    try {
        return findRoot(process.cwd());
    } catch (err) {
        return;
    }
}
