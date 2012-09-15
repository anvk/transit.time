define(["underscore", "backbone"], function(_, Backbone) {
    var NextTime = Backbone.Model.extend({

    maxTime: 1440,
    timeRegex: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g,
    
    defaults: {
        stopTimes: [],
        currentTime: "0:00",
        nextTime: "0:00",
        timeLeft: 0
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
        var currentTimeI = this.timeToInt(this.get("currentTime"));
            nextTime = this.findNextTime(currentTimeI, this.get("stopTimes"));
            nextTimeI = this.timeToInt(nextTime);
            timeLeft = this.timeDiff(currentTimeI, nextTimeI);
        this.set({
            nextTime: nextTime,
            timeLeft: timeLeft
        });
    },
    
    // summary:
    //          Function to find next stop time in the stopTimes array given currentTime
    // currentTime:
    //          Time expressed in minutes
    // stopTimes:
    //          Array of times expressed as strings in 24h:00 formats
    //
    findNextTime: function(currentTime, stopTimes) {
        stopTimes || (stopTimes = []);
        if (!currentTime || currentTime < 0 || !stopTimes || stopTimes.length === 0) {
            return;
        }
        var that = this;
        return _.find(stopTimes, function (stopTime) {
            var stopTimeI = that.timeToInt(stopTime);
            return (stopTimeI >= currentTime || !stopTimeI);
        }) || stopTimes[0];
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
  return NextTime;
});
