if (typeof module === "object" && typeof require === "function") {
    var buster = require("buster");
    require("../lib/buster-qunit");
    var busterJstd = require("../lib/extension");
    //var Path = require("path");
    //var when = require("when");
}

buster.testCase('buster-qunit', {

    //setUp: function () {
    //},

    "test it": function() {
       assert(true);
    }


});
