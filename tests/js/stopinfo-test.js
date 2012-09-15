requirejs.config({
    shim: {
        QUnit: {
            deps: ['jquery'],
            exports: 'QUnit'
        },
        jqUnit: {
            deps: ['QUnit'],
            exports: 'jqUnit'
        }
    },
    
    // My base URL with the models
    baseUrl: "../../",
    // Libraries I'm going to include
    paths: {
        QUnit: "tests/lib/qunit/js/qunit",
        jqUnit: "tests/lib/jqUnit/js/jqUnit",
        jquery: "js/libs/jquery/jquery-min",
        underscore: "js/libs/underscore/underscore-min",
        backbone: "js/libs/backbone/backbone-optamd3-min",
        testutils: "tests/js/test-utils",
        stopinfo: "js/models/stopinfo"
    }
});

requirejs(["jquery", "underscore", "backbone", "jqUnit", "testutils", "stopinfo"], function($, _, Backbone, jqUnit, testutils, StopInfo) {
    var futurestopsTests = new jqUnit.TestCase("futurestops module tests"),
        createModule = function (defaults) {
            return new StopInfo(defaults);
        },
        testScenarios = {
            "findFutureTimes function testing": function () {
                var messageFunc = function (currentTime, stopTimes, nTimes) {
                        currentTime || (currentTime = "Empty");
                        stopTimes || (stopTimes = []);
                        nTimes || (nTimes = "Empty");
                        return "".concat("Find ", nTimes," next stops after ", currentTime, " in ", stopTimes.join(" "));
                    },
                    tests = [
                        { args: [], expectedValue: undefined },
                        { args: [70], expectedValue: undefined },
                        { args: [70, ["1:15", "1:20", "1:25"]], expectedValue: undefined },
                        { args: [70, ["1:15", "1:20", "1:25"], 2], expectedValue: ["1:15", "1:20"] },
                        { args: [90, ["1:15", "1:20", "1:25"], 2], expectedValue: ["1:15", "1:20"] },
                        { args: [75, ["1:15", "1:20", "1:25"], 2], expectedValue: ["1:15", "1:20"] },
                        { args: [76, ["1:15", "1:20", "1:25"], 2], expectedValue: ["1:20", "1:25"] },
                        { args: [76, ["1:15", "1:20", "1:25"], 3], expectedValue: ["1:20", "1:25", "1:15"] },
                        { args: [76, ["1:15", "1:20", "1:25"], 6], expectedValue: ["1:20", "1:25", "1:15", "1:20", "1:25", "1:15"] },
                        { args: [76, ["1:15"], 6], expectedValue: ["1:15", "1:15", "1:15", "1:15", "1:15", "1:15"] }
                    ];
                testutils.testModuleFunction(createModule, messageFunc, tests, "findFutureTimes");
            },
            "timeToInt function testing": function () {
                var messageFunc = function(time) {
                        time || (time = "Empty"); 
                        return "".concat("Trying to convert ", time);
                    },
                    tests = [
                        { args: [null], expectedValue: undefined },
                        { args: [], expectedValue: undefined },
                        { args: ["0:08"], expectedValue: 8 },
                        { args: ["1:50"], expectedValue: 110 },
                        { args: ["13:50"], expectedValue: 830 },
                        { args: ["01:50"], expectedValue: 110 },
                        { args: ["00:50"], expectedValue: 50 },
                        { args: ["01:00"], expectedValue: 60 },
                        { args: ["23:59"], expectedValue: 1439 },
                        { args: ["24:00"], expectedValue: undefined },
                        { args: ["24:01"], expectedValue: undefined },
                        { args: ["013:01"], expectedValue: undefined },
                        { args: ["13:010"], expectedValue: undefined },
                        { args: ["test"], expectedValue: undefined },
                        { args: ["13:62"], expectedValue: undefined }
                    ];
                testutils.testModuleFunction(createModule, messageFunc, tests, "timeToInt");
            },
            "timeDiff function testing": function () {
                var messageFunc = function (time1, time2) {
                        time1 || (time1 = "Empty");
                        time2 || (time2 = "Empty");
                        return "".concat("Time Diff for ", time1, " and ", time2);
                    },
                    tests = [
                        { args: [], expectedValue: undefined },
                        { args: [60], expectedValue: undefined },
                        { args: [40, 60], expectedValue: 20 },
                        { args: [1300, 10], expectedValue: 150 },
                        { args: [1440, 10], expectedValue: undefined }
                    ];
                testutils.testModuleFunction(createModule, messageFunc, tests, "timeDiff");
            },
            "stopinfo test 1": function() {
                testutils.testModuleSet(createModule, {
                    defaults: {},
                    attributes: {
                        currentTime: "0:00",
                        nextTime: undefined,
                        timeLeft: undefined,
                        futureTimes: []
                    }
                });
            },
            "stopinfo test 2": function() {
                testutils.testModuleSet(createModule, {
                    defaults: {
                        currentTime: "1:10",
                        stopTimes: ["1:05", "1:09", "1:12", "1:15"]
                    },
                    attributes: {
                        futureTimes: [],
                        nTimes: 0,
                        nextTime: "1:12",
                        timeLeft: 2
                    }
                });
            },
            "stopinfo test 3": function() {
                testutils.testModuleSet(createModule, {
                    defaults: {
                        currentTime: "1:10",
                        stopTimes: ["1:05", "1:09", "1:12", "1:15"],
                        nTimes: 4
                    },
                    attributes: {
                        futureTimes: ["1:12", "1:15", "1:05", "1:09"],
                        nTimes: 4,
                        nextTime: "1:12",
                        timeLeft: 2
                    }
                });
            },
            "stopinfo test 4": function() {
                testutils.testModuleSet(createModule, {
                    defaults: {
                        currentTime: "1:16",
                        stopTimes: ["1:05", "1:09", "1:12", "1:15"],
                        nTimes: 2
                    },
                    attributes: {
                        futureTimes: ["1:05", "1:09"],
                        nTimes: 2,
                        nextTime: "1:05",
                        timeLeft: 1429
                    }
                });
            },
            "stopinfo test 5": function() {
                testutils.testModuleSet(createModule, {
                    defaults: {
                        currentTime: "1:16",
                        stopTimes: ["1:05", "1:09", "1:12", "1:15"],
                        nTimes: 2
                    },
                    attributes: {
                        futureTimes: ["1:05", "1:09"],
                        nTimes: 2,
                        nextTime: "1:05",
                        timeLeft: 1429
                    },
                    sets: {
                        currentTime: "1:11"
                    },
                    newAttributes: {
                        futureTimes: ["1:12", "1:15"],
                        nTimes: 2,
                        nextTime: "1:12",
                        timeLeft: 1
                    }
                });
            },
            "stopinfo test 6": function() {
                testutils.testModuleSet(createModule, {
                    defaults: {
                        currentTime: "1:16",
                        stopTimes: ["1:05", "1:09", "1:12", "1:15"],
                        nTimes: 2
                    },
                    attributes: {
                        futureTimes: ["1:05", "1:09"],
                        nTimes: 2,
                        nextTime: "1:05",
                        timeLeft: 1429
                    },
                    sets: {
                        currentTime: "1:11",
                        nTimes: 3
                    },
                    newAttributes: {
                        futureTimes: ["1:12", "1:15", "1:05"],
                        nTimes: 3,
                        nextTime: "1:12",
                        timeLeft: 1
                    }
                });
            }
        };
    
    $.each(testScenarios, function(message, func) {
        futurestopsTests.asyncTest(message, func);
    });
});