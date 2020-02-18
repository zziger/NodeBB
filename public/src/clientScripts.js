// https://webpack.js.org/guides/dependency-management/#context-module-api
// import everything in ../../build/public/src/clientScripts
// these are scripts defined by plugins in plugin.json "scripts" key
// function importAll(r) {
// 	r.keys().forEach(r);
// }

// importAll(require.context('../../build/public/src/clientScripts', true, /\.js$/));
require('../../build/public/clientScripts.min.js');
