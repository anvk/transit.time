define(['underscore', 'backbone'], function(_, Backbone) {
    var FutureStops = Backbone.Model.extend({

    defaults: {
        stopTimes: [],
        currentTime: "0:00",
        futureTimes: [],
        nTimes: 0
    },

    initialize: function() {
        _.bindAll(this);
        
        var nTimes = this.get("nTimes");
        if (!nTimes || nTimes < 0) {
            this.set({nTimes: this.defaults.nTimes});
        }
        
        this.bind("change:currentTime", this.update);
        // update the values
        this.update();
    },
    
    // summary:
    //          Function which would update model once currentTime changed
    //
    update: function () {
        var currentTimeI = this.timeToInt(this.get("currentTime")),
            futureTimes = this.findFutureTimes(currentTimeI, this.get("stopTimes"), this.get("nTimes"));
        this.set({
            futureTimes: futureTimes
        });
    },
    
    // summary:
    //          Function to convert a time string of 24h:00 into minutes
    // time:
    //          time is a string in a 24h:00 format
    //
    timeToInt: function (time) {
        if (!time || !time.match(this.timeRegex)) {
            return;
        }
        var parts = time.split(":");
        return parts[0] * 60 + parts[1] * 1;
    },
    
    // summary:
    //          Find nTimes stoptimes which are ahead of currentTime given in the stopTimes
    // currentTime:
    //          current time expressed in minutes
    // stopTimes:
    //          Array of times in a string 24h:00 format
    // nTimes:
    //          Number of stops ahead of currentTime
    //
    findFutureTimes: function (currentTime, stopTimes, nTimes) {
        if (!currentTime || !stopTimes || stopTimes.length === 0 || !nTimes || nTimes < 1) {
            return;
        }
        var result = [],
            that = this,
            rest = _.filter(stopTimes, function (stopTime) {
                var stopTimeI = that.timeToInt(stopTime);
                return (!stopTimeI || stopTimeI >= currentTime);
            }),
            multiplier = (nTimes - rest.length) / stopTimes.length;
        
        _(multiplier).times(function() {
            result = _.union(result, stopTimes);
        });
        
        return _.first(_.union(rest, result), nTimes);
    }

    });
    return FutureStops;
});
