System.register(['angular2/core', 'angular2/http', "./programs.service", '../header/header', "../spotify/spotify.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, programs_service_1, header_1, spotify_service_1;
    var Programs;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (programs_service_1_1) {
                programs_service_1 = programs_service_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (spotify_service_1_1) {
                spotify_service_1 = spotify_service_1_1;
            }],
        execute: function() {
            Programs = (function () {
                function Programs(programsService, spotifyService) {
                    this.programsService = programsService;
                    this.spotifyService = spotifyService;
                }
                Programs.prototype.ngOnInit = function () {
                    var _this = this;
                    this.programsService.findPrograms()
                        .then(function (programs) {
                        _this.programs = programs;
                    });
                };
                Programs.prototype.selectProgram = function (programId) {
                    var _this = this;
                    this.loadingPlaylist = true;
                    this.programsService.getLatestPlaylist(programId)
                        .then(function (playlist) {
                        _this.selectedProgram = _this.programs.find(function (program) { return program.id === programId; });
                        _this.playlist = playlist;
                        _this.spotifyService.createPlaylist(playlist).then(function (spotifyTrackList) {
                            _this.spotifyTrackList = spotifyTrackList;
                            _this.loadingPlaylist = false;
                        });
                    });
                };
                Programs.prototype.savePlaylist = function () {
                    this.spotifyService.savePlaylist(this.selectedProgram.name + " - " + new Date(), this.spotifyTrackList)
                        .then(function () {
                        console.log('Playlist saved');
                    });
                };
                Programs = __decorate([
                    core_1.Component({
                        selector: 'programs',
                        providers: [http_1.HTTP_PROVIDERS, [programs_service_1.ProgramsService]],
                        directives: [[header_1.default]],
                        template: "\n        <header></header>\n\n        <main>\n\n            <section class=\"program-select\">\n                <select (change)=\"selectProgram($event.target.value)\">\n                    <option value=\"\">-- Choose a program --</option>\n                    <option *ngFor=\"#program of programs\" [value]=\"program.id\">{{ program.name }}</option>\n                </select>\n\n                <a *ngIf=\"selectedProgram\" class=\"program-url\" [href]=\"selectedProgram.url\" target=\"_rrr\">{{ selectedProgram.name }}</a>\n            </section>\n\n            <section class=\"loading\" *ngIf=\"loadingPlaylist\">Loading playlist...</section>\n\n            <section class=\"playlist\" *ngIf=\"spotifyTrackList && !loadingPlaylist\">\n\n                <div class=\"playlist-header\" ng-show=\"playlistName\">\n                    <div class=\"playlist-title\">{{playlistName}}</div>\n                    <div id=\"playlist-buttons\" class=\"playlist-buttons\"><button id=\"createPlaylist\" (click)=\"savePlaylist()\">Save Playlist</button></div>\n                    <div style=\"clear: both\"></div>\n                </div>\n\n                <div id=\"playlist-wrapper\">\n                    <div *ngFor=\"#item of spotifyTrackList\">{{ item.artist }} - {{ item.name }}</div>\n                </div>\n\n            </section>\n\n        </main>\n    "
                    }), 
                    __metadata('design:paramtypes', [programs_service_1.ProgramsService, spotify_service_1.SpotifyService])
                ], Programs);
                return Programs;
            })();
            exports_1("default", Programs);
        }
    }
});
//# sourceMappingURL=programs.js.map