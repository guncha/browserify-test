var fs = require("fs")
var myFS = Object.create(fs)

Object.keys(fs).forEach(function(name) {
  if (typeof fs[name] === "function") {
    myFS[name] = function() {
      console.log(name, arguments[0])
      return fs[name].apply(this, arguments)
    }
  }
})

require.cache.fs = {
  id: "fs",
  exports: myFS
}

cache = {}
pkgCache = {}

browserify = require("browserify")
browserify([], {transform: ['aliasify']})
  .add("a.js")
  .bundle(function(err, result) {
    console.log(err, result)
  })
