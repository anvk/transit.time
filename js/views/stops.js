define([
    "jquery",
    "underscore",
    "backbone",
    "collections/stops",
    "views/stop"
], function($, _, Backbone, StopCollection, StopView) {
    var StopsView = Backbone.View.extend({
        initialize: function () {
            this.collection.bind("add", function(model) {
                var stopView = new StopView({model: model});
                this.$el = prepend(stopView.render().el);
            }, this);
        },
        render: function () {
            var that = this;
            that.$el.html();
            _.each(that.collection.models, function (stopData) {
                that.$el.prepend($("<div>").html(stopData.get("routeName") + " / " + stopData.get("name")));
            });
            that.$el.prepend($("<div>").html(that.collection.name + ": " + that.collection.models.length));
        },
        setCollection: function (collection) {
            collection.models || (collection.models = []);
            this.collection = collection;
            this.render();
        }
    });
    return StopsView;
});