import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteParams} from 'angular2/router';
import {ProgramsService} from "./programs.service";
import {OnInit} from "angular2/core";
import Header from '../header/header';
import {SpotifyService} from "../spotify/spotify.service";

@Component({
    selector: 'programs',
    providers: [HTTP_PROVIDERS, [ProgramsService]],
    directives: [[Header]],
    template: `
        <header></header>

        <main>

            <section class="program-select">
                <select (change)="selectProgram($event.target.value)" *ngIf="programs">
                    <option value="">-- Choose a program --</option>
                    <option *ngFor="#program of programs" [value]="program.id">{{ program.name }}</option>
                </select>
                <section class="loading" *ngIf="!programs">Loading programs...</section>
            </section>

            <section class="loading" *ngIf="loadingPlaylist">Loading playlist...</section>

            <section class="program" *ngIf="spotifyTrackList && !loadingPlaylist">

                <div class="title">
                    <div id="playlist-buttons" class="playlist-buttons">
                        <button id="createPlaylist" (click)="savePlaylist()">Save Playlist</button>
                    </div>

                    <h1>{{ selectedProgram.name }}<a *ngIf="selectedProgram" class="program-url" [href]="selectedProgram.url" target="_rrr">profile</a></h1>
                </div>

                <div class="playlist">

                    <div class="playlist-header" ng-show="playlistName">
                        <div class="playlist-title">{{playlistName}}</div>
                    </div>

                    <div id="playlist-wrapper">
                        <div class="track" *ngFor="#item of spotifyTrackList">
                            <img [src]="item.albumImage.url" />
                            <span class="name">{{ item.name }}</span>
                            <span class="artist">{{ item.artist }}</span>
                        </div>
                    </div>

                </div>

            </section>

        </main>
    `,
    styles: [`
        main {
            font-family: RobotoDraft, Roboto, sans-serif
        }
        .program-select {
            width: 100%;
            padding: 20px;
            background: deepskyblue no-repeat center left;
        }
        .program {
            margin: auto;
            width: 85%;
            padding: 20px;
        }
        .program .title {
            width: 100%;
            padding: 0 10px;
        }
        .program .title h1 {
            color: deepskyblue;
            font-size: 2.4em;
        }
        .program .title h1 a {
            font-size: 0.4em;
            margin-left: 10px;
            color: lightgrey;
        }
        .playlist-buttons {
            float: right;
        }
        .loading {
            text-align: center;
            margin: 30px;
        }
        .track {
            display: inline-block;
            width: 300px;
            vertical-align: top;
            margin: 10px;
            border-radius: 2px;
            background-color: black;
            color: whitesmoke;
        }
        .track img {
            width: 100%;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
        }
        .track .name {
            font-size: 1.2em;
            display: block;
            margin: 10px;
        }
        .track .artist {
            font-size: 0.8em;
            display: block;
            margin: 10px;
        }
        `]
})
export default class Programs implements OnInit {

    public programs;
    public selectedProgram;
    public playlist;
    public spotifyTrackList;
    public loadingPlaylist;

    private programsService;
    private spotifyService:SpotifyService;

    constructor(programsService:ProgramsService, spotifyService:SpotifyService) {
        this.programsService = programsService;
        this.spotifyService = spotifyService;
    }

    ngOnInit() {
        this.programsService.findPrograms()
            .then(programs => {
                this.programs = programs;
            });
    }

    selectProgram(programId) {
        this.loadingPlaylist = true;

        this.programsService.getLatestPlaylist(programId)
            .then(playlist => {
                this.selectedProgram = this.programs.find(program => program.id === programId);
                this.playlist = playlist;
                this.spotifyService.createPlaylist(playlist).then(spotifyTrackList => {
                    this.spotifyTrackList = spotifyTrackList;
                    this.loadingPlaylist = false;
                });
            });
    }

    savePlaylist() {
        this.spotifyService.savePlaylist(`${this.selectedProgram.name} - ${new Date()}`, this.spotifyTrackList)
            .then(() => {
                console.log('Playlist saved');
            });
    }
}
