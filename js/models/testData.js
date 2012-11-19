define([
    "underscore",
    "backbone"
], function(_, Backbone) {
    var TestData = Backbone.Model.extend({
        defaults: {
            data: {}  
        },
        initialize: function() {
            var data = {
                    "bus_64_south": {
                        "routeName": "64 South Bus",
                        "direction": "South",
                        "type": "bus",
                        "stops": {
                            "main street&gerrard": {
                                "mon-fri": ["10:00", "11:10", "12:30"],
                                "sat": ["11:30", "13:00"],
                                "sun": ["11:45", "13:35"]
                            },
                            "main street": {
                                "mon-fri": ["10:00", "11:10", "12:30"],
                                "sat-sun": ["11:30", "13:00"]
                            },
                            "queen east": {
                                "mon-fri": ["9:00", "9:30", "10:00", "11:30"]
                            }
                        }
                    },
                    "bus_135_east": {
                        "routeName": "135 East Bus",
                        "direction": "East",
                        "type": "bus",
                        "stops": {
                            "main street&gerrard": {
                                "mon-fri": ["9:00", "9:10", "9:20"],
                                "sat": ["10:30", "11:30"],
                                "sun": ["12:45", "13:35"]
                            },
                            "victoria park": {
                                "mon-fri": ["9:10", "9:15", "9:16"]
                            }
                        }
                    }
                },
                favoriteData = {
                    "bus_64_south": {
                        "routeName": "64 South Bus",
                        "direction": "South",
                        "type": "bus",
                        "stops": {
                            "main street&gerrard": {
                                "mon-fri": ["10:00", "11:10", "12:30"],
                                "sat": ["11:30", "13:00"],
                                "sun": ["11:45", "13:35"]
                            },
                            "main street": {
                                "mon-fri": ["10:00", "11:10", "12:30"],
                                "sat-sun": ["11:30", "13:00"]
                            }
                        }
                    },
                    "bus_135_east": {
                        "routeName": "135 East Bus",
                        "direction": "East",
                        "type": "bus",
                        "stops": {
                            "main street&gerrard": {
                                "mon-fri": ["9:00", "9:10", "9:20"],
                                "sat": ["10:30", "11:30"],
                                "sun": ["12:45", "13:35"]
                            }
                        }
                    }
                };
            this.set({
                data: data,
                favoriteData: favoriteData
            });
        }
    });
    return TestData;
});
