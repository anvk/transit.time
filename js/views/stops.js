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
            var that = this,
                stopView,
                models = that.collection.models;
            that.$el.html();
            for (var i=0; i< 1000; ++i) {
                that.$el.prepend($("<div>").html('hola hola hola hola hola hola'));
            }
            _.each(models, function (model) {
                stopView = new StopView({model: model});
                that.$el.prepend(stopView.render().el);
            });
/*             that.$el.prepend($("<div>").html(that.collection.name + ": " + models.length)); */
            return this;
        },
        setCollection: function (collection) {
            collection.models || (collection.models = []);
            this.collection = collection;
            this.render();
        }
    });
    return StopsView;
});