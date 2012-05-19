
var path = require("path");

module.exports = {

   create: function (options) {
        var instance = Object.create(this);
        instance.options = options;
        return instance;
    },

    configure: function (group) {
        group.on("load:tests", function (resourceSet) {
            resourceSet.addFileResource(path.resolve(__dirname, 'buster-qunit.js'), {
                path: '/buster-qunit/buster-qunit.js'
            });
            resourceSet.addFileResource(path.resolve(__dirname, 'buster-qunit-epilogue.js'), {
                path: '/buster-qunit/buster-qunit-epilogue.js'
            });
            resourceSet.prependLoad(['/buster-qunit/buster-qunit.js']);
            resourceSet.appendLoad(['/buster-qunit/buster-qunit-epilogue.js']);
        });
    }

};

