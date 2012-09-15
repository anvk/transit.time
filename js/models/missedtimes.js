define(['underscore', 'backbone'], function(_, Backbone) {
    var MissedTimes = Backbone.Model.extend({

    defaults: {
        stopTimes: [],
        currentTime: "0:00",
        missedTimes: []
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
    // stopTimes:
    //          Array of times in a string 24h:00 format
    // nTimes:
    //          Number of stops ahead of currentTime
    //
    findMissedTimes: function (currentTime, stopTimes, nTimes) {
        if (!currentTime || !stopTimes || stopTimes.length === 0 || !nTimes || !nTimes < 1) {
            return;
        }
        
        
    }

    });
    return MissedTimes;
});
