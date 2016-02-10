import {Component} from 'angular2/core';
import {RouteParams} from "angular2/router";
import {Http} from "angular2/http";
import {SpotifyService} from "../spotify/spotify.service";
import {Router} from "angular2/router";

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
        }, {});
        spotifyService.authenticate(hashParams.access_token);
        router.navigate(['Programs']);
    }
}
