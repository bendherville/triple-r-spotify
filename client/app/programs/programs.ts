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
                <select (change)="selectProgram($event.target.value)">
                    <option value="">-- Choose a program --</option>
                    <option *ngFor="#program of programs" [value]="program.id">{{ program.name }}</option>
                </select>

                <a *ngIf="selectedProgram" class="program-url" [href]="selectedProgram.url" target="_rrr">{{ selectedProgram.name }}</a>
            </section>

            <section class="loading" *ngIf="loadingPlaylist">Loading playlist...</section>

            <section class="playlist" *ngIf="spotifyTrackList && !loadingPlaylist">

                <div class="playlist-header" ng-show="playlistName">
                    <div class="playlist-title">{{playlistName}}</div>
                    <div id="playlist-buttons" class="playlist-buttons"><button id="createPlaylist" (click)="savePlaylist()">Save Playlist</button></div>
                    <div style="clear: both"></div>
                </div>

                <div id="playlist-wrapper">
                    <div *ngFor="#item of spotifyTrackList">{{ item.artist }} - {{ item.name }}</div>
                </div>

            </section>

        </main>
    `
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
