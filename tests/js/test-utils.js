define(['jquery'], function($) {
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
    
    return utils;
});