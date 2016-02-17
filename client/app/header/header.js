System.register(['angular2/core', "../spotify/spotify.service", "angular2/router"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, spotify_service_1, router_1;
    var Header;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (spotify_service_1_1) {
                spotify_service_1 = spotify_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            spotifyService: spotify_service_1.SpotifyService;
            Header = (function () {
                function Header(spotifyService, router) {
                    var _this = this;
                    this.spotifyService = spotifyService;
                    this.spotifyService.userProfile()
                        .then(function (profile) {
                        _this.userProfile = profile;
                    })
                        .catch(function () {
                        router.navigate(['Login']);
                    });
                }
                Header = __decorate([
                    core_1.Component({
                        selector: 'header',
                        template: "\n        <section class=\"page-header\">\n            <section class=\"profile\" *ngIf=\"userProfile\">\n                {{ userProfile.email }}\n            </section>\n        </section>\n    ",
                        styles: ["\n        .page-header {\n            width: 100%;\n            background: aliceblue no-repeat center left;\n        }\n        .profile {\n            text-align: right;\n            padding: 10px;\n            color: darkgrey;\n        }\n        "]
                    }), 
                    __metadata('design:paramtypes', [spotify_service_1.SpotifyService, router_1.Router])
                ], Header);
                return Header;
            })();
            exports_1("default", Header);
        }
    }
});
//# sourceMappingURL=header.js.map