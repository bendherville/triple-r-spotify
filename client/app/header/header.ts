import {Component} from 'angular2/core';
import {SpotifyService} from "../spotify/spotify.service";

spotifyService:SpotifyService;
@Component({
    selector: 'header',
    template: `
        <section class="page-header">
            <a [href]="loginUrl" *ngIf="!userProfile">Login</a>
            <section *ngIf="userProfile">
                {{ userProfile.email }}
            </section>
        </section>
    `,
    styles: [`
        .page-header {
            height: 39px;
            width: 100%;
            background: transparent  no-repeat center left;
        }
        `]
})
export default class Header {

    public loginUrl;
    public userProfile;

    private client_id = 'e37aec36cd5147cd87b5988fbf606724';
    private client_secret = '0dc0fab2797f436ea56e5982bb1dad3d';
    private redirect_uri = 'http://localhost:3001/auth';

    private spotifyService;

    constructor(spotifyService:SpotifyService) {
        this.spotifyService = spotifyService;

        this.loginUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${this.client_id}&scope=user-read-private%20user-read-email%20playlist-modify-private
        &redirect_uri=${this.redirect_uri}`;

        this.spotifyService.userProfile()
            .then(profile => {
                this.userProfile = profile;
            });
    }
}
