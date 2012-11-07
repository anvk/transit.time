require.config({
    paths: {
        jquery: "libs/jquery/jquery-min",
        underscore: "libs/underscore/underscore-min",
        backbone: "libs/backbone/backbone-optamd3-min",
        text: "libs/require/text",
        config: "models/config"
    }
});
require(["appview"], function(AppView) {
    window.transitTimeApp = window.transitTimeApp || {
        views: {
            appView: new AppView
        }
    };
});