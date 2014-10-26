'use strict';

var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-responsive';

function gulpResponsive() {

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
		}

		cb(null, file);
	});
}

module.exports = gulpResponsive;
