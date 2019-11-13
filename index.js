var fs    = require('fs'),
    path  = require('path'),
    merge = require('merge');

var scriptsDir     = __dirname,
		defaultOptions = {
			lazyClass: 'lazyfrz',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-frz-src',
			srcsetAttr: 'data-frz-srcset',
			sizesAttr: 'data-frz-sizes',
			init: true,
			loadHidden: false,
		};


function customizeScript (script, options) {
  var opts = merge({}, defaultOptions, options);
  return ';window.lazySizesConfig = window.frzCustomLazysizesConfig ? window.frzCustomLazysizesConfig : ' + JSON.stringify(opts) + ';' + script;
}

var script = fs.readFileSync(path.join(scriptsDir, 'lazysizes.min.js'), 'utf8');
module.exports.script = function (options) {
  return customizeScript(script, options);
};

var scriptDebug = fs.readFileSync(path.join(scriptsDir, 'lazysizes.js'), 'utf8');
module.exports.scriptDebug = function (options) {
  return customizeScript(scriptDebug, options);
};
