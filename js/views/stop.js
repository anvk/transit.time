define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/stop.html",
    "models/stopNextTime",
    "views/stopNextTime"
], function($, _, Backbone, stopViewTemplate, StopNextTimeModel, StopNextTimeView) {
    var StopView = Backbone.View.extend({
        tag: "div",
        className: "stopView",
        initialize: function () {
            this.stopNextTimeModel = new StopNextTimeModel({
                nextTime: 10,
                nextNextTime: 12
            });
        },
        render: function () {
            var get = this.model.get,
                template = _.template(stopViewTemplate, {
                    routeName: get("routeName"),
                    stopName: get("stopName")
                });
            this.$el.html(template);
            this.stopNextTimeView = new StopNextTimeView({
                model: this.stopNextTimeModel
            });
            this.nextTimePlaceholder = this.$el.find(".stopNextTimePlaceholder");
            this.nextTimePlaceholder.html(this.stopNextTimeView.render().el);
            
            var that = this;
            this.a = setTimeout(function () {
                that.stopNextTimeView.model.set({nextTime: 9});
                that.stopNextTimeView.render();
            }, 3000);
            return this;
        }
    });
    return StopView;
});