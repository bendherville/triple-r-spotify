System.register(['./spotify.service'], function(exports_1) {
    var spotify_service_1;
    var SPOTIFY_PROVIDERS;
    return {
        setters:[
            function (spotify_service_1_1) {
                spotify_service_1 = spotify_service_1_1;
            }],
        execute: function() {
            exports_1("SpotifyService", spotify_service_1.SpotifyService);
            exports_1("SPOTIFY_PROVIDERS", SPOTIFY_PROVIDERS = [[spotify_service_1.SpotifyService]]);
        }
    }
});
//# sourceMappingURL=spotify.js.map