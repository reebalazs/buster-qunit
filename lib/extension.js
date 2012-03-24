
var path = require("path");

module.exports = {
    create: function (options) {
        return Object.create(this);
    },

    configure: function (config) {
        config.on("load:framework", function (resourceSet) {            
            var file1 = resourceSet.addFileResource(path.resolve(__dirname, "./buster-qunit.js"), {
                path: "/qunit/buster-qunit.js"
            });
            var file2 = resourceSet.addFileResource(path.resolve(__dirname, "./buster-qunit-epilogue.js"), {
                path: "/qunit/buster-qunit-epilogue.js"
            });
            var paths = resourceSet.loadPath.paths();
            buster.promise.all(file1, file2).then(function () {
                var paths = resourceSet.loadPath.paths();
                //resourceSet.loadPath.prepend('/qunit/buster-qunit.js');
                //resourceSet.loadPath.append('/qunit/buster-qunit-epilogue.js');
            });
        });
    }
};

