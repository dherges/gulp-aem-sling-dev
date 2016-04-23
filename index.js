/*
 * gulp-aem-sling-dev
 * https://github.com/dherges/gulp-aem-sling-dev
 *
 * Copyright (c) 2016 David Herges
 * Licensed under the MIT license.
 */

var through = require('through2')
  , streamBuffers = require('stream-buffers')
  , workspace = require('well-aem-sling-dev').workspace
  , gutil = require('gulp-util')
  , PluginError = gutil.PluginError

/**
 * Gulp plugin that posts files to a running sling instance
 *
 * @param {Object} opts Sling options passed to {@link ./sling.js} instance
 * @returns {*}
 */
module.exports = function (opts) {
  opts = opts || {}

  var ws
  if (opts.workspaceDir) {
    ws = workspace(opts.workspaceDir)
  }

  return through.obj(function (file, encoding, callback) {

    if (file.isNull()) {
      // nothing to do
      return callback(null, file);
    }

    var self = this
      , stream
    if (file.isBuffer()) {
      // file.contents is a Buffer - https://nodejs.org/api/buffer.html
      stream = new streamBuffers.ReadableStreamBuffer({})
      stream.put(file.contents);
    } else if (file.isStream()) {
      // file.contents is a Stream - https://nodejs.org/api/stream.html
      stream = file
    }

    if (!ws) {
      ws = workspace.for(file, opts)
    }

    ws.uploadFile(file, function (err, data, res) {
      callback(null, file)
    })

  }, function(callback) {
    callback()
  })
}
