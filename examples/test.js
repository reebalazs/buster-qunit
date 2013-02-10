
module('the-example', {
/*
    setup: function() {
    },

    teardown: function() {
    }
*/
});


test("Create / destroy", function() {

    $('#the-node').example({
    });

    $('#the-node').example('destroy');

});


test("Changes label", function() {

    $('#the-node').example({
    });
    equal($('#the-node').text(), 'Hello World!');

    $('#the-node').example('destroy');
    equal($('#the-node').text(), 'The Node Text');

});


test("Label option", function() {

    $('#the-node').example({
        label: 'Buster.js is awesome!'
    });
    equal($('#the-node').text(), 'Buster.js is awesome!');

    $('#the-node').example('destroy');
    equal($('#the-node').text(), 'The Node Text');

});

