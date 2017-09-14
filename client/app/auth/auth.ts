import {Component} from 'angular2/core';
import {RouteParams, Router} from "angular2/router";
import {SpotifyService} from "../spotify/spotify.service";

@Component({
    selector: 'auth',
    template: '<div>Authenticating...</div>'
})
export default class Auth {

    accessToken:string;

    constructor(params:RouteParams, spotifyService:SpotifyService, router:Router) {
        var hash = window.location.hash || '#';
        var hashParams = hash.substring(1).split('&').reduce((params, keyValue) => {
            var [key, value] = keyValue.split('=');
            params[key] = value;
            return params;
        }, {access_token: ''});
        spotifyService.authenticate(hashParams.access_token);
        router.navigate(['Programs']);
    }
}
