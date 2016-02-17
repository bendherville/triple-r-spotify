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
                        template: "\n        <header></header>\n\n        <main>\n\n            <section class=\"program-select\">\n                <select (change)=\"selectProgram($event.target.value)\" *ngIf=\"programs\">\n                    <option value=\"\">-- Choose a program --</option>\n                    <option *ngFor=\"#program of programs\" [value]=\"program.id\">{{ program.name }}</option>\n                </select>\n                <section class=\"loading\" *ngIf=\"!programs\">Loading programs...</section>\n            </section>\n\n            <section class=\"loading\" *ngIf=\"loadingPlaylist\">Loading playlist...</section>\n\n            <section class=\"program\" *ngIf=\"spotifyTrackList && !loadingPlaylist\">\n\n                <div class=\"title\">\n                    <div id=\"playlist-buttons\" class=\"playlist-buttons\">\n                        <button id=\"createPlaylist\" (click)=\"savePlaylist()\">Save Playlist</button>\n                    </div>\n\n                    <h1>{{ selectedProgram.name }}<a *ngIf=\"selectedProgram\" class=\"program-url\" [href]=\"selectedProgram.url\" target=\"_rrr\">profile</a></h1>\n                </div>\n\n                <div class=\"playlist\">\n\n                    <div class=\"playlist-header\" ng-show=\"playlistName\">\n                        <div class=\"playlist-title\">{{playlistName}}</div>\n                    </div>\n\n                    <div id=\"playlist-wrapper\">\n                        <div class=\"track\" *ngFor=\"#item of spotifyTrackList\">\n                            <img [src]=\"item.albumImage.url\" />\n                            <span class=\"name\">{{ item.name }}</span>\n                            <span class=\"artist\">{{ item.artist }}</span>\n                        </div>\n                    </div>\n\n                </div>\n\n            </section>\n\n        </main>\n    ",
                        styles: ["\n        main {\n            font-family: RobotoDraft, Roboto, sans-serif\n        }\n        .program-select {\n            width: 100%;\n            padding: 20px;\n            background: deepskyblue no-repeat center left;\n        }\n        .program {\n            margin: auto;\n            width: 85%;\n            padding: 20px;\n        }\n        .program .title {\n            width: 100%;\n            padding: 0 10px;\n        }\n        .program .title h1 {\n            color: deepskyblue;\n            font-size: 2.4em;\n        }\n        .program .title h1 a {\n            font-size: 0.4em;\n            margin-left: 10px;\n            color: lightgrey;\n        }\n        .playlist-buttons {\n            float: right;\n        }\n        .loading {\n            text-align: center;\n            margin: 30px;\n        }\n        .track {\n            display: inline-block;\n            width: 300px;\n            vertical-align: top;\n            margin: 10px;\n            border-radius: 2px;\n            background-color: black;\n            color: whitesmoke;\n        }\n        .track img {\n            width: 100%;\n            border-top-left-radius: 2px;\n            border-top-right-radius: 2px;\n        }\n        .track .name {\n            font-size: 1.2em;\n            display: block;\n            margin: 10px;\n        }\n        .track .artist {\n            font-size: 0.8em;\n            display: block;\n            margin: 10px;\n        }\n        "]
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