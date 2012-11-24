define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/stopNextTime.html"
], function($, _, Backbone, stopNextTimeTemplate) {
    var StopNextTimeView = Backbone.View.extend({
        tag: "div",
        className: "stopNextTime",
        initialize: function () {
            this.render();  
        },
        render: function () {
            var template = _.template(stopNextTimeTemplate, {
                nextTime: this.model.get("nextTime"),
                nextNextTime: this.model.get("nextNextTime")
            });
            this.$el.html(template);
            return this;
        }
    });
    return StopNextTimeView;
});