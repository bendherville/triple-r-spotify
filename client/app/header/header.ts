import {Component} from 'angular2/core';
import {SpotifyService} from "../spotify/spotify.service";
import {Router} from "angular2/router";

spotifyService:SpotifyService;
@Component({
    selector: 'header',
    template: `
        <section class="page-header">
            <section class="profile" *ngIf="userProfile">
                {{ userProfile.email }}
            </section>
        </section>
    `,
    styles: [`
        .page-header {
            width: 100%;
            background: aliceblue no-repeat center left;
        }
        .profile {
            text-align: right;
            padding: 10px;
            color: darkgrey;
        }
        `]
})
export default class Header {

    public userProfile;

    private spotifyService;

    constructor(spotifyService:SpotifyService, router:Router) {
        this.spotifyService = spotifyService;

        this.spotifyService.userProfile()
            .then(profile => {
                this.userProfile = profile;
            })
            .catch(() => {
                router.navigate(['Login']);
            });
    }
}
