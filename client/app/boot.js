System.register(["angular2/platform/browser", "./app", "angular2/core", "angular2/http", "angular2/router", './spotify/spotify'], function(exports_1) {
    var browser_1, app_1, core_1, http_1, router_1, spotify_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (spotify_1_1) {
                spotify_1 = spotify_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_1.default, [
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                spotify_1.SPOTIFY_PROVIDERS
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map