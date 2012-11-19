define(["underscore", "backbone"], function(_, Backbone) {
    var StopModel = Backbone.Model.extend({

    maxTime: 1440,
    timeRegex: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g,

    defaults: {
        stopTimes: [],
        currentTime: "0:00",
        currentDay: "Monday",
        futureTimes: [],
        nTimes: 0,
        nextTime: "0:00",
        timeLeft: 0,
        name: "",
        routeName: "",
        routeType: "",
        times: {}
    },

    initialize: function() {
        _.bindAll(this);
        
        this.bind("change:currentTime", this.update);
        // update the values
        this.update();
    },
    
    // summary:
    //          Function which would update model once currentTime changed
    //
    update: function () {
        var nTimes = this.get("nTimes"),
            stopTimes = this.get("stopTimes"),
            currentTimeI = this.timeToInt(this.get("currentTime"));
            futureTimes = (nTimes < 1) ? this.findFutureTimes(currentTimeI, stopTimes, 1) : this.findFutureTimes(currentTimeI, stopTimes, nTimes),
            nextTime = (!futureTimes || futureTimes.length < 1) ? undefined : futureTimes[0],
            timeLeft = this.timeDiff(currentTimeI, this.timeToInt(nextTime));
        
        futureTimes = (nTimes > 0) ? futureTimes : [];
        
        this.set({
            futureTimes: futureTimes,
            nextTime: nextTime,
            timeLeft: timeLeft
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
            result = result.concat(stopTimes);
        });
        
        return _.first(rest.concat(result), nTimes);
    },
    
    // summary:
    //      Function to find time difference between 2 times expressed in minutes
    // time1:
    //      Time in minutes before time2
    // time2:
    //      Time in minutes after time1
    //
    timeDiff: function (time1, time2) {
        var maxTime = this.maxTime;
        if (!time1 || time1 >= maxTime || !time2 || time2 >= maxTime) {
            return;
        }
        
        if (time1 > time2) {
            return this.maxTime - time1 + time2;  
        } else {
            return time2 - time1;
        }
    }

    });
    return StopModel;
});
