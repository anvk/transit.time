define([
  'jquery',
  'underscore',
  'backbone',
  'views/stops',
  'models/data'
], function($, _, Backbone, StopsView, UserData){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '': 'index',
      '/projects': 'showProjects',
      '/users': 'showUsers',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    app_router.on('route:showProjects', function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      var projectListView = new ProjectListView();
      projectListView.render();
    });
      // As above, call render on our loaded module
      // 'views/users/list'
    app_router.on('route:showUsers', function(){
      var userListView = new UserListView();
      userListView.render();
    });
    app_router.on('route:defaultAction', function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('No route:', actions);
    });
    app_router.on('route:index', function (actions) {
        var userData = new UserData();
        var stopsView = new StopsView({
            el: ".body",
            collection: userData.get("currentList")
        });
        stopsView.render();
        console.log('hola!', actions);
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});