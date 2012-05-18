
var path = require("path");

module.exports = {
    create: function (options) {
        return Object.create(this);
    },

    configure: function (config) {
        config.on("load:tests", function (resourceSet) {            
            var r1 = path.resolve(__dirname, './buster-qunit.js');
            var r2 = path.resolve(__dirname, './buster-qunit-epilogue.js');
            resourceSet.addFileResource(r1);
            resourceSet.addFileResource(r2);
            resourceSet.prependLoad([r1]);
            resourceSet.appendLoad([r2]);
        });
    }
};

