define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/stop.html"
], function($, _, Backbone, stopViewTemplate) {
    var StopView = Backbone.View.extend({
        tag: "div",
        className: "stopView",
        render: function() {
            var template = _.template(stopViewTemplate, {
                routeName: this.model.get("routeName")
            });
            this.$el.html(template);
            return this;
        }
    });
    return StopView;
});