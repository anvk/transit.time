require.config({
    paths: {
        jquery: "libs/jquery/jquery-min",
        underscore: "libs/underscore/underscore-min",
        backbone: "libs/backbone/backbone-min",
        text: "text"
    }
});
require([
    "app",
], function(App) {
    App.initialize();
});