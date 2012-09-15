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
        nexttime: "js/models/nexttime"
    }
});

requirejs(["jquery", "underscore", "backbone", "nexttime", "jqUnit"], function($, _, Backbone, NextTime, jqUnit) {
    var nexttimeTests = new jqUnit.TestCase("nexttime module tests"),
        makeEqualTest = function (messageFunction, testFunction, arguments, expectedValue) {
            jqUnit.assertEquals(messageFunction.apply(null, arguments), expectedValue, testFunction.apply(null, arguments));
        },
        testModuleFunction = function (messageFunc, tests, moduleFunc) {
            var nexttime = new NextTime();
            expect(tests.length);
            $.each(tests, function(index, test){
                makeEqualTest(messageFunc, nexttime[moduleFunc], test.args, test.expectedValue);
            });
            start();
        },
        nextTimePropertyCheck = function (defaultOptions, propertiesToCheck, newTime, newPropertiesToCheck) {
            var nexttime = new NextTime(defaultOptions),
                expectNum,
                propertiesToCheckFunction = function (properties) {
                    $.each(properties, function(name, expectedValue) {
                        jqUnit.assertEquals("".concat(name, " should be equal to ", expectedValue), expectedValue, nexttime.get(name));
                    });
                };
            propertiesToCheckFunction(propertiesToCheck);
            expectNum = propertiesToCheck.length;
            
            if (newTime) {
                nexttime.set({currentTime: newTime});
                propertiesToCheckFunction(newPropertiesToCheck);
                expectNum = expectNum + newPropertiesToCheck.length;
            }
            
            expect(expectNum);
            nexttime.destroy();
            start();
        },
        testScenarios = {
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
                testModuleFunction(messageFunc, tests, "timeToInt");
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
                testModuleFunction(messageFunc, tests, "timeDiff");
            },
            "findNextTime function testing": function () {
                // I'm going to use 01:10 as my test time which is 70 min
                var messageFunc = function (time, array) {
                        time || (time = "Empty");
                        array || (array = []);
                        return "".concat("Find next time with ", time, " in ", array.join(" "));
                    },
                    tests = [
                        { args: [], expectedValue: undefined },
                        { args: [70], expectedValue: undefined },
                        { args: [70, ["1:10"]], expectedValue: "1:10" },
                        { args: [70, ["1:00", "1:10"]], expectedValue: "1:10" },
                        { args: [70, ["1:09", "1:20", "1:30"]], expectedValue: "1:20" },
                        { args: [70, ["1:08", "1:09", "1:10"]], expectedValue: "1:10" },
                        { args: [70, ["1:07", "1:08", "1:09"]], expectedValue: "1:07" },
                        { args: [-1, ["1:07", "1:08", "1:09"]], expectedValue: undefined }
                    ];
                testModuleFunction(messageFunc, tests, "findNextTime");
            },
            "nexttime module empty testing": function() {
                nextTimePropertyCheck(null, {
                    currentTime: "0:00",
                    nextTime: undefined,
                    timeLeft: undefined
                });
            },
            "nexttime module non-empty testing": function() {
                nextTimePropertyCheck({
                    currentTime: "1:10",
                    stopTimes: ["1:08", "1:17", "2:25"]
                },
                {
                    currentTime: "1:10",
                    nextTime: "1:17",
                    timeLeft: 7
                });
            },
            "nexttime module non-empty testing with a time shift": function() {
                nextTimePropertyCheck({
                    currentTime: "1:10",
                    stopTimes: ["1:08", "1:17", "2:25"]
                },
                {
                    currentTime: "1:10",
                    nextTime: "1:17",
                    timeLeft: 7
                },
                "1:19",
                {
                    currentTime: "1:19",
                    nextTime: "2:25",
                    timeLeft: 66
                });
            },
            "nexttime module non-empty testing with a time shift": function() {
                nextTimePropertyCheck({
                    currentTime: "23:20",
                    stopTimes: ["0:08", "1:17", "23:10"]
                },
                {
                    currentTime: "23:20",
                    nextTime: "0:08",
                    timeLeft: 48
                });
            },
        };
    
    $.each(testScenarios, function(message, func) {
        nexttimeTests.asyncTest(message, func);
    });
});
