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
        futurestops: "js/models/futurestops"
    }
});

requirejs(["jquery", "underscore", "backbone", "futurestops", "jqUnit"], function($, _, Backbone, FutureStops, jqUnit) {
    var futurestopsTests = new jqUnit.TestCase("futurestops module tests"),
        makeEqualTest = function (messageFunction, testFunction, arguments, expectedValue) {
            jqUnit.assertEquals(messageFunction.apply(null, arguments), expectedValue, testFunction.apply(null, arguments));
        },
        testModuleFunction = function (messageFunc, tests, moduleFunc) {
            var futurestops = new FutureStops();
            expect(tests.length);
            $.each(tests, function(index, test){
                makeEqualTest(messageFunc, futurestops[moduleFunc], test.args, test.expectedValue);
            });
            futurestops.destroy();
            start();
        },
        nextTimePropertyCheck = function (defaultOptions, propertiesToCheck, newTime, newPropertiesToCheck) {
            var futurestops = new FutureStops(defaultOptions),
                expectNum,
                propertiesToCheckFunction = function (properties) {
                    $.each(properties, function(name, expectedValue) {
                        jqUnit.assertEquals("".concat(name, " should be equal to ", expectedValue), expectedValue, futurestops.get(name));
                    });
                };
            propertiesToCheckFunction(propertiesToCheck);
            expectNum = propertiesToCheck.length;
            
            if (newTime) {
                futurestops.set({currentTime: newTime});
                propertiesToCheckFunction(newPropertiesToCheck);
                expectNum = expectNum + newPropertiesToCheck.length;
            }
            
            expect(expectNum);
            futurestops.destroy();
            start();
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
/*
                        { args: [], expectedValue: undefined },
                        { args: [70], expectedValue: undefined },
                        { args: [70, ["1:15", "1:20", "1:25"]], expectedValue: undefined },
*/
                        { args: [70, ["1:15", "1:20", "1:25"], 2], expectedValue: ["1:15", "1:20"] }
                    ];
                testModuleFunction(messageFunc, tests, "findFutureTimes");
            }
        };
    
    $.each(testScenarios, function(message, func) {
        futurestopsTests.asyncTest(message, func);
    });
});
