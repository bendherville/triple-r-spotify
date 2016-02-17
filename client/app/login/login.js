System.register(['angular2/core', "angular2/router", "../spotify/spotify.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, spotify_service_1, router_2;
    var Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (spotify_service_1_1) {
                spotify_service_1 = spotify_service_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(params, spotifyService, router) {
                    this.client_id = 'e37aec36cd5147cd87b5988fbf606724';
                    var redirect_uri = window.location.protocol + "//" + window.location.host + "/auth";
                    this.loginUrl = "https://accounts.spotify.com/authorize?response_type=token&client_id=" + this.client_id + "&scope=user-read-private%20user-read-email%20playlist-modify-private\n        &redirect_uri=" + redirect_uri;
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userProfile');
                }
                Login = __decorate([
                    core_1.Component({
                        selector: 'login',
                        template: "\n        <main>\n            <a [href]=\"loginUrl\">Login</a>\n        </main>\n        "
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, spotify_service_1.SpotifyService, router_2.Router])
                ], Login);
                return Login;
            })();
            exports_1("default", Login);
        }
    }
});
//# sourceMappingURL=login.js.map