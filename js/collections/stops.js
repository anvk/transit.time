define([
    "jquery", 
    "underscore", 
    "backbone",
    "models/stop"
], function($, _, Backbone, StopModel) {
    var StopCollection = Backbone.Collection.extend({
        model: StopModel,
        timeUpdate: false,
        initialize: function (models, options) {
            _.bindAll(this, "setCurrentTime");
            options || (options = {});
            this.name = options.name || "List of stops";
            this.timeUpdate = options.timeUpdate || this.timeUpdate;
            if (this.timeUpdate) {
                _.map(models, this.setCurrentTime);
                this.on("add", this.setCurrentTime);
            }
        },
        setCurrentTime: function (model) {
            model.set({
                currentTime: this.getTime()
            })
        },
        getTime: function () {
            var date = new Date(),
                minutes = date.getMinutes(),
                hours = date.getHours();
            if (minutes.length === 1) {
                minutes = "0" + minutes;
            }
            return hours + ":" + minutes;
        }
    });
    return StopCollection;
});