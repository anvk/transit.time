define([
    "jquery", 
    "underscore", 
    "backbone",
    "models/stop"
], function($, _, Backbone, StopModel) {
    var StopCollection = Backbone.Collection.extend({
        model: StopModel,
        initialize: function (models, options) {
            options || (options = {});
            this.name = options.name || "List of stops";
        }
    });
    return StopCollection;
});