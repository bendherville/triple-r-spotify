import {Injectable} from "angular2/core";
import {Http, RequestOptions, Headers, URLSearchParams} from "angular2/http";

@Injectable()
export class SpotifyService {

    private static BASE_API_URL = 'https://api.spotify.com';

    private http;

    constructor(http:Http) {
        this.http = http;
    }

    authenticate(accessToken) {
        localStorage.setItem('accessToken', accessToken);
    }

    userProfile() {
        return new Promise((resolve, reject) => {
            if (this.isAuthenticated()) {
                if (localStorage.getItem('userProfile')) {
                    resolve(JSON.parse(localStorage.getItem('userProfile')));
                } else {
                    this.http.get(`${SpotifyService.BASE_API_URL}/v1/me`, this.createOptions())
                        .subscribe(profile => {
                            var userProfile = profile.json();
                            localStorage.setItem('userProfile', JSON.stringify(userProfile));
                            resolve(userProfile);
                        });
                }
            } else {
                reject();
            }
        });
    }

    private createOptions() {
        var headers = new Headers();
        headers.append('Authorization', `Bearer ${this.getAccessToken()}`);
        headers.append('Content-Type', `application/json`);

        return {
            headers
        };
    }

    search(trackName, artist) {
        return new Promise(resolve => {
            var options = this.createOptions();
            options.search = new URLSearchParams();
            options.search.set('q', `track:${trackName}+artist:${artist}`);
            options.search.set('type', 'track');
            options.search.set('limit', '1');

            this.http.get(`${SpotifyService.BASE_API_URL}/v1/search`, options)
                .subscribe(results => {
                    resolve(results.json());
                });
        });
    }

    createPlaylist(playlist) {
        return new Promise(resolve => {
            if (playlist) {
                var searches = [];

                playlist.forEach(item => {
                    searches.push(this.search(item.track, item.artist));
                });

                Promise.all(searches)
                    .then(searchResults=> {
                        console.dir(searchResults);

                        var tracks = searchResults
                            .filter(result => result.tracks && result.tracks.items && result.tracks.items.length >= 1)
                            .map(result => {
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
    }

    savePlaylist(playlistName, playlist) {
        return new Promise(resolve => {

            this.userProfile()
                .then(userProfile => {
                    return this.createSpotifyPlaylist(userProfile.id, playlistName);
                })
                .then(spotifyPlaylist => {
                    return this.addTracksToPlaylist(playlist, spotifyPlaylist, spotifyPlaylist.owner.id);
                })
                .then(resolve);
        });
    }

    private createSpotifyPlaylist(userId, playlistName) {
        return new Promise(resolve=> {
            this.http
                .post(`${SpotifyService.BASE_API_URL}/v1/users/${userId}/playlists`,
                    JSON.stringify({
                        name: playlistName,
                        public: false
                    }),
                    this.createOptions())
                .subscribe(results => {
                    resolve(results.json());
                });
        });
    };

    private addTracksToPlaylist(playlist, spotifyPlaylist, userId) {
        return new Promise(resolve=> {
            this.http
                .post(`${SpotifyService.BASE_API_URL}/v1/users/${userId}/playlists/${spotifyPlaylist.id}/tracks`,
                    JSON.stringify({"uris": playlist.map(item => item.uri)}),
                    this.createOptions())
                .subscribe(snapshot => {
                    resolve(snapshot.json());
                });
        });
    }

    private isAuthenticated() {
        return this.getAccessToken() != undefined;
    }

    private getAccessToken() {
        return localStorage.getItem('accessToken');
    };
}
