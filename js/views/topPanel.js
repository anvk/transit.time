define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/topPanel.html"
], function($, _, Backbone, topPanelTemplate) {
    var TopPanel = Backbone.View.extend({
        tag: "div",
        className: "topPanel",
        initialize: function () {
            this.render();
        },
        render: function () {
            var template = _.template(topPanelTemplate, {});
            this.$el.html(template);
            return this;
        }
    });
    return TopPanel;
});