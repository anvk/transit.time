define([
    "underscore",
    "backbone"
], function(_, Backbone) {
    var StopNextTimeModel = Backbone.Model.extend({
        defaults: {
            nextTime: 0,
            nextNextTime: 0
        },
        initialize: function () {
            
        }
    });
    return StopNextTimeModel;
});