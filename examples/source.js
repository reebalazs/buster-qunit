(function($) {

$.widget('the.example', {

    options: {
        label: 'Hello World!'
    },

    _create: function() {
        var self = this;
        // save the old text
        this.oldText = this.element.text();
        this.element.text(this.options.label);
    },

    destroy: function() {
        this.element.text(this.oldText);
        $.Widget.prototype.destroy.call(this);
    }

});


})(jQuery);
