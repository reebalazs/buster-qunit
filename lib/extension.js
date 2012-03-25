
var path = require("path");

module.exports = {
    create: function (options) {
        return Object.create(this);
    },

    configure: function (config) {
        config.on("load:tests", function (resourceSet) {            
            resourceSet.prependLoad([path.resolve(__dirname, './buster-qunit.js')]);
            resourceSet.appendLoad([path.resolve(__dirname, './buster-qunit-epilogue.js')]);
        });
    }
};

