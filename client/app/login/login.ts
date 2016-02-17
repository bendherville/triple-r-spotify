import {Component} from 'angular2/core';
import {RouteParams} from "angular2/router";
import {Http} from "angular2/http";
import {SpotifyService} from "../spotify/spotify.service";
import {Router} from "angular2/router";

@Component({
    selector: 'login',
    template: `
        <main>
            <a [href]="loginUrl">Login</a>
        </main>
        `
})
export default class Login {

    public loginUrl;

    private client_id = 'e37aec36cd5147cd87b5988fbf606724';

    constructor(params:RouteParams, spotifyService:SpotifyService, router:Router) {
        var redirect_uri = `${window.location.protocol}//${window.location.host}/auth`;

        this.loginUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${this.client_id}&scope=user-read-private%20user-read-email%20playlist-modify-private
        &redirect_uri=${redirect_uri}`;

        localStorage.removeItem('accessToken');
        localStorage.removeItem('userProfile');
    }
}
