System.register(["angular2/core", "angular2/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var SpotifyService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            SpotifyService = (function () {
                function SpotifyService(http) {
                    this.http = http;
                }
                SpotifyService.prototype.authenticate = function (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                };
                SpotifyService.prototype.userProfile = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (_this.isAuthenticated()) {
                            if (localStorage.getItem('userProfile')) {
                                resolve(JSON.parse(localStorage.getItem('userProfile')));
                            }
                            else {
                                _this.http.get(SpotifyService.BASE_API_URL + "/v1/me", _this.createOptions())
                                    .subscribe(function (profile) {
                                    var userProfile = profile.json();
                                    localStorage.setItem('userProfile', JSON.stringify(userProfile));
                                    resolve(userProfile);
                                });
                            }
                        }
                        else {
                            reject();
                        }
                    });
                };
                SpotifyService.prototype.createOptions = function () {
                    var headers = new http_1.Headers();
                    headers.append('Authorization', "Bearer " + this.getAccessToken());
                    headers.append('Content-Type', "application/json");
                    return {
                        headers: headers
                    };
                };
                SpotifyService.prototype.search = function (trackName, artist) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        var options = _this.createOptions();
                        options.search = new http_1.URLSearchParams();
                        options.search.set('q', "track:" + trackName + "+artist:" + artist);
                        options.search.set('type', 'track');
                        options.search.set('limit', '1');
                        try {
                            _this.http.get(SpotifyService.BASE_API_URL + "/v1/search", options)
                                .subscribe(function (results) {
                                resolve(results.json());
                            }, function (err) {
                                resolve();
                            });
                        }
                        catch (err) {
                            resolve();
                        }
                    });
                };
                SpotifyService.prototype.createPlaylist = function (playlist) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        if (playlist) {
                            var searches = [];
                            playlist.forEach(function (item) {
                                searches.push(_this.search(item.track, item.artist));
                            });
                            Promise.all(searches)
                                .then(function (searchResults) {
                                console.dir(searchResults);
                                var tracks = searchResults
                                    .filter(function (result) { return result && result.tracks && result.tracks.items && result.tracks.items.length >= 1; })
                                    .map(function (result) {
                                    var track = result.tracks.items[0];
                                    return {
                                        uri: track.uri,
                                        name: track.name,
                                        artist: track.artists[0].name,
                                        albumImage: track.album && track.album.images ? track.album.images[0] : undefined
                                    };
                                });
                                resolve(tracks);
                            });
                        }
                    });
                };
                SpotifyService.prototype.savePlaylist = function (playlistName, playlist) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        _this.userProfile()
                            .then(function (userProfile) {
                            return _this.createSpotifyPlaylist(userProfile.id, playlistName);
                        })
                            .then(function (spotifyPlaylist) {
                            return _this.addTracksToPlaylist(playlist, spotifyPlaylist, spotifyPlaylist.owner.id);
                        })
                            .then(resolve);
                    });
                };
                SpotifyService.prototype.createSpotifyPlaylist = function (userId, playlistName) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        _this.http
                            .post(SpotifyService.BASE_API_URL + "/v1/users/" + userId + "/playlists", JSON.stringify({
                            name: playlistName,
                            public: false
                        }), _this.createOptions())
                            .subscribe(function (results) {
                            resolve(results.json());
                        });
                    });
                };
                ;
                SpotifyService.prototype.addTracksToPlaylist = function (playlist, spotifyPlaylist, userId) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        _this.http
                            .post(SpotifyService.BASE_API_URL + "/v1/users/" + userId + "/playlists/" + spotifyPlaylist.id + "/tracks", JSON.stringify({ "uris": playlist.map(function (item) { return item.uri; }) }), _this.createOptions())
                            .subscribe(function (snapshot) {
                            resolve(snapshot.json());
                        });
                    });
                };
                SpotifyService.prototype.isAuthenticated = function () {
                    return this.getAccessToken() != undefined;
                };
                SpotifyService.prototype.getAccessToken = function () {
                    return localStorage.getItem('accessToken');
                };
                ;
                SpotifyService.BASE_API_URL = 'https://api.spotify.com';
                SpotifyService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SpotifyService);
                return SpotifyService;
            })();
            exports_1("SpotifyService", SpotifyService);
        }
    }
});
//# sourceMappingURL=spotify.service.js.map