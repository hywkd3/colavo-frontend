const { useBabelRc, removeModuleScopePlugin, override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(useBabelRc(), removeModuleScopePlugin(), addWebpackAlias({ '@': path.resolve(__dirname, 'src') }));
