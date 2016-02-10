System.register(['angular2/core', "../spotify/spotify.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, spotify_service_1;
    var Header;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (spotify_service_1_1) {
                spotify_service_1 = spotify_service_1_1;
            }],
        execute: function() {
            spotifyService: spotify_service_1.SpotifyService;
            Header = (function () {
                function Header(spotifyService) {
                    var _this = this;
                    this.client_id = 'e37aec36cd5147cd87b5988fbf606724';
                    this.client_secret = '0dc0fab2797f436ea56e5982bb1dad3d';
                    this.redirect_uri = 'http://localhost:3001/auth';
                    this.spotifyService = spotifyService;
                    this.loginUrl = "https://accounts.spotify.com/authorize?response_type=token&client_id=" + this.client_id + "&scope=user-read-private%20user-read-email%20playlist-modify-private\n        &redirect_uri=" + this.redirect_uri;
                    this.spotifyService.userProfile()
                        .then(function (profile) {
                        _this.userProfile = profile;
                    });
                }
                Header = __decorate([
                    core_1.Component({
                        selector: 'header',
                        template: "\n        <section class=\"page-header\">\n            <a [href]=\"loginUrl\" *ngIf=\"!userProfile\">Login</a>\n            <section *ngIf=\"userProfile\">\n                {{ userProfile.email }}\n            </section>\n        </section>\n    ",
                        styles: ["\n        .page-header {\n            height: 39px;\n            width: 100%;\n            background: transparent  no-repeat center left;\n        }\n        "]
                    }), 
                    __metadata('design:paramtypes', [spotify_service_1.SpotifyService])
                ], Header);
                return Header;
            })();
            exports_1("default", Header);
        }
    }
});
//# sourceMappingURL=header.js.map