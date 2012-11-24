define([
    "underscore",
    "backbone",
    "collections/stops",
    "models/testData",
    "models/stop"
], function(_, Backbone, StopsCollection, TestData, StopModel) {
    var Data = Backbone.Model.extend({
        initialize: function (options) {
            _.bindAll(this, "loadData", "parseData");
            options || (options = {});
            var testData = new TestData(),
                debug = (options.debug === undefined) ? true : options.debug,
                source = (debug) ? testData : {},
                favorites = new StopsCollection(this.loadData("favoriteData", source), {
                    name: "Favorites",
                    timeUpdate: true
                }),
                allData = new StopsCollection(this.loadData("data", source), {name: "All Stops"});
            this.set({
                debug: debug,
                favorites: favorites,
                allData: allData,
                currentList: favorites
            });
        },
        loadData: function (name, source) {
            if (!source) {
                return;
            }
            return this.parseData(source.get(name));
        },
        parseData: function (rawData) {
            if (!rawData) {
                return;
            }
            var parsedData = [],
                routeType, routeName;
            _.each(rawData, function (routeData) {
                routeType = routeData.routeType;
                routeName = routeData.routeName;
                _.each(routeData.stops, function (times, stopName) {
                    parsedData.push(new StopModel({
                        routeName: routeName,
                        routeType: routeType,
                        stopName: stopName,
                        times: times
                    }));
                });
            });
            return parsedData;
        }
    });
    return Data;
});
