requirejs.config({
    shim: {
        QUnit: {
            deps: ["jquery"],
            exports: "QUnit"
        },
        jqUnit: {
            deps: ["QUnit"],
            exports: "jqUnit"
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
        backbone: "js/libs/backbone/backbone-min"
    }
});

define(["jquery", "underscore", "backbone", "jqUnit", "jquery"], function($, _, Backbone, jqUnit, $) {
    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    //"use strict";
    
    var utils = {};
            
    utils.testModuleAttributes = function (module, attributes) {
        if (!module) {
            return;
        }
        attributes || (attributes = {});
        
        expect(attributes.length);
        $.each(attributes, function(name, expectedValue) {
            jqUnit.assertDeepEq("".concat(name, " should be equal to ", expectedValue), expectedValue, module.get(name));
        });
    };
    
    utils.testModuleSet = function (createModule, options) {
        options || (options = {});
        options.sets || (options.sets = {});
        
        var expectNum,
            sets = options.sets,
            module = createModule(options.defaults);
        
        utils.testModuleAttributes(module, options.attributes);
        if (sets.length > 0) {
            nextstop.set(sets);
            utils.testModuleAttributes(module, options.newAttributes);
        }
        
        module.destroy();
        start();
    };
    
    utils.testModuleFunction = function (createModule, messageFunction, tests, moduleFunc) {
        var module = createModule();
        expect(tests.length);
        $.each(tests, function(index, test){
            jqUnit.assertDeepEq(messageFunction.apply(null, test.args), test.expectedValue, module[moduleFunc].apply(null, test.args));
        });
        module.destroy();
        start();
    };
    
    utils.runTestScenarios = function (options) {
        $.each(options.testScenarios, function(message, func) {
            options.testCase.asyncTest(message, func);
        });
    };    
    
    return utils;
});